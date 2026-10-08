import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { aiEnabled, getClient, levelContext, MODEL, FALLBACK_BETA, STYLE_RULES } from "@/lib/ai/server";

const Body = z.object({
  mode: z.enum(["tutor", "talk"]),
  day: z.number().int().min(1).max(30),
  lang: z.enum(["en", "hi"]).default("en"),
  scenario: z.string().max(300).optional(),
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) })).min(1).max(40),
});

const TUTOR = `You are "Kannada Guru", a friendly personal tutor inside a 30-day Kannada learning app.
Answer questions like "How do I say ...?", "Why is this word used?", "What's the difference between idu and adu?".
Format: short paragraphs or bullets. Put each Kannada phrase on its own line as: ಕನ್ನಡ — roman — meaning.
If the learner asks you to talk to them in Kannada, switch to simple Kannada at their level and add a roman + English line under each Kannada line.`;

const TALK = `You are role-playing a Kannada-speaking person in Bengaluru in a practice conversation. Stay in character.
Each reply: one or two short Kannada lines at the learner's level. Under each, write the romanisation, then the English meaning in brackets.
Then, on a new line starting with "💡", give a very short coaching note: if the learner's last message had a mistake, show the corrected Kannada; otherwise suggest one natural thing they could say next.
Keep the scene moving naturally. If the learner writes in English or Hindi, gently reply in Kannada and show them how to say it.`;

export async function POST(req: Request) {
  if (!aiEnabled()) return Response.json({ error: "ai-disabled" }, { status: 503 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "bad-request" }, { status: 400 });
  const { mode, day, lang, scenario, messages } = parsed.data;

  const system: Anthropic.Beta.BetaTextBlockParam[] = [
    { type: "text", text: `${STYLE_RULES}\n\n${mode === "tutor" ? TUTOR : TALK}\n\n${levelContext(day)}`, cache_control: { type: "ephemeral" } },
    { type: "text", text: `Explanation language: ${lang === "hi" ? "Hindi (Devanagari), with Kannada always shown" : "English, with Kannada always shown"}.${scenario ? `\nScenario: ${scenario}` : ""}` },
  ];

  const client = getClient();
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 1500,
    betas: [FALLBACK_BETA],
    fallbacks: "default",
    output_config: { effort: "low" },
    system,
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const ev of stream) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") controller.enqueue(encoder.encode(ev.delta.text));
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") controller.enqueue(encoder.encode("\n\nSorry, I can't help with that one. Let's keep practising Kannada! 🙏"));
      } catch (err) {
        const msg = err instanceof Anthropic.RateLimitError ? "The Guru is busy right now. Try again in a moment."
          : err instanceof Anthropic.AuthenticationError ? "The AI key isn't valid. The core course still works offline."
          : err instanceof Anthropic.APIError ? `AI error (${err.status ?? "network"}). The core course still works offline.`
          : "AI is unavailable right now. The core course still works offline.";
        controller.enqueue(encoder.encode(`\n\n⚠️ ${msg}`));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}

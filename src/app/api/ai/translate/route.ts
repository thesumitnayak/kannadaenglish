import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { aiEnabled, getClient, MODEL, FALLBACK_BETA, STYLE_RULES } from "@/lib/ai/server";

const Body = z.object({ text: z.string().min(1).max(300) });

const Out = z.object({
  kn: z.string(),
  roman: z.string(),
  en: z.string(),
  hi: z.string(),
  formality: z.enum(["formal", "polite", "casual", "very-casual"]),
  pronunciation: z.string(),
  breakdown: z.array(z.object({ roman: z.string(), kn: z.string(), meaning: z.string() })),
  note: z.string(),
});

export async function POST(req: Request) {
  if (!aiEnabled()) return Response.json({ error: "ai-disabled" }, { status: 503 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "bad-request" }, { status: 400 });
  try {
    const res = await getClient().beta.messages.parse({
      model: MODEL,
      max_tokens: 1500,
      betas: [FALLBACK_BETA],
      fallbacks: "default",
      output_config: { effort: "low", format: betaZodOutputFormat(Out) },
      system: STYLE_RULES,
      messages: [{ role: "user", content: `Translate into natural spoken Bengaluru Kannada (if the input is already Kannada or roman Kannada, translate it to English and Hindi instead, and still fill every field). "pronunciation" is a simple English-letters sound guide with stressed syllables in CAPS. "note" is one line on usage or a more formal/casual alternative.\n\nInput: ${parsed.data.text}` }],
    });
    if (res.stop_reason === "refusal" || !res.parsed_output) return Response.json({ error: "no-translation" }, { status: 502 });
    return Response.json(res.parsed_output);
  } catch (err) {
    const status = err instanceof Anthropic.APIError ? err.status ?? 502 : 502;
    return Response.json({ error: "ai-error" }, { status });
  }
}

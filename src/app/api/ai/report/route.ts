import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { aiEnabled, getClient, levelContext, MODEL, FALLBACK_BETA, STYLE_RULES } from "@/lib/ai/server";

const Body = z.object({
  day: z.number().int().min(1).max(30),
  scenario: z.string().max(300),
  transcript: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) })).min(2).max(40),
});

const Report = z.object({
  vocabulary: z.number().int().min(0).max(100),
  grammar: z.number().int().min(0).max(100),
  naturalness: z.number().int().min(0).max(100),
  confidence: z.number().int().min(0).max(100),
  summary: z.string(),
  corrections: z.array(z.object({ youSaid: z.string(), better: z.string(), why: z.string() })),
  nextSteps: z.array(z.string()),
});

export async function POST(req: Request) {
  if (!aiEnabled()) return Response.json({ error: "ai-disabled" }, { status: 503 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "bad-request" }, { status: 400 });
  const { day, scenario, transcript } = parsed.data;
  const convo = transcript.map((m) => `${m.role === "user" ? "LEARNER" : "PARTNER"}: ${m.content}`).join("\n");
  try {
    const res = await getClient().beta.messages.parse({
      model: MODEL,
      max_tokens: 2000,
      betas: [FALLBACK_BETA],
      fallbacks: "default",
      output_config: { effort: "low", format: betaZodOutputFormat(Report) },
      system: `${STYLE_RULES}\n\n${levelContext(day)}`,
      messages: [{ role: "user", content: `Score the LEARNER's Kannada in this practice conversation (scenario: ${scenario}). Be encouraging but honest, and score relative to a Day ${day} learner. Give at most 3 corrections (Kannada script + roman in "better") and 2-3 short next steps.\n\n${convo}` }],
    });
    if (res.stop_reason === "refusal" || !res.parsed_output) return Response.json({ error: "no-report" }, { status: 502 });
    return Response.json(res.parsed_output);
  } catch (err) {
    const status = err instanceof Anthropic.APIError ? err.status ?? 502 : 502;
    return Response.json({ error: "ai-error" }, { status });
  }
}

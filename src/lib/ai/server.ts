import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { vocabUpTo, sentencesUpTo } from "@/content/course";

export const MODEL = "claude-opus-5-5";
/** Server-side refusal fallback (routes by refusal category; no model list to maintain). */
export const FALLBACK_BETA = "server-side-fallback-2026-07-01" as const;

let client: Anthropic | null = null;
export function aiEnabled(): boolean {
  return !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}
export function getClient(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

/** Level-aware context: what the learner has been taught so far. Stable per day, so it caches well. */
export function levelContext(day: number): string {
  const d = Math.max(1, Math.min(30, Math.round(day)));
  const vocab = vocabUpTo(d).map((v) => `${v.roman} = ${v.en}`).join("; ");
  const sents = sentencesUpTo(d).slice(-40).map((s) => `${s.roman} (${s.en})`).join("; ");
  return `The learner is on Day ${d} of a 30-day spoken-Kannada course.
Vocabulary taught so far (roman = meaning): ${vocab}
Example sentences taught so far: ${sents}`;
}

export const STYLE_RULES = `You teach natural, spoken Bengaluru Kannada to an adult who knows English and Hindi.
Rules:
- Prefer the natural spoken form people use in Bengaluru (e.g. "maadtini", "hogtini", "bartira") over textbook forms ("maaduttene"), and say when a textbook form exists.
- Always give Kannada script, romanisation, and meaning. Label formality as Formal, Polite, Casual or Very casual.
- Keep Kannada at the learner's level: reuse taught vocabulary; introduce at most two new words per reply and gloss them.
- When it helps, bridge from Hindi (e.g. "Nanage = मुझे, beku = चाहिए") without claiming the grammars are identical.
- Be warm and encouraging. Never make the learner feel stupid. If they make a mistake, say "Almost!" and show the correct version with a one-line reason.
- Never teach slurs or swear words. Keep replies short and skimmable.`;

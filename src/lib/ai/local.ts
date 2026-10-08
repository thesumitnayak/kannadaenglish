import { VOCAB_INDEX, SENTENCE_INDEX } from "@/content/course";
import { SCENARIOS } from "@/content/scenarios";
import { SITUATIONS } from "@/content/whatToSay";
import type { Formality } from "@/content/types";
import { normRoman, similarity } from "@/lib/engine/text";

export interface Phrase { kn: string; roman: string; en: string; hi: string; formality?: Formality; source: string; note?: string }

let corpus: Phrase[] | null = null;
function getCorpus(): Phrase[] {
  if (corpus) return corpus;
  const out: Phrase[] = [];
  for (const s of SENTENCE_INDEX.values()) out.push({ kn: s.kn, roman: s.roman, en: s.en, hi: s.hi, formality: s.formality, source: `Day ${s.day}`, note: s.note?.en });
  for (const v of VOCAB_INDEX.values()) out.push({ kn: v.kn, roman: v.roman, en: v.en, hi: v.hi, formality: v.formality, source: `Day ${v.day}`, note: v.context?.en ?? v.bridge?.en });
  for (const sc of SCENARIOS) for (const s of sc.sentences) out.push({ kn: s.kn, roman: s.roman, en: s.en, hi: s.hi, formality: s.formality, source: `${sc.emoji} ${sc.title.en}` });
  for (const st of SITUATIONS) for (const p of [st.primary, ...st.alternatives]) out.push({ ...p, source: "What do I say?" });
  const seen = new Set<string>();
  corpus = out.filter((p) => { const k = p.roman.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  return corpus;
}

const STOP = new Set(["i", "a", "the", "is", "am", "are", "to", "you", "do", "how", "say", "in", "kannada", "what", "please", "of", "my", "me", "it", "this"]);

function words(s: string): string[] {
  return s.toLowerCase().replace(/[^a-zऀ-ॿಀ-೿ ]/g, " ").split(/\s+/).filter(Boolean);
}

/** Offline phrase search over the whole course (English, Hindi, roman or Kannada input). */
export function searchPhrases(query: string, limit = 5): Phrase[] {
  const q = query.trim();
  if (!q) return [];
  const qw = words(q).filter((w) => !STOP.has(w));
  const isKn = /[ಀ-೿]/.test(q);
  const scored = getCorpus().map((p) => {
    let sc = 0;
    if (isKn) sc = p.kn.includes(q) ? 3 : similarity(q, p.kn);
    else {
      const enW = new Set(words(p.en + " " + p.hi));
      const hits = qw.filter((w) => enW.has(w) || [...enW].some((e) => e.length > 3 && (e.startsWith(w) || w.startsWith(e)))).length;
      sc = qw.length ? hits / qw.length : 0;
      sc += 0.6 * similarity(q, p.en);
      const rm = normRoman(q);
      if (rm.length > 2 && normRoman(p.roman).includes(rm)) sc += 1.5;
      sc -= Math.max(0, p.en.split(" ").length - qw.length - 3) * 0.03;
    }
    return { p, sc };
  });
  return scored.filter((x) => x.sc > 0.45).sort((a, b) => b.sc - a.sc).slice(0, limit).map((x) => x.p);
}

/** Offline tutor: answer from the phrasebook with a friendly frame. */
export function localTutorAnswer(question: string): string {
  const cleaned = question.replace(/how (do|can) i say|in kannada|what is|what's|\?|"|'/gi, " ").trim();
  const hits = searchPhrases(cleaned || question, 4);
  if (!hits.length) {
    return "I couldn't find that in the course yet. Try asking for a short phrase, like \"How do I say I want water?\".\n\n(The AI Guru is offline. Add an ANTHROPIC_API_KEY to unlock free-form answers.)";
  }
  const lines = hits.map((h) => `${h.kn} — ${h.roman} — ${h.en}${h.formality ? ` (${h.formality})` : ""}${h.note ? `\n   ↳ ${h.note}` : ""}`);
  return `Here's what I found in your course:\n\n${lines.join("\n\n")}\n\n(Offline mode: answers come from the course phrasebook.)`;
}

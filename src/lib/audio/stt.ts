"use client";

import { normKn, normRoman, similarity, levenshtein } from "@/lib/engine/text";

/* Minimal typings for the Web Speech API (not in lib.dom for all TS versions). */
interface SRAlternative { transcript: string; confidence: number }
interface SRResult { 0: SRAlternative; length: number; isFinal: boolean; [i: number]: SRAlternative }
interface SREvent { results: { length: number; [i: number]: SRResult } }
interface SR {
  lang: string; interimResults: boolean; maxAlternatives: number; continuous: boolean;
  start(): void; stop(): void; abort(): void;
  onresult: ((e: SREvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type SRCtor = new () => SR;

function ctor(): SRCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: SRCtor; webkitSpeechRecognition?: SRCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function sttSupported(): boolean {
  return !!ctor();
}

export interface Heard { transcripts: string[]; error?: string }

/** Listen once. Tries kn-IN; transcripts may come back in Kannada script. */
export function listenOnce(lang = "kn-IN", timeoutMs = 8000): { promise: Promise<Heard>; stop: () => void } {
  const C = ctor();
  if (!C) return { promise: Promise.resolve({ transcripts: [], error: "unsupported" }), stop: () => {} };
  const rec = new C();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 5;
  rec.continuous = false;
  let done = false;
  const promise = new Promise<Heard>((resolve) => {
    const out: string[] = [];
    const finish = (error?: string) => { if (done) return; done = true; resolve({ transcripts: out, error }); };
    rec.onresult = (e) => {
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        for (let j = 0; j < r.length; j++) out.push(r[j].transcript);
      }
    };
    rec.onerror = (e) => finish(e.error);
    rec.onend = () => finish();
    try { rec.start(); } catch { finish("start-failed"); }
    setTimeout(() => { try { rec.stop(); } catch { /* noop */ } }, timeoutMs);
  });
  return { promise, stop: () => { try { rec.stop(); } catch { /* noop */ } } };
}

/** Score heard transcripts against a target sentence (Kannada script + roman). 0..1 */
export function scoreSpeech(transcripts: string[], kn: string, roman: string): { score: number; best: string } {
  let best = { score: 0, best: transcripts[0] ?? "" };
  const tKn = normKn(kn);
  for (const t of transcripts) {
    let sc: number;
    if (/[ಀ-೿]/.test(t)) {
      const h = normKn(t);
      sc = 1 - levenshtein(h, tKn) / Math.max(h.length, tKn.length, 1);
    } else {
      sc = similarity(t, roman);
      // word-level credit helps when recogniser splits words differently
      const tw = normRoman(roman).split(" ");
      const hw = new Set(normRoman(t).split(" "));
      const wordHit = tw.filter((w) => hw.has(w)).length / Math.max(tw.length, 1);
      sc = Math.max(sc, wordHit * 0.95);
    }
    if (sc > best.score) best = { score: sc, best: t };
  }
  return { score: Math.max(0, Math.min(1, best.score)), best: best.best };
}

export function speechFeedback(score: number): { en: string; hi: string; emoji: string } {
  if (score >= 0.9) return { emoji: "🌟", en: "Excellent! That sounded natural.", hi: "शानदार! बिल्कुल स्वाभाविक लगा।" };
  if (score >= 0.75) return { emoji: "😎", en: "Very good! Just polish a sound or two.", hi: "बहुत अच्छा! बस एक-दो आवाज़ें सुधारें।" };
  if (score >= 0.55) return { emoji: "👍", en: "Good try! Listen once more, then say it slower.", hi: "अच्छी कोशिश! एक बार और सुनें, फिर धीरे बोलें।" };
  return { emoji: "😊", en: "Almost! Play it slowly and repeat word by word.", hi: "लगभग! धीरे सुनें और शब्द-दर-शब्द दोहराएँ।" };
}

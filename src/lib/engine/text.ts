/** Text utilities for forgiving answer checking in romanised Kannada. */

/** Normalise romanised Kannada so common spelling variants compare equal. */
export function normRoman(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‐-―-]/g, "")
    .replace(/[^a-z0-9ಀ-೿ ]/g, " ")
    .replace(/aa/g, "a").replace(/ee/g, "i").replace(/ii/g, "i").replace(/oo/g, "u").replace(/uu/g, "u")
    .replace(/th/g, "t").replace(/dh/g, "d").replace(/kh/g, "k").replace(/gh/g, "g").replace(/bh/g, "b").replace(/ph/g, "p")
    .replace(/sh/g, "s").replace(/w/g, "v").replace(/z/g, "j")
    .replace(/(.)\1+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function normKn(input: string): string {
  return input.replace(/[^ಀ-೿ ]/g, "").replace(/\s+/g, " ").trim();
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

/** 0..1 similarity on normalised strings. */
export function similarity(a: string, b: string): number {
  const x = normRoman(a);
  const y = normRoman(b);
  if (!x && !y) return 1;
  const d = levenshtein(x, y);
  return 1 - d / Math.max(x.length, y.length, 1);
}

export interface MatchResult { ok: boolean; perfect: boolean; score: number; closest: string }

/** Compare a typed roman answer with the expected answer and accepted alternatives. */
export function matchAnswer(given: string, answer: string, acceptable: string[] = []): MatchResult {
  const candidates = [answer, ...acceptable];
  let best = { score: 0, closest: answer };
  for (const c of candidates) {
    const sc = similarity(given, c);
    if (sc > best.score) best = { score: sc, closest: c };
  }
  const perfect = normRoman(given) === normRoman(answer);
  return { ok: best.score >= 0.82, perfect, score: best.score, closest: best.closest };
}

export function shuffle<T>(arr: T[], seed?: number): T[] {
  const a = [...arr];
  let s = seed ?? Math.floor(Math.random() * 1e9);
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** Split a roman sentence into tokens for sentence-building. */
export function tokens(roman: string): string[] {
  return roman.replace(/[.!]$/, "").split(/\s+/).filter(Boolean);
}

export function todayStr(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

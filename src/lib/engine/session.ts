import type {
  Bilingual, Conversation, DayLesson, Question, Sentence, Skill, StepType, VocabItem,
} from "@/content/types";
import { poolForDay, vocabUpTo, sentencesUpTo, VOCAB_INDEX, SENTENCE_INDEX } from "@/content/course";
import { priority, type ReviewItem } from "./srs";
import { sample, shuffle, tokens } from "./text";

export type Lang = "en" | "hi";
export type Ref = { t: "v" | "s"; id: string };

interface Base { id: string; skill: Skill; ref?: Ref; retry?: boolean }

export type Exercise =
  | (Base & { kind: "card"; vocab: VocabItem })
  | (Base & { kind: "concept" })
  | (Base & {
      kind: "mcq";
      prompt: Bilingual;
      kn?: string; roman?: string;           // shown (or spoken for listen)
      audioOnly?: boolean;                    // listen mode: hide text until answered
      options: { label: string; sub?: string; kn?: string }[];
      answer: string;                          // label of correct option
      explanation?: Bilingual;
      correctKn?: string; correctRoman?: string;
    })
  | (Base & {
      kind: "build";
      prompt: Bilingual;
      pieces: { roman: string; kn?: string }[];  // shuffled
      answer: string[];                          // roman tokens in order
      kn: string; roman: string;
      explanation?: Bilingual;
    })
  | (Base & {
      kind: "type";
      prompt: Bilingual;
      source?: { en: string; hi: string };
      answer: string; acceptable: string[];
      kn?: string;
      hint?: string;
      explanation?: Bilingual;
    })
  | (Base & { kind: "speak"; kn: string; roman: string; en: string; hi: string })
  | (Base & { kind: "conversation"; conv: Conversation });

export interface Step { type: StepType; title: Bilingual; exercises: Exercise[] }

export interface SessionCtx {
  lang: Lang;
  goalMinutes: number;
  review: Record<string, ReviewItem>;
  maxDayDone: number;
}

export const STEP_TITLES: Record<StepType, Bilingual> = {
  intro: { en: "Intro", hi: "परिचय" },
  warmup: { en: "Warm-up", hi: "वॉर्म-अप" },
  words: { en: "New words", hi: "नए शब्द" },
  learn: { en: "Learn", hi: "सीखें" },
  listen: { en: "Listen", hi: "सुनें" },
  speak: { en: "Speak", hi: "बोलें" },
  build: { en: "Build", hi: "बनाएँ" },
  translate: { en: "Translate", hi: "अनुवाद" },
  conversation: { en: "Conversation", hi: "बातचीत" },
  boss: { en: "Boss question", hi: "बॉस सवाल" },
  result: { en: "Result", hi: "नतीजा" },
};

const DEFAULT_PLAN: StepType[] = ["warmup", "words", "learn", "listen", "speak", "build", "translate", "conversation", "boss", "result"];

const BASE_COUNTS: Partial<Record<StepType, number>> = { warmup: 5, listen: 4, speak: 3, build: 3, translate: 3 };

export function goalScale(minutes: number): number {
  if (minutes <= 10) return 0.6;
  if (minutes <= 20) return 1;
  if (minutes <= 30) return 1.4;
  return 2;
}

let uid = 0;
const nid = (p: string) => `${p}-${Date.now().toString(36)}-${(uid++).toString(36)}`;

const meaning = (x: { en: string; hi: string }, lang: Lang) => (lang === "hi" ? x.hi : x.en);

/* ---------------- weighted picking ---------------- */

function weightedPick<T>(items: T[], keyOf: (t: T) => string, n: number, review: Record<string, ReviewItem>): T[] {
  const now = Date.now();
  const scored = items.map((it) => {
    const r = review[keyOf(it)];
    const p = r ? priority(r, now) : 4;
    return { it, s: p + Math.random() * 3 };
  });
  scored.sort((a, b) => b.s - a.s);
  return scored.slice(0, n).map((x) => x.it);
}

/* ---------------- generators ---------------- */

function distractorsFor(target: VocabItem, pool: VocabItem[], lang: Lang, n = 3): string[] {
  const label = meaning(target, lang);
  const sameTag = pool.filter((p) => p.id !== target.id && meaning(p, lang) !== label && p.tags?.some((t) => target.tags?.includes(t)));
  const others = pool.filter((p) => p.id !== target.id && meaning(p, lang) !== label);
  const picked = [...sample(sameTag, n), ...sample(others, n * 2)];
  const out: string[] = [];
  for (const p of picked) {
    const l = meaning(p, lang);
    if (!out.includes(l) && l !== label) out.push(l);
    if (out.length >= n) break;
  }
  return out;
}

export function vocabMeaningMCQ(v: VocabItem, pool: VocabItem[], lang: Lang, listen = false): Exercise {
  const answer = meaning(v, lang);
  const opts = shuffle([answer, ...distractorsFor(v, pool, lang)]);
  return {
    id: nid("vm"), kind: "mcq", skill: listen ? "listening" : "vocabulary", ref: { t: "v", id: v.id },
    prompt: listen ? { en: "Listen. What does it mean?", hi: "सुनिए। इसका मतलब क्या है?" } : { en: "What does this mean?", hi: "इसका मतलब क्या है?" },
    kn: v.kn, roman: v.roman, audioOnly: listen,
    options: opts.map((label) => ({ label })), answer,
    explanation: v.bridge ?? v.context,
    correctKn: v.kn, correctRoman: v.roman,
  };
}

export function vocabReverseMCQ(v: VocabItem, pool: VocabItem[], lang: Lang): Exercise {
  const others = sample(pool.filter((p) => p.id !== v.id && p.roman !== v.roman && meaning(p, lang) !== meaning(v, lang)), 3);
  const opts = shuffle([v, ...others]);
  return {
    id: nid("vr"), kind: "mcq", skill: "vocabulary", ref: { t: "v", id: v.id },
    prompt: { en: `How do you say "${v.en}" in Kannada?`, hi: `कन्नड़ में "${v.hi}" कैसे कहेंगे?` },
    options: opts.map((o) => ({ label: o.roman, kn: o.kn })), answer: v.roman,
    explanation: v.context ?? v.bridge, correctKn: v.kn, correctRoman: v.roman,
  };
}

export function sentenceMeaningMCQ(s: Sentence, pool: Sentence[], lang: Lang, listen = false): Exercise {
  const answer = meaning(s, lang);
  const others = sample(pool.filter((p) => p.id !== s.id && meaning(p, lang) !== answer), 3).map((p) => meaning(p, lang));
  return {
    id: nid("sm"), kind: "mcq", skill: listen ? "listening" : "grammar", ref: { t: "s", id: s.id },
    prompt: listen ? { en: "Listen. What did they say?", hi: "सुनिए। उन्होंने क्या कहा?" } : { en: "What does this sentence mean?", hi: "इस वाक्य का मतलब क्या है?" },
    kn: s.kn, roman: s.roman, audioOnly: listen,
    options: shuffle([answer, ...others]).map((label) => ({ label })), answer,
    explanation: s.note, correctKn: s.kn, correctRoman: s.roman,
  };
}

export function buildExercise(s: Sentence): Exercise | null {
  const words = s.words ?? tokens(s.roman);
  if (words.length < 2) return null;
  const kns = s.wordsKn && s.wordsKn.length === words.length ? s.wordsKn : undefined;
  const pieces = words.map((w, i) => ({ roman: w, kn: kns?.[i] }));
  let shuffled = shuffle(pieces);
  if (shuffled.every((p, i) => p.roman === words[i])) shuffled = [...shuffled.slice(1), shuffled[0]];
  return {
    id: nid("b"), kind: "build", skill: "grammar", ref: { t: "s", id: s.id },
    prompt: { en: s.en, hi: s.hi }, pieces: shuffled, answer: words, kn: s.kn, roman: s.roman,
    explanation: s.note,
  };
}

export function translateExercise(s: Sentence): Exercise {
  const first = (s.words ?? tokens(s.roman))[0];
  return {
    id: nid("t"), kind: "type", skill: "grammar", ref: { t: "s", id: s.id },
    prompt: { en: "Say this in Kannada (type in roman letters)", hi: "इसे कन्नड़ में लिखिए (रोमन अक्षरों में)" },
    source: { en: s.en, hi: s.hi }, answer: s.roman.replace(/[.!]$/, ""), acceptable: s.alternatives ?? [],
    kn: s.kn, hint: first, explanation: s.note,
  };
}

export function speakExercise(x: { kn: string; roman: string; en: string; hi: string }, ref?: Ref): Exercise {
  return { id: nid("sp"), kind: "speak", skill: "speaking", ref, kn: x.kn, roman: x.roman, en: x.en, hi: x.hi };
}

export function questionToExercise(q: Question): Exercise {
  if (q.type === "build" && q.words) {
    const pieces = shuffle(q.words.map((w) => ({ roman: w })));
    return { id: nid("boss"), kind: "build", skill: q.skill, prompt: q.prompt, pieces, answer: q.words, kn: q.kn ?? "", roman: q.answer, explanation: q.explanation };
  }
  if (q.type === "typein" || q.type === "translate") {
    return { id: nid("boss"), kind: "type", skill: q.skill, prompt: q.prompt, answer: q.answer, acceptable: q.acceptable ?? [], kn: q.kn, explanation: q.explanation };
  }
  return {
    id: nid("boss"), kind: "mcq", skill: q.skill, prompt: q.prompt, kn: q.kn, roman: q.roman,
    audioOnly: q.type === "listen",
    options: shuffle(q.options ?? [q.answer]).map((label) => ({ label })), answer: q.answer, explanation: q.explanation,
  };
}

/* ---------------- retry / similar question ---------------- */

export function similarExercise(ex: Exercise, lang: Lang): Exercise | null {
  if (!ex.ref) return null;
  if (ex.ref.t === "v") {
    const v = VOCAB_INDEX.get(ex.ref.id);
    if (!v) return null;
    const pool = vocabUpTo(Math.max(v.day, 7));
    const next = ex.kind === "mcq" && ex.options[0]?.kn ? vocabMeaningMCQ(v, pool, lang) : vocabReverseMCQ(v, pool, lang);
    return { ...next, retry: true };
  }
  const s = SENTENCE_INDEX.get(ex.ref.id);
  if (!s) return null;
  const pool = sentencesUpTo(Math.max(s.day, 7));
  const next = ex.kind === "build" ? sentenceMeaningMCQ(s, pool, lang) : buildExercise(s) ?? sentenceMeaningMCQ(s, pool, lang);
  return { ...next, retry: true };
}

/* ---------------- session ---------------- */

export function buildSession(day: DayLesson, ctx: SessionCtx): Step[] {
  const plan = day.plan ?? DEFAULT_PLAN;
  const scale = goalScale(ctx.goalMinutes);
  const count = (st: StepType) => Math.max(1, Math.round((BASE_COUNTS[st] ?? 1) * scale * (day.emphasis?.[st] ?? 1)));
  const { lang, review } = ctx;

  const pool = poolForDay(day);
  const ownVocab = day.vocab;
  const vocabPool = pool.vocab.length >= 4 ? pool.vocab : vocabUpTo(Math.max(day.day, 3));
  const sentPool = pool.sentences.length >= 3 ? pool.sentences : sentencesUpTo(day.day);
  const distractorPool = vocabUpTo(Math.max(day.day, 7));
  const sentDistractors = sentencesUpTo(Math.max(day.day, 7));
  const prevVocab = vocabUpTo(day.day - 1);
  const prevSent = sentencesUpTo(day.day - 1);

  const vKey = (v: VocabItem) => `v:${v.id}`;
  const sKey = (s: Sentence) => `s:${s.id}`;

  const steps: Step[] = [];
  for (const st of plan) {
    const exs: Exercise[] = [];
    switch (st) {
      case "warmup": {
        if (prevVocab.length < 3) break;
        const n = count("warmup");
        const vs = weightedPick(prevVocab, vKey, Math.ceil(n * 0.7), review);
        vs.forEach((v, i) => exs.push(i % 2 ? vocabReverseMCQ(v, distractorPool, lang) : vocabMeaningMCQ(v, distractorPool, lang)));
        if (prevSent.length >= 4) weightedPick(prevSent, sKey, n - vs.length, review).forEach((s) => exs.push(sentenceMeaningMCQ(s, sentDistractors, lang)));
        break;
      }
      case "words": {
        const cap = ctx.goalMinutes <= 10 ? 8 : 15;
        ownVocab.slice(0, cap).forEach((v) => exs.push({ id: nid("card"), kind: "card", skill: "vocabulary", ref: { t: "v", id: v.id }, vocab: v }));
        // quick check on 3 of today's new words
        sample(ownVocab.slice(0, cap), Math.min(3, ownVocab.length)).forEach((v) => exs.push(vocabMeaningMCQ(v, distractorPool, lang)));
        break;
      }
      case "learn":
        exs.push({ id: nid("concept"), kind: "concept", skill: "grammar" });
        break;
      case "listen": {
        const n = count("listen");
        const vs = weightedPick(vocabPool, vKey, Math.ceil(n / 2), review);
        const ss = weightedPick(sentPool, sKey, n - vs.length, review);
        vs.forEach((v) => exs.push(vocabMeaningMCQ(v, distractorPool, lang, true)));
        ss.forEach((s) => exs.push(sentenceMeaningMCQ(s, sentDistractors, lang, true)));
        break;
      }
      case "speak": {
        const n = count("speak");
        const ss = weightedPick(sentPool, sKey, n, review);
        ss.forEach((s) => exs.push(speakExercise(s, { t: "s", id: s.id })));
        if (exs.length < n) weightedPick(vocabPool, vKey, n - exs.length, review).forEach((v) => exs.push(speakExercise(v, { t: "v", id: v.id })));
        break;
      }
      case "build": {
        const n = count("build");
        const ss = weightedPick(sentPool.filter((s) => (s.words ?? tokens(s.roman)).length >= 2), sKey, n, review);
        ss.forEach((s) => { const b = buildExercise(s); if (b) exs.push(b); });
        break;
      }
      case "translate": {
        const n = count("translate");
        const ss = weightedPick(sentPool, sKey, n, review);
        if (day.translateMode === "from-kn") ss.forEach((s) => exs.push(sentenceMeaningMCQ(s, sentDistractors, lang)));
        else ss.forEach((s) => exs.push(translateExercise(s)));
        break;
      }
      case "conversation": {
        exs.push({ id: nid("conv"), kind: "conversation", skill: "conversation", conv: day.conversation });
        if (day.type !== "lesson" || day.extraConversations) (day.extraConversations ?? []).forEach((c) => exs.push({ id: nid("conv"), kind: "conversation", skill: "conversation", conv: c }));
        break;
      }
      case "boss":
        exs.push(questionToExercise(day.bossQuestion));
        break;
      case "result":
      case "intro":
        break;
    }
    if (exs.length || st === "result") steps.push({ type: st, title: STEP_TITLES[st], exercises: exs });
  }
  return steps;
}

/** A 10-minute revision built from weak and due items. */
export function buildRevision(ctx: SessionCtx, size = 15): Exercise[] {
  const maxDay = Math.max(1, ctx.maxDayDone);
  const vocab = vocabUpTo(maxDay);
  const sents = sentencesUpTo(maxDay);
  const seenV = vocab.filter((v) => ctx.review[`v:${v.id}`]);
  const seenS = sents.filter((s) => ctx.review[`s:${s.id}`]);
  const vPool = seenV.length >= 4 ? seenV : vocab;
  const sPool = seenS.length >= 3 ? seenS : sents;
  const vs = weightedPick(vPool, (v) => `v:${v.id}`, Math.ceil(size * 0.6), ctx.review);
  const ss = weightedPick(sPool, (s) => `s:${s.id}`, size - vs.length, ctx.review);
  const out: Exercise[] = [];
  vs.forEach((v, i) => out.push(i % 3 === 0 ? vocabMeaningMCQ(v, vocab, ctx.lang, true) : i % 3 === 1 ? vocabReverseMCQ(v, vocab, ctx.lang) : vocabMeaningMCQ(v, vocab, ctx.lang)));
  ss.forEach((s, i) => { const b = i % 2 ? buildExercise(s) : null; out.push(b ?? sentenceMeaningMCQ(s, sents, ctx.lang, i % 3 === 0)); });
  return shuffle(out);
}

/** Exercises for a set of specific review keys (e.g. from the mistake notebook). */
export function buildFromKeys(keys: string[], ctx: SessionCtx): Exercise[] {
  const vocabAll = vocabUpTo(30);
  const sentAll = sentencesUpTo(30);
  const out: Exercise[] = [];
  for (const k of keys) {
    const [t, id] = [k.slice(0, 1), k.slice(2)];
    if (t === "v") { const v = VOCAB_INDEX.get(id); if (v) out.push(vocabReverseMCQ(v, vocabAll, ctx.lang)); }
    else { const s = SENTENCE_INDEX.get(id); if (s) out.push(buildExercise(s) ?? sentenceMeaningMCQ(s, sentAll, ctx.lang)); }
  }
  return out;
}

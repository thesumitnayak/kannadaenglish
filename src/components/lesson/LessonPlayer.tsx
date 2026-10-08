"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Concept, Skill } from "@/content/types";
import { similarExercise, type Exercise, type Step } from "@/lib/engine/session";
import { useStore } from "@/lib/store";
import { useT, useLang, resolveScript } from "@/lib/hooks";
import { statusOf } from "@/lib/engine/srs";
import { XP } from "@/content/levels";
import { ProgressBar } from "@/components/ui/Progress";
import { FeedbackBar, type Feedback } from "./FeedbackBar";
import { VocabCardView, MCQView, BuildView, TypeView, SpeakView, type Answer } from "./Exercises";
import { ConceptView } from "./ConceptView";
import { ConversationView, type ConvoOutcome } from "./ConversationView";
import { ALMOST, PRAISE, pick } from "./messages";
import { cn } from "@/lib/cn";

export interface SessionSummary {
  xp: number;
  correct: number;
  total: number;
  perfect: boolean;
  wordsLearned: number;
  sentences: number;
  speakingScore: number;   // -1 when none
  listeningScore: number;  // -1 when none
  seconds: number;
  bySkill: Partial<Record<Skill, { correct: number; total: number }>>;
}

interface Item { step: number; ex: Exercise }

export function LessonPlayer({ steps, concept, scriptDay, onFinish, onExit, label }: {
  steps: Step[]; concept?: Concept; scriptDay: number; label: string;
  onFinish: (s: SessionSummary) => void; onExit: () => void;
}) {
  const t = useT();
  const lang = useLang();
  const pref = useStore((s) => s.settings.script);
  const review = useStore((s) => s.review);
  const recordAnswer = useStore((s) => s.recordAnswer);
  const recordMistake = useStore((s) => s.recordMistake);
  const recordSpeaking = useStore((s) => s.recordSpeaking);
  const introduce = useStore((s) => s.introduce);
  const addXp = useStore((s) => s.addXp);
  const bump = useStore((s) => s.bump);
  const mode = resolveScript(pref, scriptDay);

  const initial = useMemo<Item[]>(() => steps.flatMap((st, i) => st.exercises.map((ex) => ({ step: i, ex }))), [steps]);
  const [queue, setQueue] = useState<Item[]>(initial);
  const [idx, setIdx] = useState(0);
  const [fb, setFb] = useState<Feedback | null>(null);
  const [startedAt] = useState(() => Date.now());
  const stats = useRef({ xp: 0, correct: 0, total: 0, words: new Set<string>(), sents: new Set<string>(), speak: [] as number[], listen: { c: 0, n: 0 }, bySkill: {} as SessionSummary["bySkill"], start: startedAt, wrongFirst: 0 });
  const [confirmExit, setConfirmExit] = useState(false);

  const item = queue[idx];
  const done = idx >= queue.length;

  useEffect(() => {
    if (!done) return;
    const s = stats.current;
    onFinish({
      xp: s.xp, correct: s.correct, total: s.total, perfect: s.total > 0 && s.wrongFirst === 0,
      wordsLearned: s.words.size, sentences: s.sents.size,
      speakingScore: s.speak.length ? s.speak.reduce((a, b) => a + b, 0) / s.speak.length : -1,
      listeningScore: s.listen.n ? s.listen.c / s.listen.n : -1,
      seconds: Math.round((Date.now() - s.start) / 1000), bySkill: s.bySkill,
    });
  }, [done, onFinish]);

  if (done || !item) return <div className="flex min-h-dvh items-center justify-center text-4xl animate-float">🎉</div>;

  const ex = item.ex;
  const step = steps[item.step];
  const key = ex.ref ? `${ex.ref.t}:${ex.ref.id}` : undefined;
  const familiar = key ? (review[key] ? statusOf(review[key]) === "mastered" : false) : false;

  const tally = (skill: Skill, ok: boolean) => {
    const s = stats.current;
    s.total += 1; if (ok) s.correct += 1;
    const b = s.bySkill[skill] ?? { correct: 0, total: 0 };
    s.bySkill[skill] = { correct: b.correct + (ok ? 1 : 0), total: b.total + 1 };
    if (skill === "listening") { s.listen.n += 1; if (ok) s.listen.c += 1; }
  };

  const gain = (n: number, why: string) => { stats.current.xp += n; addXp(n, why); };

  const next = () => { setFb(null); setIdx((i) => i + 1); };

  const handleAnswer = (a: Answer) => {
    if (ex.kind !== "mcq" && ex.kind !== "build" && ex.kind !== "type" && ex.kind !== "speak") return;
    tally(ex.skill, a.ok);
    recordAnswer({ key, skill: ex.kind === "speak" ? "speaking" : ex.skill, ok: a.ok, perfect: a.perfect });
    if (a.ok && key?.startsWith("s:")) stats.current.sents.add(key);
    if (key?.startsWith("v:")) stats.current.words.add(key);

    if (ex.kind === "speak") {
      const sc = a.speechScore ?? 0;
      stats.current.speak.push(sc);
      recordSpeaking({ at: Date.now(), target: ex.roman, heard: a.heard ?? "", score: sc, mode: a.mode ?? "self" });
      const xp = Math.round(XP.speaking * Math.max(0.4, sc));
      gain(xp, "Speaking");
      setFb({ ok: true, title: sc >= 0.75 ? pick(PRAISE) : { en: "Good effort! Speaking gets easier every time.", hi: "अच्छी कोशिश! हर बार बोलना आसान होगा।" }, xp });
      return;
    }

    if (ex.kind === "build" && a.ok) bump("sentencesBuilt");

    if (a.ok) {
      const xp = a.perfect ? XP.perfect : XP.correct;
      gain(xp, "Correct answer");
      setFb({ ok: true, title: pick(PRAISE), xp, correctKn: ex.kind === "mcq" ? ex.correctKn : ex.kind === "build" ? ex.kn : ex.kn, correctRoman: ex.kind === "mcq" ? ex.correctRoman : ex.kind === "build" ? ex.roman : ex.answer });
      return;
    }

    // Wrong: never "Wrong." — say "Almost!", show the answer, explain, retry a similar one.
    if (!ex.retry) stats.current.wrongFirst += 1;
    const correct = ex.kind === "mcq" ? ex.answer : ex.kind === "build" ? ex.answer.join(" ") : ex.answer;
    const correctKn = ex.kind === "mcq" ? ex.correctKn : ex.kn;
    const promptText = ex.kind === "type" && ex.source ? (lang === "hi" ? ex.source.hi : ex.source.en) : ex.kind === "build" ? t(ex.prompt) : ex.kind === "mcq" ? `${t(ex.prompt)}${ex.roman ? ` — ${ex.roman}` : ""}` : "";
    recordMistake({
      day: scriptDay, key, prompt: promptText, given: a.given, correct, correctKn,
      reason: ex.explanation ? t(ex.explanation) : ex.kind === "build" ? t({ en: "Word order: Kannada puts the verb at the end, like Hindi.", hi: "शब्द-क्रम: कन्नड़ में क्रिया अंत में आती है, हिंदी की तरह।" }) : undefined,
    });
    const sim = !ex.retry ? similarExercise(ex, lang) : null;
    if (sim) setQueue((q) => [...q.slice(0, idx + 1), { step: item.step, ex: sim }, ...q.slice(idx + 1)]);
    setFb({
      ok: false, title: pick(ALMOST), correct, correctKn,
      correctRoman: ex.kind === "mcq" ? ex.correctRoman : ex.kind === "build" ? ex.roman : ex.answer,
      why: ex.explanation, willRetry: !!sim,
    });
  };

  const onConvoDone = (o: ConvoOutcome) => {
    const ok = o.prompts === 0 || o.firstTry / o.prompts >= 0.5;
    tally("conversation", ok);
    recordAnswer({ skill: "conversation", ok });
    for (const w of o.wrong) recordMistake({ day: scriptDay, prompt: w.prompt, given: w.given, correct: w.correct, correctKn: w.correctKn, reason: w.why });
    if (o.wrong.length) stats.current.wrongFirst += o.wrong.length;
    bump("conversations");
    gain(XP.conversation + o.firstTry * 5, "Conversation completed");
    next();
  };

  const progress = (idx / queue.length) * 100;

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pb-40 pt-4">
      <div className="sticky top-0 z-20 -mx-5 mb-5 bg-cream/95 px-5 pb-3 pt-1 backdrop-blur">
        <div className="flex items-center gap-3">
          <button aria-label="Exit" onClick={() => setConfirmExit(true)} className="rounded-xl p-1.5 text-ink-3 hover:bg-cream-2"><X size={24} /></button>
          <ProgressBar value={progress} className="flex-1" color="bg-leaf" height="h-3.5" />
          <span className="text-sm font-black tabular-nums text-ink-3">{idx + 1}/{queue.length}</span>
        </div>
        <div className="no-scrollbar mt-2.5 flex gap-1.5 overflow-x-auto">
          {steps.filter((s) => s.type !== "result").map((s, i) => (
            <span key={i} className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide",
              i === item.step ? "bg-ink text-cream" : i < item.step ? "bg-leaf-2 text-leaf" : "bg-cream-2 text-ink-3")}>{t(s.title)}</span>
          ))}
          <span className="ml-auto shrink-0 self-center pl-2 text-[11px] font-black uppercase tracking-wide text-ink-3">{label}</span>
        </div>
      </div>

      {ex.retry && !fb && <div className="mb-3 inline-flex self-start rounded-full bg-marigold-3 px-3 py-1 text-xs font-black text-[#8a6200]">🔁 {t({ en: "One more and you've got it", hi: "एक और, फिर पक्का" })}</div>}

      <div key={ex.id} className="flex flex-1 flex-col animate-rise">
        {ex.kind === "card" && <VocabCardView ex={ex} mode={mode} onDone={() => { introduce([`v:${ex.vocab.id}`]); stats.current.words.add(`v:${ex.vocab.id}`); next(); }} />}
        {ex.kind === "concept" && concept && <ConceptView concept={concept} onDone={next} />}
        {ex.kind === "mcq" && <MCQView ex={ex} mode={mode} familiar={familiar} locked={!!fb} onAnswer={handleAnswer} />}
        {ex.kind === "build" && <BuildView ex={ex} mode={mode} locked={!!fb} onAnswer={handleAnswer} />}
        {ex.kind === "type" && <TypeView ex={ex} locked={!!fb} onAnswer={handleAnswer} />}
        {ex.kind === "speak" && <SpeakView ex={ex} mode={mode} locked={!!fb} onAnswer={handleAnswer} />}
        {ex.kind === "conversation" && <ConversationView conv={ex.conv} mode={mode} onDone={onConvoDone} />}
      </div>

      {step?.type === "boss" && !fb && <div className="mt-4 rounded-2xl bg-ink p-3 text-center text-sm font-black text-marigold-2">👑 {t({ en: "Boss question: worth double XP", hi: "बॉस सवाल: दोगुना XP" })}</div>}

      {fb && <FeedbackBar fb={fb} onNext={next} />}

      {confirmExit && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center" onClick={() => setConfirmExit(false)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl">🥺</div>
            <h3 className="mt-2 text-xl font-black">{t({ en: "Leave this lesson?", hi: "पाठ छोड़ें?" })}</h3>
            <p className="mt-1 font-semibold text-ink-3">{t({ en: "XP you've earned is kept. Lesson progress won't be saved.", hi: "कमाया XP बचा रहेगा। पाठ की प्रगति सेव नहीं होगी।" })}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button onClick={onExit} className="h-12 rounded-2xl font-extrabold text-brick hover:bg-brick-3">{t({ en: "Leave", hi: "छोड़ें" })}</button>
              <button onClick={() => setConfirmExit(false)} className="h-12 rounded-2xl bg-marigold font-extrabold">{t({ en: "Keep going", hi: "जारी रखें" })}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

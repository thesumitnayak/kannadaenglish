"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { SessionSummary } from "./LessonPlayer";
import type { DayLesson } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/hooks";
import { weekResults, avg } from "@/lib/stats";
import { TOTAL_DAYS } from "@/content/course";

function Stat({ emoji, label, value, tone = "bg-white" }: { emoji: string; label: string; value: string; tone?: string }) {
  return (
    <div className={`rounded-2xl p-4 shadow-card ${tone}`}>
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-2xl font-black tabular-nums">{value}</div>
      <div className="text-xs font-bold uppercase tracking-wider text-ink-3">{label}</div>
    </div>
  );
}

export function DayResult({ lesson, summary, bonus }: { lesson: DayLesson; summary: SessionSummary; bonus: number }) {
  const t = useT();
  const streak = useStore((s) => s.streak.current);
  const results = useStore((s) => s.results);
  const pct = (n: number) => (n < 0 ? "—" : `${Math.round(n * 100)}%`);
  const acc = summary.total ? summary.correct / summary.total : 1;
  const weekEnd = lesson.day % 7 === 0 && lesson.day < 30;
  const week = Math.ceil(lesson.day / 7);
  const wk = weekEnd ? weekResults(results, week) : [];
  const isFinal = lesson.day === TOTAL_DAYS;
  const headline = isFinal ? { en: "30 DAYS COMPLETE 👑", hi: "30 दिन पूरे 👑" }
    : weekEnd ? { en: `WEEK ${week} COMPLETED 🎉`, hi: `हफ्ता ${week} पूरा 🎉` }
    : { en: `Day ${lesson.day} complete! 🔥`, hi: `Day ${lesson.day} पूरा! 🔥` };
  const sub = acc >= 0.9 ? { en: "Outstanding. You're starting to sound like a Bengaluru local 😎", hi: "शानदार। आप बेंगलुरु लोकल जैसे लगने लगे हैं 😎" }
    : acc >= 0.7 ? { en: "Your Kannada is improving every day.", hi: "आपकी कन्नड़ हर दिन बेहतर हो रही है।" }
    : { en: "Every mistake is now in your review deck. Tomorrow it'll be easier.", hi: "हर गलती अब आपकी review में है। कल आसान होगा।" };

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pb-10 pt-8">
      <div className="text-center animate-pop">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-marigold text-5xl shadow-[0_6px_0_0_#c98f00] animate-float">{isFinal ? "👑" : weekEnd ? "🏆" : lesson.emoji}</div>
        <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">{t(headline)}</h1>
        <p className="mt-2 font-semibold text-ink-2">{t(sub)}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat emoji="⭐" label={t({ en: "XP earned", hi: "XP कमाए" })} value={`+${summary.xp + bonus}`} tone="bg-marigold-3" />
        <Stat emoji="🎯" label={t({ en: "Accuracy", hi: "सटीकता" })} value={pct(acc)} />
        <Stat emoji="📚" label={t({ en: "Words", hi: "शब्द" })} value={String(summary.wordsLearned)} />
        <Stat emoji="💬" label={t({ en: "Sentences mastered", hi: "वाक्य पक्के" })} value={String(summary.sentences)} />
        <Stat emoji="🎤" label={t({ en: "Speaking", hi: "बोलना" })} value={pct(summary.speakingScore)} />
        <Stat emoji="🔥" label={t({ en: "Streak", hi: "लय" })} value={`${streak} ${t({ en: "days", hi: "दिन" })}`} tone="bg-brick-3" />
      </div>
      {summary.perfect && <div className="mt-4 rounded-2xl bg-leaf-2 p-4 text-center font-black text-leaf">💎 {t({ en: "Perfect lesson! +150 XP bonus", hi: "परफ़ेक्ट पाठ! +150 XP बोनस" })}</div>}

      {weekEnd && (
        <div className="mt-6 rounded-3xl bg-ink p-5 text-cream">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cream/60">{t({ en: `Week ${week} summary`, hi: `हफ्ता ${week} सारांश` })}</div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-bold sm:grid-cols-3">
            <div><div className="text-2xl font-black">{wk.reduce((a, r) => a + r.wordsLearned, 0)}</div>{t({ en: "Vocabulary learned", hi: "शब्द सीखे" })}</div>
            <div><div className="text-2xl font-black">{wk.reduce((a, r) => a + r.sentences, 0)}</div>{t({ en: "Sentences learned", hi: "वाक्य सीखे" })}</div>
            <div><div className="text-2xl font-black">{wk.reduce((a, r) => a + r.xp, 0)}</div>XP</div>
            <div><div className="text-2xl font-black">{pct(avg(wk.map((r) => r.accuracy)))}</div>{t({ en: "Accuracy", hi: "सटीकता" })}</div>
            <div><div className="text-2xl font-black">{pct(avg(wk.map((r) => r.listeningScore)))}</div>{t({ en: "Listening", hi: "सुनना" })}</div>
            <div><div className="text-2xl font-black">{pct(avg(wk.map((r) => r.speakingScore)))}</div>{t({ en: "Speaking", hi: "बोलना" })}</div>
          </div>
          <Link href={`/report/${week}`}><Button className="mt-4" block>{t({ en: "Full weekly report", hi: "पूरी साप्ताहिक रिपोर्ट" })} <ArrowRight size={18} /></Button></Link>
        </div>
      )}

      <div className="mt-auto space-y-2.5 pt-8">
        {isFinal ? (
          <Link href="/score"><Button size="xl" block>{t({ en: "See my Kannada score", hi: "मेरा कन्नड़ स्कोर देखें" })} <ArrowRight /></Button></Link>
        ) : (
          <Link href={`/learn/${lesson.day + 1}`}><Button size="xl" block>{t({ en: `Next: Day ${lesson.day + 1}`, hi: `अगला: Day ${lesson.day + 1}` })} <ArrowRight /></Button></Link>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          <Link href="/"><Button variant="secondary" block>{t({ en: "Home", hi: "होम" })}</Button></Link>
          <Button variant="secondary" block onClick={() => window.location.reload()}><RotateCcw size={16} /> {t({ en: "Redo", hi: "दोबारा" })}</Button>
        </div>
      </div>
    </div>
  );
}

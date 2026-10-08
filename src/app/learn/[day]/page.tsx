"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Lock, Play, Clock } from "lucide-react";
import { getDay } from "@/content/course";
import { buildSession } from "@/lib/engine/session";
import { useStore } from "@/lib/store";
import { useT, resolveScript } from "@/lib/hooks";
import { XP } from "@/content/levels";
import { LessonPlayer, type SessionSummary } from "@/components/lesson/LessonPlayer";
import { DayResult } from "@/components/lesson/DayResult";
import { Button } from "@/components/ui/Button";
import { STEP_TITLES } from "@/lib/engine/session";

export default function LessonPage() {
  const { day: dayParam } = useParams<{ day: string }>();
  const router = useRouter();
  const t = useT();
  const day = Number(dayParam);
  const lesson = getDay(day);
  const s = useStore();
  const [started, setStarted] = useState(false);
  const [summary, setSummary] = useState<{ sum: SessionSummary; bonus: number } | null>(null);
  const [seed, setSeed] = useState(0);

  const steps = useMemo(() => (lesson && started ? buildSession(lesson, {
    lang: s.settings.explainLang, goalMinutes: s.profile.goalMinutes, review: useStore.getState().review,
    maxDayDone: Math.max(0, ...Object.keys(s.results).map(Number)),
  }) : []),
  // build once per start; review changes during the session must not rebuild it
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [lesson, started, seed]);

  const finish = useCallback((sum: SessionSummary) => {
    const st = useStore.getState();
    let bonus = XP.dayComplete;
    st.addXp(XP.dayComplete, `Day ${day} complete`);
    if (sum.perfect) { bonus += XP.perfectLesson; st.addXp(XP.perfectLesson, "Perfect lesson"); }
    if (resolveScript(st.settings.script, day) === "kannada") st.bump("noEnglish");
    st.logActivity({ seconds: sum.seconds });
    st.completeDay({
      day, xp: sum.xp + bonus, accuracy: sum.total ? sum.correct / sum.total : 1, correct: sum.correct, total: sum.total,
      wordsLearned: sum.wordsLearned, sentences: sum.sentences, speakingScore: sum.speakingScore, listeningScore: sum.listeningScore, perfect: sum.perfect,
    });
    setSummary({ sum, bonus });
  }, [day]);

  if (!lesson) {
    return <div className="p-10 text-center"><p className="font-bold">Day not found.</p><Link href="/learn" className="text-sky underline">Back to journey</Link></div>;
  }

  if (summary) return <DayResult lesson={lesson} summary={summary.sum} bonus={summary.bonus} />;

  const locked = day > s.unlockedThrough;
  if (!started) {
    const plan = lesson.plan ?? ["warmup", "words", "learn", "listen", "speak", "build", "translate", "conversation", "boss", "result"];
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 pb-8 pt-6">
        <Link href="/learn" className="text-sm font-extrabold text-ink-3">← {t({ en: "Journey", hi: "यात्रा" })}</Link>
        <div className="mt-6 text-center animate-pop">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-5xl shadow-card">{lesson.emoji}</div>
          <div className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-ink-3">Day {lesson.day} · {t({ en: "Week", hi: "हफ्ता" })} {lesson.week}{lesson.type !== "lesson" ? ` · ${lesson.type === "final" ? "FINAL BOSS" : lesson.type === "boss" ? "BOSS" : t({ en: "REVISION", hi: "दोहराई" })}` : ""}</div>
          <h1 className="mt-1 text-3xl font-black tracking-tight">{t(lesson.title)}</h1>
          <p className="mt-2 font-semibold text-ink-2">{t(lesson.subtitle)}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cream-2 px-3 py-1 text-sm font-bold text-ink-2"><Clock size={14} /> ~{Math.round(lesson.minutes * (s.profile.goalMinutes / 20))} min</div>
        </div>
        <div className="mt-8 space-y-2">
          {plan.filter((p) => p !== "result").map((p, i) => (
            <div key={p} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 font-bold shadow-card">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cream-2 text-xs font-black">{i + 1}</span>{t(STEP_TITLES[p])}
            </div>
          ))}
        </div>
        {s.results[day] && <div className="mt-4 text-center text-sm font-bold text-leaf">✅ {t({ en: "Completed before. Replaying still earns XP and review.", hi: "पहले पूरा किया। दोबारा करने पर भी XP और review मिलेगा।" })}</div>}
        <div className="mt-auto pt-8">
          {locked ? (
            <Button size="xl" block disabled><Lock size={20} /> {t({ en: `Finish Day ${s.unlockedThrough} to unlock`, hi: `खोलने के लिए Day ${s.unlockedThrough} पूरा करें` })}</Button>
          ) : (
            <Button size="xl" block onClick={() => { setSeed(seed + 1); setStarted(true); }}><Play size={20} fill="currentColor" /> {t({ en: "Start lesson", hi: "पाठ शुरू करें" })}</Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <LessonPlayer key={seed} steps={steps} concept={lesson.concept} scriptDay={day} label={`Day ${day}`}
      onFinish={finish} onExit={() => router.push("/learn")} />
  );
}

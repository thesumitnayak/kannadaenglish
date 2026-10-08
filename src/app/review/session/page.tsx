"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { buildRevision, buildFromKeys, type Step } from "@/lib/engine/session";
import { useStore } from "@/lib/store";
import { useT, useLearnerDay } from "@/lib/hooks";
import { LessonPlayer, type SessionSummary } from "@/components/lesson/LessonPlayer";
import { Button } from "@/components/ui/Button";

function Session() {
  const params = useSearchParams();
  const router = useRouter();
  const t = useT();
  const mode = params.get("mode") === "mistakes" ? "mistakes" : "revision";
  const day = useLearnerDay();
  const [result, setResult] = useState<SessionSummary | null>(null);

  const steps = useMemo<Step[]>(() => {
    const st = useStore.getState();
    const ctx = { lang: st.settings.explainLang, goalMinutes: st.profile.goalMinutes, review: st.review, maxDayDone: Math.max(1, ...Object.keys(st.results).map(Number)) };
    const exs = mode === "mistakes"
      ? buildFromKeys([...new Set(st.mistakes.filter((m) => !m.reviewed && m.key).map((m) => m.key!))].slice(0, 15), ctx)
      : buildRevision(ctx, st.profile.goalMinutes <= 10 ? 10 : 15);
    return [{ type: "warmup", title: mode === "mistakes" ? { en: "Mistakes", hi: "गलतियाँ" } : { en: "Revision", hi: "दोहराई" }, exercises: exs }];
  }, [mode]);

  const finish = useCallback((s: SessionSummary) => {
    const st = useStore.getState();
    st.addXp(Math.round(s.total * 3), "Revision");
    st.bump("reviewSessions");
    st.logActivity({ seconds: s.seconds });
    st.touchStreak();
    if (mode === "mistakes") {
      const keys = new Set(steps[0].exercises.map((e) => (e.ref ? `${e.ref.t}:${e.ref.id}` : "")));
      for (const m of st.mistakes) if (!m.reviewed && m.key && keys.has(m.key) && st.review[m.key]?.reps > 0) st.markMistakeReviewed(m.id);
    }
    setResult(s);
  }, [mode, steps]);

  if (!steps[0].exercises.length) {
    return <div className="mx-auto max-w-md p-10 text-center"><div className="text-5xl">🎉</div><p className="mt-3 font-bold">{t({ en: "Nothing to review right now.", hi: "अभी दोहराने को कुछ नहीं।" })}</p><Link href="/review"><Button className="mt-5">{t({ en: "Back", hi: "वापस" })}</Button></Link></div>;
  }

  if (result) {
    const acc = result.total ? Math.round((result.correct / result.total) * 100) : 0;
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl animate-float">🧠</div>
        <h1 className="mt-4 text-3xl font-black">{t({ en: "Revision done!", hi: "दोहराई पूरी!" })}</h1>
        <p className="mt-2 font-semibold text-ink-2">{acc >= 80 ? t({ en: "Your memory is getting sharp.", hi: "आपकी याददाश्त तेज़ हो रही है।" }) : t({ en: "Missed words will come back sooner. That's how they stick.", hi: "छूटे शब्द जल्दी लौटेंगे। ऐसे ही याद होते हैं।" })}</p>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 shadow-card"><div className="text-2xl font-black">{acc}%</div><div className="text-xs font-bold text-ink-3">{t({ en: "Accuracy", hi: "सटीकता" })}</div></div>
          <div className="rounded-2xl bg-marigold-3 p-4 shadow-card"><div className="text-2xl font-black">+{result.xp + Math.round(result.total * 3)}</div><div className="text-xs font-bold text-ink-3">XP</div></div>
        </div>
        <Link href="/review" className="mt-8 w-full"><Button size="xl" block>{t({ en: "Done", hi: "हो गया" })}</Button></Link>
      </div>
    );
  }

  return <LessonPlayer steps={steps} scriptDay={day} label={mode === "mistakes" ? "Mistakes" : "Revision"} onFinish={finish} onExit={() => router.push("/review")} />;
}

export default function ReviewSessionPage() {
  return <Suspense fallback={null}><Session /></Suspense>;
}

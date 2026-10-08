"use client";

import Link from "next/link";
import { Lock, Check } from "lucide-react";
import { COURSE, WEEKS } from "@/content/course";
import { useStore } from "@/lib/store";
import { useT, useLearnerDay } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { ProgressBar } from "@/components/ui/Progress";

export default function LearnPage() {
  const t = useT();
  const results = useStore((s) => s.results);
  const unlocked = useStore((s) => s.unlockedThrough);
  const current = useLearnerDay();
  const done = Object.keys(results).length;

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight">{t({ en: "Your 30-day journey", hi: "आपकी 30 दिन की यात्रा" })}</h1>
      <p className="mt-1 font-semibold text-ink-3">{t({ en: "Absolute beginner → everyday Kannada speaker.", hi: "बिल्कुल नए → रोज़ की कन्नड़ बोलने वाले।" })}</p>
      <div className="mt-4 flex items-center gap-3"><ProgressBar value={(done / 30) * 100} className="flex-1" /><span className="font-black tabular-nums">{done}/30</span></div>

      <div className="mt-8 space-y-10">
        {WEEKS.map((w) => {
          const days = COURSE.filter((d) => d.week === w.week);
          return (
            <section key={w.week}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-xl">{w.emoji}</span>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-ink-3">{t({ en: "Week", hi: "हफ्ता" })} {w.week}</div>
                  <h2 className="text-xl font-black">{t(w.title)}</h2>
                </div>
                {results[w.week * 7] && <Link href={`/report/${w.week}`} className="ml-auto rounded-xl bg-plum-2 px-3 py-1.5 text-sm font-black text-plum">📊 {t({ en: "Report", hi: "रिपोर्ट" })}</Link>}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {days.map((d) => {
                  const isDone = !!results[d.day];
                  const isLocked = d.day > unlocked;
                  const isCurrent = d.day === current && !isDone;
                  const special = d.type !== "lesson";
                  return (
                    <Link key={d.day} href={isLocked ? "#" : `/learn/${d.day}`} aria-disabled={isLocked}
                      className={cn("group flex items-center gap-4 rounded-3xl border-2 p-4 transition",
                        isCurrent ? "border-marigold bg-white shadow-[0_4px_0_0_#f5b301]" : isDone ? "border-leaf/30 bg-leaf-2/50" : isLocked ? "border-line bg-cream-2/50 opacity-70" : "border-line bg-white hover:-translate-y-0.5",
                        special && !isLocked && !isDone && !isCurrent && "border-plum/30")}>
                      <div className={cn("relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl",
                        isDone ? "bg-leaf text-white" : isCurrent ? "bg-marigold" : special ? "bg-plum-2" : "bg-cream-2")}>
                        {isLocked ? <Lock size={20} className="text-ink-3" /> : isDone ? <Check size={26} strokeWidth={3.5} /> : d.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-ink-3">
                          Day {d.day}
                          {special && <span className="rounded-full bg-plum-2 px-1.5 py-0.5 text-[10px] text-plum">{d.type === "final" ? "👑 Final" : d.type === "boss" ? "🐉 Boss" : "🏆 Revision"}</span>}
                          {isCurrent && <span className="rounded-full bg-marigold px-1.5 py-0.5 text-[10px] text-ink">{t({ en: "Today", hi: "आज" })}</span>}
                        </div>
                        <div className="truncate text-[17px] font-black">{t(d.title)}</div>
                        <div className="truncate text-sm font-semibold text-ink-3">{isDone ? `${Math.round(results[d.day].accuracy * 100)}% · +${results[d.day].xp} XP` : t(d.subtitle)}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

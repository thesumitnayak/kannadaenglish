"use client";

import { ACHIEVEMENTS } from "@/content/achievements";
import { LEVELS, levelFor } from "@/content/levels";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/hooks";
import { ProgressBar } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";

export default function AchievementsPage() {
  const t = useT();
  const unlocked = useStore((s) => s.achievements);
  const xp = useStore((s) => s.xp);
  const lvl = levelFor(xp);
  const n = Object.keys(unlocked).length;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">🏆 {t({ en: "Achievements", hi: "उपलब्धियाँ" })}</h1>
        <p className="mt-1 font-semibold text-ink-3">{n}/{ACHIEVEMENTS.length} {t({ en: "unlocked", hi: "अनलॉक" })}</p>
        <ProgressBar value={(n / ACHIEVEMENTS.length) * 100} className="mt-3" />
      </div>
      <section>
        <h2 className="mb-3 text-xl font-black">{t({ en: "Levels", hi: "लेवल" })}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {LEVELS.map((l) => {
            const reached = xp >= l.minXp;
            const isCur = lvl.current.level === l.level;
            return (
              <div key={l.level} className={cn("flex items-center gap-3 rounded-2xl border-2 p-3", isCur ? "border-marigold bg-marigold-3" : reached ? "border-leaf/30 bg-leaf-2/50" : "border-line bg-white opacity-70")}>
                <span className="text-3xl">{l.emoji}</span>
                <div className="flex-1"><div className="text-xs font-black uppercase tracking-widest text-ink-3">Level {l.level}</div><div className="font-black">{l.title}</div></div>
                <div className="text-sm font-black tabular-nums text-ink-3">{l.minXp.toLocaleString()} XP</div>
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-black">{t({ en: "Badges", hi: "बैज" })}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a) => {
            const got = unlocked[a.id];
            return (
              <div key={a.id} className={cn("flex flex-col items-center rounded-3xl border p-4 text-center transition", got ? "border-marigold bg-white shadow-card animate-pop" : "border-line bg-cream-2/60")}>
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl text-3xl", got ? "bg-marigold-3" : "bg-white grayscale opacity-50")}>{a.emoji}</div>
                <div className="mt-2 font-black leading-tight">{t(a.title)}</div>
                <div className="mt-1 text-xs font-semibold text-ink-3">{t(a.description)}</div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-wider text-ink-3">{got ? new Date(got).toLocaleDateString() : `+${a.xp} XP`}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

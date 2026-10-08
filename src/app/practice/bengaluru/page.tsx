"use client";

import { useState } from "react";
import { SCENARIOS } from "@/content/scenarios";
import { useT, useScriptMode } from "@/lib/hooks";
import { AudioButton } from "@/components/ui/AudioButton";
import { FormalityBadge } from "@/components/ui/Badge";
import { Kn } from "@/components/ui/Kn";
import { cn } from "@/lib/cn";

export default function BengaluruMode() {
  const t = useT();
  const mode = useScriptMode();
  const [active, setActive] = useState(SCENARIOS[0].id);
  const sc = SCENARIOS.find((s) => s.id === active)!;
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight">🏙️ {t({ en: "Bengaluru Mode", hi: "बेंगलुरु मोड" })}</h1>
      <p className="mt-1 font-semibold text-ink-3">{t({ en: "The sentences you'll actually need, by place.", hi: "जगह के हिसाब से वे वाक्य जो सच में काम आएँगे।" })}</p>
      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {SCENARIOS.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)} className={cn("flex shrink-0 items-center gap-1.5 rounded-2xl border-2 px-3 py-2 text-sm font-extrabold transition", s.id === active ? "border-marigold bg-marigold-3" : "border-line bg-white")}>
            <span>{s.emoji}</span>{t(s.title)}
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-3xl bg-ink p-5 text-cream">
        <div className="text-3xl">{sc.emoji}</div>
        <h2 className="mt-1 text-2xl font-black">{t(sc.title)}</h2>
        <p className="font-semibold text-cream/70">{t(sc.description)}</p>
      </div>
      <div className="mt-4 space-y-2.5">
        {sc.sentences.map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-card">
            <AudioButton kn={s.kn} roman={s.roman} />
            <div className="min-w-0 flex-1">
              <Kn kn={s.kn} roman={s.roman} mode={mode} size="md" />
              <div className="mt-0.5 text-sm font-semibold text-ink-3">{s.en} · {s.hi}</div>
            </div>
            <FormalityBadge f={s.formality} />
          </div>
        ))}
      </div>
    </div>
  );
}

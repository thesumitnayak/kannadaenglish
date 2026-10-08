"use client";

import { useState } from "react";
import type { DailyPhrase as DP } from "@/content/types";
import { AudioButton } from "@/components/ui/AudioButton";
import { useT } from "@/lib/hooks";

export function DailyPhraseCard({ phrase }: { phrase: DP }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brick to-[#a8321f] p-5 text-white shadow-card">
      <div className="kn pointer-events-none absolute -bottom-8 -right-2 select-none text-[7rem] font-extrabold leading-none text-white/10">{phrase.kn.slice(0, 2)}</div>
      <div className="text-xs font-black uppercase tracking-[0.18em] text-white/70">{t({ en: "Phrase of the day", hi: "आज का वाक्यांश" })}</div>
      <div className="mt-2 flex items-start justify-between gap-3">
        <div>
          <div className="kn text-2xl font-bold">{phrase.kn}</div>
          <div className="text-lg font-black">{phrase.roman}</div>
          <div className="mt-1 font-semibold text-white/85">{t(phrase.meaning)}</div>
        </div>
        <AudioButton kn={phrase.kn} roman={phrase.roman} size="sm" />
      </div>
      <button onClick={() => setOpen(!open)} className="mt-3 text-sm font-extrabold text-white underline decoration-white/40 underline-offset-4">
        {open ? t({ en: "Hide example", hi: "उदाहरण छिपाएँ" }) : t({ en: "Example & mini conversation", hi: "उदाहरण और छोटी बातचीत" })}
      </button>
      {open && (
        <div className="mt-3 space-y-3 rounded-2xl bg-white/10 p-3 text-sm animate-rise">
          <div>
            <div className="kn font-semibold">{phrase.example.kn}</div>
            <div className="font-bold">{phrase.example.roman}</div>
            <div className="text-white/80">{t(phrase.example)}</div>
          </div>
          <div className="space-y-1.5 border-t border-white/15 pt-2">
            {phrase.mini.map((l, i) => (
              <div key={i} className="flex gap-2"><span className="font-black text-marigold-2">{l.speaker}:</span><span><span className="font-bold">{l.roman}</span> <span className="text-white/75">— {t(l)}</span></span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

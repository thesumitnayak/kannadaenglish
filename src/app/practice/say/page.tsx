"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SITUATIONS } from "@/content/whatToSay";
import { useT, useScriptMode } from "@/lib/hooks";
import { AudioButton } from "@/components/ui/AudioButton";
import { FormalityBadge } from "@/components/ui/Badge";
import { Kn } from "@/components/ui/Kn";
import { cn } from "@/lib/cn";

export default function WhatDoISay() {
  const t = useT();
  const mode = useScriptMode();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const cats = useMemo(() => [...new Set(SITUATIONS.map((s) => s.category))], []);
  const [cat, setCat] = useState<string | null>(null);
  const list = SITUATIONS.filter((s) => (!cat || s.category === cat) && (!q || `${s.situation.en} ${s.situation.hi} ${s.primary.en} ${s.primary.roman}`.toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight">🙋 {t({ en: "What do I say?", hi: "मैं क्या कहूँ?" })}</h1>
      <p className="mt-1 font-semibold text-ink-3">{t({ en: "Choose the situation. Get the natural phrase, plus formal and casual versions.", hi: "परिस्थिति चुनें। स्वाभाविक वाक्य पाएँ, साथ में formal और casual रूप।" })}</p>
      <div className="mt-4 flex items-center gap-2 rounded-2xl border-2 border-line bg-white px-3">
        <Search size={18} className="text-ink-3" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ en: "e.g. ask the driver to stop", hi: "जैसे: ड्राइवर को रोकने को कहना" })} className="h-12 flex-1 bg-transparent font-bold outline-none" />
      </div>
      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        <button onClick={() => setCat(null)} className={cn("shrink-0 rounded-xl px-3 py-1.5 text-sm font-extrabold", !cat ? "bg-ink text-cream" : "bg-white")}>{t({ en: "All", hi: "सब" })}</button>
        {cats.map((c) => <button key={c} onClick={() => setCat(c)} className={cn("shrink-0 rounded-xl px-3 py-1.5 text-sm font-extrabold", cat === c ? "bg-ink text-cream" : "bg-white")}>{c}</button>)}
      </div>
      <div className="mt-4 space-y-2.5">
        {list.map((s) => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} className="rounded-3xl border border-line bg-white shadow-card">
              <button onClick={() => setOpen(isOpen ? null : s.id)} className="flex w-full items-center gap-3 p-4 text-left">
                <span className="text-xs font-black text-ink-3">{s.category.split(" ")[0]}</span>
                <span className="flex-1 font-black">{t(s.situation)}</span>
                <span className="text-ink-3">{isOpen ? "▴" : "▾"}</span>
              </button>
              {isOpen && (
                <div className="border-t border-line p-4 animate-rise">
                  <div className="flex items-center gap-3 rounded-2xl bg-marigold-3 p-4">
                    <AudioButton kn={s.primary.kn} roman={s.primary.roman} />
                    <div className="min-w-0 flex-1">
                      <Kn kn={s.primary.kn} roman={s.primary.roman} mode={mode} size="lg" />
                      <div className="text-sm font-semibold text-ink-2">{s.primary.en} · {s.primary.hi}</div>
                    </div>
                    <FormalityBadge f={s.primary.formality} />
                  </div>
                  <div className="mt-3 text-xs font-black uppercase tracking-widest text-ink-3">{t({ en: "Natural alternatives", hi: "स्वाभाविक विकल्प" })}</div>
                  <div className="mt-2 space-y-2">
                    {s.alternatives.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-2xl bg-cream p-3">
                        <AudioButton kn={a.kn} roman={a.roman} size="sm" showSlow={false} />
                        <div className="min-w-0 flex-1"><div className="kn text-sm font-semibold text-ink-2">{a.kn}</div><div className="font-black">{a.roman}</div><div className="text-sm font-semibold text-ink-3">{a.en} · {a.hi}</div></div>
                        <FormalityBadge f={a.formality} />
                      </div>
                    ))}
                  </div>
                  {s.tip && <div className="mt-3 rounded-2xl bg-sky-2 p-3 text-sm font-bold text-ink-2">💡 {t(s.tip)}</div>}
                </div>
              )}
            </div>
          );
        })}
        {!list.length && <div className="rounded-3xl bg-white p-6 text-center font-bold text-ink-3">{t({ en: "No match. Try the Kannada Guru for anything else.", hi: "कोई मेल नहीं। बाकी के लिए Kannada Guru आज़माएँ।" })}</div>}
      </div>
    </div>
  );
}

"use client";

import type { Concept } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";
import { useT, useLang } from "@/lib/hooks";
import { useStore } from "@/lib/store";

export function ConceptView({ concept, onDone }: { concept: Concept; onDone: () => void }) {
  const t = useT();
  const lang = useLang();
  const setLang = useStore((s) => s.updateSettings);
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Learn", hi: "सीखें" })}</div>
        <div className="flex rounded-xl bg-cream-2 p-1 text-xs font-black">
          {(["en", "hi"] as const).map((l) => (
            <button key={l} onClick={() => setLang({ explainLang: l })} className={l === lang ? "rounded-lg bg-white px-2.5 py-1 shadow" : "px-2.5 py-1 text-ink-3"}>{l === "en" ? "English" : "हिंदी"}</button>
          ))}
        </div>
      </div>
      <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight">{t(concept.title)}</h2>
      <p className="mt-2 text-lg font-semibold text-ink-2">{t(concept.intro)}</p>
      <div className="mt-5 space-y-4">
        {concept.sections.map((sec, i) => (
          <div key={i} className="rounded-3xl border border-line bg-white p-5 shadow-card">
            <h3 className="text-lg font-black">{t(sec.heading)}</h3>
            <p className="mt-2 whitespace-pre-line font-semibold leading-relaxed text-ink-2">{t(sec.body)}</p>
            {sec.bridge && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-line">
                <div className="grid grid-cols-3 bg-plum-2 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-plum">
                  <span>ಕನ್ನಡ</span><span>हिंदी</span><span>English</span>
                </div>
                {sec.bridge.map((b, j) => (
                  <div key={j} className="grid grid-cols-3 items-center gap-1 border-t border-line px-3 py-2 text-sm">
                    <span><span className="kn block font-semibold">{b.kn}</span><span className="font-black">{b.roman}</span></span>
                    <span className="font-bold text-ink-2">{b.hi}</span>
                    <span className="font-bold text-ink-2">{b.en}</span>
                  </div>
                ))}
              </div>
            )}
            {sec.examples && (
              <div className="mt-4 space-y-2">
                {sec.examples.map((e, j) => (
                  <div key={j} className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-3">
                    <div><div className="kn font-semibold">{e.kn}</div><div className="font-black">{e.roman}</div><div className="text-sm font-semibold text-ink-3">{t(e)}</div></div>
                    <AudioButton kn={e.kn} roman={e.roman} size="sm" showSlow={false} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {concept.tip && <div className="rounded-3xl bg-marigold-3 p-4 font-bold text-ink-2">⭐ {t(concept.tip)}</div>}
      </div>
      <Button className="mt-6" size="xl" block onClick={onDone}>{t({ en: "I understand", hi: "समझ गया" })}</Button>
    </div>
  );
}

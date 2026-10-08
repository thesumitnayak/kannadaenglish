"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft, Sparkles } from "lucide-react";
import { searchPhrases, type Phrase } from "@/lib/ai/local";
import { aiAvailable, fetchTranslation, type AiTranslation } from "@/lib/ai/client";
import { useT } from "@/lib/hooks";
import { AudioButton } from "@/components/ui/AudioButton";
import { FormalityBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Formality } from "@/content/types";

export default function Translator() {
  const t = useT();
  const [text, setText] = useState("");
  const hits = useMemo<Phrase[]>(() => searchPhrases(text, 5), [text]);
  const [ai, setAi] = useState<AiTranslation | null>(null);
  const [aiOn, setAiOn] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => { aiAvailable().then(setAiOn); }, []);

  const askAi = async () => {
    setBusy(true);
    const r = await fetchTranslation(text.trim());
    setAi(r);
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-black tracking-tight">🔁 {t({ en: "Quick translator", hi: "झटपट अनुवाद" })}</h1>
      <p className="mt-1 font-semibold text-ink-3">{t({ en: "Type English, Hindi, roman Kannada or Kannada script. Known phrases answer instantly, offline.", hi: "अंग्रेज़ी, हिंदी, रोमन कन्नड़ या कन्नड़ लिपि लिखें। जाने-पहचाने वाक्य तुरंत, ऑफ़लाइन।" })}</p>
      <textarea value={text} onChange={(e) => { setText(e.target.value); setAi(null); }} rows={2} placeholder={t({ en: "I am going home.", hi: "मैं घर जा रहा हूँ।" })}
        className="mt-4 w-full resize-none rounded-3xl border-2 border-line bg-white p-4 text-lg font-bold outline-none focus:border-sky" />
      {hits.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {hits.map((h, i) => (
            <div key={i} className={`rounded-3xl border bg-white p-4 shadow-card ${i === 0 ? "border-marigold" : "border-line"}`}>
              <div className="flex items-start gap-3">
                <AudioButton kn={h.kn} roman={h.roman} />
                <div className="min-w-0 flex-1">
                  <div className="kn text-2xl font-bold">{h.kn}</div>
                  <div className="text-lg font-black">{h.roman}</div>
                  <div className="font-semibold text-ink-2">{h.en}</div>
                  <div className="font-semibold text-ink-3">{h.hi}</div>
                  {h.note && <div className="mt-1 text-sm font-semibold text-ink-2">💡 {h.note}</div>}
                </div>
                <div className="flex flex-col items-end gap-1"><FormalityBadge f={h.formality as Formality} /><span className="text-[10px] font-black uppercase tracking-wider text-ink-3">{h.source}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {text.trim().length > 1 && (
        <div className="mt-4">
          {aiOn ? (
            <Button variant="dark" block size="lg" onClick={askAi} disabled={busy}><Sparkles size={18} /> {busy ? t({ en: "Translating…", hi: "अनुवाद हो रहा है…" }) : hits.length ? t({ en: "Not quite it? Ask the AI translator", hi: "सही नहीं? AI अनुवादक से पूछें" }) : t({ en: "Translate with AI", hi: "AI से अनुवाद करें" })}</Button>
          ) : !hits.length ? (
            <div className="rounded-2xl bg-cream-2 p-4 text-sm font-bold text-ink-2">{t({ en: "No match in the course phrasebook. Add an ANTHROPIC_API_KEY to enable free-form AI translation.", hi: "कोर्स की phrasebook में मेल नहीं। free-form AI अनुवाद के लिए ANTHROPIC_API_KEY जोड़ें।" })}</div>
          ) : null}
        </div>
      )}
      {ai && (
        <div className="mt-4 rounded-3xl border-2 border-plum/30 bg-white p-5 shadow-card animate-pop">
          <div className="flex items-start gap-3">
            <AudioButton kn={ai.kn} roman={ai.roman} />
            <div className="min-w-0 flex-1">
              <div className="kn text-2xl font-bold">{ai.kn}</div>
              <div className="text-lg font-black">{ai.roman}</div>
              <div className="font-semibold text-ink-2">{ai.en}</div>
              <div className="font-semibold text-ink-3">{ai.hi}</div>
            </div>
            <FormalityBadge f={ai.formality as Formality} />
          </div>
          <div className="mt-3 rounded-2xl bg-cream p-3 text-sm"><span className="font-black">🔈 {t({ en: "Pronunciation", hi: "उच्चारण" })}:</span> <span className="font-semibold">{ai.pronunciation}</span></div>
          {ai.breakdown.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">{ai.breakdown.map((b, i) => <span key={i} className="rounded-xl bg-plum-2 px-2.5 py-1 text-sm font-bold text-plum"><span className="kn">{b.kn}</span> {b.roman} = {b.meaning}</span>)}</div>
          )}
          {ai.note && <div className="mt-3 text-sm font-semibold text-ink-2">💡 {ai.note}</div>}
        </div>
      )}
      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-ink-3"><ArrowRightLeft size={14} /> {t({ en: "Tip: paste a Kannada message you received to see what it means.", hi: "टिप: मिला हुआ कन्नड़ संदेश पेस्ट करें, मतलब देखें।" })}</div>
    </div>
  );
}

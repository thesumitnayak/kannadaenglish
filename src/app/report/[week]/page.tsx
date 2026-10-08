"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useStore, reviewBuckets } from "@/lib/store";
import { useT } from "@/lib/hooks";
import { weekResults, avg, skillScores } from "@/lib/stats";
import { WEEKS, VOCAB_INDEX, SENTENCE_INDEX } from "@/content/course";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";
import { statusOf } from "@/lib/engine/srs";

export default function WeeklyReport() {
  const { week: w } = useParams<{ week: string }>();
  const week = Math.max(1, Math.min(4, Number(w) || 1));
  const t = useT();
  const s = useStore();
  const mark = useStore((st) => st.markReportSeen);
  useEffect(() => { mark(week); }, [week, mark]);
  const wk = weekResults(s.results, week);
  const info = WEEKS[week - 1];
  const pct = (n: number) => (n < 0 ? "—" : `${Math.round(n * 100)}%`);
  const sk = skillScores(s.skills);
  const best = (Object.entries(sk) as [string, number][]).sort((a, b) => b[1] - a[1])[0];
  const worstItems = Object.values(s.review).filter((r) => r.wrong > 0).sort((a, b) => (b.wrong - b.correct) - (a.wrong - a.correct)).slice(0, 6);
  const weak = reviewBuckets(s.review).weak;
  const lookup = (k: string) => (k.startsWith("v:") ? VOCAB_INDEX.get(k.slice(2)) : SENTENCE_INDEX.get(k.slice(2)));

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="rounded-[2rem] bg-ink p-6 text-cream">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-cream/60">{t({ en: "Weekly report", hi: "साप्ताहिक रिपोर्ट" })}</div>
        <h1 className="mt-1 text-3xl font-black">{info.emoji} {t({ en: "Week", hi: "हफ्ता" })} {week}: {t(info.title)}</h1>
        <p className="mt-1 font-semibold text-cream/70">{wk.length}/7 {t({ en: "days completed", hi: "दिन पूरे" })}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[["📚", wk.reduce((a, r) => a + r.wordsLearned, 0), t({ en: "Words learned", hi: "शब्द सीखे" })], ["💬", wk.reduce((a, r) => a + r.sentences, 0), t({ en: "Sentences learned", hi: "वाक्य सीखे" })], ["⭐", wk.reduce((a, r) => a + r.xp, 0), "XP"], ["🎤", pct(avg(wk.map((r) => r.speakingScore))), t({ en: "Speaking score", hi: "बोलने का स्कोर" })], ["🎧", pct(avg(wk.map((r) => r.listeningScore))), t({ en: "Listening score", hi: "सुनने का स्कोर" })], ["🎯", pct(avg(wk.map((r) => r.accuracy))), t({ en: "Accuracy", hi: "सटीकता" })]].map(([e, v, l]) => (
          <Card key={String(l)} className="p-4"><div className="text-2xl">{e}</div><div className="text-2xl font-black">{v}</div><div className="text-xs font-bold text-ink-3">{l}</div></Card>
        ))}
      </div>
      <Card>
        <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Strongest skill", hi: "सबसे मज़बूत कौशल" })}</div>
        <div className="mt-1 text-2xl font-black capitalize">🏅 {best[0]} · {best[1]}%</div>
        <p className="mt-1 font-semibold text-ink-2">{t({ en: "Keep it up. Next week leans on exactly this.", hi: "ऐसे ही रखें। अगला हफ़्ता इसी पर टिका है।" })}</p>
      </Card>
      <Card>
        <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Most difficult words", hi: "सबसे कठिन शब्द" })}</div>
        <div className="mt-3 space-y-2">
          {worstItems.map((r) => { const x = lookup(r.key); return x ? (
            <div key={r.key} className="flex items-center gap-3 rounded-2xl bg-cream p-3"><AudioButton kn={x.kn} roman={x.roman} size="sm" showSlow={false} /><div className="flex-1"><div className="font-black">{x.roman} <span className="kn font-semibold text-ink-3">{x.kn}</span></div><div className="text-sm font-semibold text-ink-3">{x.en}</div></div><span className="text-xs font-black text-brick">{r.wrong}× {t({ en: "missed", hi: "छूटा" })}</span></div>
          ) : null; })}
          {!worstItems.length && <div className="font-bold text-ink-3">{t({ en: "No misses this week. Seriously impressive.", hi: "इस हफ़्ते कोई गलती नहीं। सच में प्रभावशाली।" })}</div>}
        </div>
      </Card>
      <Card className="bg-marigold-3">
        <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Recommended revision", hi: "सुझाई गई दोहराई" })}</div>
        <p className="mt-1 font-bold text-ink-2">{weak.length ? t({ en: `${weak.length} items need practice. A 10-minute revision will fix most of them.`, hi: `${weak.length} चीज़ों को अभ्यास चाहिए। 10 मिनट की दोहराई से ज़्यादातर ठीक हो जाएँगी।` }) : t({ en: "Nothing weak. Do a quick revision anyway to lock it in.", hi: "कुछ कमज़ोर नहीं। फिर भी एक छोटी दोहराई कर लें।" })}</p>
        <Link href="/review/session?mode=revision"><Button className="mt-4" variant="dark">{t({ en: "Start revision", hi: "दोहराई शुरू करें" })}</Button></Link>
      </Card>
      <Link href="/" className="block text-center font-extrabold text-sky">{t({ en: "Back home", hi: "होम पर वापस" })}</Link>
      <div className="hidden">{Object.values(s.review).filter((r) => statusOf(r) === "weak").length}</div>
    </div>
  );
}

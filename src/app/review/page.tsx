"use client";

import Link from "next/link";
import { useState } from "react";
import { Brain, Trash2, CheckCircle2, RotateCcw } from "lucide-react";
import { useStore, reviewBuckets } from "@/lib/store";
import { useT } from "@/lib/hooks";
import { VOCAB_INDEX, SENTENCE_INDEX } from "@/content/course";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";
import type { ReviewItem } from "@/lib/engine/srs";
import { cn } from "@/lib/cn";

function lookup(key: string) {
  const id = key.slice(2);
  return key.startsWith("v:") ? VOCAB_INDEX.get(id) : SENTENCE_INDEX.get(id);
}

function ItemRow({ it }: { it: ReviewItem }) {
  const x = lookup(it.key);
  if (!x) return null;
  const total = it.correct + it.wrong;
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-card">
      <AudioButton kn={x.kn} roman={x.roman} size="sm" showSlow={false} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-black">{x.roman} <span className="kn font-semibold text-ink-3">{x.kn}</span></div>
        <div className="truncate text-sm font-semibold text-ink-3">{x.en} · {x.hi}</div>
      </div>
      <div className="text-right text-xs font-bold text-ink-3">{total ? `${it.correct}/${total}` : "new"}</div>
    </div>
  );
}

export default function ReviewPage() {
  const t = useT();
  const review = useStore((s) => s.review);
  const mistakes = useStore((s) => s.mistakes);
  const markReviewed = useStore((s) => s.markMistakeReviewed);
  const clear = useStore((s) => s.clearMistakes);
  const [tab, setTab] = useState<"weak" | "learning" | "mastered">("weak");
  const [mtab, setMtab] = useState<"open" | "done">("open");
  const b = reviewBuckets(review);
  const list = b[tab].sort((x, y) => (y.wrong - y.correct) - (x.wrong - x.correct));
  const ms = mistakes.filter((m) => (mtab === "open" ? !m.reviewed : m.reviewed));
  const openKeys = mistakes.filter((m) => !m.reviewed && m.key).map((m) => m.key!);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">{t({ en: "Smart review", hi: "स्मार्ट रिव्यू" })}</h1>
        <p className="mt-1 font-semibold text-ink-3">{t({ en: "Words you miss come back more often. Words you know fade out.", hi: "जो शब्द छूटते हैं वे बार-बार आते हैं। जो याद हैं वे कम आते हैं।" })}</p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-cream">
        <div className="pointer-events-none absolute -right-4 -top-6 text-[8rem] opacity-10">🧠</div>
        <h2 className="text-2xl font-black">{t({ en: "10-Minute Revision", hi: "10-मिनट दोहराई" })}</h2>
        <p className="mt-1 font-semibold text-cream/70">{t({ en: "Auto-built from your weakest and most overdue words.", hi: "आपके सबसे कमज़ोर और बाकी शब्दों से अपने-आप बनी।" })}</p>
        <Link href="/review/session?mode=revision"><Button className="mt-5" size="lg" disabled={!Object.keys(review).length}><Brain size={20} /> {t({ en: "Start revision", hi: "दोहराई शुरू करें" })}</Button></Link>
        {!Object.keys(review).length && <p className="mt-3 text-sm font-bold text-cream/60">{t({ en: "Finish Day 1 to unlock revision.", hi: "दोहराई के लिए Day 1 पूरा करें।" })}</p>}
      </div>

      <section>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {([["weak", "🔴", { en: "Needs practice", hi: "अभ्यास चाहिए" }, "bg-brick-3 text-brick"], ["learning", "🟡", { en: "Learning", hi: "सीख रहे" }, "bg-marigold-3 text-[#8a6200]"], ["mastered", "🟢", { en: "Mastered", hi: "पक्के" }, "bg-leaf-2 text-leaf"]] as const).map(([k, e, l, c]) => (
            <button key={k} onClick={() => setTab(k)} className={cn("rounded-2xl p-3 text-left transition", c, tab === k ? "ring-2 ring-current" : "opacity-80")}>
              <div className="text-2xl font-black">{b[k].length}</div>
              <div className="text-xs font-black">{e} {t(l)}</div>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {list.slice(0, 40).map((it) => <ItemRow key={it.key} it={it} />)}
          {!list.length && <Card className="text-center font-bold text-ink-3">{tab === "weak" ? t({ en: "Nothing weak right now. 🎉", hi: "अभी कुछ कमज़ोर नहीं। 🎉" }) : t({ en: "Nothing here yet.", hi: "अभी यहाँ कुछ नहीं।" })}</Card>}
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-black">📒 {t({ en: "My mistakes", hi: "मेरी गलतियाँ" })}</h2>
          <div className="flex gap-2">
            {openKeys.length > 0 && mtab === "open" && <Link href="/review/session?mode=mistakes"><Button size="sm" variant="dark"><RotateCcw size={15} /> {t({ en: "Practise these", hi: "इनका अभ्यास" })}</Button></Link>}
            <div className="flex rounded-xl bg-cream-2 p-1 text-xs font-black">
              {(["open", "done"] as const).map((k) => (
                <button key={k} onClick={() => setMtab(k)} className={mtab === k ? "rounded-lg bg-white px-2.5 py-1 shadow" : "px-2.5 py-1 text-ink-3"}>{k === "open" ? t({ en: "To review", hi: "दोहराना है" }) : t({ en: "Reviewed", hi: "दोहराए" })}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2.5">
          {ms.map((m) => (
            <div key={m.id} className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-black uppercase tracking-widest text-ink-3">Day {m.day} · {new Date(m.at).toLocaleDateString()}</div>
                  {m.prompt && <div className="mt-0.5 font-bold text-ink-2">{m.prompt}</div>}
                  <div className="mt-2 font-bold text-brick">❌ “{m.given}”</div>
                  <div className="font-black text-leaf">✅ {m.correct}</div>
                  {m.correctKn && <div className="kn text-sm font-semibold text-ink-3">{m.correctKn}</div>}
                  {m.reason && <div className="mt-1.5 text-sm font-semibold text-ink-2">💡 {m.reason}</div>}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {m.correctKn && <AudioButton kn={m.correctKn} roman={m.correct} size="sm" showSlow={false} />}
                  <button onClick={() => markReviewed(m.id, !m.reviewed)} className="flex items-center gap-1 text-xs font-black text-sky"><CheckCircle2 size={14} /> {m.reviewed ? t({ en: "Undo", hi: "वापस" }) : t({ en: "Got it", hi: "समझ गया" })}</button>
                </div>
              </div>
            </div>
          ))}
          {!ms.length && <Card className="text-center font-bold text-ink-3">{mtab === "open" ? t({ en: "No mistakes to review. Keep going!", hi: "दोहराने को कोई गलती नहीं। जारी रखें!" }) : t({ en: "Nothing reviewed yet.", hi: "अभी कुछ नहीं दोहराया।" })}</Card>}
          {mtab === "done" && ms.length > 0 && <Button variant="ghost" size="sm" onClick={clear}><Trash2 size={15} /> {t({ en: "Clear reviewed", hi: "दोहराए हटाएँ" })}</Button>}
        </div>
      </section>
    </div>
  );
}

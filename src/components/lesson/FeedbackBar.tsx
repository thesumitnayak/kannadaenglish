"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";
import { useT } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import type { Bilingual } from "@/content/types";

export interface Feedback {
  ok: boolean;
  title: Bilingual;
  xp?: number;
  correct?: string;
  correctKn?: string;
  correctRoman?: string;
  why?: Bilingual;
  willRetry?: boolean;
}

export function FeedbackBar({ fb, onNext }: { fb: Feedback; onNext: () => void }) {
  const t = useT();
  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-40 border-t-2 animate-rise safe-bottom", fb.ok ? "border-leaf/30 bg-leaf-2" : "border-marigold/40 bg-marigold-3")}>
      <div className="mx-auto max-w-2xl px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className={cn("text-xl font-black", fb.ok ? "text-leaf" : "text-[#8a6200]")}>
              {t(fb.title)} {fb.ok && fb.xp ? <span className="ml-1 rounded-full bg-white/70 px-2 py-0.5 text-sm text-[#8a6200]">+{fb.xp} XP</span> : null}
            </div>
            {!fb.ok && fb.correct && (
              <div className="mt-1.5">
                <div className="text-xs font-black uppercase tracking-widest text-ink-3">{t({ en: "Correct answer", hi: "सही जवाब" })}</div>
                <div className="font-black text-ink">✅ {fb.correct}</div>
                {fb.correctKn && <div className="kn text-sm font-semibold text-ink-2">{fb.correctKn}{fb.correctRoman && fb.correctRoman !== fb.correct ? ` · ${fb.correctRoman}` : ""}</div>}
              </div>
            )}
            {fb.why && (fb.why.en || fb.why.hi) && <div className="mt-1.5 text-sm font-semibold text-ink-2">💡 {t(fb.why)}</div>}
            {fb.willRetry && <div className="mt-1.5 flex items-center gap-1 text-sm font-bold text-ink-2"><RotateCcw size={14} /> {t({ en: "We'll give you a similar one right away.", hi: "अभी एक मिलता-जुलता सवाल आएगा।" })}</div>}
          </div>
          {fb.correctKn && fb.correctRoman && <AudioButton kn={fb.correctKn} roman={fb.correctRoman} size="sm" showSlow={false} />}
        </div>
        <Button className="mt-4" block size="lg" variant={fb.ok ? "success" : "primary"} onClick={onNext} autoFocus>
          {t({ en: "Continue", hi: "आगे" })} <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
}

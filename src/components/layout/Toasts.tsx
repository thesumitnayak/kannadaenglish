"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useStore } from "@/lib/store";

export function Toasts() {
  const toasts = useStore((s) => s.toasts);
  const dismiss = useStore((s) => s.dismissToast);
  useEffect(() => {
    if (!toasts.length) return;
    const t = setTimeout(() => dismiss(toasts[0].id), 4200);
    return () => clearTimeout(t);
  }, [toasts, dismiss]);
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto flex w-full max-w-sm animate-pop items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-pop">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-marigold-3 text-2xl">{t.emoji ?? "✨"}</div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-black uppercase tracking-wider text-ink-3">{t.kind === "achievement" ? "Achievement unlocked" : t.kind === "level" ? "Level up" : t.kind === "streak" ? "Streak" : "Nice"}</div>
            <div className="truncate font-black text-ink">{t.title}</div>
            {t.body && <div className="truncate text-sm text-ink-2">{t.body}</div>}
          </div>
          <button aria-label="Dismiss" onClick={() => dismiss(t.id)} className="text-ink-3"><X size={18} /></button>
        </div>
      ))}
    </div>
  );
}

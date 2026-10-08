import { cn } from "@/lib/cn";
import type { Formality } from "@/content/types";

const F: Record<Formality, { label: string; cls: string }> = {
  formal: { label: "Formal", cls: "bg-sky-2 text-sky" },
  polite: { label: "Polite", cls: "bg-leaf-2 text-leaf" },
  casual: { label: "Casual", cls: "bg-marigold-3 text-[#8a6200]" },
  "very-casual": { label: "Very casual", cls: "bg-brick-3 text-brick" },
};

export function FormalityBadge({ f, className }: { f?: Formality; className?: string }) {
  if (!f) return null;
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide", F[f].cls, className)}>{F[f].label}</span>;
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full bg-cream-2 px-2.5 py-1 text-xs font-bold text-ink-2", className)}>{children}</span>;
}

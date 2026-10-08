"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ScriptMode } from "@/lib/hooks";

const SIZES = {
  sm: { big: "text-base", small: "text-xs" },
  md: { big: "text-xl", small: "text-sm" },
  lg: { big: "text-3xl", small: "text-base" },
  xl: { big: "text-4xl sm:text-5xl", small: "text-lg" },
};

/**
 * Renders Kannada according to the script mode. Kannada script is always visible:
 * - roman: roman is primary, Kannada shown smaller
 * - both: Kannada primary, roman below
 * - kannada: Kannada only for familiar words (tap to reveal roman); unfamiliar words still show roman
 */
export function Kn({ kn, roman, mode, size = "md", familiar = false, className, align = "left" }: { kn: string; roman: string; mode: ScriptMode; size?: keyof typeof SIZES; familiar?: boolean; className?: string; align?: "left" | "center" }) {
  const [reveal, setReveal] = useState(false);
  const s = SIZES[size];
  const al = align === "center" ? "items-center text-center" : "items-start text-left";
  if (mode === "roman") {
    return (
      <div className={cn("flex flex-col", al, className)}>
        <span className={cn("font-black tracking-tight text-ink", s.big)}>{roman}</span>
        <span className={cn("kn font-semibold text-ink-3", s.small)}>{kn}</span>
      </div>
    );
  }
  const hideRoman = mode === "kannada" && familiar && !reveal;
  return (
    <div className={cn("flex flex-col", al, className)}>
      <span className={cn("kn font-bold text-ink", s.big)}>{kn}</span>
      {hideRoman ? (
        <button type="button" onClick={(e) => { e.stopPropagation(); setReveal(true); }} className={cn("font-bold text-sky underline decoration-dotted underline-offset-4", s.small)}>show roman</button>
      ) : (
        <span className={cn("font-bold text-ink-3", s.small)}>{roman}</span>
      )}
    </div>
  );
}

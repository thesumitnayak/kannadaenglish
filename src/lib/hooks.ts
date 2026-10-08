"use client";

import { useStore, currentDay, type Lang } from "@/lib/store";
import type { Bilingual } from "@/content/types";

export type ScriptMode = "roman" | "both" | "kannada";

/** Gradual script introduction: roman → roman + Kannada → Kannada for familiar words. */
export function resolveScript(pref: "auto" | ScriptMode, day: number): ScriptMode {
  if (pref !== "auto") return pref;
  if (day <= 7) return "roman";
  if (day <= 21) return "both";
  return "kannada";
}

export function useLearnerDay(): number {
  const results = useStore((s) => s.results);
  const unlocked = useStore((s) => s.unlockedThrough);
  return currentDay(results, unlocked);
}

export function useScriptMode(dayOverride?: number): ScriptMode {
  const pref = useStore((s) => s.settings.script);
  const day = useLearnerDay();
  return resolveScript(pref, dayOverride ?? day);
}

export function useLang(): Lang {
  return useStore((s) => s.settings.explainLang);
}

/** Pick the explanation-language string. */
export function useT() {
  const lang = useLang();
  return (b: Bilingual | undefined | null) => (b ? (lang === "hi" ? b.hi : b.en) : "");
}

export function greeting(lang: Lang): string {
  const h = new Date().getHours();
  if (lang === "hi") return h < 12 ? "सुप्रभात" : h < 17 ? "नमस्ते" : "शुभ संध्या";
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

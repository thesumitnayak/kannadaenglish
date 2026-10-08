"use client";

import { useState } from "react";
import { Volume2, Snail } from "lucide-react";
import { speak } from "@/lib/audio/tts";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

/** 🔊 normal + 🐌 slow playback. Each tap replays, so learners can repeat freely. */
export function AudioButton({ kn, roman, size = "md", showSlow = true, className, autoLabel }: { kn: string; roman: string; size?: "sm" | "md" | "lg"; showSlow?: boolean; className?: string; autoLabel?: string }) {
  const rate = useStore((s) => s.settings.ttsRate);
  const [playing, setPlaying] = useState<"n" | "s" | null>(null);
  const play = async (slow: boolean) => {
    setPlaying(slow ? "s" : "n");
    await speak(kn, roman, slow ? Math.max(0.45, rate * 0.6) : rate);
    setPlaying(null);
  };
  const dim = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-8 w-8" : "h-11 w-11";
  const icon = size === "lg" ? 26 : size === "sm" ? 15 : 20;
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <button type="button" aria-label={autoLabel ?? "Play pronunciation"} onClick={(e) => { e.stopPropagation(); play(false); }}
        className={cn("flex items-center justify-center rounded-2xl bg-sky text-white shadow-[0_3px_0_0_#2a54ab] transition active:translate-y-[2px] active:shadow-none", dim, playing === "n" && "animate-pulse")}>
        <Volume2 size={icon} strokeWidth={2.5} />
      </button>
      {showSlow && (
        <button type="button" aria-label="Play slowly" onClick={(e) => { e.stopPropagation(); play(true); }}
          className={cn("flex items-center justify-center rounded-2xl bg-sky-2 text-sky transition active:scale-95", size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9", playing === "s" && "animate-pulse")}>
          <Snail size={icon - 4} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

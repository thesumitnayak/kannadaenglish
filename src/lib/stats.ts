import type { DayResult } from "@/lib/store";
import { skillPct } from "@/lib/store";
import type { Skill } from "@/content/types";
import { todayStr } from "@/lib/engine/text";

type Skills = Record<Skill, { correct: number; total: number }>;

export function skillScores(skills: Skills) {
  return {
    vocabulary: skillPct(skills.vocabulary),
    speaking: skillPct(skills.speaking),
    listening: skillPct(skills.listening),
    grammar: skillPct(skills.grammar),
    conversation: skillPct(skills.conversation),
  };
}

export function overallScore(s: ReturnType<typeof skillScores>) {
  const vals = Object.values(s);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function scoreLabel(pct: number): { en: string; hi: string; emoji: string } {
  if (pct >= 90) return { emoji: "😎", en: "Bengaluru Local", hi: "बेंगलुरु लोकल" };
  if (pct >= 80) return { emoji: "🏆", en: "Confident Speaker", hi: "आत्मविश्वासी वक्ता" };
  if (pct >= 70) return { emoji: "🏆", en: "Confident Beginner", hi: "आत्मविश्वासी शुरुआती" };
  if (pct >= 55) return { emoji: "🌱", en: "Growing Beginner", hi: "बढ़ता शुरुआती" };
  return { emoji: "🐣", en: "Brave Beginner", hi: "बहादुर शुरुआती" };
}

export function weekResults(results: Record<number, DayResult>, week: number) {
  const days = Array.from({ length: 7 }, (_, i) => (week - 1) * 7 + i + 1).filter((d) => d <= 30);
  return days.map((d) => results[d]).filter(Boolean) as DayResult[];
}

export function lastNDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (n - 1 - i)); return todayStr(d); });
}

export function avg(nums: number[]): number {
  const v = nums.filter((x) => x >= 0);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : -1;
}

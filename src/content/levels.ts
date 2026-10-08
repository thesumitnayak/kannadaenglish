import type { Level } from "./types";

export const LEVELS: Level[] = [
  { level: 1, title: "Kannada Newborn", minXp: 0, emoji: "🐣" },
  { level: 2, title: "Kannada Explorer", minXp: 300, emoji: "🧭" },
  { level: 3, title: "Kannada Starter", minXp: 900, emoji: "🌱" },
  { level: 4, title: "Kannada Speaker", minXp: 2000, emoji: "🗣️" },
  { level: 5, title: "Kannada Conversationalist", minXp: 3800, emoji: "💬" },
  { level: 6, title: "Kannada Pro", minXp: 6000, emoji: "⭐" },
  { level: 7, title: "Bengaluru Local", minXp: 9000, emoji: "😎" },
];

export function levelFor(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.minXp) current = l;
  const next = LEVELS.find((l) => l.minXp > xp);
  const progress = next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1;
  return { current, next, progress };
}

export const XP = {
  correct: 10,
  perfect: 20,
  speaking: 30,
  conversation: 50,
  dailyChallenge: 100,
  perfectLesson: 150,
  dayComplete: 100,
  review: 5,
} as const;

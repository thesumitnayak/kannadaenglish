import type { DayLesson, Sentence, VocabItem } from "./types";
import { day01 } from "./days/day01";
import { day02 } from "./days/day02";
import { day03 } from "./days/day03";
import { day04 } from "./days/day04";
import { day05 } from "./days/day05";
import { day06 } from "./days/day06";
import { day07 } from "./days/day07";
import { day08 } from "./days/day08";
import { day09 } from "./days/day09";
import { day10 } from "./days/day10";
import { day11 } from "./days/day11";
import { day12 } from "./days/day12";
import { day13 } from "./days/day13";
import { day14 } from "./days/day14";
import { day15 } from "./days/day15";
import { day16 } from "./days/day16";
import { day17 } from "./days/day17";
import { day18, day19, day20 } from "./days/week3b";
import { day21, day24, day25, day26, day27, day28, day29 } from "./days/practice";
import { day22, day23 } from "./days/week4";
import { day30 } from "./days/day30";

/** The full course. To add a day, create a DayLesson file and add it here. */
export const COURSE: DayLesson[] = [
  day01, day02, day03, day04, day05, day06, day07,
  day08, day09, day10, day11, day12, day13, day14,
  day15, day16, day17, day18, day19, day20, day21,
  day22, day23, day24, day25, day26, day27, day28, day29, day30,
];

export const TOTAL_DAYS = COURSE.length;

export const WEEKS = [
  { week: 1, title: { en: "Survival Kannada", hi: "बचाव कन्नड़" }, emoji: "🛟" },
  { week: 2, title: { en: "Build Sentences", hi: "वाक्य बनाना" }, emoji: "🧱" },
  { week: 3, title: { en: "Real Bengaluru Kannada", hi: "असली बेंगलुरु कन्नड़" }, emoji: "🏙️" },
  { week: 4, title: { en: "Fluency Mode", hi: "फ़्लुएंसी मोड" }, emoji: "🚀" },
];

export function getDay(day: number): DayLesson | undefined {
  return COURSE.find((d) => d.day === day);
}

/** Every vocab item in the course keyed by id (first occurrence wins). */
export const VOCAB_INDEX: Map<string, VocabItem & { day: number }> = (() => {
  const m = new Map<string, VocabItem & { day: number }>();
  for (const d of COURSE) for (const w of d.vocab) if (!m.has(w.id)) m.set(w.id, { ...w, day: d.day });
  return m;
})();

export const SENTENCE_INDEX: Map<string, Sentence & { day: number }> = (() => {
  const m = new Map<string, Sentence & { day: number }>();
  for (const d of COURSE) for (const s of d.sentences) if (!m.has(s.id)) m.set(s.id, { ...s, day: d.day });
  return m;
})();

export function vocabUpTo(day: number): (VocabItem & { day: number })[] {
  return [...VOCAB_INDEX.values()].filter((v) => v.day <= day);
}

export function sentencesUpTo(day: number): (Sentence & { day: number })[] {
  return [...SENTENCE_INDEX.values()].filter((s) => s.day <= day);
}

/** Vocabulary and sentences a day can draw on: its own plus any review days. */
export function poolForDay(d: DayLesson) {
  const days = new Set([d.day, ...(d.reviewDays ?? [])]);
  const vocab = [...VOCAB_INDEX.values()].filter((v) => days.has(v.day));
  const sentences = [...SENTENCE_INDEX.values()].filter((s) => days.has(s.day));
  return { vocab, sentences };
}

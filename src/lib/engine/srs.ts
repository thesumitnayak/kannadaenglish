/**
 * Spaced repetition (SM-2 inspired, simplified for a 30-day course).
 * Each word/sentence is a ReviewItem keyed "v:<vocabId>" or "s:<sentenceId>".
 */
export interface ReviewItem {
  key: string;
  ease: number;        // 1.3 .. 2.8
  interval: number;    // days
  due: number;         // epoch ms
  reps: number;        // successful reps in a row
  lapses: number;      // total misses
  correct: number;
  wrong: number;
  lastSeen: number;
}

export type ReviewStatus = "mastered" | "learning" | "weak";

const DAY = 86400000;

export function newItem(key: string, now = Date.now()): ReviewItem {
  return { key, ease: 2.3, interval: 0, due: now, reps: 0, lapses: 0, correct: 0, wrong: 0, lastSeen: now };
}

/** grade: 0 = wrong, 1 = right but hesitant/near-miss, 2 = perfect */
export function grade(item: ReviewItem, g: 0 | 1 | 2, now = Date.now()): ReviewItem {
  const it = { ...item, lastSeen: now };
  if (g === 0) {
    it.wrong += 1;
    it.lapses += 1;
    it.reps = 0;
    it.ease = Math.max(1.3, it.ease - 0.25);
    it.interval = 0;
    it.due = now + 5 * 60 * 1000; // bring back within the same session window
    return it;
  }
  it.correct += 1;
  it.reps += 1;
  it.ease = Math.min(2.8, it.ease + (g === 2 ? 0.1 : -0.05));
  if (it.reps === 1) it.interval = 1;
  else if (it.reps === 2) it.interval = 2;
  else it.interval = Math.max(1, Math.round(it.interval * it.ease));
  if (g === 1) it.interval = Math.max(1, Math.round(it.interval * 0.6));
  it.due = now + it.interval * DAY;
  return it;
}

export function statusOf(item: ReviewItem): ReviewStatus {
  const total = item.correct + item.wrong;
  const acc = total ? item.correct / total : 0;
  if (item.wrong >= 2 && acc < 0.7) return "weak";
  if (item.lapses > 0 && item.reps < 2) return "weak";
  if (item.reps >= 3 && acc >= 0.8) return "mastered";
  return "learning";
}

/** Higher = should be reviewed sooner. */
export function priority(item: ReviewItem, now = Date.now()): number {
  const overdue = Math.max(0, now - item.due) / DAY;
  const weakness = item.wrong * 2 + item.lapses * 3 - item.reps;
  return overdue * 2 + weakness + (item.due <= now ? 5 : 0);
}

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Skill } from "@/content/types";
import { ACHIEVEMENTS } from "@/content/achievements";
import { levelFor, XP } from "@/content/levels";
import { TOTAL_DAYS } from "@/content/course";
import { grade, newItem, statusOf, type ReviewItem } from "@/lib/engine/srs";
import { daysBetween, todayStr } from "@/lib/engine/text";

export type Lang = "en" | "hi";
export type ScriptPref = "auto" | "roman" | "both" | "kannada";

export interface Profile {
  name: string;
  baseLang: Lang;
  nativeLang: "en" | "hi" | "other";
  level: "zero" | "beginner" | "basic";
  reasons: string[];
  goalMinutes: number;
  mainGoal: "speaking" | "listening" | "reading" | "all";
  placementScore: number;
  onboarded: boolean;
  createdAt: number;
}

export interface Settings { explainLang: Lang; script: ScriptPref; ttsRate: number; sound: boolean }

export interface DayResult {
  day: number;
  completedAt: number;
  xp: number;
  accuracy: number;        // 0..1
  correct: number;
  total: number;
  wordsLearned: number;
  sentences: number;
  speakingScore: number;   // 0..1, -1 if none
  listeningScore: number;  // 0..1, -1 if none
  perfect: boolean;
  attempts: number;
}

export interface Mistake {
  id: string;
  at: number;
  day: number;
  key?: string;
  prompt: string;
  given: string;
  correct: string;
  correctKn?: string;
  reason?: string;
  reviewed: boolean;
}

export interface SpeakingAttempt { at: number; target: string; heard: string; score: number; mode: "mic" | "self" }

export interface DailyLog { xp: number; seconds: number; words: number; sentences: number; speaking: number; challenge: boolean; exercises: number }

export interface Toast { id: string; kind: "achievement" | "level" | "xp" | "streak" | "info"; title: string; body?: string; emoji?: string }

interface State {
  hydrated: boolean;
  profile: Profile;
  settings: Settings;
  xp: number;
  xpLog: { at: number; amount: number; reason: string }[];
  streak: { current: number; longest: number; last: string | null; freezes: number; frozen: string[] };
  results: Record<number, DayResult>;
  unlockedThrough: number;
  review: Record<string, ReviewItem>;
  mistakes: Mistake[];
  skills: Record<Skill, { correct: number; total: number }>;
  speaking: SpeakingAttempt[];
  daily: Record<string, DailyLog>;
  achievements: Record<string, number>;
  counters: { reviewSessions: number; speakingDone: number; conversations: number; sentencesBuilt: number; scriptSeen: string[]; guru: number; noEnglish: number };
  reportsSeen: number[];
  toasts: Toast[];

  // actions
  setHydrated: () => void;
  completeOnboarding: (p: Partial<Profile>) => void;
  updateProfile: (p: Partial<Profile>) => void;
  updateSettings: (s: Partial<Settings>) => void;
  addXp: (amount: number, reason: string) => void;
  touchStreak: () => void;
  recordAnswer: (a: { key?: string; skill: Skill; ok: boolean; perfect?: boolean }) => void;
  introduce: (keys: string[]) => void;
  recordMistake: (m: Omit<Mistake, "id" | "at" | "reviewed">) => void;
  markMistakeReviewed: (id: string, reviewed?: boolean) => void;
  clearMistakes: () => void;
  recordSpeaking: (a: SpeakingAttempt) => void;
  logActivity: (d: Partial<DailyLog>) => void;
  completeDay: (r: Omit<DayResult, "completedAt" | "attempts">) => void;
  bump: (k: "reviewSessions" | "conversations" | "sentencesBuilt" | "guru" | "noEnglish") => void;
  seeScript: (ids: string[]) => void;
  markReportSeen: (week: number) => void;
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  checkAchievements: () => void;
  resetAll: () => void;
}

const emptySkills = (): State["skills"] => ({
  vocabulary: { correct: 0, total: 0 }, speaking: { correct: 0, total: 0 }, listening: { correct: 0, total: 0 },
  grammar: { correct: 0, total: 0 }, conversation: { correct: 0, total: 0 },
});

const initial = () => ({
  profile: {
    name: "", baseLang: "en" as Lang, nativeLang: "en" as const, level: "zero" as const, reasons: [], goalMinutes: 20,
    mainGoal: "all" as const, placementScore: 0, onboarded: false, createdAt: Date.now(),
  },
  settings: { explainLang: "en" as Lang, script: "auto" as ScriptPref, ttsRate: 0.9, sound: true },
  xp: 0, xpLog: [], streak: { current: 0, longest: 0, last: null, freezes: 1, frozen: [] },
  results: {}, unlockedThrough: 1, review: {}, mistakes: [], skills: emptySkills(), speaking: [], daily: {},
  achievements: {}, counters: { reviewSessions: 0, speakingDone: 0, conversations: 0, sentencesBuilt: 0, scriptSeen: [], guru: 0, noEnglish: 0 },
  reportsSeen: [], toasts: [],
});

const tid = () => Math.random().toString(36).slice(2, 10);

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      ...initial(),

      setHydrated: () => set({ hydrated: true }),

      completeOnboarding: (p) => {
        const startDay = p.level === "basic" && (p.placementScore ?? 0) >= 4 ? 8 : 1;
        set((s) => ({
          profile: { ...s.profile, ...p, onboarded: true, createdAt: Date.now() },
          settings: { ...s.settings, explainLang: p.baseLang ?? s.settings.explainLang },
          unlockedThrough: Math.max(s.unlockedThrough, startDay),
        }));
      },
      updateProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      updateSettings: (st) => set((s) => ({ settings: { ...s.settings, ...st } })),

      addXp: (amount, reason) => {
        if (amount <= 0) return;
        const before = levelFor(get().xp).current;
        set((s) => ({ xp: s.xp + amount, xpLog: [{ at: Date.now(), amount, reason }, ...s.xpLog].slice(0, 300) }));
        get().logActivity({ xp: amount });
        const after = levelFor(get().xp).current;
        if (after.level > before.level) get().pushToast({ kind: "level", emoji: after.emoji, title: `Level ${after.level}: ${after.title}`, body: "You levelled up!" });
      },

      touchStreak: () => {
        const today = todayStr();
        const { streak } = get();
        if (streak.last === today) return;
        let current = 1;
        let freezes = streak.freezes;
        const frozen = [...streak.frozen];
        if (streak.last) {
          const gap = daysBetween(streak.last, today);
          if (gap === 1) current = streak.current + 1;
          else if (gap > 1 && gap - 1 <= freezes) {
            // Missed days are covered by streak freezes — learning, not punishment.
            freezes -= gap - 1;
            for (let i = 1; i < gap; i++) {
              const d = new Date(streak.last + "T00:00:00"); d.setDate(d.getDate() + i); frozen.push(todayStr(d));
            }
            current = streak.current + 1;
            get().pushToast({ kind: "streak", emoji: "🧊", title: "Streak freeze used", body: "Your streak is safe. Welcome back!" });
          }
        }
        if (current > 0 && current % 7 === 0 && freezes < 2) {
          freezes += 1;
          get().pushToast({ kind: "streak", emoji: "🧊", title: "Earned a streak freeze", body: "A missed day won't break your streak." });
        }
        set({ streak: { current, longest: Math.max(streak.longest, current), last: today, freezes, frozen: frozen.slice(-30) } });
      },

      recordAnswer: ({ key, skill, ok, perfect }) => {
        set((s) => {
          const sk = { ...s.skills, [skill]: { correct: s.skills[skill].correct + (ok ? 1 : 0), total: s.skills[skill].total + 1 } };
          let review = s.review;
          if (key) {
            const cur = s.review[key] ?? newItem(key);
            review = { ...s.review, [key]: grade(cur, ok ? (perfect === false ? 1 : 2) : 0) };
          }
          return { skills: sk, review };
        });
        get().logActivity({ exercises: 1 });
      },

      introduce: (keys) => set((s) => {
        const review = { ...s.review };
        let changed = false;
        for (const k of keys) if (!review[k]) { review[k] = newItem(k); changed = true; }
        return changed ? { review } : {};
      }),

      recordMistake: (m) => set((s) => {
        // keep one open entry per item; refresh it instead of duplicating
        const rest = s.mistakes.filter((x) => !(m.key && x.key === m.key && !x.reviewed));
        return { mistakes: [{ ...m, id: tid(), at: Date.now(), reviewed: false }, ...rest].slice(0, 300) };
      }),
      markMistakeReviewed: (id, reviewed = true) => set((s) => ({ mistakes: s.mistakes.map((m) => (m.id === id ? { ...m, reviewed } : m)) })),
      clearMistakes: () => set((s) => ({ mistakes: s.mistakes.filter((m) => !m.reviewed) })),

      recordSpeaking: (a) => {
        set((s) => ({
          speaking: [a, ...s.speaking].slice(0, 200),
          counters: { ...s.counters, speakingDone: s.counters.speakingDone + 1 },
          skills: { ...s.skills, speaking: { correct: s.skills.speaking.correct + a.score, total: s.skills.speaking.total + 1 } },
        }));
        get().logActivity({ speaking: 1 });
      },

      logActivity: (d) => set((s) => {
        const k = todayStr();
        const cur = s.daily[k] ?? { xp: 0, seconds: 0, words: 0, sentences: 0, speaking: 0, challenge: false, exercises: 0 };
        const next: DailyLog = {
          xp: cur.xp + (d.xp ?? 0), seconds: cur.seconds + (d.seconds ?? 0), words: cur.words + (d.words ?? 0),
          sentences: cur.sentences + (d.sentences ?? 0), speaking: cur.speaking + (d.speaking ?? 0),
          challenge: cur.challenge || !!d.challenge, exercises: cur.exercises + (d.exercises ?? 0),
        };
        return { daily: { ...s.daily, [k]: next } };
      }),

      completeDay: (r) => {
        const prev = get().results[r.day];
        const merged: DayResult = {
          ...r,
          xp: (prev?.xp ?? 0) + r.xp,
          accuracy: Math.max(prev?.accuracy ?? 0, r.accuracy),
          speakingScore: Math.max(prev?.speakingScore ?? -1, r.speakingScore),
          listeningScore: Math.max(prev?.listeningScore ?? -1, r.listeningScore),
          perfect: !!prev?.perfect || r.perfect,
          completedAt: Date.now(),
          attempts: (prev?.attempts ?? 0) + 1,
        };
        set((s) => ({
          results: { ...s.results, [r.day]: merged },
          unlockedThrough: Math.min(TOTAL_DAYS, Math.max(s.unlockedThrough, r.day + 1)),
        }));
        get().logActivity({ words: prev ? 0 : r.wordsLearned, sentences: prev ? 0 : r.sentences, challenge: true });
        get().touchStreak();
        get().checkAchievements();
      },

      bump: (k) => { set((s) => ({ counters: { ...s.counters, [k]: s.counters[k] + 1 } })); get().checkAchievements(); },
      seeScript: (ids) => { set((s) => ({ counters: { ...s.counters, scriptSeen: [...new Set([...s.counters.scriptSeen, ...ids])] } })); get().checkAchievements(); },
      markReportSeen: (w) => set((s) => ({ reportsSeen: [...new Set([...s.reportsSeen, w])] })),

      pushToast: (t) => set((s) => ({ toasts: [...s.toasts, { ...t, id: tid() }].slice(-4) })),
      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      checkAchievements: () => {
        const s = get();
        const words = Object.keys(s.review).filter((k) => k.startsWith("v:")).length;
        const done = (d: number) => !!s.results[d];
        const checks: Record<string, boolean> = {
          "first-word": words >= 1,
          "words-10": words >= 10,
          "words-50": words >= 50,
          "words-100": words >= 100,
          "words-250": words >= 250,
          "words-500": words >= 500,
          "first-sentence": s.counters.sentencesBuilt >= 1,
          "first-conversation": s.counters.conversations >= 1,
          "streak-3": s.streak.longest >= 3,
          "streak-7": s.streak.longest >= 7,
          "streak-15": s.streak.longest >= 15,
          "warrior-30": done(30),
          foodie: done(5) && done(16),
          "auto-survivor": done(17),
          "bengaluru-local": levelFor(s.xp).current.level >= 7,
          "perfect-lesson": Object.values(s.results).some((r) => r.perfect),
          "no-english": s.counters.noEnglish >= 1,
          "speaking-champ": s.counters.speakingDone >= 25,
          "week-1": done(7),
          "boss-slayer": done(14),
          reviewer: s.counters.reviewSessions >= 5,
          "script-starter": s.counters.scriptSeen.length >= 10,
          "guru-chat": s.counters.guru >= 1,
        };
        const newly = ACHIEVEMENTS.filter((a) => checks[a.id] && !s.achievements[a.id]);
        if (!newly.length) return;
        const now = Date.now();
        set((st) => ({ achievements: { ...st.achievements, ...Object.fromEntries(newly.map((a) => [a.id, now])) } }));
        for (const a of newly) {
          get().pushToast({ kind: "achievement", emoji: a.emoji, title: a.title.en, body: a.description.en });
          get().addXp(a.xp, `Achievement: ${a.title.en}`);
        }
      },

      resetAll: () => set({ ...initial(), hydrated: true }),
    }),
    {
      name: "kannada30-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { toasts, hydrated, ...rest } = s;
        return rest;
      },
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

/* ---------------- derived selectors ---------------- */

export function skillPct(s: { correct: number; total: number }): number {
  return s.total ? Math.round((s.correct / s.total) * 100) : 0;
}

export function reviewBuckets(review: Record<string, ReviewItem>) {
  const out = { mastered: [] as ReviewItem[], learning: [] as ReviewItem[], weak: [] as ReviewItem[] };
  for (const it of Object.values(review)) out[statusOf(it)].push(it);
  return out;
}

export function currentDay(results: Record<number, DayResult>, unlockedThrough: number): number {
  for (let d = 1; d <= unlockedThrough; d++) if (!results[d]) return d;
  return Math.min(unlockedThrough, TOTAL_DAYS);
}

export const xpRewards = XP;

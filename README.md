# Maathu · 30-Day Kannada Challenge

A spoken-Bengaluru-Kannada learning app for English + Hindi speakers. Day 1 (absolute beginner) → Day 30 (everyday speaker).

**Stack:** Next.js 16 (App Router) · TypeScript strict · Tailwind v4 · Zustand (local persistence) · Supabase (optional cloud sync) · Claude API (optional AI tutor / role-play / translation) · React Three Fiber (3D hero) · Web Speech API (TTS + speech recognition).

## Run

```bash
pnpm install
cp .env.example .env.local   # optional: add ANTHROPIC_API_KEY and/or Supabase keys
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production
```

Without any env vars the whole 30-day course, reviews, speaking, Bengaluru Mode, "What do I say?", translator (phrasebook) and guided conversations work fully offline. Adding `ANTHROPIC_API_KEY` unlocks the free-form **Kannada Guru**, **Talk to me** role-play with conversation reports, and AI translation. Adding Supabase keys (and running `supabase/schema.sql`) syncs progress across devices.

## Where things live

| Area | Path |
|---|---|
| Course content (30 days) | `src/content/days/*.ts`, index in `src/content/course.ts` |
| Vocabulary/sentence/conversation types | `src/content/types.ts` |
| Bengaluru Mode scenarios | `src/content/scenarios.ts` |
| "What do I say?" situations | `src/content/whatToSay.ts` |
| Script letters | `src/content/script.ts` · numbers: `src/content/numbers.ts` |
| Achievements / levels / XP | `src/content/achievements.ts`, `src/content/levels.ts` |
| Lesson engine (exercise generation, daily-goal scaling, weak-word weighting) | `src/lib/engine/session.ts` |
| Spaced repetition | `src/lib/engine/srs.ts` · forgiving answer matching: `src/lib/engine/text.ts` |
| Progress store (XP, streak + freezes, skills, mistakes, review, achievements) | `src/lib/store.ts` |
| Audio (TTS, speech recognition + scoring) | `src/lib/audio/` |
| AI routes (Claude) | `src/app/api/ai/*`, prompts in `src/lib/ai/server.ts`, offline fallbacks in `src/lib/ai/local.ts` |
| Cloud sync | `src/lib/supabase/`, schema in `supabase/schema.sql` |

## Adding content

Add a `VocabItem` / `Sentence` / `Conversation` to any day file, or create a new day and register it in `COURSE`. The lesson engine builds warm-up, listening, speaking, building, translation and boss exercises automatically from the data; no UI changes needed.

/**
 * Content data model for the 30-Day Kannada Challenge.
 * All course content is plain data: add words, days, conversations and scenarios
 * here without touching the UI.
 */

export type Lang = "en" | "hi";
export type Formality = "formal" | "polite" | "casual" | "very-casual";
export type Skill = "vocabulary" | "speaking" | "listening" | "grammar" | "conversation";
export type PartOfSpeech =
  | "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "number"
  | "question" | "phrase" | "postposition" | "particle" | "expression";

/** Text available in both explanation languages. Kannada is never hidden. */
export interface Bilingual { en: string; hi: string }

export interface Example {
  kn: string;
  roman: string;
  en: string;
  hi: string;
}

export interface VocabItem {
  id: string;                 // stable id, e.g. "namaskara"
  kn: string;                 // ನಮಸ್ಕಾರ
  roman: string;              // Namaskara
  en: string;                 // Hello
  hi: string;                 // नमस्ते
  pos?: PartOfSpeech;
  formality?: Formality;
  context?: Bilingual;        // when / where to use it
  example?: Example;          // one example sentence
  bridge?: Bilingual;         // Hindi / English bridge note
  tags?: string[];            // "greeting", "food", "auto"
  distractors?: string[];     // optional hand-picked wrong answers (English)
}

export interface Breakdown { roman: string; kn?: string; meaning: string; hi?: string }

export interface Sentence {
  id: string;
  kn: string;
  roman: string;
  en: string;
  hi: string;
  formality?: Formality;
  /** Tokens in correct order, roman. Used for sentence building. Defaults to roman split by space. */
  words?: string[];
  /** Same tokens in Kannada script for the "both" / "kannada" script modes. */
  wordsKn?: string[];
  breakdown?: Breakdown[];
  /** Accepted roman alternatives for typed answers. */
  alternatives?: string[];
  note?: Bilingual;
  tags?: string[];
}

export interface ConversationLine {
  speaker: "A" | "B";
  kn: string;
  roman: string;
  en: string;
  hi: string;
}

export interface ConversationOption {
  kn: string;
  roman: string;
  en: string;
  hi?: string;
  correct: boolean;
  feedback?: Bilingual;
}

export interface ConversationPrompt {
  /** The learner answers after this line index (0-based) has been shown. */
  afterLine: number;
  question: Bilingual;
  options: ConversationOption[];
}

export interface Conversation {
  id: string;
  title: Bilingual;
  setting?: Bilingual;
  speakers?: { A: string; B: string };
  lines: ConversationLine[];
  prompts?: ConversationPrompt[];
}

export type QuestionType = "mcq" | "listen" | "build" | "translate" | "typein" | "speak" | "kn-to-en";

export interface Question {
  id: string;
  type: QuestionType;
  skill: Skill;
  prompt: Bilingual;
  /** Kannada shown or spoken for this question (if any). */
  kn?: string;
  roman?: string;
  options?: string[];        // for mcq / listen / kn-to-en
  answer: string;            // correct option text, or the correct roman sentence
  acceptable?: string[];     // extra accepted answers for typed questions
  words?: string[];          // for build
  explanation?: Bilingual;
  vocabId?: string;          // links the question to a review item
  sentenceId?: string;
}

export interface ConceptSection {
  heading: Bilingual;
  body: Bilingual;            // simple text, may contain line breaks
  examples?: Example[];
  /** Optional Hindi → Kannada bridge table. */
  bridge?: { kn: string; roman: string; hi: string; en: string }[];
}

export interface Concept {
  title: Bilingual;
  intro: Bilingual;
  sections: ConceptSection[];
  tip?: Bilingual;
}

export interface DailyPhrase {
  kn: string;
  roman: string;
  meaning: Bilingual;
  example: Example;
  mini: ConversationLine[];
}

export type DayType = "lesson" | "revision" | "boss" | "final";
export type StepType =
  | "intro" | "warmup" | "words" | "learn" | "listen" | "speak"
  | "build" | "translate" | "conversation" | "boss" | "result";

export interface DayLesson {
  day: number;
  week: number;
  type: DayType;
  emoji: string;
  title: Bilingual;
  subtitle: Bilingual;
  /** Estimated minutes at the default 20-minute goal. */
  minutes: number;
  vocab: VocabItem[];
  sentences: Sentence[];
  concept: Concept;
  conversation: Conversation;
  /** Extra conversations (used on boss / final days). */
  extraConversations?: Conversation[];
  bossQuestion: Question;
  dailyPhrase: DailyPhrase;
  /** Script letters introduced (ids from script.ts). */
  scriptLetters?: string[];
  /** Override the default step order. */
  plan?: StepType[];
  /** Multiply exercise counts per step (e.g. listening day = { listen: 2 }). */
  emphasis?: Partial<Record<StepType, number>>;
  /** Immersion day: prompts lean on Kannada script, hints are hidden by default. */
  immersion?: boolean;
  /** Translate step direction. Default "to-kn" (English/Hindi → Kannada). */
  translateMode?: "to-kn" | "from-kn";
  /** Days whose words/sentences feed this day's exercises (practice and boss days). */
  reviewDays?: number[];
}

export interface Scenario {
  id: string;
  emoji: string;
  title: Bilingual;
  description: Bilingual;
  sentences: Sentence[];
  conversation?: Conversation;
}

export interface SayVariant {
  kn: string;
  roman: string;
  en: string;
  hi: string;
  formality: Formality;
}

export interface SaySituation {
  id: string;
  category: string;
  situation: Bilingual;
  primary: SayVariant;
  alternatives: SayVariant[];
  tip?: Bilingual;
}

export interface ScriptLetter {
  id: string;
  kn: string;
  roman: string;
  group: "vowel" | "consonant" | "matra";
  example: { kn: string; roman: string; en: string };
  hint?: Bilingual;
}

export interface Achievement {
  id: string;
  emoji: string;
  title: Bilingual;
  description: Bilingual;
  xp: number;
}

export interface Level {
  level: number;
  title: string;
  minXp: number;
  emoji: string;
}

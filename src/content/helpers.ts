import type {
  Bilingual, ConversationLine, Example, Sentence, VocabItem,
} from "./types";

export const v = (
  id: string, kn: string, roman: string, en: string, hi: string,
  extra: Partial<VocabItem> = {},
): VocabItem => ({ id, kn, roman, en, hi, ...extra });

export const s = (
  id: string, kn: string, roman: string, en: string, hi: string,
  extra: Partial<Sentence> = {},
): Sentence => ({ id, kn, roman, en, hi, ...extra });

export const ex = (kn: string, roman: string, en: string, hi: string): Example => ({ kn, roman, en, hi });

export const line = (
  speaker: "A" | "B", kn: string, roman: string, en: string, hi: string,
): ConversationLine => ({ speaker, kn, roman, en, hi });

export const bi = (en: string, hi: string): Bilingual => ({ en, hi });

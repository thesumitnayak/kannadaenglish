"use client";

export type ChatMsg = { role: "user" | "assistant"; content: string };

let statusCache: Promise<boolean> | null = null;
export function aiAvailable(): Promise<boolean> {
  if (!statusCache) {
    statusCache = fetch("/api/ai/status", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((j: { enabled?: boolean }) => !!j.enabled)
      .catch(() => false);
  }
  return statusCache;
}

/** Stream a chat reply. Calls onDelta with accumulated text. Throws "ai-disabled" when the server has no key. */
export async function streamChat(
  body: { mode: "tutor" | "talk"; day: number; lang: "en" | "hi"; scenario?: string; messages: ChatMsg[] },
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal });
  if (res.status === 503) throw new Error("ai-disabled");
  if (!res.ok || !res.body) throw new Error("ai-error");
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += dec.decode(value, { stream: true });
    onDelta(text);
  }
  return text;
}

export interface ConvoReport {
  vocabulary: number; grammar: number; naturalness: number; confidence: number;
  summary: string; corrections: { youSaid: string; better: string; why: string }[]; nextSteps: string[];
}

export async function fetchReport(day: number, scenario: string, transcript: ChatMsg[]): Promise<ConvoReport | null> {
  try {
    const r = await fetch("/api/ai/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ day, scenario, transcript }) });
    if (!r.ok) return null;
    return (await r.json()) as ConvoReport;
  } catch { return null; }
}

export interface AiTranslation {
  kn: string; roman: string; en: string; hi: string; formality: string; pronunciation: string;
  breakdown: { roman: string; kn: string; meaning: string }[]; note: string;
}

export async function fetchTranslation(text: string): Promise<AiTranslation | null> {
  try {
    const r = await fetch("/api/ai/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    if (!r.ok) return null;
    return (await r.json()) as AiTranslation;
  } catch { return null; }
}

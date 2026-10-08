"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Volume2 } from "lucide-react";
import { streamChat, type ChatMsg } from "@/lib/ai/client";
import { speak } from "@/lib/audio/tts";
import { useT } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/** Pull Kannada-script lines out of a reply so they can be spoken. */
function knLines(text: string): { kn: string; roman: string }[] {
  const lines = text.split("\n");
  const out: { kn: string; roman: string }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/[ಀ-೿][ಀ-೿\s,.?!]*/);
    if (m) {
      const roman = (lines[i].split("—")[1] ?? lines[i + 1] ?? "").replace(/\(.*\)/, "").trim();
      out.push({ kn: m[0].trim(), roman });
    }
  }
  return out;
}

export function Chat({ mode, day, scenario, starter, offline, onTranscript, placeholder }: {
  mode: "tutor" | "talk"; day: number; scenario?: string; starter?: string;
  offline?: (q: string) => string; onTranscript?: (m: ChatMsg[]) => void; placeholder: string;
}) {
  const t = useT();
  const [msgs, setMsgs] = useState<ChatMsg[]>(starter ? [{ role: "assistant", content: starter }] : []);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [aiDown, setAiDown] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const lang = t({ en: "en", hi: "hi" }) as "en" | "hi";
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { onTranscript?.(msgs); }, [msgs, onTranscript]);

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setInput("");
    const next: ChatMsg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setBusy(true);
    try {
      if (aiDown) throw new Error("ai-disabled");
      const history = next.filter((m) => !(starter && m === next[0] && m.role === "assistant" && !scenario));
      setMsgs([...next, { role: "assistant", content: "" }]);
      await streamChat({ mode, day, lang, scenario, messages: history.length ? history : next }, (text) => setMsgs([...next, { role: "assistant", content: text }]));
    } catch {
      setAiDown(true);
      const reply = offline ? offline(q) : t({ en: "The AI tutor is offline right now. Add an ANTHROPIC_API_KEY to enable it. The lessons still work fully.", hi: "AI tutor अभी ऑफ़लाइन है। ANTHROPIC_API_KEY जोड़ें। पाठ पूरी तरह काम करते हैं।" });
      setMsgs([...next, { role: "assistant", content: reply }]);
    } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-[60vh] flex-col">
      <div className="flex-1 space-y-3 pb-4">
        {msgs.map((m, i) => {
          const spoken = m.role === "assistant" ? knLines(m.content) : [];
          return (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[88%] whitespace-pre-wrap rounded-3xl px-4 py-3 font-semibold leading-relaxed shadow-card", m.role === "user" ? "rounded-br-md bg-marigold-3" : "rounded-bl-md bg-white")}>
                <span className={m.role === "assistant" ? "kn-mixed" : ""}>{m.content || (busy ? "…" : "")}</span>
                {spoken.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {spoken.slice(0, 4).map((l, j) => (
                      <button key={j} onClick={() => speak(l.kn, l.roman)} className="flex items-center gap-1 rounded-full bg-sky-2 px-2 py-1 text-xs font-black text-sky"><Volume2 size={12} /> <span className="kn">{l.kn.slice(0, 18)}</span></button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={end} />
      </div>
      <div className="sticky bottom-24 flex items-end gap-2 rounded-3xl border-2 border-line bg-white p-2 shadow-pop lg:bottom-6">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={1} placeholder={placeholder}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 font-bold outline-none" />
        <button onClick={send} disabled={busy || !input.trim()} aria-label="Send" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-cream disabled:opacity-40"><Send size={18} /></button>
      </div>
    </div>
  );
}

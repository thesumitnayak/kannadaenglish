"use client";

import { useEffect, useState } from "react";
import { Chat } from "@/components/practice/Chat";
import { localTutorAnswer } from "@/lib/ai/local";
import { aiAvailable } from "@/lib/ai/client";
import { useT, useLearnerDay } from "@/lib/hooks";
import { useStore } from "@/lib/store";

const SUGGEST = [
  "How do I say 'I'll call you later'?",
  "What's the difference between idu and adu?",
  "Why do people say 'anna' to auto drivers?",
  "Talk to me in Kannada about food",
  "When do I use neenu vs neevu?",
];

export default function GuruPage() {
  const t = useT();
  const day = useLearnerDay();
  const bump = useStore((s) => s.bump);
  const [aiOn, setAiOn] = useState<boolean | null>(null);
  const [seed, setSeed] = useState<string | undefined>();
  useEffect(() => { aiAvailable().then(setAiOn); }, []);
  const starter = t({ en: `Namaskara! 🙏 I'm your Kannada Guru. You're on Day ${day}, so I'll keep my Kannada at your level. Ask me how to say something, why a word is used, or say "talk to me in Kannada".`, hi: `Namaskara! 🙏 मैं आपका Kannada Guru हूँ। आप Day ${day} पर हैं, तो मैं अपनी कन्नड़ आपके स्तर पर रखूँगा। पूछिए कुछ कैसे कहें, कोई शब्द क्यों, या कहिए "talk to me in Kannada"।` });
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black tracking-tight">🤖 Kannada Guru</h1>
          <p className="font-semibold text-ink-3">{t({ en: "Your personal tutor, tuned to your current day.", hi: "आपका निजी tutor, आपके मौजूदा दिन के अनुसार।" })}</p>
        </div>
        {aiOn !== null && <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${aiOn ? "bg-leaf-2 text-leaf" : "bg-cream-2 text-ink-3"}`}>{aiOn ? "● AI on" : "○ Offline phrasebook"}</span>}
      </div>
      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {SUGGEST.map((s) => <button key={s} onClick={() => setSeed(s + " ")} className="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink-2">{s}</button>)}
      </div>
      <Chat key={seed ?? "x"} mode="tutor" day={day} starter={starter} offline={localTutorAnswer} placeholder={seed ?? t({ en: "Ask the Guru…", hi: "गुरु से पूछें…" })}
        onTranscript={(m) => { if (m.some((x) => x.role === "user")) bump("guru"); }} />
    </div>
  );
}

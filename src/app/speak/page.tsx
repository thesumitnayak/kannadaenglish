"use client";

import { useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import { sentencesUpTo } from "@/content/course";
import { useStore } from "@/lib/store";
import { useT, useLearnerDay, useScriptMode } from "@/lib/hooks";
import { speakExercise, type Exercise } from "@/lib/engine/session";
import { SpeakView, type Answer } from "@/components/lesson/Exercises";
import { Card, SectionTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Ring } from "@/components/ui/Progress";
import { XP } from "@/content/levels";
import { sample } from "@/lib/engine/text";
import { sttSupported } from "@/lib/audio/stt";

type SpeakEx = Extract<Exercise, { kind: "speak" }>;

export default function SpeakPage() {
  const t = useT();
  const day = useLearnerDay();
  const mode = useScriptMode();
  const speaking = useStore((s) => s.speaking);
  const recordSpeaking = useStore((s) => s.recordSpeaking);
  const recordAnswer = useStore((s) => s.recordAnswer);
  const addXp = useStore((s) => s.addXp);
  const touch = useStore((s) => s.touchStreak);
  const pool = useMemo(() => sentencesUpTo(Math.max(day, 2)), [day]);
  const [deck, setDeck] = useState(() => sample(pool, 8));
  const [cur, setCur] = useState<SpeakEx | null>(null);
  const [last, setLast] = useState<number | null>(null);

  const avgScore = speaking.length ? Math.round((speaking.slice(0, 30).reduce((a, b) => a + b.score, 0) / Math.min(30, speaking.length)) * 100) : 0;

  const onAnswer = (a: Answer) => {
    if (!cur) return;
    const sc = a.speechScore ?? 0;
    recordSpeaking({ at: Date.now(), target: cur.roman, heard: a.heard ?? "", score: sc, mode: a.mode ?? "self" });
    if (cur.ref) recordAnswer({ key: `${cur.ref.t}:${cur.ref.id}`, skill: "speaking", ok: a.ok, perfect: a.perfect });
    addXp(Math.round(XP.speaking * Math.max(0.4, sc)), "Speaking practice");
    touch();
    setLast(sc);
    setCur(null);
  };

  if (cur) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col">
        <button onClick={() => setCur(null)} className="mb-4 self-start text-sm font-extrabold text-ink-3">← {t({ en: "Back", hi: "वापस" })}</button>
        <SpeakView key={cur.id} ex={cur} mode={mode} locked={false} onAnswer={onAnswer} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">🎤 {t({ en: "Speaking practice", hi: "बोलने का अभ्यास" })}</h1>
        <p className="mt-1 font-semibold text-ink-3">{t({ en: "Hear it, say it, get a score. Sentences come from what you've learned.", hi: "सुनिए, बोलिए, स्कोर पाइए। वाक्य आपके सीखे हुए पाठों से।" })}</p>
      </div>
      <Card className="flex items-center gap-5">
        <Ring value={avgScore} size={84} color="#d1462f" track="#ffe3dc"><span className="text-xl font-black">{avgScore}%</span></Ring>
        <div>
          <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Speaking score", hi: "बोलने का स्कोर" })}</div>
          <div className="text-lg font-black">{speaking.length} {t({ en: "attempts", hi: "प्रयास" })}</div>
          {last !== null && <div className="font-bold text-leaf">{t({ en: "Last", hi: "पिछला" })}: {Math.round(last * 100)}% 🎉</div>}
          {!sttSupported() && <div className="mt-1 text-sm font-bold text-ink-3">{t({ en: "Mic recognition isn't available in this browser; self-check mode is on.", hi: "इस ब्राउज़र में माइक पहचान नहीं; खुद-जाँच मोड चालू है।" })}</div>}
        </div>
      </Card>
      <section>
        <SectionTitle action={<Button size="sm" variant="secondary" onClick={() => setDeck(sample(pool, 8))}><Shuffle size={15} /> {t({ en: "New set", hi: "नया सेट" })}</Button>}>{t({ en: "Pick a sentence", hi: "वाक्य चुनें" })}</SectionTitle>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {deck.map((s) => (
            <button key={s.id} onClick={() => setCur(speakExercise(s, { t: "s", id: s.id }) as SpeakEx)}
              className="rounded-2xl border border-line bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5">
              <div className="kn font-semibold text-ink-2">{s.kn}</div>
              <div className="font-black">{s.roman}</div>
              <div className="text-sm font-semibold text-ink-3">{t(s)}</div>
            </button>
          ))}
        </div>
      </section>
      {speaking.length > 0 && (
        <section>
          <SectionTitle>{t({ en: "Recent attempts", hi: "हाल के प्रयास" })}</SectionTitle>
          <div className="space-y-2">
            {speaking.slice(0, 8).map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-white px-4 py-2.5 shadow-card">
                <div className="min-w-0"><div className="truncate font-black">{a.target}</div>{a.heard && a.mode === "mic" && <div className="truncate text-sm text-ink-3">“{a.heard}”</div>}</div>
                <span className="font-black tabular-nums">{Math.round(a.score * 100)}%</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

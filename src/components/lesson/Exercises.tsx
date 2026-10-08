"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbulb, Mic, MicOff, Square, Check } from "lucide-react";
import type { Exercise } from "@/lib/engine/session";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";
import { Kn } from "@/components/ui/Kn";
import { FormalityBadge } from "@/components/ui/Badge";
import { useT, type ScriptMode } from "@/lib/hooks";
import { speak } from "@/lib/audio/tts";
import { listenOnce, scoreSpeech, speechFeedback, sttSupported } from "@/lib/audio/stt";
import { matchAnswer } from "@/lib/engine/text";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export interface Answer { ok: boolean; perfect: boolean; given: string; speechScore?: number; heard?: string; mode?: "mic" | "self" }

type Ex<K extends Exercise["kind"]> = Extract<Exercise, { kind: K }>;

/* ---------- Word card ---------- */
export function VocabCardView({ ex, mode, onDone }: { ex: Ex<"card">; mode: ScriptMode; onDone: () => void }) {
  const t = useT();
  const v = ex.vocab;
  const rate = useStore((s) => s.settings.ttsRate);
  useEffect(() => { speak(v.kn, v.roman, rate); }, [v.kn, v.roman, rate]);
  return (
    <div className="flex flex-1 flex-col">
      <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "New word", hi: "नया शब्द" })}</div>
      <div className="mt-3 rounded-[2rem] border border-line bg-white p-6 shadow-card animate-pop">
        <div className="flex items-start justify-between gap-3">
          <Kn kn={v.kn} roman={v.roman} mode={mode === "kannada" ? "both" : mode} size="xl" />
          <FormalityBadge f={v.formality} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-cream p-3"><div className="text-[11px] font-black uppercase tracking-widest text-ink-3">English</div><div className="text-lg font-black">{v.en}</div></div>
          <div className="rounded-2xl bg-cream p-3"><div className="text-[11px] font-black uppercase tracking-widest text-ink-3">हिंदी</div><div className="text-lg font-black">{v.hi}</div></div>
        </div>
        <div className="mt-4"><AudioButton kn={v.kn} roman={v.roman} size="lg" /></div>
        {v.context && <div className="mt-4 rounded-2xl bg-sky-2 p-3 text-sm font-semibold text-ink-2">📍 {t(v.context)}</div>}
        {v.bridge && <div className="mt-3 rounded-2xl bg-plum-2 p-3 text-sm font-semibold text-ink-2">🌉 {t(v.bridge)}</div>}
        {v.example && (
          <div className="mt-4 border-t border-line pt-4">
            <div className="text-[11px] font-black uppercase tracking-widest text-ink-3">{t({ en: "Example", hi: "उदाहरण" })}</div>
            <div className="mt-1 flex items-start justify-between gap-2">
              <div>
                <div className="kn font-semibold">{v.example.kn}</div>
                <div className="font-black">{v.example.roman}</div>
                <div className="text-sm font-semibold text-ink-3">{t(v.example)}</div>
              </div>
              <AudioButton kn={v.example.kn} roman={v.example.roman} size="sm" showSlow={false} />
            </div>
          </div>
        )}
      </div>
      <Button className="mt-auto" size="xl" block onClick={onDone}>{t({ en: "Got it", hi: "समझ गया" })}</Button>
    </div>
  );
}

/* ---------- Multiple choice / listening ---------- */
export function MCQView({ ex, mode, familiar, locked, onAnswer }: { ex: Ex<"mcq">; mode: ScriptMode; familiar: boolean; locked: boolean; onAnswer: (a: Answer) => void }) {
  const t = useT();
  const [sel, setSel] = useState<string | null>(null);
  const rate = useStore((s) => s.settings.ttsRate);
  useEffect(() => { if (ex.audioOnly && ex.kn && ex.roman) speak(ex.kn, ex.roman, rate); }, [ex.id, ex.audioOnly, ex.kn, ex.roman, rate]);
  const submit = () => { if (sel) onAnswer({ ok: sel === ex.answer, perfect: sel === ex.answer, given: sel }); };
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-2xl font-black leading-tight">{t(ex.prompt)}</h2>
      {ex.kn && ex.roman && (
        <div className="mt-5 flex items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-card">
          <AudioButton kn={ex.kn} roman={ex.roman} size={ex.audioOnly ? "lg" : "md"} />
          {ex.audioOnly && !locked ? (
            <div className="text-sm font-bold text-ink-3">{t({ en: "Tap 🔊 to replay. 🐌 for slow.", hi: "🔊 दबाकर फिर सुनें। 🐌 धीरे।" })}</div>
          ) : (
            <Kn kn={ex.kn} roman={ex.roman} mode={mode} size="lg" familiar={familiar} />
          )}
        </div>
      )}
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {ex.options.map((o, i) => {
          const isSel = sel === o.label;
          const showOk = locked && o.label === ex.answer;
          const showBad = locked && isSel && o.label !== ex.answer;
          return (
            <button key={o.label + i} disabled={locked} onClick={() => setSel(o.label)}
              className={cn("flex min-h-14 items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 text-left font-extrabold transition active:scale-[0.99]",
                showOk ? "border-leaf bg-leaf-2" : showBad ? "border-brick-2 bg-brick-3" : isSel ? "border-sky bg-sky-2 shadow-[0_3px_0_0_#3b6fd9]" : "border-line shadow-[0_3px_0_0_#eadfc9] hover:bg-cream")}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-line text-xs font-black text-ink-3">{i + 1}</span>
              <span className="flex flex-col">
                {o.kn && mode !== "roman" ? <span className="kn text-lg">{o.kn}</span> : null}
                <span>{o.label}</span>
                {o.kn && mode === "roman" ? <span className="kn text-xs font-semibold text-ink-3">{o.kn}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
      {!locked && <Button className="mt-auto" size="xl" block disabled={!sel} onClick={submit}>{t({ en: "Check", hi: "जाँचें" })}</Button>}
    </div>
  );
}

/* ---------- Sentence building ---------- */
export function BuildView({ ex, mode, locked, onAnswer }: { ex: Ex<"build">; mode: ScriptMode; locked: boolean; onAnswer: (a: Answer) => void }) {
  const t = useT();
  const [chosen, setChosen] = useState<number[]>([]);
  const remaining = ex.pieces.map((p, i) => ({ ...p, i })).filter((p) => !chosen.includes(p.i));
  const label = (p: { roman: string; kn?: string }) => (mode === "kannada" && p.kn ? p.kn : p.roman);
  const submit = () => {
    const given = chosen.map((i) => ex.pieces[i].roman);
    const ok = given.join(" ").toLowerCase().replace(/[,.?!]/g, "") === ex.answer.join(" ").toLowerCase().replace(/[,.?!]/g, "");
    onAnswer({ ok, perfect: ok, given: given.join(" ") });
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Build the sentence", hi: "वाक्य बनाइए" })}</div>
      <h2 className="mt-1 text-2xl font-black leading-tight">“{t(ex.prompt)}”</h2>
      <div className={cn("mt-5 flex min-h-24 flex-wrap content-start gap-2 rounded-3xl border-2 border-dashed p-3", locked ? "border-line bg-white" : "border-ink-3/30 bg-white/60")}>
        {chosen.length === 0 && <span className="m-auto text-sm font-bold text-ink-3">{t({ en: "Tap the words in order", hi: "शब्दों को क्रम से दबाइए" })}</span>}
        {chosen.map((i) => (
          <button key={i} disabled={locked} onClick={() => setChosen(chosen.filter((c) => c !== i))}
            className={cn("rounded-xl border-2 border-line bg-cream px-3 py-2 font-extrabold shadow-[0_2px_0_0_#eadfc9] animate-pop", mode === "kannada" && ex.pieces[i].kn && "kn")}>{label(ex.pieces[i])}</button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {remaining.map((p) => (
          <button key={p.i} disabled={locked} onClick={() => setChosen([...chosen, p.i])}
            className={cn("rounded-xl border-2 border-line bg-white px-3 py-2 font-extrabold shadow-[0_3px_0_0_#eadfc9] transition active:translate-y-[2px] active:shadow-none", mode === "kannada" && p.kn && "kn")}>{label(p)}</button>
        ))}
      </div>
      {mode !== "roman" && <div className="mt-3 text-xs font-bold text-ink-3">{t({ en: "Tip: words show in Kannada script. Hear the full sentence after checking.", hi: "शब्द कन्नड़ लिपि में हैं। जाँचने के बाद पूरा वाक्य सुनें।" })}</div>}
      {!locked && <Button className="mt-auto" size="xl" block disabled={chosen.length !== ex.pieces.length} onClick={submit}>{t({ en: "Check", hi: "जाँचें" })}</Button>}
    </div>
  );
}

/* ---------- Typed translation ---------- */
export function TypeView({ ex, locked, onAnswer }: { ex: Ex<"type">; locked: boolean; onAnswer: (a: Answer) => void }) {
  const t = useT();
  const [val, setVal] = useState("");
  const [hint, setHint] = useState(false);
  const submit = () => {
    const m = matchAnswer(val, ex.answer, ex.acceptable);
    onAnswer({ ok: m.ok, perfect: m.perfect || m.score > 0.95, given: val });
  };
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-2xl font-black leading-tight">{t(ex.prompt)}</h2>
      {ex.source && (
        <div className="mt-5 rounded-3xl border border-line bg-white p-5 shadow-card">
          <div className="text-xl font-black">{ex.source.en}</div>
          <div className="mt-1 font-bold text-ink-3">{ex.source.hi}</div>
        </div>
      )}
      <textarea value={val} disabled={locked} onChange={(e) => setVal(e.target.value)} rows={2} autoCapitalize="none" autoCorrect="off" spellCheck={false}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && val.trim() && !locked) { e.preventDefault(); submit(); } }}
        placeholder={t({ en: "Type in roman Kannada, e.g. Nanage neeru beku", hi: "रोमन कन्नड़ में लिखिए, जैसे Nanage neeru beku" })}
        className="mt-5 w-full resize-none rounded-2xl border-2 border-line bg-white p-4 text-lg font-bold outline-none focus:border-sky" />
      <div className="mt-2 flex items-center justify-between text-sm">
        {ex.hint && !locked ? (
          <button onClick={() => setHint(true)} className="flex items-center gap-1 font-extrabold text-sky"><Lightbulb size={16} /> {hint ? `${t({ en: "Starts with", hi: "शुरुआत" })}: “${ex.hint}…”` : t({ en: "Hint", hi: "संकेत" })}</button>
        ) : <span />}
        <span className="font-bold text-ink-3">{t({ en: "Small spelling slips are OK", hi: "छोटी वर्तनी गलतियाँ चलेंगी" })}</span>
      </div>
      {!locked && <Button className="mt-auto" size="xl" block disabled={!val.trim()} onClick={submit}>{t({ en: "Check", hi: "जाँचें" })}</Button>}
    </div>
  );
}

/* ---------- Speaking ---------- */
export function SpeakView({ ex, mode, locked, onAnswer }: { ex: Ex<"speak">; mode: ScriptMode; locked: boolean; onAnswer: (a: Answer) => void }) {
  const t = useT();
  const supported = useMemo(() => sttSupported(), []);
  const [state, setState] = useState<"idle" | "listening" | "scored" | "error">("idle");
  const [result, setResult] = useState<{ score: number; heard: string } | null>(null);
  const [selfMode, setSelfMode] = useState(!supported);
  const stopRef = useRef<() => void>(() => {});

  const record = async () => {
    setState("listening");
    const { promise, stop } = listenOnce("kn-IN");
    stopRef.current = stop;
    const heard = await promise;
    if (heard.error && !heard.transcripts.length) {
      setState("error");
      if (heard.error === "not-allowed" || heard.error === "service-not-allowed" || heard.error === "unsupported") setSelfMode(true);
      return;
    }
    const sc = scoreSpeech(heard.transcripts, ex.kn, ex.roman);
    setResult({ score: sc.score, heard: sc.best });
    setState("scored");
  };

  const fb = result ? speechFeedback(result.score) : null;
  return (
    <div className="flex flex-1 flex-col">
      <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Say it out loud", hi: "ज़ोर से बोलिए" })}</div>
      <div className="mt-3 rounded-[2rem] border border-line bg-white p-6 shadow-card">
        <Kn kn={ex.kn} roman={ex.roman} mode={mode === "kannada" ? "both" : mode} size="lg" />
        <div className="mt-2 font-bold text-ink-3">{ex.en} · {ex.hi}</div>
        <div className="mt-4"><AudioButton kn={ex.kn} roman={ex.roman} /></div>
      </div>

      {!selfMode ? (
        <div className="mt-6 flex flex-col items-center">
          <button disabled={locked} onClick={state === "listening" ? () => stopRef.current() : record}
            className={cn("flex h-24 w-24 items-center justify-center rounded-full text-white shadow-pop transition active:scale-95",
              state === "listening" ? "animate-pulse bg-brick" : "bg-brick hover:brightness-110")} aria-label="Record">
            {state === "listening" ? <Square size={34} fill="currentColor" /> : <Mic size={40} />}
          </button>
          <div className="mt-3 text-sm font-bold text-ink-3">
            {state === "listening" ? t({ en: "Listening… speak now", hi: "सुन रहे हैं… अब बोलिए" }) : state === "error" ? t({ en: "Didn't catch that. Try again or self-check.", hi: "सुनाई नहीं दिया। फिर कोशिश करें या खुद जाँचें।" }) : t({ en: "Tap the mic and say the sentence", hi: "माइक दबाकर वाक्य बोलिए" })}
          </div>
          {result && fb && (
            <div className="mt-5 w-full rounded-3xl bg-white p-5 shadow-card animate-pop">
              <div className="flex items-center justify-between">
                <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Your pronunciation", hi: "आपका उच्चारण" })}</div>
                <div className={cn("rounded-full px-3 py-1 text-lg font-black", result.score >= 0.75 ? "bg-leaf-2 text-leaf" : result.score >= 0.55 ? "bg-marigold-3 text-[#8a6200]" : "bg-brick-3 text-brick")}>🎤 {Math.round(result.score * 100)}%</div>
              </div>
              <div className="mt-2 text-lg font-bold">“{result.heard || "…"}”</div>
              <div className="mt-2 font-semibold text-ink-2">{fb.emoji} {t(fb)}</div>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={record} className="flex-1"><Mic size={18} /> {t({ en: "Try again", hi: "फिर से" })}</Button>
                <Button className="flex-1" onClick={() => onAnswer({ ok: result.score >= 0.55, perfect: result.score >= 0.85, given: result.heard, speechScore: result.score, heard: result.heard, mode: "mic" })}><Check size={18} /> {t({ en: "Done", hi: "हो गया" })}</Button>
              </div>
            </div>
          )}
          <button onClick={() => setSelfMode(true)} className="mt-5 flex items-center gap-1 text-sm font-bold text-ink-3 underline"><MicOff size={14} /> {t({ en: "No mic? Self-check instead", hi: "माइक नहीं? खुद जाँचें" })}</button>
        </div>
      ) : (
        <div className="mt-6">
          <div className="rounded-2xl bg-sky-2 p-4 text-sm font-bold text-ink-2">
            {supported ? t({ en: "Self-check mode: play the audio, say it aloud 3 times, then rate yourself honestly.", hi: "खुद जाँच मोड: ऑडियो सुनें, 3 बार ज़ोर से बोलें, फिर ईमानदारी से रेट करें।" })
              : t({ en: "Speech recognition isn't available in this browser. Play the audio, say it aloud 3 times, then rate yourself.", hi: "इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं। ऑडियो सुनें, 3 बार बोलें, फिर खुद को रेट करें।" })}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[[0.4, "😅", { en: "Needs work", hi: "सुधार चाहिए" }], [0.7, "🙂", { en: "Okay", hi: "ठीक" }], [0.95, "😎", { en: "Nailed it", hi: "एकदम सही" }]].map(([sc, e, l]) => (
              <button key={String(sc)} disabled={locked} onClick={() => onAnswer({ ok: (sc as number) >= 0.55, perfect: (sc as number) >= 0.9, given: "self", speechScore: sc as number, mode: "self" })}
                className="rounded-2xl border-2 border-line bg-white p-3 text-center font-extrabold shadow-[0_3px_0_0_#eadfc9] active:translate-y-[2px] active:shadow-none">
                <div className="text-3xl">{e as string}</div><div className="text-sm">{t(l as { en: string; hi: string })}</div>
              </button>
            ))}
          </div>
          {supported && <button onClick={() => setSelfMode(false)} className="mt-4 w-full text-center text-sm font-bold text-ink-3 underline">{t({ en: "Use microphone instead", hi: "माइक इस्तेमाल करें" })}</button>}
        </div>
      )}
    </div>
  );
}

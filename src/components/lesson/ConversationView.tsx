"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Conversation, ConversationOption } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { AudioButton } from "@/components/ui/AudioButton";
import { useT, type ScriptMode } from "@/lib/hooks";
import { speak } from "@/lib/audio/tts";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import { shuffle } from "@/lib/engine/text";

export interface ConvoOutcome { firstTry: number; prompts: number; wrong: { prompt: string; given: string; correct: string; correctKn: string; why?: string }[] }

/** Plays a scripted conversation line by line; the learner picks replies at prompt points. */
export function ConversationView({ conv, mode, onDone }: { conv: Conversation; mode: ScriptMode; onDone: (o: ConvoOutcome) => void }) {
  const t = useT();
  const rate = useStore((s) => s.settings.ttsRate);
  const [shown, setShown] = useState(1);
  const [promptIdx, setPromptIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [outcome, setOutcome] = useState<ConvoOutcome>({ firstTry: 0, prompts: conv.prompts?.length ?? 0, wrong: [] });
  const [showTr, setShowTr] = useState(mode === "roman");
  const end = useRef<HTMLDivElement>(null);
  const prompts = useMemo(() => conv.prompts ?? [], [conv.prompts]);
  const prompt = prompts[promptIdx];
  const atPrompt = prompt && shown - 1 >= prompt.afterLine && picked === null;
  const options = useMemo<ConversationOption[][]>(() => prompts.map((p) => shuffle(p.options)), [prompts]);
  const finished = shown >= conv.lines.length && promptIdx >= prompts.length;

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [shown, picked, promptIdx]);
  useEffect(() => {
    const l = conv.lines[shown - 1];
    if (l) speak(l.kn, l.roman, rate);
  }, [shown, conv.lines, rate]);

  const advance = () => {
    if (prompt && shown - 1 >= prompt.afterLine) return;
    if (shown < conv.lines.length) setShown(shown + 1);
  };

  const choose = (i: number) => {
    const opt = options[promptIdx][i];
    setPicked(i);
    if (opt.correct) {
      if (tries === 0) setOutcome((o) => ({ ...o, firstTry: o.firstTry + 1 }));
    } else if (tries === 0) {
      const right = prompt.options.find((o) => o.correct)!;
      setOutcome((o) => ({ ...o, wrong: [...o.wrong, { prompt: t(prompt.question), given: opt.roman, correct: right.roman, correctKn: right.kn, why: opt.feedback ? t(opt.feedback) : undefined }] }));
    }
  };

  const afterPick = () => {
    const opt = options[promptIdx][picked!];
    if (!opt.correct) { setPicked(null); setTries(tries + 1); return; }
    setPicked(null); setTries(0);
    // the learner's reply is usually the next scripted line — reveal it
    const nextShown = Math.min(conv.lines.length, prompt.afterLine + 2);
    setShown(Math.max(shown, nextShown));
    setPromptIdx(promptIdx + 1);
  };

  const speakerName = (sp: "A" | "B") => conv.speakers?.[sp] ?? sp;
  const isYou = (sp: "A" | "B") => /you/i.test(speakerName(sp));

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Conversation", hi: "बातचीत" })}</div>
          <h2 className="text-2xl font-black leading-tight">{t(conv.title)}</h2>
          {conv.setting && <p className="font-semibold text-ink-3">{t(conv.setting)}</p>}
        </div>
        <button onClick={() => setShowTr(!showTr)} className="shrink-0 rounded-xl bg-cream-2 px-3 py-1.5 text-xs font-black text-ink-2">{showTr ? t({ en: "Hide meaning", hi: "मतलब छिपाएँ" }) : t({ en: "Show meaning", hi: "मतलब दिखाएँ" })}</button>
      </div>

      <div className="mt-5 space-y-3" onClick={advance}>
        {conv.lines.slice(0, shown).map((l, i) => {
          const you = isYou(l.speaker);
          return (
            <div key={i} className={cn("flex animate-rise", you ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] rounded-3xl px-4 py-3 shadow-card", you ? "rounded-br-md bg-marigold-3" : "rounded-bl-md bg-white")}>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-ink-3">{speakerName(l.speaker)}</span>
                  <AudioButton kn={l.kn} roman={l.roman} size="sm" showSlow={false} />
                </div>
                {mode !== "roman" && <div className="kn text-lg font-semibold">{l.kn}</div>}
                <div className={cn("font-black", mode === "roman" ? "text-lg" : "text-sm text-ink-2")}>{l.roman}</div>
                {mode === "roman" && <div className="kn text-xs font-semibold text-ink-3">{l.kn}</div>}
                {showTr && <div className="mt-1 text-sm font-semibold text-ink-3">{t(l)}</div>}
              </div>
            </div>
          );
        })}
        <div ref={end} />
      </div>

      {atPrompt && (
        <div className="mt-5 rounded-3xl border-2 border-marigold bg-white p-4 animate-pop">
          <div className="font-black">🗣️ {t(prompt.question)}</div>
          <div className="mt-3 space-y-2">
            {options[promptIdx].map((o, i) => (
              <button key={i} onClick={() => choose(i)} className="w-full rounded-2xl border-2 border-line bg-white p-3 text-left shadow-[0_3px_0_0_#eadfc9] transition hover:bg-cream active:translate-y-[2px] active:shadow-none">
                {mode !== "roman" && <div className="kn font-semibold">{o.kn}</div>}
                <div className="font-black">{o.roman}</div>
                {showTr && <div className="text-sm font-semibold text-ink-3">{o.en}</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {picked !== null && prompt && (() => {
        const o = options[promptIdx][picked];
        const right = prompt.options.find((x) => x.correct)!;
        return (
          <div className={cn("mt-5 rounded-3xl p-4 animate-pop", o.correct ? "bg-leaf-2" : "bg-marigold-3")}>
            <div className={cn("text-lg font-black", o.correct ? "text-leaf" : "text-[#8a6200]")}>{o.correct ? t({ en: "Perfect reply! 🎉", hi: "बढ़िया जवाब! 🎉" }) : t({ en: "Almost! 😊", hi: "लगभग! 😊" })}</div>
            {!o.correct && <div className="mt-1 font-semibold text-ink-2">{o.feedback ? t(o.feedback) : t({ en: `That means "${o.en}".`, hi: `इसका मतलब है "${o.en}"।` })} {t({ en: "A better reply:", hi: "बेहतर जवाब:" })} <b>{right.roman}</b></div>}
            <Button className="mt-3" block variant={o.correct ? "success" : "primary"} onClick={afterPick}>{o.correct ? t({ en: "Continue", hi: "आगे" }) : t({ en: "Try again", hi: "फिर कोशिश करें" })}</Button>
          </div>
        );
      })()}

      {!atPrompt && picked === null && !finished && (
        <Button className="mt-6" size="lg" variant="secondary" block onClick={advance}>{t({ en: "Next line", hi: "अगली लाइन" })} ▸</Button>
      )}
      {finished && picked === null && (
        <div className="mt-6 animate-pop">
          <div className="mb-3 text-center font-black text-leaf">✅ {t({ en: "Conversation complete!", hi: "बातचीत पूरी!" })} {outcome.prompts ? `${outcome.firstTry}/${outcome.prompts} ${t({ en: "first try", hi: "पहली बार में" })}` : ""}</div>
          <Button size="xl" block onClick={() => onDone(outcome)}>{t({ en: "Continue", hi: "आगे" })}</Button>
        </div>
      )}
    </div>
  );
}

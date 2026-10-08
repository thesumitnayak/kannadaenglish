"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SCRIPT, MATRAS } from "@/content/script";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/hooks";
import { AudioButton } from "@/components/ui/AudioButton";
import { Button } from "@/components/ui/Button";
import { Card, SectionTitle } from "@/components/ui/Card";
import { shuffle, sample } from "@/lib/engine/text";
import { cn } from "@/lib/cn";

/** Tracing: letter drawn faintly on canvas, user draws over it, we score coverage. */
function Tracer({ kn, onScore }: { kn: string; onScore: (pct: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mask = useRef<Uint8ClampedArray | null>(null);
  const drawing = useRef(false);
  const [scored, setScored] = useState<number | null>(null);
  const size = 300;

  const reset = useCallback(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#e4dccb"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `800 200px "Noto Sans Kannada", "Kannada Sangam MN", sans-serif`;
    ctx.fillText(kn, size / 2, size / 2 + 10);
    mask.current = ctx.getImageData(0, 0, size, size).data.slice();
    setScored(null);
  }, [kn]);
  useEffect(() => { const t = setTimeout(reset, 50); return () => clearTimeout(t); }, [reset]);

  const pos = (e: React.PointerEvent) => { const r = ref.current!.getBoundingClientRect(); return { x: ((e.clientX - r.left) / r.width) * size, y: ((e.clientY - r.top) / r.height) * size }; };
  const down = (e: React.PointerEvent) => { drawing.current = true; const ctx = ref.current!.getContext("2d")!; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
  const move = (e: React.PointerEvent) => { if (!drawing.current) return; const ctx = ref.current!.getContext("2d")!; const p = pos(e); ctx.lineWidth = 22; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#d1462f"; ctx.lineTo(p.x, p.y); ctx.stroke(); };
  const up = () => { drawing.current = false; };
  const score = () => {
    const ctx = ref.current!.getContext("2d")!; const now = ctx.getImageData(0, 0, size, size).data; const m = mask.current!;
    let letter = 0, covered = 0, outside = 0;
    for (let i = 0; i < m.length; i += 4) {
      const inLetter = m[i + 3] > 0;
      const drawn = now[i] > 180 && now[i + 1] < 120; // red ink
      if (inLetter) { letter++; if (drawn) covered++; } else if (drawn) outside++;
    }
    const cov = letter ? covered / letter : 0;
    const penalty = Math.min(0.5, outside / Math.max(letter, 1) * 0.6);
    const pct = Math.round(Math.max(0, cov - penalty) * 100);
    setScored(pct); onScore(pct);
  };
  return (
    <div className="flex flex-col items-center">
      <canvas ref={ref} width={size} height={size} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} className="aspect-square w-full max-w-[300px] touch-none rounded-3xl border-2 border-line bg-white" />
      <div className="mt-3 flex gap-2">
        <Button size="sm" variant="secondary" onClick={reset}>Clear</Button>
        <Button size="sm" onClick={score}>Check tracing</Button>
      </div>
      {scored !== null && <div className={cn("mt-2 font-black", scored >= 60 ? "text-leaf" : "text-[#8a6200]")}>{scored >= 80 ? "Beautiful! " : scored >= 60 ? "Good shape! " : "Almost — trace along the grey. "}{scored}%</div>}
    </div>
  );
}

export default function ScriptPage() {
  const t = useT();
  const seeScript = useStore((s) => s.seeScript);
  const addXp = useStore((s) => s.addXp);
  const [tab, setTab] = useState<"learn" | "quiz" | "trace">("learn");
  const [group, setGroup] = useState<"vowel" | "consonant">("vowel");
  const [sel, setSel] = useState(SCRIPT[0]);
  const letters = SCRIPT.filter((l) => l.group === group);
  useEffect(() => { seeScript([sel.id]); }, [sel, seeScript]);

  // quiz
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [qScore, setQScore] = useState(0);
  const quiz = useMemo(() => sample(SCRIPT.filter((l) => l.group !== "matra" && !["nga", "nya", "ah", "ru"].includes(l.id)), 10).map((l, i) => {
    const others = sample(SCRIPT.filter((x) => x.id !== l.id && x.group === l.group), 3);
    return i % 2 === 0
      ? { type: "sound" as const, letter: l, options: shuffle([l, ...others]).map((x) => x.roman), answer: l.roman }
      : { type: "letter" as const, letter: l, options: shuffle([l, ...others]).map((x) => x.kn), answer: l.kn };
  }), [tab]); // eslint-disable-line react-hooks/exhaustive-deps
  const q = quiz[qi];
  const answerQ = (o: string) => {
    if (picked) return;
    setPicked(o);
    if (o === q.answer) { setQScore((x) => x + 1); addXp(5, "Script quiz"); }
    seeScript([q.letter.id]);
    setTimeout(() => { setPicked(null); setQi((i) => i + 1); }, 900);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black tracking-tight">ಅ {t({ en: "Learn Kannada script", hi: "कन्नड़ लिपि सीखें" })}</h1>
        <p className="mt-1 font-semibold text-ink-3">{t({ en: "Optional but fun. Start with vowels, then the most common consonants.", hi: "वैकल्पिक पर मज़ेदार। पहले स्वर, फिर सबसे आम व्यंजन।" })}</p>
      </div>
      <div className="flex rounded-2xl bg-cream-2 p-1 font-black">
        {(["learn", "quiz", "trace"] as const).map((k) => <button key={k} onClick={() => { setTab(k); setQi(0); setQScore(0); }} className={cn("flex-1 rounded-xl py-2 text-sm", tab === k ? "bg-white shadow" : "text-ink-3")}>{k === "learn" ? t({ en: "Letters", hi: "अक्षर" }) : k === "quiz" ? t({ en: "Recognise", hi: "पहचानें" }) : t({ en: "Trace", hi: "ट्रेस" })}</button>)}
      </div>

      {tab === "learn" && (
        <>
          <div className="flex gap-2">{(["vowel", "consonant"] as const).map((g) => <button key={g} onClick={() => setGroup(g)} className={cn("rounded-xl border-2 px-3 py-1.5 text-sm font-extrabold", group === g ? "border-marigold bg-marigold-3" : "border-line bg-white")}>{g === "vowel" ? t({ en: "Vowels (ಸ್ವರ)", hi: "स्वर (ಸ್ವರ)" }) : t({ en: "Consonants (ವ್ಯಂಜನ)", hi: "व्यंजन (ವ್ಯಂಜನ)" })}</button>)}</div>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
            {letters.map((l) => <button key={l.id} onClick={() => setSel(l)} className={cn("kn aspect-square rounded-2xl border-2 text-2xl font-bold transition", sel.id === l.id ? "border-marigold bg-marigold-3" : "border-line bg-white hover:bg-cream")}>{l.kn}</button>)}
          </div>
          <Card className="flex items-center gap-5 animate-pop" key={sel.id}>
            <div className="kn flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-ink text-7xl font-extrabold text-marigold">{sel.kn}</div>
            <div className="min-w-0">
              <div className="text-3xl font-black">{sel.roman}</div>
              <div className="mt-2 flex items-center gap-2"><AudioButton kn={sel.example.kn} roman={sel.example.roman} size="sm" showSlow={false} /><div><div className="kn text-lg font-bold">{sel.example.kn}</div><div className="text-sm font-bold text-ink-3">{sel.example.roman} · {sel.example.en}</div></div></div>
            </div>
          </Card>
          <Card>
            <SectionTitle>{t({ en: "Vowel signs on ಕ", hi: "ಕ पर स्वर चिह्न" })}</SectionTitle>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">{MATRAS.map((m) => <div key={m.kn} className="rounded-xl bg-cream p-2 text-center"><div className="kn text-2xl font-bold">{m.kn}</div><div className="text-xs font-bold text-ink-3">{m.roman}</div></div>)}</div>
          </Card>
        </>
      )}

      {tab === "quiz" && (q ? (
        <Card className="animate-rise" key={qi}>
          <div className="text-sm font-black uppercase tracking-widest text-ink-3">{qi + 1}/10 · {t({ en: "Score", hi: "स्कोर" })} {qScore}</div>
          <h2 className="mt-1 text-xl font-black">{q.type === "sound" ? t({ en: "Which sound is this letter?", hi: "यह अक्षर कौन सी ध्वनि है?" }) : t({ en: `Which letter is "${q.letter.roman}"?`, hi: `"${q.letter.roman}" कौन सा अक्षर है?` })}</h2>
          {q.type === "sound" && <div className="kn my-5 text-center text-8xl font-extrabold">{q.letter.kn}</div>}
          <div className={cn("mt-4 grid gap-2", q.type === "letter" ? "grid-cols-4" : "grid-cols-2")}>
            {q.options.map((o) => <button key={o} onClick={() => answerQ(o)} className={cn("rounded-2xl border-2 py-4 text-center text-2xl font-black transition", q.type === "letter" && "kn text-4xl", picked ? (o === q.answer ? "border-leaf bg-leaf-2" : o === picked ? "border-brick-2 bg-brick-3" : "border-line bg-white") : "border-line bg-white hover:bg-cream")}>{o}</button>)}
          </div>
        </Card>
      ) : (
        <Card className="text-center"><div className="text-5xl">🎉</div><div className="mt-2 text-2xl font-black">{qScore}/10</div><Button className="mt-4" onClick={() => { setQi(0); setQScore(0); setTab("learn"); setTimeout(() => setTab("quiz"), 0); }}>{t({ en: "Again", hi: "फिर से" })}</Button></Card>
      ))}

      {tab === "trace" && (
        <Card>
          <div className="mb-3 flex flex-wrap gap-1.5">{SCRIPT.slice(0, 28).map((l) => <button key={l.id} onClick={() => setSel(l)} className={cn("kn h-10 w-10 rounded-xl border-2 text-lg font-bold", sel.id === l.id ? "border-marigold bg-marigold-3" : "border-line bg-white")}>{l.kn}</button>)}</div>
          <div className="text-center text-sm font-bold text-ink-3">{t({ en: "Trace over the grey letter with your finger or mouse.", hi: "ग्रे अक्षर पर उंगली या माउस से ट्रेस करें।" })} <span className="font-black text-ink">{sel.roman}</span></div>
          <div className="mt-3"><Tracer kn={sel.kn} onScore={(p) => { if (p >= 60) addXp(5, "Tracing"); seeScript([sel.id]); }} /></div>
        </Card>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/Progress";
import { Logo } from "@/components/layout/Logo";
import { AudioButton } from "@/components/ui/AudioButton";
import { useStore, type Profile } from "@/lib/store";
import { cn } from "@/lib/cn";
import { shuffle } from "@/lib/engine/text";
import { Hero3D } from "@/components/three/Hero3D";

const PLACEMENT = [
  { kn: "ನಮಸ್ಕಾರ", roman: "Namaskara", q: "What does this mean?", answer: "Hello", options: ["Hello", "Thank you", "Goodbye", "Sorry"] },
  { kn: "ನೀರು", roman: "Neeru", q: "What does this mean?", answer: "Water", options: ["Milk", "Water", "Rice", "Tea"] },
  { kn: "ಎಷ್ಟು?", roman: "Eshtu?", q: "What does this mean?", answer: "How much?", options: ["Where?", "Who?", "How much?", "Why?"] },
  { kn: "ನನಗೆ ಕಾಫಿ ಬೇಕು", roman: "Nanage kaafi beku", q: "What does this mean?", answer: "I want coffee", options: ["I don't want coffee", "I want coffee", "Where is the coffee?", "Coffee is good"] },
  { kn: "ನಾನು ನಿನ್ನೆ ಮನೆಗೆ ಹೋದೆ", roman: "Naanu ninne manege hode", q: "What does this mean?", answer: "Yesterday I went home", options: ["I will go home tomorrow", "Yesterday I went home", "I am at home", "Come home"] },
];

const REASONS = [
  { id: "work", label: "Work", hi: "काम", emoji: "💼" },
  { id: "friends", label: "Friends", hi: "दोस्त", emoji: "🤝" },
  { id: "travel", label: "Travel", hi: "यात्रा", emoji: "🧳" },
  { id: "relationship", label: "Relationship", hi: "रिश्ता", emoji: "💛" },
  { id: "living", label: "Living in Karnataka", hi: "कर्नाटक में रहना", emoji: "🏙️" },
  { id: "other", label: "Other", hi: "अन्य", emoji: "✨" },
];

function Choice({ selected, onClick, children, className }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button type="button" onClick={onClick}
      className={cn("flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left font-extrabold text-ink transition active:scale-[0.99]",
        selected ? "border-marigold bg-marigold-3 shadow-[0_3px_0_0_#f5b301]" : "border-line shadow-[0_3px_0_0_#eadfc9] hover:bg-cream-2", className)}>
      {children}
      {selected && <Check className="ml-auto text-[#b07d00]" size={20} strokeWidth={3} />}
    </button>
  );
}

export default function Welcome() {
  const router = useRouter();
  const complete = useStore((s) => s.completeOnboarding);
  const updateSettings = useStore((s) => s.updateSettings);
  const [step, setStep] = useState(0);
  const [p, setP] = useState<Partial<Profile>>({ name: "", baseLang: "en", nativeLang: "en", level: "zero", reasons: ["living"], goalMinutes: 20, mainGoal: "speaking" });
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const opts = useMemo(() => PLACEMENT.map((q) => shuffle(q.options)), []);
  const hi = p.baseLang === "hi";
  const L = (en: string, h: string) => (hi ? h : en);

  const TOTAL = 6;
  const next = () => setStep((s) => Math.min(TOTAL - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const answer = (o: string) => {
    if (picked) return;
    setPicked(o);
    const ok = o === PLACEMENT[qi].answer;
    if (ok) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      if (qi < PLACEMENT.length - 1) setQi(qi + 1);
      else next();
    }, 900);
  };

  const finish = () => {
    complete({ ...p, placementScore: score });
    updateSettings({ explainLang: p.baseLang ?? "en" });
    router.replace("/");
  };

  const startDay = p.level === "basic" && score >= 4 ? 8 : 1;

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-8 pt-5">
      <div className="mb-6 flex items-center gap-3">
        {step > 0 ? <button onClick={back} aria-label="Back" className="rounded-xl p-2 text-ink-2 hover:bg-cream-2"><ArrowLeft /></button> : <Logo size={34} />}
        <ProgressBar value={((step + 1) / TOTAL) * 100} className="flex-1" />
      </div>

      {step === 0 && (
        <div className="flex flex-1 flex-col animate-rise">
          <div className="relative mb-6 mt-2 overflow-hidden rounded-[2rem] bg-gradient-to-b from-ink via-[#2a2742] to-ink text-cream shadow-pop">
            <Hero3D className="h-64 w-full sm:h-72" />
            <div className="px-6 pb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest">🇮🇳 30-day challenge</div>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight">Learn Kannada<br />in 30 Days</h1>
              <p className="mt-2 text-lg font-semibold text-cream/80">From <span className="text-marigold-2">Namaskara</span> to natural conversations.</p>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                <AudioButton kn="ನಮಸ್ಕಾರ" roman="Namaskara" size="sm" showSlow={false} />
                <div><div className="kn text-xl font-bold">ನಮಸ್ಕಾರ</div><div className="text-sm text-cream/70">Namaskara · Hello · नमस्ते</div></div>
              </div>
            </div>
          </div>
          <label className="mb-2 text-sm font-extrabold text-ink-2">What should we call you?</label>
          <input value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} placeholder="Your name" autoFocus
            className="mb-auto h-14 rounded-2xl border-2 border-line bg-white px-4 text-lg font-bold outline-none focus:border-marigold" />
          <Button size="xl" block className="mt-8" disabled={!p.name?.trim()} onClick={next}>Let&apos;s begin <ArrowRight size={20} /></Button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-1 flex-col animate-rise">
          <h2 className="text-3xl font-black tracking-tight">Choose your base language</h2>
          <p className="mt-1 font-semibold text-ink-3">Explanations will be in this language. Kannada is always shown. You can switch any time.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {(["en", "hi"] as const).map((l) => (
              <button key={l} onClick={() => setP({ ...p, baseLang: l })}
                className={cn("rounded-3xl border-2 p-5 text-left transition", p.baseLang === l ? "border-marigold bg-marigold-3" : "border-line bg-white")}>
                <div className="text-3xl font-black">{l === "en" ? "Aa" : "अ"}</div>
                <div className="mt-2 text-lg font-black">{l === "en" ? "English" : "हिंदी"}</div>
              </button>
            ))}
          </div>
          <h3 className="mb-3 mt-8 font-black">{L("Your strongest language?", "आपकी सबसे मज़बूत भाषा?")}</h3>
          <div className="flex flex-col gap-2.5">
            {([["en", "English"], ["hi", "Hindi / हिंदी"], ["other", "Other"]] as const).map(([k, label]) => (
              <Choice key={k} selected={p.nativeLang === k} onClick={() => setP({ ...p, nativeLang: k })}>{label}</Choice>
            ))}
          </div>
          <Button size="xl" block className="mt-auto" onClick={next}>{L("Continue", "आगे")} <ArrowRight size={20} /></Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-1 flex-col animate-rise">
          <h2 className="text-3xl font-black tracking-tight">{L("Why are you learning?", "आप क्यों सीख रहे हैं?")}</h2>
          <p className="mt-1 font-semibold text-ink-3">{L("Pick all that apply.", "जितने चाहें चुनें।")}</p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {REASONS.map((r) => {
              const sel = p.reasons?.includes(r.id) ?? false;
              return (
                <Choice key={r.id} selected={sel} className="flex-col items-start gap-1"
                  onClick={() => setP({ ...p, reasons: sel ? p.reasons?.filter((x) => x !== r.id) : [...(p.reasons ?? []), r.id] })}>
                  <span className="text-2xl">{r.emoji}</span><span className="text-sm">{hi ? r.hi : r.label}</span>
                </Choice>
              );
            })}
          </div>
          <h3 className="mb-3 mt-7 font-black">{L("Your current Kannada level?", "आपका अभी का कन्नड़ स्तर?")}</h3>
          <div className="flex flex-col gap-2.5">
            {([["zero", "🥚", L("Zero — I know nothing yet", "शून्य — कुछ नहीं आता")], ["beginner", "🐣", L("Beginner — a few words", "शुरुआती — कुछ शब्द")], ["basic", "🐥", L("Basic — I can say simple things", "बेसिक — छोटी बातें कह लेता हूँ")]] as const).map(([k, e, label]) => (
              <Choice key={k} selected={p.level === k} onClick={() => setP({ ...p, level: k })}><span className="text-xl">{e}</span>{label}</Choice>
            ))}
          </div>
          <Button size="xl" block className="mt-8" disabled={!p.reasons?.length} onClick={next}>{L("Continue", "आगे")} <ArrowRight size={20} /></Button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-1 flex-col animate-rise">
          <h2 className="text-3xl font-black tracking-tight">{L("Daily goal", "रोज़ का लक्ष्य")}</h2>
          <p className="mt-1 font-semibold text-ink-3">{L("We'll size each lesson to fit.", "हर पाठ इसी हिसाब से बनेगा।")}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[[10, "☕", L("Casual", "आराम से")], [20, "🎯", L("Regular", "नियमित")], [30, "🔥", L("Serious", "गंभीर")], [45, "🚀", L("Intense", "ज़ोरदार")]].map(([m, e, label]) => (
              <button key={m} onClick={() => setP({ ...p, goalMinutes: m as number })}
                className={cn("rounded-3xl border-2 p-4 text-left transition", p.goalMinutes === m ? "border-marigold bg-marigold-3" : "border-line bg-white")}>
                <div className="text-2xl">{e}</div>
                <div className="mt-1 text-2xl font-black">{m} min</div>
                <div className="text-sm font-bold text-ink-3">{label}</div>
              </button>
            ))}
          </div>
          <h3 className="mb-3 mt-7 font-black">{L("Main goal", "मुख्य लक्ष्य")}</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {([["speaking", "🗣️", L("Speaking", "बोलना")], ["listening", "🎧", L("Listening", "सुनना")], ["reading", "📖", L("Reading", "पढ़ना")], ["all", "🌈", L("All of it", "सब कुछ")]] as const).map(([k, e, label]) => (
              <Choice key={k} selected={p.mainGoal === k} onClick={() => setP({ ...p, mainGoal: k })}><span className="text-xl">{e}</span>{label}</Choice>
            ))}
          </div>
          <Button size="xl" block className="mt-8" onClick={() => (p.level === "zero" ? setStep(5) : next())}>{L("Continue", "आगे")} <ArrowRight size={20} /></Button>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-1 flex-col animate-rise">
          <div className="text-sm font-black uppercase tracking-widest text-ink-3">{L("Quick placement", "छोटा प्लेसमेंट टेस्ट")} · {qi + 1}/5</div>
          <h2 className="mt-1 text-2xl font-black">{L(PLACEMENT[qi].q, "इसका मतलब क्या है?")}</h2>
          <div className="my-6 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card">
            <AudioButton kn={PLACEMENT[qi].kn} roman={PLACEMENT[qi].roman} />
            <div><div className="kn text-2xl font-bold">{PLACEMENT[qi].kn}</div><div className="font-bold text-ink-3">{PLACEMENT[qi].roman}</div></div>
          </div>
          <div className="flex flex-col gap-2.5">
            {opts[qi].map((o) => {
              const state = picked ? (o === PLACEMENT[qi].answer ? "ok" : o === picked ? "bad" : "") : "";
              return (
                <button key={o} onClick={() => answer(o)} className={cn("rounded-2xl border-2 bg-white p-4 text-left font-extrabold transition",
                  state === "ok" ? "border-leaf bg-leaf-2" : state === "bad" ? "border-brick-2 bg-brick-3" : "border-line hover:bg-cream-2")}>{o}</button>
              );
            })}
          </div>
          <button onClick={() => setStep(5)} className="mt-auto pt-6 text-center text-sm font-bold text-ink-3 underline">{L("Skip test", "टेस्ट छोड़ें")}</button>
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-1 flex-col animate-rise">
          <div className="mt-2 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-marigold-3 text-4xl animate-float">🚀</div>
            <h2 className="text-3xl font-black tracking-tight">{L("Your Kannada Journey Starts Today", "आपकी कन्नड़ यात्रा आज शुरू")}</h2>
            <p className="mt-2 font-semibold text-ink-3">{L(`Here's your plan, ${p.name}.`, `${p.name}, यह रहा आपका प्लान।`)}</p>
          </div>
          <div className="mt-6 space-y-2.5 rounded-3xl bg-white p-5 shadow-card">
            {[
              ["📅", L(`Start: Day ${startDay} / 30`, `शुरुआत: Day ${startDay} / 30`)],
              ["⏱️", L(`${p.goalMinutes} minutes a day`, `रोज़ ${p.goalMinutes} मिनट`)],
              ["🗣️", L(p.mainGoal === "speaking" ? "Extra speaking drills each lesson" : p.mainGoal === "listening" ? "Extra listening in every lesson" : p.mainGoal === "reading" ? "Kannada script introduced earlier" : "Balanced: speaking, listening, reading", "आपके लक्ष्य के अनुसार अभ्यास")],
              ["🔤", L("Roman letters first, Kannada script step by step", "पहले रोमन, फिर धीरे-धीरे कन्नड़ लिपि")],
              ["🧠", L("Smart review brings back words you miss", "स्मार्ट रिव्यू भूले शब्द वापस लाता है")],
              ...(p.level !== "zero" ? [["🎯", L(`Placement: ${score}/5`, `प्लेसमेंट: ${score}/5`)]] : []),
            ].map(([e, t]) => (
              <div key={t} className="flex items-center gap-3 font-bold text-ink-2"><span className="text-xl">{e}</span>{t}</div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl bg-ink p-5 text-center text-cream">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-cream/60">Day</div>
            <div className="text-5xl font-black">{startDay} <span className="text-cream/40">/ 30</span></div>
          </div>
          <Button size="xl" block className="mt-auto" onClick={finish}><Sparkles size={20} /> {L("Start learning", "सीखना शुरू करें")}</Button>
        </div>
      )}
    </div>
  );
}

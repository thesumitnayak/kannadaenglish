"use client";

import { useCallback, useEffect, useState } from "react";
import { FileBarChart, RotateCcw } from "lucide-react";
import { Chat } from "@/components/practice/Chat";
import { aiAvailable, fetchReport, type ChatMsg, type ConvoReport } from "@/lib/ai/client";
import { useT, useLearnerDay, useScriptMode } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { SCENARIOS } from "@/content/scenarios";
import { week3Conversations, finalBossConversations } from "@/content/days/scenarioConvos";
import { ConversationView } from "@/components/lesson/ConversationView";
import { Button } from "@/components/ui/Button";
import { SkillBar } from "@/components/ui/Progress";
import { XP } from "@/content/levels";
import { cn } from "@/lib/cn";

const OPENERS: Record<string, { kn: string; roman: string; en: string }> = {
  coffee: { kn: "ಬನ್ನಿ ಸರ್, ಏನು ಬೇಕು?", roman: "Banni sir, enu beku?", en: "Come sir, what would you like?" },
  restaurant: { kn: "ಎಷ್ಟು ಜನ? ಏನು ಬೇಕು?", roman: "Eshtu jana? Enu beku?", en: "How many people? What do you want?" },
  auto: { kn: "ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು ಸರ್?", roman: "Ellige hogbeku sir?", en: "Where do you need to go, sir?" },
  supermarket: { kn: "ಏನಾದ್ರೂ ಹುಡುಕ್ತಿದ್ದೀರಾ?", roman: "Enaadru hudukatiddira?", en: "Looking for something?" },
  office: { kn: "ಗುಡ್ ಮಾರ್ನಿಂಗ್! ಹೇಗಿದ್ದೀರಾ?", roman: "Good morning! Hegiddira?", en: "Good morning! How are you?" },
  apartment: { kn: "ನಮಸ್ಕಾರ ಸರ್, ಏನು ಸಮಸ್ಯೆ?", roman: "Namaskara sir, enu samasye?", en: "Hello sir, what's the problem?" },
  cab: { kn: "ಸರ್, ಎಲ್ಲಿದ್ದೀರಾ?", roman: "Sir, elliddira?", en: "Sir, where are you?" },
  shopping: { kn: "ಬನ್ನಿ ಮೇಡಂ, ಏನು ತೋರಿಸ್ಲಿ?", roman: "Banni madam, enu torisli?", en: "Come, what shall I show you?" },
  temple: { kn: "ಬನ್ನಿ, ಒಳಗೆ ಬನ್ನಿ.", roman: "Banni, olage banni.", en: "Come, come inside." },
  friends: { kn: "ಏನ್ ಸಮಾಚಾರ? ತುಂಬಾ ದಿನ ಆಯ್ತು!", roman: "En samaachaara? Tumba dina aaytu!", en: "What's up? It's been ages!" },
};

export default function TalkPage() {
  const t = useT();
  const day = useLearnerDay();
  const mode = useScriptMode();
  const addXp = useStore((s) => s.addXp);
  const bump = useStore((s) => s.bump);
  const recordAnswer = useStore((s) => s.recordAnswer);
  const [aiOn, setAiOn] = useState<boolean | null>(null);
  const [sc, setSc] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<ChatMsg[]>([]);
  const [report, setReport] = useState<ConvoReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [scripted, setScripted] = useState(0);
  useEffect(() => { aiAvailable().then(setAiOn); }, []);
  const onTranscript = useCallback((m: ChatMsg[]) => setTranscript(m), []);
  const scenario = SCENARIOS.find((s) => s.id === sc);
  const userTurns = transcript.filter((m) => m.role === "user").length;

  const endAndReport = async () => {
    setBusy(true);
    const r = await fetchReport(day, scenario?.title.en ?? "conversation", transcript);
    setReport(r);
    setBusy(false);
    bump("conversations");
    addXp(XP.conversation, "Talk to me");
    if (r) recordAnswer({ skill: "conversation", ok: (r.grammar + r.vocabulary) / 2 >= 60 });
  };

  if (!sc) {
    return (
      <div>
        <h1 className="text-3xl font-black tracking-tight">💬 {t({ en: "Talk to me", hi: "मुझसे बात करो" })}</h1>
        <p className="mt-1 font-semibold text-ink-3">{aiOn === false ? t({ en: "AI is offline, so you'll practise with guided conversations where you choose each reply.", hi: "AI ऑफ़लाइन है, इसलिए आप निर्देशित बातचीत करेंगे जहाँ आप हर जवाब चुनते हैं।" }) : t({ en: "Pick a scene. The AI plays a Bengaluru local and coaches you as you go.", hi: "एक दृश्य चुनें। AI बेंगलुरु लोकल बनेगा और साथ-साथ सिखाएगा।" })}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SCENARIOS.map((s) => (
            <button key={s.id} onClick={() => { setSc(s.id); setReport(null); setTranscript([]); }} className="rounded-3xl border border-line bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5">
              <div className="text-3xl">{s.emoji}</div><div className="mt-2 font-black">{t(s.title)}</div><div className="text-xs font-semibold text-ink-3">{t(s.description)}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (report) {
    const overall = Math.round((report.vocabulary + report.grammar + report.naturalness + report.confidence) / 4);
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-[2rem] bg-ink p-6 text-cream">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cream/60">{t({ en: "Conversation report", hi: "बातचीत रिपोर्ट" })}</div>
          <div className="mt-1 text-5xl font-black">{overall}%</div>
          <p className="mt-2 font-semibold text-cream/80">{report.summary}</p>
        </div>
        <div className="mt-4 space-y-3 rounded-3xl bg-white p-5 shadow-card">
          <SkillBar emoji="📚" label={t({ en: "Vocabulary", hi: "शब्दावली" })} value={report.vocabulary} color="bg-marigold" />
          <SkillBar emoji="🧱" label={t({ en: "Grammar", hi: "व्याकरण" })} value={report.grammar} color="bg-plum" />
          <SkillBar emoji="🌿" label={t({ en: "Naturalness", hi: "स्वाभाविकता" })} value={report.naturalness} color="bg-leaf" />
          <SkillBar emoji="💪" label={t({ en: "Confidence", hi: "आत्मविश्वास" })} value={report.confidence} color="bg-brick" />
        </div>
        {report.corrections.length > 0 && (
          <div className="mt-4 space-y-2">
            {report.corrections.map((c, i) => (
              <div key={i} className="rounded-2xl bg-white p-4 shadow-card"><div className="font-bold text-brick">❌ {c.youSaid}</div><div className="font-black text-leaf">✅ {c.better}</div><div className="text-sm font-semibold text-ink-2">💡 {c.why}</div></div>
            ))}
          </div>
        )}
        {report.nextSteps.length > 0 && <div className="mt-4 rounded-2xl bg-marigold-3 p-4 text-sm font-bold text-ink-2">{report.nextSteps.map((n, i) => <div key={i}>→ {n}</div>)}</div>}
        <Button className="mt-6" block size="lg" onClick={() => { setSc(null); setReport(null); }}><RotateCcw size={18} /> {t({ en: "Another scene", hi: "दूसरा दृश्य" })}</Button>
      </div>
    );
  }

  const op = OPENERS[sc];
  const starter = `${op.kn}\n${op.roman} (${op.en})\n💡 ${t({ en: "Reply in roman Kannada. I'll correct you gently.", hi: "रोमन कन्नड़ में जवाब दें। मैं धीरे से सुधारूँगा।" })}`;

  if (aiOn === false) {
    const pool = [...week3Conversations, ...finalBossConversations];
    const conv = pool[scripted % pool.length];
    return (
      <div className="mx-auto max-w-2xl">
        <button onClick={() => setSc(null)} className="mb-3 text-sm font-extrabold text-ink-3">← {t({ en: "Scenes", hi: "दृश्य" })}</button>
        <ConversationView key={conv.id} conv={conv} mode={mode} onDone={(o) => { bump("conversations"); addXp(XP.conversation + o.firstTry * 5, "Guided conversation"); recordAnswer({ skill: "conversation", ok: o.prompts === 0 || o.firstTry / o.prompts >= 0.5 }); setScripted(scripted + 1); setSc(null); }} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button onClick={() => setSc(null)} className="text-sm font-extrabold text-ink-3">← {scenario?.emoji} {t(scenario!.title)}</button>
        <Button size="sm" variant="dark" disabled={userTurns < 2 || busy} onClick={endAndReport}><FileBarChart size={15} /> {busy ? "…" : t({ en: "End & get report", hi: "खत्म, रिपोर्ट पाएँ" })}</Button>
      </div>
      <div className={cn(userTurns < 2 && "pb-2 text-xs font-bold text-ink-3")}>{userTurns < 2 && t({ en: "Send at least 2 replies to unlock the report.", hi: "रिपोर्ट के लिए कम से कम 2 जवाब भेजें।" })}</div>
      <Chat key={sc} mode="talk" day={day} scenario={`${scenario?.title.en}: ${scenario?.description.en}`} starter={starter} onTranscript={onTranscript} placeholder="Nanage ondu kaafi beku…" />
    </div>
  );
}

"use client";

import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { useStore, reviewBuckets } from "@/lib/store";
import { useT, useLang } from "@/lib/hooks";
import { skillScores, overallScore, scoreLabel } from "@/lib/stats";
import { SkillBar, Ring } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ScorePage() {
  const t = useT();
  const lang = useLang();
  const s = useStore();
  const sk = skillScores(s.skills);
  const overall = overallScore(sk);
  const label = scoreLabel(overall);
  const weak = reviewBuckets(s.review).weak.length;
  const sorted = (Object.entries(sk) as [keyof typeof sk, number][]).sort((a, b) => a[1] - b[1]);
  const tips: Record<string, { en: string; hi: string }> = {
    speaking: { en: "Do the Speak tab 5 minutes a day; read every sentence aloud twice before checking.", hi: "रोज़ 5 मिनट Speak टैब; जाँचने से पहले हर वाक्य दो बार ज़ोर से पढ़ें।" },
    vocabulary: { en: "Run the 10-minute revision daily until the red bucket is empty.", hi: "लाल bucket खाली होने तक रोज़ 10-मिनट दोहराई करें।" },
    listening: { en: "Replay Day 24's listening challenge and the Bengaluru Mode audio with the slow button.", hi: "Day 24 की सुनने की चुनौती और Bengaluru Mode ऑडियो धीमे बटन से दोहराएँ।" },
    grammar: { en: "Redo Days 10–13 (tenses & questions) and the sentence-building day.", hi: "Days 10–13 (काल और सवाल) और वाक्य-निर्माण दिन दोबारा करें।" },
    conversation: { en: "Use Talk to Me once a day; pick a new scene each time.", hi: "रोज़ एक बार Talk to Me; हर बार नया दृश्य।" },
  };
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="rounded-[2rem] bg-ink p-6 text-center text-cream">
        <div className="text-xs font-black uppercase tracking-[0.25em] text-cream/60">{t({ en: "Your Kannada score", hi: "आपका कन्नड़ स्कोर" })}</div>
        <div className="mt-4 flex justify-center"><Ring value={overall} size={150} stroke={12} color="#f5b301" track="rgba(255,255,255,.12)"><span className="text-4xl font-black">{overall}%</span></Ring></div>
        <div className="mt-4 text-3xl font-black">{label.emoji} {lang === "hi" ? label.hi : label.en}</div>
      </div>
      <Card className="space-y-3.5">
        <SkillBar emoji="🎤" label={t({ en: "Speaking", hi: "बोलना" })} value={sk.speaking} color="bg-brick" />
        <SkillBar emoji="📚" label={t({ en: "Vocabulary", hi: "शब्दावली" })} value={sk.vocabulary} color="bg-marigold" />
        <SkillBar emoji="🎧" label={t({ en: "Listening", hi: "सुनना" })} value={sk.listening} color="bg-sky" />
        <SkillBar emoji="🧱" label={t({ en: "Grammar", hi: "व्याकरण" })} value={sk.grammar} color="bg-plum" />
        <SkillBar emoji="💬" label={t({ en: "Conversation", hi: "बातचीत" })} value={sk.conversation} color="bg-leaf" />
      </Card>
      <Card>
        <div className="text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "What to practise next", hi: "आगे क्या अभ्यास करें" })}</div>
        <ul className="mt-3 space-y-2.5">
          {sorted.slice(0, 2).map(([k]) => <li key={k} className="flex gap-2 font-bold text-ink-2"><span>→</span><span><span className="capitalize">{k}</span>: {t(tips[k])}</span></li>)}
          {weak > 0 && <li className="flex gap-2 font-bold text-ink-2"><span>→</span><span>{t({ en: `${weak} words are in the red bucket. Clear them this week.`, hi: `${weak} शब्द लाल bucket में हैं। इस हफ़्ते साफ़ करें।` })}</span></li>}
        </ul>
      </Card>
      <Link href="/certificate"><Button size="xl" block><Award size={20} /> {t({ en: "Get my certificate", hi: "मेरा सर्टिफ़िकेट" })} <ArrowRight size={18} /></Button></Link>
    </div>
  );
}

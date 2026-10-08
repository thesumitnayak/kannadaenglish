"use client";

import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useT, useLang } from "@/lib/hooks";
import { skillScores, overallScore, scoreLabel } from "@/lib/stats";
import { Button } from "@/components/ui/Button";
import { TOTAL_DAYS } from "@/content/course";

export default function CertificatePage() {
  const t = useT();
  const lang = useLang();
  const s = useStore();
  const sk = skillScores(s.skills);
  const overall = overallScore(sk);
  const label = scoreLabel(overall);
  const words = Object.keys(s.review).filter((k) => k.startsWith("v:")).length;
  const sentences = Object.keys(s.review).filter((k) => k.startsWith("s:")).length;
  const done = Object.keys(s.results).length;
  const finished = done >= TOTAL_DAYS;
  const [now] = useState(() => Date.now());
  const date = new Date(s.results[30]?.completedAt ?? now).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="mx-auto min-h-dvh max-w-3xl px-4 py-6">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 font-extrabold text-ink-3"><ArrowLeft size={18} /> {t({ en: "Home", hi: "होम" })}</Link>
        <Button size="sm" variant="dark" onClick={() => window.print()}><Printer size={16} /> {t({ en: "Print / Save PDF", hi: "प्रिंट / PDF" })}</Button>
      </div>
      {!finished && <div className="no-print mb-4 rounded-2xl bg-marigold-3 p-4 text-center font-bold text-ink-2">{t({ en: `Preview — complete all ${TOTAL_DAYS} days to earn the real one. (${done}/${TOTAL_DAYS})`, hi: `पूर्वावलोकन — असली सर्टिफ़िकेट के लिए सभी ${TOTAL_DAYS} दिन पूरे करें। (${done}/${TOTAL_DAYS})` })}</div>}
      <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-marigold bg-white p-8 shadow-pop sm:p-12">
        <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border-2 border-dashed border-marigold/50" />
        <div className="kn pointer-events-none absolute -bottom-10 -right-6 select-none text-[14rem] font-extrabold leading-none text-marigold/10">ಕ</div>
        <div className="relative text-center">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-ink-3">Maathu · ಮಾತು</div>
          <div className="mt-3 text-4xl">🎓</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">30-DAY KANNADA CHALLENGE</h1>
          <div className="kn mt-1 text-xl font-bold text-ink-2">೩೦ ದಿನಗಳ ಕನ್ನಡ ಸವಾಲು</div>
          <div className="mt-8 text-sm font-black uppercase tracking-widest text-ink-3">{t({ en: "Completed by", hi: "पूरा किया" })}</div>
          <div className="mt-1 text-4xl font-black text-ink sm:text-5xl">{s.profile.name || "Learner"}</div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-lg font-black text-marigold-2">{label.emoji} {lang === "hi" ? label.hi : label.en} · {overall}%</div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[[t({ en: "Words learned", hi: "शब्द" }), words], [t({ en: "Sentences", hi: "वाक्य" }), sentences], [t({ en: "Speaking", hi: "बोलना" }), `${sk.speaking}%`], [t({ en: "Listening", hi: "सुनना" }), `${sk.listening}%`], [t({ en: "Conversation", hi: "बातचीत" }), `${sk.conversation}%`]].map(([l, v]) => (
              <div key={String(l)} className="rounded-2xl bg-cream p-3"><div className="text-2xl font-black">{v}</div><div className="text-[11px] font-black uppercase tracking-wider text-ink-3">{l}</div></div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between text-sm font-bold text-ink-3">
            <span>{date}</span>
            <span className="kn text-base text-ink">ಅಭಿನಂದನೆಗಳು! 🎉</span>
            <span>{s.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Download, Trash2, FileBarChart } from "lucide-react";
import { useStore, reviewBuckets } from "@/lib/store";
import { useT } from "@/lib/hooks";
import { levelFor } from "@/content/levels";
import { Card, SectionTitle } from "@/components/ui/Card";
import { SkillBar } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { skillScores, lastNDays } from "@/lib/stats";
import { cn } from "@/lib/cn";
import { TOTAL_DAYS } from "@/content/course";

export default function ProfilePage() {
  const t = useT();
  const s = useStore();
  const sk = skillScores(s.skills);
  const lvl = levelFor(s.xp);
  const b = reviewBuckets(s.review);
  const days = lastNDays(14);
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const done = Object.keys(s.results).length;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(useStore.getState(), null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "maathu-progress.json"; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-marigold text-4xl shadow-[0_5px_0_0_#c98f00]">{lvl.current.emoji}</div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">{s.profile.name}</h1>
          <div className="font-bold text-ink-3">Level {lvl.current.level} · {lvl.current.title}</div>
          <div className="text-sm font-bold text-ink-3">{t({ en: "Since", hi: "से" })} {new Date(s.profile.createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["🔥", s.streak.current, t({ en: "Streak", hi: "लय" })], ["⭐", s.xp.toLocaleString(), "XP"], ["📚", Object.keys(s.review).filter((k) => k.startsWith("v:")).length, t({ en: "Words", hi: "शब्द" })], ["💬", Object.keys(s.review).filter((k) => k.startsWith("s:")).length, t({ en: "Sentences", hi: "वाक्य" })]].map(([e, v, l]) => (
          <Card key={String(l)} className="p-4 text-center"><div className="text-2xl">{e}</div><div className="text-2xl font-black">{v}</div><div className="text-xs font-bold text-ink-3">{l}</div></Card>
        ))}
      </div>

      <Card>
        <SectionTitle>{t({ en: "Skills", hi: "कौशल" })}</SectionTitle>
        <div className="space-y-3.5">
          <SkillBar emoji="📚" label={t({ en: "Vocabulary", hi: "शब्दावली" })} value={sk.vocabulary} color="bg-marigold" />
          <SkillBar emoji="🎤" label={t({ en: "Speaking", hi: "बोलना" })} value={sk.speaking} color="bg-brick" />
          <SkillBar emoji="🎧" label={t({ en: "Listening", hi: "सुनना" })} value={sk.listening} color="bg-sky" />
          <SkillBar emoji="🧱" label={t({ en: "Grammar", hi: "व्याकरण" })} value={sk.grammar} color="bg-plum" />
          <SkillBar emoji="💬" label={t({ en: "Conversation", hi: "बातचीत" })} value={sk.conversation} color="bg-leaf" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black">
          <div className="rounded-xl bg-leaf-2 py-2 text-leaf">🟢 {b.mastered.length}</div><div className="rounded-xl bg-marigold-3 py-2 text-[#8a6200]">🟡 {b.learning.length}</div><div className="rounded-xl bg-brick-3 py-2 text-brick">🔴 {b.weak.length}</div>
        </div>
      </Card>

      <Card>
        <SectionTitle>{t({ en: "Last 14 days", hi: "पिछले 14 दिन" })}</SectionTitle>
        <div className="flex items-end gap-1.5">
          {days.map((d) => {
            const log = s.daily[d];
            const frozen = s.streak.frozen.includes(d);
            const h = Math.min(100, (log?.xp ?? 0) / 4);
            return (
              <div key={d} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-24 w-full items-end rounded-lg bg-cream-2"><div className={cn("w-full rounded-lg", frozen ? "bg-sky" : "bg-marigold")} style={{ height: `${frozen ? 30 : h}%` }} /></div>
                <span className="text-[10px] font-bold text-ink-3">{d.slice(8)}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionTitle>{t({ en: "Settings", hi: "सेटिंग्स" })}</SectionTitle>
        <div className="space-y-5">
          <div>
            <div className="mb-2 text-sm font-black text-ink-2">{t({ en: "Explanation language", hi: "समझाने की भाषा" })}</div>
            <div className="flex gap-2">{(["en", "hi"] as const).map((l) => <button key={l} onClick={() => s.updateSettings({ explainLang: l })} className={cn("rounded-xl border-2 px-4 py-2 font-extrabold", s.settings.explainLang === l ? "border-marigold bg-marigold-3" : "border-line bg-white")}>{l === "en" ? "English" : "हिंदी"}</button>)}</div>
          </div>
          <div>
            <div className="mb-2 text-sm font-black text-ink-2">{t({ en: "Daily goal", hi: "रोज़ का लक्ष्य" })}</div>
            <div className="flex flex-wrap gap-2">{[10, 20, 30, 45].map((m) => <button key={m} onClick={() => s.updateProfile({ goalMinutes: m })} className={cn("rounded-xl border-2 px-4 py-2 font-extrabold", s.profile.goalMinutes === m ? "border-marigold bg-marigold-3" : "border-line bg-white")}>{m} min</button>)}</div>
          </div>
          <div>
            <div className="mb-2 text-sm font-black text-ink-2">{t({ en: "Kannada script", hi: "कन्नड़ लिपि" })}</div>
            <div className="flex flex-wrap gap-2">
              {([["auto", t({ en: "Auto (gradual)", hi: "ऑटो (धीरे-धीरे)" })], ["roman", "Roman"], ["both", "Roman + ಕನ್ನಡ"], ["kannada", "ಕನ್ನಡ only"]] as const).map(([k, l]) => <button key={k} onClick={() => s.updateSettings({ script: k })} className={cn("rounded-xl border-2 px-3 py-2 text-sm font-extrabold", s.settings.script === k ? "border-marigold bg-marigold-3" : "border-line bg-white")}>{l}</button>)}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-black text-ink-2">{t({ en: "Audio speed", hi: "ऑडियो गति" })} · {s.settings.ttsRate.toFixed(2)}×</div>
            <input type="range" min={0.6} max={1.2} step={0.05} value={s.settings.ttsRate} onChange={(e) => s.updateSettings({ ttsRate: Number(e.target.value) })} className="w-full accent-marigold" />
          </div>
          <div>
            <div className="mb-2 text-sm font-black text-ink-2">{t({ en: "Name", hi: "नाम" })}</div>
            <input value={s.profile.name} onChange={(e) => s.updateProfile({ name: e.target.value })} className="h-11 w-full rounded-xl border-2 border-line bg-white px-3 font-bold outline-none focus:border-marigold" />
          </div>
        </div>
      </Card>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {[1, 2, 3, 4].filter((w) => s.results[w * 7]).map((w) => <Link key={w} href={`/report/${w}`}><Button variant="secondary" block><FileBarChart size={17} /> {t({ en: `Week ${w} report`, hi: `हफ्ता ${w} रिपोर्ट` })}</Button></Link>)}
        {done >= TOTAL_DAYS && <Link href="/certificate"><Button block><Award size={17} /> {t({ en: "My certificate", hi: "मेरा सर्टिफ़िकेट" })}</Button></Link>}
        <Button variant="secondary" block onClick={exportData}><Download size={17} /> {t({ en: "Export progress", hi: "प्रगति निर्यात" })}</Button>
        <Button variant="ghost" block className="text-brick" onClick={() => setConfirm(true)}><Trash2 size={17} /> {t({ en: "Reset everything", hi: "सब रीसेट करें" })}</Button>
      </div>
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={() => setConfirm(false)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 animate-pop" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-black">{t({ en: "Reset all progress?", hi: "सारी प्रगति रीसेट करें?" })}</h3>
            <p className="mt-1 font-semibold text-ink-3">{t({ en: "This deletes XP, streak, words and mistakes on this device. It cannot be undone.", hi: "इस डिवाइस पर XP, लय, शब्द और गलतियाँ मिट जाएँगी। वापस नहीं होगा।" })}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={() => setConfirm(false)}>{t({ en: "Cancel", hi: "रद्द" })}</Button>
              <Button variant="danger" onClick={() => { s.resetAll(); router.push("/welcome"); }}>{t({ en: "Reset", hi: "रीसेट" })}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

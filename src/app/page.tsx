"use client";

import Link from "next/link";
import { ArrowRight, Brain, Flame, Star, BookOpen, MessageCircle, Languages, HelpCircle, Snowflake, CheckCircle2, Circle, FileBarChart } from "lucide-react";
import { useStore, reviewBuckets } from "@/lib/store";
import { useLearnerDay, useT, greeting, useLang } from "@/lib/hooks";
import { getDay, TOTAL_DAYS } from "@/content/course";
import { levelFor } from "@/content/levels";
import { Card, SectionTitle } from "@/components/ui/Card";
import { ProgressBar, Ring, SkillBar } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { DailyPhraseCard } from "@/components/home/DailyPhrase";
import { skillScores } from "@/lib/stats";
import { todayStr } from "@/lib/engine/text";
import { goalScale } from "@/lib/engine/session";
import { cn } from "@/lib/cn";
import { Hero3D } from "@/components/three/Hero3D";

export default function HomePage() {
  const t = useT();
  const lang = useLang();
  const s = useStore();
  const day = useLearnerDay();
  const lesson = getDay(day)!;
  const done = Object.keys(s.results).length;
  const pct = Math.round((done / TOTAL_DAYS) * 100);
  const lvl = levelFor(s.xp);
  const today = s.daily[todayStr()];
  const scale = goalScale(s.profile.goalMinutes);
  const goals = [
    { label: t({ en: `${Math.round(10 * scale)} new words`, hi: `${Math.round(10 * scale)} नए शब्द` }), done: (today?.words ?? 0) >= Math.round(10 * scale) || (today?.exercises ?? 0) >= Math.round(20 * scale) },
    { label: t({ en: "5 sentences", hi: "5 वाक्य" }), done: (today?.sentences ?? 0) >= 5 || (today?.exercises ?? 0) >= 25 },
    { label: t({ en: `${Math.max(3, Math.round(5 * scale))} speaking drills`, hi: `${Math.max(3, Math.round(5 * scale))} बोलने के अभ्यास` }), done: (today?.speaking ?? 0) >= Math.max(3, Math.round(5 * scale)) },
    { label: t({ en: "Daily challenge (finish a day)", hi: "आज की चुनौती (एक दिन पूरा करें)" }), done: !!today?.challenge },
  ];
  const sk = skillScores(s.skills);
  const buckets = reviewBuckets(s.review);
  const words = Object.keys(s.review).filter((k) => k.startsWith("v:")).length;
  const sentences = Object.keys(s.review).filter((k) => k.startsWith("s:")).length;
  const allDone = done >= TOTAL_DAYS;
  const reportWeek = [4, 3, 2, 1].find((w) => s.results[w * 7] && !s.reportsSeen.includes(w));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-bold text-ink-3">{greeting(lang)},</p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{s.profile.name || "friend"} 👋</h1>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="flex items-center gap-1.5 rounded-2xl bg-brick-3 px-3 py-2 font-black text-brick"><Flame size={18} fill="currentColor" /> {s.streak.current} {t({ en: "day streak", hi: "दिन की लय" })}</span>
          <span className="flex items-center gap-1.5 rounded-2xl bg-marigold-3 px-3 py-2 font-black text-[#8a6200]"><Star size={18} fill="currentColor" /> {s.xp.toLocaleString()} XP</span>
        </div>
      </div>

      {reportWeek && (
        <Link href={`/report/${reportWeek}`} className="flex items-center gap-3 rounded-2xl border-2 border-plum/30 bg-plum-2 p-4 font-extrabold text-plum animate-pop">
          <FileBarChart /> {t({ en: `Your Week ${reportWeek} report is ready`, hi: `आपकी हफ्ता ${reportWeek} रिपोर्ट तैयार है` })} <ArrowRight className="ml-auto" size={18} />
        </Link>
      )}

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Journey hero */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink via-[#26233b] to-ink p-6 text-cream shadow-pop lg:col-span-3">
          <Hero3D word="ಕನ್ನಡ" className="pointer-events-none absolute -right-10 -top-6 h-56 w-72 opacity-90 sm:-right-4 sm:h-64 sm:w-80 lg:pointer-events-auto" />
          <div className="relative">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cream/60">{t({ en: "Your Kannada journey", hi: "आपकी कन्नड़ यात्रा" })}</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-6xl font-black tracking-tight">{allDone ? 30 : day}</span>
            <span className="text-2xl font-black text-cream/40">/ {TOTAL_DAYS}</span>
          </div>
          <ProgressBar value={pct} className="mt-3" track="bg-white/10" color="bg-marigold" height="h-3.5" />
          <div className="mt-2 text-sm font-bold text-cream/60">{pct}% {t({ en: "complete", hi: "पूरा" })}</div>

          <div className="mt-6 rounded-2xl bg-white/[0.07] p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{lesson.emoji}</span>
              <div className="min-w-0">
                <div className="text-xs font-black uppercase tracking-widest text-marigold-2">{allDone ? t({ en: "Course complete", hi: "कोर्स पूरा" }) : `Day ${day} · ${t({ en: "Week", hi: "हफ्ता" })} ${lesson.week}`}</div>
                <div className="truncate text-lg font-black">{allDone ? t({ en: "You did it! 🎓", hi: "आपने कर दिखाया! 🎓" }) : t(lesson.title)}</div>
                <div className="truncate text-sm font-semibold text-cream/60">{allDone ? t({ en: "Get your certificate and keep reviewing.", hi: "सर्टिफ़िकेट लें और दोहराते रहें।" }) : t(lesson.subtitle)}</div>
              </div>
            </div>
          </div>
          <Link href={allDone ? "/certificate" : `/learn/${day}`} className="mt-5 block">
            <Button size="xl" block>{allDone ? t({ en: "View certificate", hi: "सर्टिफ़िकेट देखें" }) : s.results[day - 1] || day === 1 ? t({ en: "Continue learning", hi: "सीखना जारी रखें" }) : t({ en: "Start", hi: "शुरू करें" })} <ArrowRight size={22} /></Button>
          </Link>
          </div>
        </div>

        {/* Today's goal */}
        <Card className="lg:col-span-2">
          <SectionTitle action={<span className="text-sm font-black text-ink-3">🎯 {s.profile.goalMinutes} min</span>}>{t({ en: "Today's goal", hi: "आज का लक्ष्य" })}</SectionTitle>
          <ul className="space-y-2.5">
            {goals.map((g) => (
              <li key={g.label} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2.5 font-bold", g.done ? "bg-leaf-2 text-leaf" : "bg-cream text-ink-2")}>
                {g.done ? <CheckCircle2 size={22} /> : <Circle size={22} className="text-ink-3" />}{g.label}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-sky-2 p-3 text-sm font-bold text-sky">
            <Snowflake size={18} /> {s.streak.freezes} {t({ en: "streak freeze(s) ready. Miss a day? Your streak is safe.", hi: "streak freeze तैयार। एक दिन छूटे तो भी लय बची रहेगी।" })}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <DailyPhraseCard phrase={lesson.dailyPhrase} />

        <Card>
          <SectionTitle>{t({ en: "Level", hi: "लेवल" })}</SectionTitle>
          <div className="flex items-center gap-4">
            <Ring value={lvl.progress * 100} size={78}><span className="text-3xl">{lvl.current.emoji}</span></Ring>
            <div>
              <div className="text-sm font-black text-ink-3">Level {lvl.current.level}</div>
              <div className="text-xl font-black leading-tight">{lvl.current.title}</div>
              {lvl.next && <div className="text-sm font-bold text-ink-3">{(lvl.next.minXp - s.xp).toLocaleString()} XP {t({ en: "to", hi: "बाकी" })} {lvl.next.title}</div>}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[["🔥", s.streak.current, t({ en: "Streak", hi: "लय" })], ["📚", words, t({ en: "Words", hi: "शब्द" })], ["💬", sentences, t({ en: "Sentences", hi: "वाक्य" })]].map(([e, v, l]) => (
              <div key={String(l)} className="rounded-2xl bg-cream py-2.5"><div className="text-lg font-black">{e} {v}</div><div className="text-xs font-bold text-ink-3">{l}</div></div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col">
          <SectionTitle>{t({ en: "Smart review", hi: "स्मार्ट रिव्यू" })}</SectionTitle>
          <div className="grid grid-cols-3 gap-2 text-center text-sm font-bold">
            <div className="rounded-2xl bg-leaf-2 py-2 text-leaf"><div className="text-xl font-black">{buckets.mastered.length}</div>🟢 {t({ en: "Mastered", hi: "पक्के" })}</div>
            <div className="rounded-2xl bg-marigold-3 py-2 text-[#8a6200]"><div className="text-xl font-black">{buckets.learning.length}</div>🟡 {t({ en: "Learning", hi: "सीख रहे" })}</div>
            <div className="rounded-2xl bg-brick-3 py-2 text-brick"><div className="text-xl font-black">{buckets.weak.length}</div>🔴 {t({ en: "Practice", hi: "अभ्यास" })}</div>
          </div>
          <Link href="/review/session?mode=revision" className="mt-auto pt-4">
            <Button variant="dark" block size="lg" disabled={!done && !Object.keys(s.review).length}><Brain size={20} /> {t({ en: "10-minute revision", hi: "10-मिनट दोहराई" })}</Button>
          </Link>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle action={<Link href="/profile" className="text-sm font-extrabold text-sky">{t({ en: "Details", hi: "विवरण" })}</Link>}>{t({ en: "Skills", hi: "कौशल" })}</SectionTitle>
          <div className="space-y-3.5">
            <SkillBar emoji="📚" label={t({ en: "Vocabulary", hi: "शब्दावली" })} value={sk.vocabulary} color="bg-marigold" />
            <SkillBar emoji="🎤" label={t({ en: "Speaking", hi: "बोलना" })} value={sk.speaking} color="bg-brick" />
            <SkillBar emoji="🎧" label={t({ en: "Listening", hi: "सुनना" })} value={sk.listening} color="bg-sky" />
            <SkillBar emoji="🧱" label={t({ en: "Grammar", hi: "व्याकरण" })} value={sk.grammar} color="bg-plum" />
            <SkillBar emoji="💬" label={t({ en: "Conversation", hi: "बातचीत" })} value={sk.conversation} color="bg-leaf" />
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/practice/say", icon: HelpCircle, title: t({ en: "What do I say?", hi: "मैं क्या कहूँ?" }), color: "bg-marigold-3 text-[#8a6200]" },
            { href: "/practice/talk", icon: MessageCircle, title: t({ en: "Talk to me", hi: "मुझसे बात करो" }), color: "bg-leaf-2 text-leaf" },
            { href: "/practice/translate", icon: Languages, title: t({ en: "Quick translator", hi: "झटपट अनुवाद" }), color: "bg-sky-2 text-sky" },
            { href: "/practice/bengaluru", icon: BookOpen, title: t({ en: "Bengaluru Mode", hi: "बेंगलुरु मोड" }), color: "bg-brick-3 text-brick" },
          ].map((q) => (
            <Link key={q.href} href={q.href} className="flex flex-col justify-between rounded-3xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5">
              <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", q.color)}><q.icon size={22} /></span>
              <span className="mt-4 font-black leading-tight">{q.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

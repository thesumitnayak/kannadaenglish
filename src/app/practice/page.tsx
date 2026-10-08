"use client";

import Link from "next/link";
import { ArrowRight, Bot, HelpCircle, Languages, MessageCircle, Building2, Type } from "lucide-react";
import { useT } from "@/lib/hooks";

export default function PracticeHub() {
  const t = useT();
  const items = [
    { href: "/practice/bengaluru", icon: Building2, emoji: "🏙️", title: t({ en: "Bengaluru Mode", hi: "बेंगलुरु मोड" }), desc: t({ en: "10 real scenarios: coffee shop, auto, office, temple…", hi: "10 असली परिस्थितियाँ: कॉफ़ी शॉप, ऑटो, ऑफिस, मंदिर…" }), color: "bg-brick-3 text-brick" },
    { href: "/practice/say", icon: HelpCircle, emoji: "🙋", title: t({ en: "What do I say?", hi: "मैं क्या कहूँ?" }), desc: t({ en: "Pick a situation, get the natural phrase in 3 formality levels.", hi: "परिस्थिति चुनें, 3 स्तरों में स्वाभाविक वाक्य पाएँ।" }), color: "bg-marigold-3 text-[#8a6200]" },
    { href: "/practice/talk", icon: MessageCircle, emoji: "💬", title: t({ en: "Talk to me", hi: "मुझसे बात करो" }), desc: t({ en: "Role-play with a Kannada speaker. Get a conversation report.", hi: "कन्नड़ भाषी से रोल-प्ले। बातचीत की रिपोर्ट पाएँ।" }), color: "bg-leaf-2 text-leaf" },
    { href: "/practice/guru", icon: Bot, emoji: "🤖", title: t({ en: "Kannada Guru", hi: "कन्नड़ गुरु" }), desc: t({ en: "Ask anything: 'How do I say…?', 'Why is this word used?'", hi: "कुछ भी पूछें: 'यह कैसे कहूँ?', 'यह शब्द क्यों?'" }), color: "bg-plum-2 text-plum" },
    { href: "/practice/translate", icon: Languages, emoji: "🔁", title: t({ en: "Quick translator", hi: "झटपट अनुवाद" }), desc: t({ en: "English / Hindi ↔ Kannada with pronunciation.", hi: "अंग्रेज़ी / हिंदी ↔ कन्नड़, उच्चारण के साथ।" }), color: "bg-sky-2 text-sky" },
    { href: "/script", icon: Type, emoji: "ಅ", title: t({ en: "Learn Kannada script", hi: "कन्नड़ लिपि सीखें" }), desc: t({ en: "Vowels, consonants, tracing and recognition games.", hi: "स्वर, व्यंजन, ट्रेसिंग और पहचान के खेल।" }), color: "bg-cream-2 text-ink" },
  ];
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight">{t({ en: "Practice", hi: "अभ्यास" })}</h1>
      <p className="mt-1 font-semibold text-ink-3">{t({ en: "Real-life Kannada, on demand.", hi: "असली ज़िंदगी की कन्नड़, जब चाहें।" })}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${it.color}`}>{it.emoji}</span>
            <div className="min-w-0 flex-1"><div className="text-lg font-black">{it.title}</div><div className="text-sm font-semibold text-ink-3">{it.desc}</div></div>
            <ArrowRight className="shrink-0 text-ink-3 transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}

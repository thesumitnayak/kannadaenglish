"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Mic, MessagesSquare, Brain, Trophy, User, Flame, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/hooks";
import { Logo } from "./Logo";
import { levelFor } from "@/content/levels";

const NAV = [
  { href: "/", icon: Home, label: { en: "Home", hi: "होम" } },
  { href: "/learn", icon: BookOpen, label: { en: "Learn", hi: "सीखें" } },
  { href: "/speak", icon: Mic, label: { en: "Speak", hi: "बोलें" } },
  { href: "/practice", icon: MessagesSquare, label: { en: "Practice", hi: "अभ्यास" } },
  { href: "/review", icon: Brain, label: { en: "Review", hi: "दोहराएँ" } },
  { href: "/achievements", icon: Trophy, label: { en: "Awards", hi: "इनाम" } },
  { href: "/profile", icon: User, label: { en: "Profile", hi: "प्रोफ़ाइल" } },
];

function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const t = useT();
  const xp = useStore((s) => s.xp);
  const streak = useStore((s) => s.streak.current);
  const lvl = levelFor(xp).current;

  return (
    <div className="min-h-dvh lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-cream px-4 py-6 lg:flex">
        <Link href="/" className="mb-8 px-2"><Logo withText /></Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((n) => {
            const active = isActive(path, n.href);
            const Icon = n.icon;
            return (
              <Link key={n.href} href={n.href}
                className={cn("flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-extrabold transition",
                  active ? "bg-marigold-3 text-ink ring-2 ring-marigold" : "text-ink-2 hover:bg-cream-2")}>
                <Icon size={22} strokeWidth={active ? 2.75 : 2.25} className={active ? "text-[#b07d00]" : ""} />
                {t(n.label)}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-2xl bg-white p-3 text-sm font-bold text-ink-2 shadow-card">
          <div className="flex items-center justify-between"><span>{lvl.emoji} Lv {lvl.level}</span><span className="text-ink">{lvl.title}</span></div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line/70 bg-cream/90 px-4 py-2.5 backdrop-blur lg:hidden">
        <Link href="/"><Logo size={32} withText /></Link>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-brick-3 px-2.5 py-1 text-sm font-black text-brick"><Flame size={15} fill="currentColor" />{streak}</span>
          <span className="flex items-center gap-1 rounded-full bg-marigold-3 px-2.5 py-1 text-sm font-black text-[#8a6200]"><Star size={15} fill="currentColor" />{xp.toLocaleString()}</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-4 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-7">
          {NAV.map((n) => {
            const active = isActive(path, n.href);
            const Icon = n.icon;
            return (
              <Link key={n.href} href={n.href} className="flex flex-col items-center gap-0.5 py-2">
                <span className={cn("flex h-8 w-11 items-center justify-center rounded-xl transition", active ? "bg-marigold-3 text-[#b07d00]" : "text-ink-3")}>
                  <Icon size={21} strokeWidth={active ? 2.75 : 2.2} />
                </span>
                <span className={cn("text-[10px] font-extrabold", active ? "text-ink" : "text-ink-3")}>{t(n.label)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { AppShell } from "./AppShell";
import { Toasts } from "./Toasts";
import { Logo } from "./Logo";
import { useCloudSync } from "@/lib/supabase/sync";

const BARE = ["/welcome", "/certificate"];
const FOCUS = [/^\/learn\/\d+/, /^\/review\/session/];

export function Providers({ children }: { children: React.ReactNode }) {
  const hydrated = useStore((s) => s.hydrated);
  const onboarded = useStore((s) => s.profile.onboarded);
  const pathname = usePathname();
  const router = useRouter();
  useCloudSync();

  useEffect(() => {
    // zustand persist hydrates on the client; make sure the flag flips even with empty storage
    if (!useStore.getState().hydrated) useStore.getState().setHydrated();
  }, []);

  useEffect(() => {
    if (hydrated && !onboarded && !pathname.startsWith("/welcome")) router.replace("/welcome");
  }, [hydrated, onboarded, pathname, router]);

  if (!hydrated || (!onboarded && !pathname.startsWith("/welcome"))) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="animate-float"><Logo size={56} /></div>
      </div>
    );
  }

  const bare = BARE.some((b) => pathname.startsWith(b));
  const focus = FOCUS.some((r) => r.test(pathname));
  return (
    <>
      {bare || focus ? children : <AppShell>{children}</AppShell>}
      <Toasts />
    </>
  );
}

import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...p }: HTMLAttributes<HTMLDivElement>) {
  return <div {...p} className={cn("rounded-3xl border border-line bg-white p-5 shadow-card", className)} />;
}

export function SectionTitle({ children, action, className }: { children: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-3 flex items-end justify-between gap-3", className)}>
      <h2 className="text-lg font-black tracking-tight text-ink">{children}</h2>
      {action}
    </div>
  );
}

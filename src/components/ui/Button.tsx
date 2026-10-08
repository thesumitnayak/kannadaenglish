"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success" | "dark";
type Size = "sm" | "md" | "lg" | "xl";

const V: Record<Variant, string> = {
  primary: "bg-marigold text-ink shadow-[0_4px_0_0_#c98f00] hover:brightness-105 active:translate-y-[3px] active:shadow-[0_1px_0_0_#c98f00]",
  secondary: "bg-white text-ink border-2 border-line shadow-[0_3px_0_0_#eadfc9] hover:bg-cream-2 active:translate-y-[2px] active:shadow-none",
  ghost: "bg-transparent text-ink-2 hover:bg-cream-2",
  danger: "bg-brick text-white shadow-[0_4px_0_0_#a33522] active:translate-y-[3px] active:shadow-[0_1px_0_0_#a33522]",
  success: "bg-leaf text-white shadow-[0_4px_0_0_#1f7a51] active:translate-y-[3px] active:shadow-[0_1px_0_0_#1f7a51]",
  dark: "bg-ink text-cream shadow-[0_4px_0_0_#000] active:translate-y-[3px] active:shadow-[0_1px_0_0_#000]",
};
const S: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-4 text-[15px] rounded-2xl",
  lg: "h-13 px-6 text-base rounded-2xl",
  xl: "h-15 px-7 text-lg rounded-3xl",
};

export function Button({ variant = "primary", size = "md", className, block, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; block?: boolean }) {
  return (
    <button
      {...p}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 font-extrabold tracking-tight transition-all duration-100 disabled:pointer-events-none disabled:opacity-45",
        V[variant], S[size], block && "w-full", className,
      )}
    />
  );
}

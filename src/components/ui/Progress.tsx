import { cn } from "@/lib/cn";

export function ProgressBar({ value, className, color = "bg-marigold", track = "bg-cream-2", height = "h-3", striped }: { value: number; className?: string; color?: string; track?: string; height?: string; striped?: boolean }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full overflow-hidden rounded-full", track, height, className)} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn("h-full rounded-full transition-[width] duration-500 ease-out", color, striped && "progress-stripes")} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Ring({ value, size = 64, stroke = 7, color = "#f5b301", track = "#fcefd6", children }: { value: number; size?: number; stroke?: number; color?: string; track?: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} className="transition-[stroke-dashoffset] duration-700" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export function SkillBar({ label, value, emoji, color }: { label: string; value: number; emoji: string; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-bold text-ink-2">
        <span>{emoji} {label}</span>
        <span className="tabular-nums text-ink">{value}%</span>
      </div>
      <ProgressBar value={value} color={color} height="h-2.5" />
    </div>
  );
}

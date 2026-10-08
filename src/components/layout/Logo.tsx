export function Logo({ size = 36, withText = false }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex items-center justify-center rounded-[30%] bg-marigold shadow-[0_3px_0_0_#c98f00]" style={{ width: size, height: size }}>
        <span className="kn font-extrabold leading-none text-ink" style={{ fontSize: size * 0.56 }}>ಮಾ</span>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-cream bg-brick" />
      </div>
      {withText && (
        <div className="leading-none">
          <div className="text-xl font-black tracking-tight text-ink">Maathu</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3">30-day Kannada</div>
        </div>
      )}
    </div>
  );
}

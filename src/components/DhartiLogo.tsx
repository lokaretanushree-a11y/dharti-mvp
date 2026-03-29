type DhartiLogoProps = {
  variant?: "onDark" | "onLight";
  wordmark?: boolean;
  showTagline?: boolean;
  className?: string;
  textClassName?: string;
};

/** Brand block: plant emoji + DHARTI wordmark (replaces SVG mark). */
export function DhartiLogo({
  variant = "onLight",
  wordmark = true,
  showTagline = true,
  className = "",
  textClassName = "text-base sm:text-lg",
}: DhartiLogoProps) {
  const isDarkBg = variant === "onDark";
  const textClass = isDarkBg ? "text-white" : "text-emerald-900";
  const subClass = isDarkBg ? "text-emerald-100/80" : "text-slate-500";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="flex shrink-0 select-none items-center justify-center text-3xl leading-none sm:text-4xl"
        aria-hidden={wordmark || undefined}
        {...(!wordmark ? { role: "img" as const, "aria-label": "DHARTI" } : {})}
      >
        🌱
      </span>
      {wordmark && (
        <div className="flex flex-col leading-none">
          <span className={`font-semibold tracking-[0.14em] ${textClass} ${textClassName}`}>
            DHARTI
          </span>
          {showTagline && (
            <span className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] ${subClass}`}>
              Smart farming
            </span>
          )}
        </div>
      )}
    </div>
  );
}

import { DASHBOARD_BG_IMAGE } from "../constants/farmMedia";

type FarmBackgroundImageProps = {
  position?: "fixed" | "absolute";
  /** Dark green scrim for readability (Tailwind classes) */
  overlayClassName?: string;
  className?: string;
};

/**
 * Full-bleed agricultural photography with enterprise-style green overlay.
 */
export function FarmBackgroundImage({
  position = "fixed",
  overlayClassName = "bg-emerald-950/78",
  className = "",
}: FarmBackgroundImageProps) {
  const pos = position === "fixed" ? "fixed inset-0" : "absolute inset-0";

  return (
    <div className={`pointer-events-none z-0 overflow-hidden ${pos} ${className}`} aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${DASHBOARD_BG_IMAGE})` }}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 via-emerald-950/20 to-emerald-950/70" />
    </div>
  );
}

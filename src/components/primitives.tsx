import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { colors, ease, font } from "../theme";
import { useReplayKey } from "./useMotionReady";

/* ------------------------------------------------------------------ *
 * Kicker — small uppercase eyebrow label with a neon tick
 * ------------------------------------------------------------------ */
export function Kicker({ children, color = colors.greenNeon }: { children: ReactNode; color?: string }) {
  return (
    <div
      className="gv-reveal"
      style={{
        ["--gv-i" as string]: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        fontFamily: font.body,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: colors.softGray,
      }}
    >
      <span style={{ width: 46, height: 3, borderRadius: 3, background: color, boxShadow: `0 0 16px ${color}` }} />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Title — large stage headline. Supports gradient + neon glow accents.
 * ------------------------------------------------------------------ */
export function Title({
  children,
  size = 96,
  max = 1500,
  style,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  style?: CSSProperties;
}) {
  return (
    <h1
      className="gv-reveal"
      style={{
        ["--gv-i" as string]: 1,
        fontFamily: font.heading,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: "-0.025em",
        maxWidth: max,
        color: colors.iceWhite,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

/* Inline gradient text span */
export function Grad({
  children,
  from = colors.blueSoft,
  to = colors.greenNeon,
}: {
  children: ReactNode;
  from?: string;
  to?: string;
}) {
  return (
    <span
      style={{
        background: `linear-gradient(100deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Support — single short supporting sentence under the title.
 * ------------------------------------------------------------------ */
export function Support({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p
      className="gv-reveal"
      style={{
        ["--gv-i" as string]: 2,
        fontFamily: font.body,
        fontSize: 34,
        fontWeight: 400,
        lineHeight: 1.4,
        color: colors.softGray,
        maxWidth: 1180,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * GlassCard — restrained glassmorphism container.
 * ------------------------------------------------------------------ */
export function GlassCard({
  children,
  style,
  glow = "rgba(30,115,232,0.18)",
  border = "rgba(124,180,255,0.18)",
}: {
  children: ReactNode;
  style?: CSSProperties;
  glow?: string;
  border?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 28,
        background:
          "linear-gradient(160deg, rgba(18,42,84,0.66) 0%, rgba(7,20,42,0.55) 100%)",
        border: `1px solid ${border}`,
        boxShadow: `0 28px 80px -34px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CountUp — animated number that counts up when shown.
 * ------------------------------------------------------------------ */
export function CountUp({
  to,
  duration = 1.6,
  delay = 0.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  style,
  separator = ".",
}: {
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: CSSProperties;
  separator?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const playKey = useReplayKey();

  useEffect(() => {
    setVal(0);
    let raf = 0;
    let startTime = 0;
    const startDelay = delay * 1000;
    const dur = duration * 1000;
    const animate = (t: number) => {
      if (!startTime) startTime = t;
      const elapsed = t - startTime - startDelay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(animate);
        return;
      }
      const p = Math.min(elapsed / dur, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(animate);
      else setVal(to);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, delay, playKey]);

  const fixed = val.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const text = decPart ? `${grouped},${decPart}` : grouped;

  return (
    <span ref={ref} style={style}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * NeonLine — animated SVG line-draw with neon glow.
 * ------------------------------------------------------------------ */
export function NeonLine({
  d,
  color = colors.greenNeon,
  width = 3,
  delay = 0.3,
  duration = 1.6,
  glow = true,
  loop = false,
}: {
  d: string;
  color?: string;
  width?: number;
  delay?: number;
  duration?: number;
  glow?: boolean;
  loop?: boolean;
}) {
  const playKey = useReplayKey();
  return (
    <motion.path
      key={playKey}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      style={glow ? { filter: `drop-shadow(0 0 8px ${color})` } : undefined}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        pathLength: { delay, duration, ease: ease.inOut, repeat: loop ? Infinity : 0, repeatType: "loop" },
      }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Arrow — vertical trend arrow that grows in (up=green, down=amber).
 * ------------------------------------------------------------------ */
export function TrendArrow({
  direction,
  height = 120,
  delay = 0.4,
  color,
}: {
  direction: "up" | "down";
  height?: number;
  delay?: number;
  color?: string;
}) {
  const up = direction === "up";
  const c = color ?? (up ? colors.greenNeon : colors.amber);
  return (
    <svg
      className="gv-reveal"
      width="64"
      height={height}
      viewBox={`0 0 64 ${height}`}
      style={{ ["--gv-delay" as string]: `${delay}s` }}
    >
      <defs>
        <linearGradient id={`arr-${direction}-${c.replace("#", "")}`} x1="0" y1={up ? 1 : 0} x2="0" y2={up ? 0 : 1}>
          <stop offset="0%" stopColor={c} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c} stopOpacity="1" />
        </linearGradient>
      </defs>
      <g
        fill={`url(#arr-${direction}-${c.replace("#", "")})`}
        style={{ filter: `drop-shadow(0 0 10px ${c}88)` }}
        transform={up ? "" : `rotate(180 32 ${height / 2})`}
      >
        <rect x="26" y="26" width="12" height={height - 26} rx="6" />
        <path d={`M32 0 L58 40 L6 40 Z`} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * ImageSlot — premium, descriptively-named placeholder for production
 * photography. Renders a refined gradient + asset label so the deck looks
 * intentional even before final imagery is dropped in.
 * ------------------------------------------------------------------ */
export function ImageSlot({
  asset,
  caption,
  tone = "blue",
  children,
  style,
  src,
  fit = "cover",
}: {
  asset: string;
  caption?: string;
  tone?: "blue" | "green" | "dark" | "amber";
  children?: ReactNode;
  style?: CSSProperties;
  fit?: "cover" | "contain";
  /** Drop a real photo in /public/assets and pass e.g. src="/assets/ford.jpg".
   *  The dark overlay + label keep the deck cohesive once imagery is added. */
  src?: string;
}) {
  const toneBg: Record<string, string> = {
    blue: "linear-gradient(150deg, #0d2c5e 0%, #071a3a 70%)",
    green: "linear-gradient(150deg, #0c3a4a 0%, #06231c 75%)",
    dark: "linear-gradient(150deg, #0a1830 0%, #050d1c 75%)",
    amber: "linear-gradient(150deg, #3a2a16 0%, #1a1208 75%)",
  };
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 28,
        overflow: "hidden",
        background: toneBg[tone],
        border: "1px solid rgba(124,180,255,0.16)",
        boxShadow: "0 40px 90px -40px rgba(0,0,0,0.7)",
        ...style,
      }}
    >
      {/* subtle texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(60% 60% at 70% 20%, rgba(124,180,255,0.18) 0%, transparent 60%)",
        }}
      />
      {src && (
        <img
          src={src}
          alt={caption ?? asset}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: fit,
            objectPosition: "center center",
          }}
        />
      )}
      {children}
      {/* dark overlay so imagery integrates with the dark theme */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            fit === "contain"
              ? "linear-gradient(180deg, transparent 55%, rgba(3,16,31,0.82) 100%)"
              : "linear-gradient(180deg, rgba(3,16,31,0.05) 30%, rgba(3,16,31,0.75) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 22,
          bottom: 18,
          right: 22,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: font.body,
          fontSize: 15,
          color: "rgba(170,183,200,0.55)",
        }}
      >
        <span style={{ opacity: 0.7 }}>▣</span>
        <span style={{ fontStyle: "italic" }}>{caption ?? "Görsel alanı"}</span>
        <span style={{ marginLeft: "auto", letterSpacing: "0.06em", opacity: 0.55 }}>{asset}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Pill — small labelled chip used in criteria lists.
 * ------------------------------------------------------------------ */
export function Pill({
  children,
  tone = "neutral",
  style,
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "blue" | "amber" | "muted";
  style?: CSSProperties;
}) {
  const map = {
    neutral: { bg: "rgba(124,180,255,0.08)", bd: "rgba(124,180,255,0.25)", fg: colors.iceWhite },
    green: { bg: "rgba(35,209,139,0.12)", bd: "rgba(124,255,178,0.4)", fg: colors.greenNeon },
    blue: { bg: "rgba(30,115,232,0.14)", bd: "rgba(62,139,255,0.45)", fg: colors.blueSoft },
    amber: { bg: "rgba(180,122,60,0.14)", bd: "rgba(180,122,60,0.5)", fg: "#E0B07A" },
    muted: { bg: "rgba(170,183,200,0.05)", bd: "rgba(170,183,200,0.18)", fg: colors.softGray },
  }[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 28px",
        borderRadius: 999,
        fontFamily: font.body,
        fontSize: 28,
        fontWeight: 500,
        background: map.bg,
        border: `1px solid ${map.bd}`,
        color: map.fg,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

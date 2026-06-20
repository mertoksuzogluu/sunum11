import { motion } from "framer-motion";
import { gradients } from "../theme";

/**
 * Premium tech-summit backdrop: deep navy field, slow-drifting blue & green
 * light blooms, a subtle engineering grid and a faint city-skyline silhouette.
 * Shared by every slide so the deck feels like one continuous environment.
 */
export default function StageBackground({
  variant = "default",
}: {
  variant?: "default" | "split" | "quiet";
}) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: gradients.stage }} />

      {/* Engineering grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(124,180,255,0.05) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(124,180,255,0.05) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(120% 80% at 50% 40%, #000 35%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 40%, #000 35%, transparent 85%)",
          opacity: variant === "quiet" ? 0.4 : 1,
        }}
      />

      {/* Drifting light blooms */}
      {variant !== "split" && (
        <>
          <motion.div
            style={bloom("rgba(30,115,232,0.42)", 900)}
            initial={{ x: -120, y: -80, opacity: 0.7 }}
            animate={{ x: 80, y: 40, opacity: 1 }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            style={{ ...bloom("rgba(35,209,139,0.32)", 820), right: -160, bottom: -160 }}
            initial={{ x: 60, y: 80, opacity: 0.6 }}
            animate={{ x: -60, y: -30, opacity: 0.9 }}
            transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </>
      )}

      {/* Faint skyline silhouette anchoring the real-estate theme */}
      <Skyline />

      {/* Vignette for stage depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 110% at 50% 45%, transparent 55%, rgba(2,9,20,0.65) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function bloom(color: string, size: number): React.CSSProperties {
  return {
    position: "absolute",
    left: -180,
    top: -160,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
    filter: "blur(20px)",
    pointerEvents: "none",
  };
}

function Skyline() {
  // procedural skyline bars along the bottom
  const bars = [
    [60, 180], [150, 320], [230, 240], [300, 420], [400, 300], [470, 540],
    [560, 360], [640, 460], [740, 280], [820, 600], [930, 340], [1010, 480],
    [1110, 300], [1200, 560], [1310, 380], [1400, 460], [1500, 300],
    [1590, 520], [1700, 360], [1790, 440], [1870, 300],
  ];
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, opacity: 0.16 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1E73E8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E73E8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {bars.map(([x, h], i) => (
        <rect
          key={i}
          x={x}
          y={1080 - h}
          width={i % 3 === 0 ? 72 : 56}
          height={h}
          rx={4}
          fill="url(#sky)"
        />
      ))}
    </svg>
  );
}

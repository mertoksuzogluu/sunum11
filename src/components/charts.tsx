import { colors, font } from "../theme";
import { CountUp } from "./primitives";

/* ================================================================== *
 * BeforeAfterBars — two vertical bars; the "after" bar animates down
 * from the "before" height. (Slide 10: 100 → 26 energy use)
 * ================================================================== */
export function BeforeAfterBars({
  before,
  after,
  beforeLabel,
  afterLabel,
  unit = "",
}: {
  before: number;
  after: number;
  beforeLabel: string;
  afterLabel: string;
  unit?: string;
}) {
  const H = 460;
  const max = Math.max(before, after);
  const bh = (v: number) => (v / max) * H;
  return (
    <div style={{ display: "flex", gap: 90, alignItems: "flex-end", height: H + 90 }}>
      {[
        { v: before, label: beforeLabel, tone: "brown", delay: 0.2 },
        { v: after, label: afterLabel, tone: "green", delay: 0.5 },
      ].map((b, i) => {
        const isGreen = b.tone === "green";
        const fill = isGreen ? colors.green : colors.amber;
        const glow = isGreen ? colors.greenNeon : colors.amber;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
            <div
              style={{
                fontFamily: font.heading,
                fontWeight: 700,
                fontSize: 64,
                color: isGreen ? colors.greenNeon : "#E0B07A",
              }}
            >
              <CountUp to={b.v} delay={b.delay + 0.3} suffix={unit} duration={1.4} />
            </div>
            <div style={{ position: "relative", width: 150, height: H, display: "flex", alignItems: "flex-end" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "rgba(170,183,200,0.05)" }} />
              <div
                className="gv-chart-bar"
                style={{
                  ["--gv-delay" as string]: `${b.delay}s`,
                  width: "100%",
                  height: bh(b.v),
                  borderRadius: 16,
                  background: `linear-gradient(180deg, ${glow} 0%, ${fill} 100%)`,
                  boxShadow: `0 0 50px -6px ${glow}aa`,
                }}
              />
            </div>
            <div style={{ fontFamily: font.body, fontSize: 26, color: colors.softGray, maxWidth: 220, textAlign: "center" }}>
              {b.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================== *
 * DonutChart — animated arc fill. (Slide 11: 76% old stock)
 * ================================================================== */
export function DonutChart({
  percent,
  label,
  sublabel,
  restLabel,
}: {
  percent: number;
  label: string;
  sublabel?: string;
  restLabel?: string;
}) {
  const size = 440;
  const stroke = 46;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="donutG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.amber} />
            <stop offset="100%" stopColor="#E0B07A" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(35,209,139,0.18)" strokeWidth={stroke} />
        <circle
          className="gv-donut-arc"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#donutG)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          style={{
            ["--gv-dash-total" as string]: c,
            ["--gv-dash-offset" as string]: offset,
            filter: "drop-shadow(0 0 14px rgba(180,122,60,0.6))",
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 110, color: "#E0B07A", lineHeight: 1 }}>
          <CountUp to={percent} suffix="%" delay={0.5} duration={1.6} />
        </div>
        <div style={{ fontFamily: font.body, fontSize: 26, color: colors.softGray, marginTop: 10, maxWidth: 260 }}>{label}</div>
        {sublabel && <div style={{ fontSize: 18, color: "rgba(170,183,200,0.6)", marginTop: 4 }}>{sublabel}</div>}
      </div>
      {restLabel && (
        <div
          style={{
            position: "absolute",
            top: -34,
            left: 0,
            width: 230,
            textAlign: "center",
            fontFamily: font.body,
            fontSize: 22,
            color: colors.greenNeon,
          }}
        >
          {restLabel}
        </div>
      )}
    </div>
  );
}

/* ================================================================== *
 * KpiCard — glass stat card with count-up value.
 * ================================================================== */
export function KpiCard({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  tone = "blue",
  delay = 0,
  emphasis = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  tone?: "blue" | "green" | "amber" | "white";
  delay?: number;
  emphasis?: boolean;
}) {
  const toneColor = {
    blue: colors.blueSoft,
    green: colors.greenNeon,
    amber: "#E0B07A",
    white: colors.iceWhite,
  }[tone];
  return (
    <div
      className="gv-reveal"
      style={{
        ["--gv-delay" as string]: `${delay}s`,
        borderRadius: 24,
        padding: "34px 38px",
        background: emphasis
          ? "linear-gradient(160deg, rgba(35,209,139,0.18), rgba(7,20,42,0.6))"
          : "linear-gradient(160deg, rgba(18,42,84,0.6), rgba(7,20,42,0.5))",
        border: `1px solid ${emphasis ? "rgba(124,255,178,0.5)" : "rgba(124,180,255,0.18)"}`,
        boxShadow: emphasis
          ? `0 0 60px -10px ${colors.greenNeon}66`
          : "0 28px 70px -36px rgba(0,0,0,0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: emphasis ? 92 : 76, color: toneColor, lineHeight: 1 }}>
        <CountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} delay={delay + 0.2} />
      </div>
      <div style={{ fontFamily: font.body, fontSize: 24, color: colors.softGray, marginTop: 14, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

/* ================================================================== *
 * FlowDiagram — horizontal NOI value chain with animated connectors.
 * ================================================================== */
export function FlowDiagram({
  steps,
}: {
  steps: { label: string; tone: "down" | "up" }[];
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
      {steps.map((s, i) => {
        const up = s.tone === "up";
        const col = up ? colors.greenNeon : colors.blueSoft;
        const delay = 0.3 + i * 0.4;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "0 0 auto" }}>
            <div
              className="gv-reveal"
              style={{
                ["--gv-delay" as string]: `${delay}s`,
                width: 246,
                minHeight: 150,
                padding: "28px 26px",
                borderRadius: 22,
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(160deg, ${up ? "rgba(35,209,139,0.16)" : "rgba(30,115,232,0.14)"}, rgba(7,20,42,0.55))`,
                border: `1px solid ${col}55`,
                boxShadow: `0 0 50px -18px ${col}88`,
                fontFamily: font.heading,
                fontWeight: 600,
                fontSize: 28,
                color: colors.iceWhite,
                lineHeight: 1.2,
              }}
            >
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 60 }}>
                <svg width="100%" height="40" viewBox="0 0 120 40" preserveAspectRatio="none">
                  <line
                    className="gv-draw-line"
                    x1="0"
                    y1="20"
                    x2="98"
                    y2="20"
                    stroke={colors.greenNeon}
                    strokeWidth="3"
                    style={{
                      ["--gv-line-len" as string]: 98,
                      ["--gv-draw-dur" as string]: "0.45s",
                      ["--gv-delay" as string]: `${0.55 + i * 0.4}s`,
                      filter: `drop-shadow(0 0 6px ${colors.greenNeon})`,
                    }}
                  />
                  <path
                    className="gv-fade"
                    d="M92 11 L108 20 L92 29"
                    fill="none"
                    stroke={colors.greenNeon}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      ["--gv-delay" as string]: `${0.95 + i * 0.4}s`,
                      filter: `drop-shadow(0 0 6px ${colors.greenNeon})`,
                    }}
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================== *
 * PaybackTimeline — Year 0 invest → Year 3 amortised line + markers.
 * ================================================================== */
export function PaybackTimeline({
  points,
}: {
  points: { year: string; label: string; value?: string; tone: "invest" | "save" | "amort" }[];
}) {
  const W = 1200;
  const span = W / (points.length - 1);
  const toneColor: Record<string, string> = {
    invest: "#E0B07A",
    save: colors.green,
    amort: colors.greenNeon,
  };
  return (
    <div style={{ position: "relative", width: W, height: 240, margin: "0 auto" }}>
      <svg width={W} height={120} style={{ position: "absolute", top: 60, left: 0 }}>
        <line x1={0} y1={60} x2={W} y2={60} stroke="rgba(124,180,255,0.25)" strokeWidth={2} />
        <line
          className="gv-draw-line"
          x1={0}
          y1={60}
          x2={W}
          y2={60}
          stroke={colors.greenNeon}
          strokeWidth={4}
          strokeLinecap="round"
          style={{
            ["--gv-line-len" as string]: W,
            ["--gv-draw-dur" as string]: "2s",
            ["--gv-delay" as string]: "0.4s",
            filter: `drop-shadow(0 0 8px ${colors.greenNeon})`,
          }}
        />
      </svg>
      {points.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: i * span,
            transform: "translateX(-50%)",
            width: 220,
            textAlign: "center",
          }}
        >
          <div className="gv-reveal" style={{ ["--gv-delay" as string]: `${0.6 + i * 0.45}s` }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              margin: "108px auto 0",
              background: toneColor[p.tone],
              boxShadow: `0 0 20px ${toneColor[p.tone]}`,
              border: "3px solid #03101f",
            }}
          />
          <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 30, color: toneColor[p.tone], marginTop: 16 }}>
            {p.year}
          </div>
          {p.value && (
            <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 26, color: colors.iceWhite, marginTop: 4 }}>
              {p.value}
            </div>
          )}
          <div style={{ fontFamily: font.body, fontSize: 19, color: colors.softGray, marginTop: 6 }}>{p.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

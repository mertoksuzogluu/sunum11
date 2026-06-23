import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SlideShell from "../SlideShell";
import StageBackground from "../StageBackground";
import { CssAnimRoot } from "../cssAnimRestart";
import { useSlidePlayKey } from "../slideContext";
import { Kicker, Title, Grad, Support, GlassCard, TrendArrow } from "../primitives";
import { colors, ease, font, STAGE } from "../../theme";
import { PaybackTimeline, KpiCard } from "../charts";
import empireStateNight from "../../assets/empire-state-night.jpg";
import empireStateTriptych from "../../assets/empire-state-triptych.png";
import logo from "../../assets/sasyas-logo-transparent.png";

/* ============================= SLIDE 19 — PASAPORT ========================= */
export function Slide19() {
  const certs = [
    { name: "LEED", region: "Küresel · ABD merkezli", rot: -7 },
    { name: "BREEAM", region: "Avrupa · İngiltere merkezli", rot: 4 },
    { name: "YES-TR", region: "Türkiye ulusal sertifikası", rot: -3 },
  ];
  return (
    <SlideShell>
      <Kicker>Sertifika skoru</Kicker>
      <Title size={86} style={{ marginTop: 22, maxWidth: 1500 }}>
        Sertifikanız artık <Grad>uluslararası pasaportunuz.</Grad>
      </Title>
      <Support style={{ marginTop: 30 }}>Uluslararası sermayenin yeni kapısı: yeşil gayrimenkul.</Support>

      <div style={{ display: "flex", gap: 50, marginTop: 70, justifyContent: "center" }}>
        {certs.map((c, i) => (
          <div key={c.name} style={{ flex: "0 0 420px", transform: `rotate(${c.rot}deg)` }}>
            <div className="gv-pop-scale" style={{ ["--gv-delay" as string]: `${0.6 + i * 0.35}s` }}>
            <div
              style={{
                position: "relative",
                padding: "60px 50px",
                borderRadius: 20,
                textAlign: "center",
                background: "rgba(7,20,42,0.4)",
                border: `3px solid ${colors.greenNeon}`,
                boxShadow: `0 0 50px -14px ${colors.greenNeon}aa, inset 0 0 30px -10px ${colors.greenNeon}55`,
              }}
            >
              <div style={{ position: "absolute", inset: 10, border: `2px dashed rgba(124,255,178,0.4)`, borderRadius: 14 }} />
              <div style={{ fontFamily: font.body, fontSize: 18, letterSpacing: "0.3em", color: colors.softGray, textTransform: "uppercase" }}>
                Green Passport
              </div>
              <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 78, color: colors.greenNeon, margin: "16px 0", letterSpacing: "0.02em" }}>
                {c.name}
              </div>
              <div style={{ fontFamily: font.body, fontSize: 24, color: colors.iceWhite }}>{c.region}</div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 20 — MALİYET Mİ? ====================== */
export function Slide20() {
  return (
    <SlideShell>
      <Kicker color="#E0B07A">Acı gerçek: maliyet… mi?</Kicker>
      <Title size={74} style={{ marginTop: 22, maxWidth: 1600 }}>
        İlk yatırım maliyeti mi, <Grad>sahiplik boyunca</Grad> maliyet mi?
      </Title>

      <div style={{ display: "grid", gridTemplateColumns: "0.7fr auto 1.3fr", gap: 50, alignItems: "center", marginTop: 70 }}>
        <div className="gv-reveal" style={{ ["--gv-delay" as string]: "0.45s" }}>
          <GlassCard border="rgba(180,122,60,0.5)" glow="rgba(180,122,60,0.25)" style={{ padding: "40px 44px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <TrendArrow direction="down" height={84} delay={0.6} />
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 78, color: "#E0B07A" }}>%2–%7</div>
            <div style={{ fontFamily: font.body, fontSize: 26, color: colors.softGray, marginTop: 10 }}>ilave ilk yatırım maliyeti</div>
          </GlassCard>
        </div>

        <div style={{ fontFamily: font.heading, fontSize: 56, color: colors.softGray, textAlign: "center" }}>vs</div>

        <div style={{ display: "flex", gap: 32 }}>
          <ReturnCard value="%25–%31" label="kira primi" delay={0.9} />
          <ReturnCard value="%25–%30" label="enerji tasarrufu" delay={1.2} />
        </div>
      </div>

      <div
        className="gv-reveal"
        style={{
          ["--gv-delay" as string]: "1.7s",
          marginTop: 64,
          fontFamily: font.heading,
          fontWeight: 600,
          fontSize: 40,
          color: colors.greenNeon,
          textAlign: "center",
        }}
      >
        Bu bir maliyet değil — yatırım.
      </div>
    </SlideShell>
  );
}

function ReturnCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <div className="gv-reveal" style={{ ["--gv-delay" as string]: `${delay}s`, flex: 1 }}>
      <GlassCard border="rgba(124,255,178,0.4)" glow="rgba(35,209,139,0.3)" style={{ padding: "48px 44px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <TrendArrow direction="up" height={110} delay={delay + 0.2} />
        </div>
        <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 100, color: colors.greenNeon, lineHeight: 1, textShadow: `0 0 40px ${colors.green}55` }}>
          {value}
        </div>
        <div style={{ fontFamily: font.body, fontSize: 30, color: colors.iceWhite, marginTop: 14 }}>{label}</div>
      </GlassCard>
    </div>
  );
}

/* ============================= SLIDE 21 — BİLANÇO SATIRI =================== */
export function Slide21() {
  const rows = [
    { label: "Konum & arsa değeri", value: "—", muted: true },
    { label: "Yapı & inşaat", value: "—", muted: true },
    { label: "İşletme & yönetim", value: "—", muted: true },
    { label: "Yeşil Değer", value: "+", highlight: true },
  ];
  return (
    <SlideShell>
      <Kicker>Bilanço satırı</Kicker>
      <Title size={72} style={{ marginTop: 22, maxWidth: 1620 }}>
        Sürdürülebilirlik gayrimenkulün vicdanı değil, <Grad>bilançosunda bir satır</Grad> artık.
      </Title>

      <div
        className="gv-scale-in"
        style={{ ["--gv-delay" as string]: "0.4s", marginTop: 60, maxWidth: 1200, margin: "60px auto 0" }}
      >
        <GlassCard style={{ padding: "44px 56px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: font.body, fontSize: 22, letterSpacing: "0.18em", color: colors.softGray, textTransform: "uppercase", paddingBottom: 24, borderBottom: "1px solid rgba(124,180,255,0.18)" }}>
            <span>Gayrimenkul varlık kalemleri</span>
            <span>Değere katkı</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.label}
              className="gv-reveal"
              style={{
                ["--gv-delay" as string]: `${0.5 + i * 0.2}s`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "28px 28px",
                marginTop: 14,
                borderRadius: 16,
                background: r.highlight ? "linear-gradient(100deg, rgba(35,209,139,0.2), rgba(30,115,232,0.12))" : "transparent",
                border: r.highlight ? `1.5px solid ${colors.greenNeon}` : "1px solid transparent",
                boxShadow: r.highlight ? `0 0 60px -14px ${colors.greenNeon}aa` : "none",
              }}
            >
              <span style={{ fontFamily: font.heading, fontWeight: r.highlight ? 700 : 500, fontSize: r.highlight ? 46 : 34, color: r.highlight ? colors.greenNeon : "rgba(170,183,200,0.7)" }}>
                {r.label}
              </span>
              <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: r.highlight ? 46 : 32, color: r.highlight ? colors.greenNeon : "rgba(170,183,200,0.4)" }}>
                {r.value}
              </span>
            </div>
          ))}
        </GlassCard>
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 22 — EMPIRE STATE HERO =============== */
export function Slide22() {
  return (
    <SlideShell bg="quiet">
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 70, alignItems: "center", height: "100%" }}>
        <div>
          <Kicker>Empire State Building · New York</Kicker>
          <Title size={88} style={{ marginTop: 26 }}>
            Radikal bir yenileme kararı <Grad>alındı.</Grad>
          </Title>
        </div>

        <div
          className="gv-scale-in"
          style={{
            ["--gv-delay" as string]: "0.35s",
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            height: 680,
            boxShadow: "0 40px 120px -30px rgba(0,0,0,0.8)",
          }}
        >
          <img
            src={empireStateNight}
            alt="Empire State Building at night, New York"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(3,16,31,0.65) 100%)" }} />
          <div style={{ position: "absolute", left: 24, bottom: 20, fontFamily: font.body, fontSize: 15, color: "rgba(170,183,200,0.55)", fontStyle: "italic" }}>
            Empire State Building · New York (gece)
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 23 — EMPIRE DATA + TIMELINE ========== */
export function Slide23() {
  return (
    <SlideShell pad={120}>
      <Kicker>Empire State · yeşil dönüşüm</Kicker>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 44 }}>
        <KpiCard value={6514} label="cam · sökülmeden 3 katmanlı" tone="white" delay={0.4} />
        <KpiCard value={96} suffix="%" label="mevcut camlar yeniden kullanıldı" tone="green" delay={0.55} />
        <KpiCard value={13} prefix="$" suffix=" M" label="toplam yenileme yatırımı" tone="amber" delay={0.7} />
        <KpiCard value={4.4} decimals={1} prefix="$" suffix=" M" label="yıllık enerji tasarrufu" tone="green" delay={0.85} />
      </div>

      <div className="gv-reveal" style={{ ["--gv-i" as string]: 4, marginTop: 70 }}>
        <PaybackTimeline
          points={[
            { year: "Yıl 0", value: "$13 M", label: "yatırım", tone: "invest" },
            { year: "Yıl 1", value: "$4,4 M", label: "yıllık tasarruf başlar", tone: "save" },
            { year: "Yıl 3", value: "Amorti", label: "%38 enerji tasarrufu", tone: "amort" },
          ]}
        />
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 23b — EMPIRE REVEAL ================== */
export function Slide23b() {
  const playKey = useSlidePlayKey();
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setShowImage(false);
    const t = setTimeout(() => setShowImage(true), 2200);
    return () => clearTimeout(t);
  }, [playKey]);

  return (
    <CssAnimRoot style={{ position: "absolute", inset: 0, width: STAGE.width, height: STAGE.height }}>
      <StageBackground variant="quiet" />
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "72px 90px 84px",
          gap: 28,
        }}
      >
        <div className="gv-reveal" style={{ ["--gv-i" as string]: 0, textAlign: "center", flexShrink: 0 }}>
          <Kicker color={colors.blueSoft}>New York · İkonik yapı</Kicker>
          <Title size={96} style={{ marginTop: 18 }}>
            <Grad from={colors.blueSoft} to={colors.greenNeon}>Empire State Building</Grad>
          </Title>
        </div>

        {showImage && (
          <div
            className="gv-reveal"
            style={{
              ["--gv-i" as string]: 2,
              flex: 1,
              width: "100%",
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 1680,
                height: "100%",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 40px 120px -30px rgba(0,0,0,0.85)",
                background: "rgba(4,12,28,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
              }}
            >
              <img
                src={empireStateTriptych}
                alt="Empire State Building — gündüz, gün batımı ve gece"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </CssAnimRoot>
  );
}

/* ============================= SLIDE 24 — FİNANSAL ALFABE ================= */
export function Slide24() {
  const nodes = [
    { label: "Finansal risk yönetimi", angle: -90 },
    { label: "Makroekonomik vizyon", angle: 30 },
    { label: "Regülasyon", angle: 150 },
  ];
  return (
    <SlideShell>
      <Kicker>Yeni finansal alfabe</Kicker>
      <Title size={88} style={{ marginTop: 20 }}>
        Yeşil: yeni lüks değil, <Grad>finansal alfabe.</Grad>
      </Title>

      <div style={{ position: "relative", flex: 1, marginTop: 10 }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="-600 -260 1200 520">
          {nodes.map((n, i) => {
            const a = (n.angle * Math.PI) / 180;
            const x = Math.cos(a) * 320;
            const y = Math.sin(a) * 180;
            const len = Math.hypot(x, y);
            return (
              <line
                key={i}
                className="gv-draw-line"
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke={colors.greenNeon}
                strokeWidth={2}
                style={{
                  ["--gv-line-len" as string]: len,
                  ["--gv-draw-dur" as string]: "0.8s",
                  ["--gv-delay" as string]: `${0.8 + i * 0.2}s`,
                  filter: `drop-shadow(0 0 4px ${colors.greenNeon})`,
                  opacity: 0.6,
                }}
              />
            );
          })}
        </svg>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="gv-pop-scale"
            style={{
              ["--gv-delay" as string]: "1.4s",
              width: 200,
              height: 200,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: "radial-gradient(circle, rgba(35,209,139,0.3), rgba(30,115,232,0.15))",
              border: `2px solid ${colors.greenNeon}`,
              boxShadow: `0 0 90px -8px ${colors.greenNeon}cc`,
              fontFamily: font.heading,
              fontWeight: 700,
              fontSize: 64,
              color: colors.iceWhite,
            }}
          >
            ESG
          </div>
        </div>

        {nodes.map((n, i) => {
          const a = (n.angle * Math.PI) / 180;
          const x = Math.cos(a) * 320;
          const y = Math.sin(a) * 180;
          return (
            <div
              key={n.label}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="gv-pop-scale" style={{ ["--gv-delay" as string]: `${0.6 + i * 0.2}s` }}>
                <div
                  style={{
                    padding: "28px 40px",
                    borderRadius: 18,
                    background: "linear-gradient(150deg, rgba(18,42,84,0.85), rgba(7,20,42,0.7))",
                    border: `1px solid ${colors.blueSoft}66`,
                    boxShadow: `0 0 50px -18px ${colors.blueSoft}`,
                    fontFamily: font.heading,
                    fontWeight: 600,
                    fontSize: 32,
                    color: colors.iceWhite,
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Support style={{ fontSize: 26, textAlign: "center", margin: "0 auto" }}>
        Yeşil değer; bir vizyon değil, uluslararası sermayeye — finansmana erişimin ta kendisi.
      </Support>
    </SlideShell>
  );
}

/* ============================= SLIDE 24b — MORGAN STANLEY ANKETİ ======== */
export function Slide24b() {
  const regions = [
    { label: "Kuzey Amerika", value: 90, delay: 0.7 },
    { label: "Asya", value: 85, delay: 0.9 },
    { label: "Avrupa", value: 82, delay: 1.1 },
  ];

  return (
    <SlideShell pad={120}>
      <Kicker>Kurumsal yatırımcı sinyali</Kicker>
      <Title size={80} style={{ marginTop: 20, maxWidth: 1620 }}>
        Morgan Stanley: <Grad>900 kurumsal</Grad> katılımcı ne diyor?
      </Title>

      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 70, marginTop: 56, alignItems: "stretch" }}>
        <div>
          <Support style={{ fontSize: 32, maxWidth: 820, lineHeight: 1.45 }}>
            Önümüzdeki <b style={{ color: colors.greenNeon }}>2 yıl</b> içinde varlıklarının büyük kısmını sürdürülebilir stratejilere ayıracaklarını
            belirtiyorlar.
          </Support>
          <div
            className="gv-reveal"
            style={{
              ["--gv-delay" as string]: "0.55s",
              marginTop: 36,
              padding: "28px 34px",
              borderRadius: 18,
              background: "linear-gradient(150deg, rgba(35,209,139,0.12), rgba(7,20,42,0.55))",
              border: "1px solid rgba(124,255,178,0.28)",
              fontFamily: font.body,
              fontSize: 26,
              color: colors.softGray,
              lineHeight: 1.5,
            }}
          >
            Bu kaynağın önemli bir kısmı <span style={{ color: colors.iceWhite, fontWeight: 600 }}>yeşil gayrimenkule</span> yönelecek.
          </div>
        </div>

        <GlassCard glow="rgba(35,209,139,0.22)" border="rgba(124,255,178,0.32)" style={{ padding: "40px 44px" }}>
          <div style={{ fontFamily: font.body, fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.softGray, marginBottom: 28 }}>
            Katılımcı profili
          </div>
          {regions.map((r) => (
            <div key={r.label} className="gv-reveal" style={{ ["--gv-delay" as string]: `${r.delay}s`, marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: font.heading, fontSize: 28, color: colors.iceWhite }}>
                <span>{r.label}</span>
                <span style={{ color: colors.greenNeon, fontWeight: 700 }}>%{r.value}</span>
              </div>
              <div style={{ height: 12, borderRadius: 999, background: "rgba(124,180,255,0.12)", overflow: "hidden" }}>
                <div
                  className="gv-chart-bar"
                  style={{
                    ["--gv-delay" as string]: `${r.delay + 0.1}s`,
                    height: "100%",
                    width: `${r.value}%`,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${colors.blueSoft}, ${colors.greenNeon})`,
                    boxShadow: `0 0 20px -4px ${colors.greenNeon}`,
                  }}
                />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      <div
        className="gv-reveal"
        style={{
          ["--gv-delay" as string]: "1.4s",
          marginTop: 40,
          fontFamily: font.body,
          fontSize: 14,
          color: "rgba(170,183,200,0.32)",
        }}
      >
        morganstanley.com/insights/articles/institutional-investor-sustainability-signals-report-2025
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 25 — HAYAT KALİTESİ ================== */
export function Slide25() {
  const concepts = [
    "İnsan sağlığı",
    "İşe katılım",
    "Verimlilik",
    "Temiz hava",
    "İklimlendirme",
    "Yeşil ofisler",
    "Yeşil okullar",
    "Çevresel boyut",
  ];
  return (
    <SlideShell>
      <Kicker>Ölçemediğimiz değer</Kicker>
      <Title size={84} style={{ marginTop: 20 }}>
        Peki ya <Grad>ölçemediğimiz</Grad> değer?
      </Title>

      <div style={{ position: "relative", flex: 1, marginTop: 10 }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "52%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="gv-pop-scale" style={{ ["--gv-delay" as string]: "0.4s" }}>
            <svg width="200" height="320" viewBox="0 0 200 320">
              <defs>
                <radialGradient id="halo" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor={colors.greenNeon} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={colors.greenNeon} stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="100" cy="150" rx="150" ry="160" fill="url(#halo)" />
              <circle cx="100" cy="64" r="40" fill={colors.iceWhite} opacity="0.92" />
              <path d="M100 108 C60 108 44 150 44 210 L44 300 C44 312 156 312 156 300 L156 210 C156 150 140 108 100 108 Z" fill={colors.iceWhite} opacity="0.92" />
            </svg>
          </div>
        </div>

        {concepts.map((c, i) => {
          const angle = (i / concepts.length) * Math.PI * 2 - Math.PI / 2;
          const rx = 560;
          const ry = 230;
          const x = Math.cos(angle) * rx;
          const y = Math.sin(angle) * ry;
          return (
            <div
              key={c}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(52% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="gv-pop-scale" style={{ ["--gv-delay" as string]: `${0.7 + i * 0.14}s` }}>
                <div
                  style={{
                    padding: "18px 30px",
                    borderRadius: 999,
                    background: "linear-gradient(150deg, rgba(35,209,139,0.12), rgba(7,20,42,0.6))",
                    border: `1px solid ${colors.greenNeon}55`,
                    boxShadow: `0 0 36px -16px ${colors.greenNeon}`,
                    fontFamily: font.heading,
                    fontWeight: 600,
                    fontSize: 28,
                    color: colors.iceWhite,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 26 — FINAL SPLIT ===================== */
export function Slide26() {
  return (
    <CssAnimRoot style={{ position: "absolute", inset: 0, width: STAGE.width, height: STAGE.height, overflow: "hidden", background: "#03101f" }}>
      <div
        className="gv-fade"
        style={{
          ["--gv-delay" as string]: "0.1s",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          background: "linear-gradient(160deg, #0d3a4a 0%, #071a3a 55%, #04122b 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 70% at 30% 20%, rgba(35,209,139,0.3), transparent 60%)" }} />
        <RisingBars />
        <div className="gv-reveal" style={{ ["--gv-delay" as string]: "1.05s", position: "absolute", left: 110, top: 150 }}>
          <div style={{ fontFamily: font.body, fontSize: 26, letterSpacing: "0.28em", color: colors.greenNeon, textTransform: "uppercase" }}>Kazananlar</div>
          <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 92, color: colors.greenNeon, marginTop: 18, textShadow: `0 0 50px ${colors.green}66`, lineHeight: 1.05 }}>
            Yeşil
            <br />olanlar
          </div>
        </div>
      </div>

      <div
        className="gv-fade"
        style={{
          ["--gv-delay" as string]: "0.1s",
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          background: "linear-gradient(160deg, #241809 0%, #160f08 60%, #0a0905 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 70% at 70% 80%, rgba(180,122,60,0.22), transparent 60%)" }} />
        <SinkingBars />
        <div className="gv-reveal" style={{ ["--gv-delay" as string]: "1.05s", position: "absolute", right: 110, top: 150, textAlign: "right" }}>
          <div style={{ fontFamily: font.body, fontSize: 26, letterSpacing: "0.28em", color: "rgba(180,122,60,0.85)", textTransform: "uppercase" }}>Geride kalanlar</div>
          <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 92, color: "#A07B4C", marginTop: 18, lineHeight: 1.05 }}>
            Değer
            <br />kaybedenler
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.65, duration: 1.35, ease: ease.inOut }}
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 3,
          transform: "translateX(-50%)",
          transformOrigin: "top",
          background: `linear-gradient(180deg, ${colors.greenNeon}, ${colors.amber})`,
          boxShadow: `0 0 24px ${colors.greenNeon}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 120,
          transform: "translateX(-50%)",
          textAlign: "center",
          width: 1280,
        }}
      >
        <div className="gv-reveal" style={{ ["--gv-delay" as string]: "2.05s" }}>
          <div
            style={{
              padding: "50px 72px",
              borderRadius: 28,
              background: "rgba(4,16,33,0.82)",
              border: "1px solid rgba(124,180,255,0.28)",
              boxShadow: "0 40px 120px -30px rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ fontFamily: font.body, fontSize: 23, letterSpacing: "0.2em", color: colors.softGray, textTransform: "uppercase" }}>
              Yakın gelecekte iki tür gayrimenkul olacak
            </div>
            <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 54, color: colors.iceWhite, marginTop: 22, lineHeight: 1.16 }}>
              Siz projelerinizle, girişiminizle{" "}
              <Grad from={colors.greenNeon} to={colors.blueSoft}>hangi tarafta</Grad> kalacaksınız?
            </div>
          </div>
        </div>
      </div>
    </CssAnimRoot>
  );
}

function RisingBars() {
  const bars = [
    [560, 360],
    [650, 500],
    [740, 420],
    [830, 640],
    [900, 520],
  ] as const;
  return (
    <svg viewBox="0 0 960 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
      {bars.map(([x, h], i) => (
        <rect
          key={i}
          className="gv-rise"
          x={x}
          width={64}
          height={h}
          y={1080 - h}
          rx={6}
          fill={colors.green}
          style={{
            ["--gv-base" as string]: `${0.85 + i * 0.16}s`,
            filter: `drop-shadow(0 0 16px ${colors.green})`,
          }}
        />
      ))}
    </svg>
  );
}

function SinkingBars() {
  const bars = [
    [60, 280],
    [150, 200],
    [240, 150],
    [330, 110],
    [420, 80],
  ] as const;
  return (
    <svg viewBox="0 0 960 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }}>
      {bars.map(([x, h], i) => (
        <rect
          key={i}
          className="gv-rise"
          x={x}
          width={64}
          height={h}
          y={1080 - h}
          rx={6}
          fill={colors.amber}
          style={{ ["--gv-base" as string]: `${0.85 + i * 0.16}s` }}
        />
      ))}
    </svg>
  );
}

/* ============================= SLIDE 27 — TEŞEKKÜR ======================== */
export function Slide27() {
  return (
    <SlideShell align="center" pad={150}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "42%",
            width: 680,
            height: 680,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(35,209,139,0.12) 0%, rgba(30,115,232,0.06) 45%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <img
          src={logo}
          alt="SAsya's"
          className="gv-reveal"
          style={{
            ["--gv-i" as string]: 0,
            height: 88,
            width: "auto",
            objectFit: "contain",
            filter: "brightness(0) invert(1) drop-shadow(0 6px 22px rgba(0,0,0,0.45))",
            marginBottom: 48,
          }}
        />

        <Title size={132} style={{ maxWidth: 1400 }}>
          <Grad from={colors.blueSoft} to={colors.greenNeon}>Teşekkürler.</Grad>
        </Title>

        <Support style={{ marginTop: 42, fontSize: 32, maxWidth: 980 }}>
          Yeşil Değer · Anahtar Fikirler Zirvesi 2026
        </Support>

        <div
          className="gv-reveal"
          style={{
            ["--gv-i" as string]: 4,
            marginTop: 72,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 120,
              height: 3,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${colors.blueSoft}, ${colors.greenNeon})`,
              boxShadow: `0 0 20px ${colors.greenNeon}`,
            }}
          />
          <div style={{ fontFamily: font.heading, fontWeight: 600, fontSize: 40, color: colors.iceWhite }}>
            Sinem Yedikardaşlar
          </div>
          <div style={{ fontFamily: font.body, fontSize: 26, color: colors.softGray, letterSpacing: "0.06em" }}>
            SAsya's · Gayrimenkul Strateji Kurucusu
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

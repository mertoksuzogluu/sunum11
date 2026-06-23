import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SlideShell from "../SlideShell";
import { Kicker, Title, Grad, Support, ImageSlot, Pill, GlassCard } from "../primitives";
import { fadeUp, fadeIn, scaleIn } from "../motion";
import { useSlidePlayKey } from "../slideContext";
import { RevealBlock, useRevealVisible } from "../slideReveal";
import { colors, ease, font } from "../../theme";
import logo from "../../assets/sasyas-logo-transparent.png";
import fordModelT from "../../assets/ford-model-t.png";
import parkroyalPickering from "../../assets/parkroyal-pickering.jpg";
import youngFamilyDreaming from "../../assets/young-family-dreaming.jpg";
import netherlandsSocialHousing from "../../assets/netherlands-social-housing-retrofit.jpg";

/* ============================= SLIDE 1 — OPENING ============================ */
export function Slide01() {
  return (
    <SlideShell pad={150}>
      {/* rotating neon orbit behind the title */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      >
        <OrbitRings />
      </motion.div>

      <motion.img
        src={logo}
        alt="SAsya's"
        variants={fadeUp}
        style={{
          height: 104,
          width: "auto",
          objectFit: "contain",
          filter: "brightness(0) invert(1) drop-shadow(0 6px 22px rgba(0,0,0,0.45))",
          alignSelf: "flex-start",
          marginBottom: 64,
        }}
      />

      <Kicker>Emlak Konut Anahtar Fikirler Zirvesi 2026</Kicker>

      <Title size={196} max={1100} style={{ marginTop: 24, fontWeight: 700, letterSpacing: "-0.04em" }}>
        <Grad from={colors.blueSoft} to={colors.greenNeon}>Yeşil</Grad> Değer
      </Title>

      <motion.div variants={fadeUp} style={{ marginTop: 30, maxWidth: 1120 }}>
        <div style={{ fontFamily: font.heading, fontWeight: 500, fontSize: 46, color: colors.iceWhite, lineHeight: 1.18 }}>
          Sürdürülebilirlik
          <br />
          Gayrimenkulün yeni finansal göstergesi
        </div>
      </motion.div>

      <motion.div variants={fadeUp} style={{ marginTop: 70, display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ width: 4, height: 64, borderRadius: 4, background: colors.green, boxShadow: `0 0 18px ${colors.green}` }} />
        <div>
          <div style={{ fontFamily: font.heading, fontWeight: 600, fontSize: 34, color: colors.iceWhite }}>Sinem Yedikardaşlar</div>
          <div style={{ fontFamily: font.body, fontSize: 24, color: colors.softGray, marginTop: 4 }}>
            SAsya's · Gayrimenkul Strateji Kurucusu
          </div>
        </div>
      </motion.div>
    </SlideShell>
  );
}

function OrbitRings() {
  return (
    <svg width="760" height="760" viewBox="0 0 760 760">
      <defs>
        <linearGradient id="orb1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.blueSoft} />
          <stop offset="100%" stopColor={colors.greenNeon} />
        </linearGradient>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.green} stopOpacity="0.5" />
          <stop offset="100%" stopColor={colors.green} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f63ad" />
          <stop offset="100%" stopColor="#0a1f44" />
        </linearGradient>
      </defs>

      {/* central bloom */}
      <circle cx="380" cy="380" r="230" fill="url(#orbGlow)" />

      {/* soft pulsing glow behind the building */}
      <circle
        cx="380"
        cy="380"
        r="120"
        fill="url(#orbGlow)"
        style={{ transformBox: "fill-box", transformOrigin: "center", animation: "gv-pulse 3.8s ease-in-out infinite" }}
      />

      {/* stylised green skyscraper at the centre of the orbit */}
      <CityCore />

      {/* rotating rings — each group spins around the SVG centre so its dots orbit visibly */}
      {[
        { r: 350, dur: 46, w: 1.5, dash: "2 14", op: 0.35, rev: false },
        { r: 270, dur: 34, w: 2, dash: "", op: 0.5, rev: true },
        { r: 190, dur: 24, w: 2.5, dash: "6 16", op: 0.65, rev: false },
      ].map((o, i) => (
        <g
          key={i}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: `${o.rev ? "gv-spin-rev" : "gv-spin"} ${o.dur}s linear infinite`,
          }}
        >
          <circle
            cx="380"
            cy="380"
            r={o.r}
            fill="none"
            stroke="url(#orb1)"
            strokeWidth={o.w}
            strokeDasharray={o.dash || undefined}
            opacity={o.op}
          />
          <circle
            cx={380 + o.r}
            cy="380"
            r={i === 1 ? 9 : 7}
            fill={colors.greenNeon}
            style={{ filter: `drop-shadow(0 0 10px ${colors.greenNeon})` }}
          />
          <circle
            cx={380 - o.r}
            cy="380"
            r={5}
            fill={colors.blueSoft}
            style={{ filter: `drop-shadow(0 0 8px ${colors.blueSoft})` }}
          />
        </g>
      ))}
    </svg>
  );
}

/* Stylised modern skyscraper cluster: gradient towers, lit window grid,
 * green-roof accents and a blinking antenna light — sits inside the orbit. */
function CityCore() {
  const BASE = 506;

  const windows = (x0: number, y0: number, x1: number, y1: number, cols: number, rows: number, keyp: string) => {
    const ww = 7;
    const wh = 10;
    const cstep = (x1 - x0) / cols;
    const rstep = (y1 - y0) / rows;
    const out: React.ReactNode[] = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = x0 + cstep * c + (cstep - ww) / 2;
        const y = y0 + rstep * r + (rstep - wh) / 2;
        const lit = (c * 5 + r * 3) % 4 === 0;
        out.push(
          <rect
            key={`${keyp}-${c}-${r}`}
            x={x}
            y={y}
            width={ww}
            height={wh}
            rx={1.5}
            fill={lit ? colors.greenNeon : "#bcd2f5"}
            opacity={lit ? 0.92 : 0.32}
            style={lit ? { filter: `drop-shadow(0 0 4px ${colors.greenNeon})` } : undefined}
          />
        );
      }
    }
    return out;
  };

  const stroke = "rgba(124,180,255,0.45)";

  return (
    <g>
      {/* left tower */}
      <rect x={300} y={332} width={52} height={BASE - 332} fill="url(#bldg)" stroke={stroke} strokeWidth={1.2} />
      {windows(300, 344, 352, BASE, 3, 7, "L")}

      {/* right tower */}
      <rect x={420} y={300} width={50} height={BASE - 300} fill="url(#bldg)" stroke={stroke} strokeWidth={1.2} />
      {windows(420, 312, 470, BASE, 3, 8, "R")}

      {/* main tower */}
      <rect x={350} y={258} width={66} height={BASE - 258} fill="url(#bldg)" stroke={stroke} strokeWidth={1.4} />
      {windows(350, 270, 416, BASE, 4, 9, "M")}

      {/* ground line */}
      <rect x={288} y={BASE} width={196} height={3} rx={1.5} fill={colors.blueSoft} opacity={0.5} />
    </g>
  );
}

/* ============================= SLIDE 2 — THE QUESTION ======================= */
export function Slide02() {
  const showAnswer = useRevealVisible(1);
  const options = ["Müteahhit mi?", "Yatırımcı mı?", "Banka mı?"];
  return (
    <SlideShell>
      <Kicker>Oyunun sorusu</Kicker>
      <Title size={104} style={{ marginTop: 26, maxWidth: 1500 }}>
        Gayrimenkulde gerçek <Grad>patron</Grad> kim?
      </Title>

      <div style={{ display: "flex", gap: 36, marginTop: 90 }}>
        {options.map((o, i) => (
          <motion.div
            key={o}
            variants={fadeUp}
            custom={i}
            style={{
              flex: 1,
              padding: "48px 40px",
              borderRadius: 26,
              textAlign: "center",
              background: "linear-gradient(160deg, rgba(18,42,84,0.55), rgba(7,20,42,0.45))",
              border: "1px solid rgba(124,180,255,0.18)",
              fontFamily: font.heading,
              fontWeight: 600,
              fontSize: 46,
              color: colors.softGray,
            }}
          >
            {o}
          </motion.div>
        ))}
      </div>

      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: ease.out }}
          style={{ marginTop: 64, display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              padding: "44px 80px",
              borderRadius: 999,
              background: "linear-gradient(135deg, rgba(35,209,139,0.18), rgba(30,115,232,0.12))",
              border: `1.5px solid ${colors.greenNeon}`,
              boxShadow: `0 0 70px -10px ${colors.greenNeon}aa`,
              fontFamily: font.heading,
              fontWeight: 700,
              fontSize: 60,
              color: colors.iceWhite,
            }}
          >
            Yoksa <Grad from={colors.green} to={colors.greenNeon}>son kullanıcı</Grad> mı?
          </div>
        </motion.div>
      )}
    </SlideShell>
  );
}

/* ============================= SLIDE 3 — ÜRETTİĞİMİ SATARIM ================= */
export function Slide03() {
  // Reveal the text only after the car has had a beat alone on stage.
  // Done via delayed mounting (not a long animation `delay`) so we never leave
  // a pending animation that could stall the slide-exit transition.
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SlideShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 90, alignItems: "center", height: "100%" }}>
        {/* text — mounts after the car settles in */}
        <div>
          {showText && (
            <motion.div className="gv-fade" initial={{ y: 28 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease }}>
              <Kicker>Dönem 1</Kicker>
              <Support style={{ marginTop: 36, fontSize: 40 }}>Talep yüksek, üretim sınırlıydı.</Support>
            </motion.div>
          )}
        </div>
        {/* car — appears first, alone on the dark stage */}
        <motion.div variants={scaleIn}>
          <ImageSlot
            asset="Ford Model T · 1908–1927"
            caption="Ford'un ilk seri üretim siyah otomobili"
            tone="dark"
            src={fordModelT}
            style={{ height: 600 }}
          />
        </motion.div>
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 4 — FORD QUOTE ======================== */
export function Slide04() {
  const full = "İstediğiniz rengi seçebilirsiniz…\nyeter ki siyah olsun.";
  const typed = useTypewriter(full, 0.9, 42);
  const showTitle = useRevealVisible(1);
  const displayQuote = showTitle ? full : typed;
  const quoteDone = showTitle || typed.length >= full.length;

  return (
    <SlideShell>
      <RevealBlock step={1} style={{ marginBottom: 56 }}>
        <Kicker>Dönem 1</Kicker>
        <Title size={108} style={{ marginTop: 26 }}>
          Ürettiğimi <Grad from={colors.blueSoft} to="#fff">satarım.</Grad>
        </Title>
      </RevealBlock>

      <Kicker color={colors.softGray}>1909 · Henry Ford</Kicker>
      <div style={{ marginTop: 50, maxWidth: 1600 }}>
        <span
          style={{
            fontFamily: font.heading,
            fontWeight: 600,
            fontSize: 92,
            lineHeight: 1.15,
            color: colors.iceWhite,
            whiteSpace: "pre-line",
          }}
        >
          “{displayQuote}
          {!showTitle && !quoteDone && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ color: colors.greenNeon }}
            >
              |
            </motion.span>
          )}
          ”
        </span>
      </div>
    </SlideShell>
  );
}

function useTypewriter(full: string, startDelay: number, cps: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let raf = 0;
    let start = 0;
    const delayMs = startDelay * 1000;
    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start - delayMs;
      let chars = 0;
      if (elapsed > 0) {
        chars = Math.min(full.length, Math.floor((elapsed / 1000) * cps));
        setN(chars);
      }
      if (chars < full.length) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [full, startDelay, cps]);
  return full.slice(0, n);
}

/* ============================= SLIDE 5 — SATABİLECEĞİMİ ÜRETİRİM =========== */
export function Slide05() {
  const showTitle = useRevealVisible(1);
  const bubbles: { label: string; side: "left" | "right"; top: number; order: number }[] = [
    { label: "Konum", side: "left", top: 20, order: 0 },
    { label: "Kat", side: "left", top: 230, order: 2 },
    { label: "Metrekare", side: "left", top: 440, order: 4 },
    { label: "Cephe", side: "right", top: 20, order: 1 },
    { label: "Sosyal donatı", side: "right", top: 230, order: 3 },
    { label: "Konsept", side: "right", top: 440, order: 5 },
  ];
  return (
    <SlideShell>
      <RevealBlock step={1} style={{ marginBottom: 40 }}>
        <Kicker>Dönem 2</Kicker>
        <Title size={104} style={{ marginTop: 24 }}>
          Satabileceğimi <Grad>üretirim.</Grad>
        </Title>
      </RevealBlock>

      <div style={{ position: "relative", marginTop: showTitle ? 0 : 24, height: 560 }}>
        <motion.div variants={scaleIn} style={{ position: "absolute", left: 470, right: 470, top: 0, bottom: 0 }}>
          <ImageSlot
            asset="asset: parkroyal-pickering.jpg"
            src={parkroyalPickering}
            caption="PARKROYAL COLLECTION Pickering · Singapur"
            tone="green"
            style={{ height: "100%" }}
          />
        </motion.div>
        {bubbles.map((b) => (
          <div
            key={b.label}
            className="gv-reveal"
            style={{
              ["--gv-i" as string]: b.order + 5,
              position: "absolute",
              top: b.top,
              ...(b.side === "left" ? { left: 0 } : { right: 0 }),
            }}
          >
            <Pill tone={b.order % 2 === 0 ? "blue" : "green"} style={{ fontSize: 30, fontWeight: 600 }}>
              {b.label}
            </Pill>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 6 — FİNANSIN KURALI ==================== */
export function Slide06() {
  return (
    <SlideShell>
      <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 80, alignItems: "center", height: "100%" }}>
        <div>
          <Kicker>Dönem 3</Kicker>
          <RevealBlock step={1}>
            <Title size={88} style={{ marginTop: 26 }}>
              Finansın kuralına uyan <Grad>ürünü</Grad> üretirim.
            </Title>
            <Support style={{ marginTop: 34 }}>Arzı ve talebi buluşturan köprü artık finans kurumları.</Support>
          </RevealBlock>
          <motion.div variants={fadeUp} style={{ marginTop: 40 }}>
            <ImageSlot
              asset="asset: young-family-dreaming.jpg"
              src={youngFamilyDreaming}
              caption="Genç Türk ailesi · ev hayali"
              tone="dark"
              style={{ height: 220, width: 380 }}
            />
          </motion.div>
        </div>

        <motion.div variants={scaleIn}>
          <GlassCard glow="rgba(35,209,139,0.25)" border="rgba(124,255,178,0.35)" style={{ padding: "56px 60px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: font.body, letterSpacing: "0.2em", fontSize: 22, color: colors.softGray, textTransform: "uppercase" }}>
                Enerji Kimlik Belgesi
              </span>
              <span style={{ fontFamily: font.body, fontSize: 20, color: colors.softGray }}>EKB</span>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 44, alignItems: "flex-end" }}>
              {[
                { g: "A", c: colors.greenNeon, h: 220 },
                { g: "B", c: colors.green, h: 188 },
                { g: "C", c: "#9BD36A", h: 156 },
                { g: "D", c: "#E3C766", h: 124 },
                { g: "E", c: "#E0A24F", h: 96 },
                { g: "F", c: "#D77B43", h: 72 },
                { g: "G", c: colors.amber, h: 52 },
              ].map((band, i) => (
                <div
                  key={band.g}
                  className="gv-rise"
                  style={{
                    ["--gv-i" as string]: i,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      height: band.h,
                      borderRadius: 10,
                      background: band.c,
                      boxShadow: i < 2 ? `0 0 30px -4px ${band.c}` : "none",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingTop: 12,
                      fontFamily: font.heading,
                      fontWeight: 700,
                      fontSize: 28,
                      color: i < 4 ? "#04122B" : "#fff",
                    }}
                  >
                    {band.g}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36, fontFamily: font.body, fontSize: 26, color: colors.softGray }}>
              “Evinizin enerji sınıfı nedir?” — Kredi ve faizin ilk sorusu.
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 7 — YENİ SORU ========================= */
export function Slide07() {
  const qs = ["Sağlıklı mı?", "Verimli mi?", "Finansmana uygun mu?"];
  return (
    <SlideShell>
      <Kicker>Son kullanıcının yeni sorusu</Kicker>
      <Title size={92} style={{ marginTop: 26, maxWidth: 1500 }}>
        Benim evim <Grad>geleceğe değer katan</Grad> bir ev mi?
      </Title>
      <div style={{ display: "flex", gap: 30, marginTop: 90 }}>
        {qs.map((q, i) => (
          <motion.div
            key={q}
            variants={fadeUp}
            custom={i}
            style={{
              flex: 1,
              padding: "54px 44px",
              borderRadius: 26,
              background: "linear-gradient(160deg, rgba(30,115,232,0.12), rgba(7,20,42,0.5))",
              border: "1px solid rgba(124,180,255,0.22)",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 40, color: colors.greenNeon }}>0{i + 1}</span>
            <span style={{ fontFamily: font.heading, fontWeight: 600, fontSize: 42, color: colors.iceWhite }}>{q}</span>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 8 — YEŞİL BİNA İHTİYAÇ ================= */
export function Slide08() {
  return (
    <SlideShell>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 90, alignItems: "center", height: "100%" }}>
        <div>
          <Kicker>Orta gelir için</Kicker>
          <Title size={96} style={{ marginTop: 26 }}>
            Yeşil bina lüks değil, <Grad>asıl ihtiyaçtır.</Grad>
          </Title>
          <Support style={{ marginTop: 36, fontSize: 38 }}>
            Daha düşük enerji gideri. Daha düşük aidat. Daha erişilebilir yaşam.
          </Support>
        </div>
        <motion.div variants={scaleIn}>
          <GlassCard style={{ padding: "48px 52px" }} glow="rgba(35,209,139,0.22)">
            <div style={{ fontFamily: font.body, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: colors.softGray }}>
              Aylık enerji gideri
            </div>
            <BillDrop />
          </GlassCard>
        </motion.div>
      </div>
    </SlideShell>
  );
}

function BillDrop() {
  const playKey = useSlidePlayKey();
  const START = 2400;
  const END = 624; // ~74% reduction from 2400; final display shows %74, not the amount
  const START_DELAY = 1100;
  const DURATION = 2800;
  const [val, setVal] = useState(START);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVal(START);
    setDone(false);
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const elapsed = t - t0 - START_DELAY;
      if (elapsed <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(START + (END - START) * eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playKey]);

  const dropped = val <= START - (START - END) * 0.6;

  return (
    <div style={{ marginTop: 30 }}>
      {!done ? (
        <div
          style={{
            fontFamily: font.heading,
            fontWeight: 700,
            fontSize: 120,
            lineHeight: 1,
            color: dropped ? colors.greenNeon : "#E0B07A",
            transition: "color 0.6s ease",
          }}
        >
          ₺{Math.round(val).toLocaleString("tr-TR")}
        </div>
      ) : (
        <div
          style={{
            fontFamily: font.heading,
            fontWeight: 700,
            fontSize: 120,
            lineHeight: 1,
            color: colors.greenNeon,
            textShadow: `0 0 50px ${colors.green}66`,
          }}
        >
          %74
        </div>
      )}
      <div
        className="gv-reveal"
        style={{
          ["--gv-delay" as string]: `${(START_DELAY + DURATION) / 1000 + 0.2}s`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 24,
        }}
      >
        <svg width="40" height="60" viewBox="0 0 40 60">
          <path d="M20 4 L20 50 M20 50 L8 36 M20 50 L32 36" stroke={colors.greenNeon} strokeWidth="4" fill="none" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${colors.greenNeon})` }} />
        </svg>
        <span style={{ fontFamily: font.body, fontSize: 30, color: colors.greenNeon, fontWeight: 600 }}>
          {done ? "enerji tüketiminde düşüş" : "~%74 daha az"}
        </span>
      </div>
    </div>
  );
}

/* ============================= SLIDE 9 — HOLLANDA ========================== */
export function Slide09() {
  const labels = ["Orta gelir grubu", "Prefabrik cephe panelleri", "3D teknolojisi", "Güneş panelleri"];
  return (
    <SlideShell>
      <Kicker color={colors.blueSoft}>Hollanda · Utrecht — Kwangodreef</Kicker>
      <Title size={96} style={{ marginTop: 24 }}>
        Hedef: <Grad>enerji faturasını</Grad> düşürmek.
      </Title>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, marginTop: 56, height: 560, alignItems: "stretch" }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {labels.map((l, i) => (
            <div
              key={l}
              className="gv-reveal"
              style={{
                ["--gv-i" as string]: i + 3,
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: i < labels.length - 1 ? 36 : 0,
              }}
            >
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: colors.greenNeon, boxShadow: `0 0 14px ${colors.greenNeon}` }} />
              <span
                style={{
                  fontFamily: font.heading,
                  fontWeight: 600,
                  fontSize: 34,
                  color: colors.iceWhite,
                  background: "rgba(4,18,43,0.6)",
                  border: "1px solid rgba(124,255,178,0.3)",
                  borderRadius: 14,
                  padding: "14px 26px",
                  backdropFilter: "blur(8px)",
                }}
              >
              {l}
            </span>
            </div>
          ))}
        </div>

        <div className="gv-scale-in" style={{ ["--gv-delay" as string]: "0.4s", height: "100%" }}>
          <ImageSlot
            asset="asset: netherlands-social-housing-retrofit.jpg"
            src={netherlandsSocialHousing}
            caption="Utrecht, Kanaleneiland · sosyal konut yenilemesi"
            tone="green"
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </SlideShell>
  );
}

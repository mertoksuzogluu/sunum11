import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import StageScaler from "./StageScaler";
import { slideComponents } from "./slides";
import { SlidePlayContext } from "./slideContext";
import slidesData from "../data/slides.json";
import { colors, ease, font } from "../theme";

type SlideMeta = (typeof slidesData)[number];

const TOTAL = slideComponents.length;

type NavState = { index: number; epoch: number };

function hashToIndex(): number {
  const n = parseInt(window.location.hash.replace("#", ""), 10);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(TOTAL - 1, n - 1));
}

function clampIndex(n: number) {
  return Math.max(0, Math.min(TOTAL - 1, n));
}

function initialNav(): NavState {
  return { index: hashToIndex(), epoch: 1 };
}

export default function Deck() {
  const [nav, setNav] = useState<NavState>(initialNav);
  const { index, epoch: playEpoch } = nav;
  const [notesOpen, setNotesOpen] = useState(false);

  const step = useCallback((delta: number) => {
    setNav((prev) => {
      const next = clampIndex(prev.index + delta);
      if (next === prev.index) return prev;
      return { index: next, epoch: prev.epoch + 1 };
    });
  }, []);

  const go = useCallback((target: number) => {
    setNav((prev) => {
      const next = clampIndex(target);
      if (next === prev.index) return prev;
      return { index: next, epoch: prev.epoch + 1 };
    });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = hashToIndex();
      setNav((prev) => {
        if (next === prev.index) return prev;
        return { index: next, epoch: prev.epoch + 1 };
      });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const next = `#${index + 1}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, "", next);
    }
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          step(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          step(-1);
          break;
        case "Home":
          go(0);
          break;
        case "End":
          go(TOTAL - 1);
          break;
        case "n":
        case "N":
          setNotesOpen((v) => !v);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, go]);

  const Current = slideComponents[index];
  const meta = slidesData[index] as SlideMeta;

  return (
    <>
      <StageScaler>
        <SlidePlayContext.Provider value={playEpoch}>
          <div key={playEpoch} className="gv-slide-enter" style={{ position: "absolute", inset: 0 }}>
            <Current />
          </div>

          <Chrome index={index} meta={meta} />
        </SlidePlayContext.Provider>
      </StageScaler>

      <ProgressBar index={index} />
      <NavControls index={index} go={go} notesOpen={notesOpen} setNotesOpen={setNotesOpen} />
      <SpeakerNotes open={notesOpen} meta={meta} index={index} />
    </>
  );
}

/* ----------------------------- Stage chrome ----------------------------- */
function Chrome({ index, meta }: { index: number; meta: SlideMeta }) {
  if (index === 0) return null;
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: 70,
          bottom: 54,
          fontFamily: font.body,
          fontSize: 22,
          color: "rgba(170,183,200,0.6)",
          letterSpacing: "0.12em",
        }}
      >
        <span style={{ color: colors.greenNeon, fontWeight: 600 }}>{String(meta.id).padStart(2, "0")}</span>
        <span style={{ margin: "0 8px" }}>/</span>
        {String(TOTAL).padStart(2, "0")}
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 56,
          fontFamily: font.body,
          fontSize: 18,
          color: "rgba(170,183,200,0.4)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        Yeşil Değer · Anahtar Fikirler Zirvesi 2026
      </div>
    </>
  );
}

/* ----------------------------- Progress bar ----------------------------- */
function ProgressBar({ index }: { index: number }) {
  const pct = ((index + 1) / TOTAL) * 100;
  return (
    <div style={{ position: "fixed", left: 0, top: 0, right: 0, height: 4, background: "rgba(255,255,255,0.05)", zIndex: 50 }}>
      <motion.div
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: ease.out }}
        style={{ height: "100%", background: `linear-gradient(90deg, ${colors.blueSoft}, ${colors.greenNeon})`, boxShadow: `0 0 12px ${colors.greenNeon}` }}
      />
    </div>
  );
}

/* ----------------------------- Nav controls ----------------------------- */
function NavControls({
  index,
  go,
  notesOpen,
  setNotesOpen,
}: {
  index: number;
  go: (n: number) => void;
  notesOpen: boolean;
  setNotesOpen: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: 26,
        bottom: 24,
        display: "flex",
        gap: 10,
        zIndex: 60,
        opacity: 0.9,
      }}
    >
      <CtrlButton label="‹" onClick={() => go(index - 1)} disabled={index === 0} />
      <CtrlButton label="›" onClick={() => go(index + 1)} disabled={index === TOTAL - 1} />
      <CtrlButton
        label="Notlar"
        active={notesOpen}
        onClick={() => setNotesOpen(!notesOpen)}
        wide
      />
    </div>
  );
}

function CtrlButton({
  label,
  onClick,
  disabled,
  active,
  wide,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: wide ? "auto" : 46,
        height: 46,
        padding: wide ? "0 18px" : 0,
        borderRadius: 12,
        border: `1px solid ${active ? colors.greenNeon : "rgba(124,180,255,0.25)"}`,
        background: active ? "rgba(35,209,139,0.18)" : "rgba(7,20,42,0.7)",
        color: active ? colors.greenNeon : "rgba(245,248,255,0.85)",
        fontFamily: "var(--font-body)",
        fontSize: wide ? 16 : 24,
        fontWeight: 600,
        opacity: disabled ? 0.3 : 1,
        backdropFilter: "blur(8px)",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}

/* ----------------------------- Speaker notes ---------------------------- */
function SpeakerNotes({ open, meta, index }: { open: boolean; meta: SlideMeta; index: number }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: ease.out }}
          className="thin-scrollbar"
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            width: 540,
            zIndex: 55,
            background: "rgba(4,12,28,0.94)",
            borderLeft: "1px solid rgba(124,180,255,0.2)",
            backdropFilter: "blur(16px)",
            padding: "48px 44px",
            overflowY: "auto",
            boxShadow: "-30px 0 80px -30px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: font.body, fontSize: 14, letterSpacing: "0.24em", color: colors.greenNeon, textTransform: "uppercase" }}>
              Konuşmacı Notu · Slayt {meta.id}/{slidesData.length}
            </span>
          </div>

          <h3 style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 30, color: colors.iceWhite, marginTop: 22, lineHeight: 1.2 }}>
            {meta.title}
          </h3>
          <p style={{ fontFamily: font.body, fontSize: 17, color: colors.softGray, marginTop: 8, fontStyle: "italic" }}>{meta.subtitle}</p>

          <div style={{ height: 1, background: "rgba(124,180,255,0.15)", margin: "26px 0" }} />

          <p style={{ fontFamily: font.body, fontSize: 18.5, lineHeight: 1.65, color: "rgba(245,248,255,0.92)" }}>{meta.speakerNotes}</p>

          <div style={{ marginTop: 34, display: "grid", gap: 16 }}>
            <NoteMeta label="Görsel yönü" value={meta.visualDirection} />
            <NoteMeta label="Grafik" value={meta.chartType} />
            <NoteMeta label="Animasyon" value={meta.animationDirection} />
          </div>

          <div style={{ marginTop: 40, fontFamily: font.body, fontSize: 13, color: "rgba(170,183,200,0.45)", lineHeight: 1.7 }}>
            Kısayollar: ← / → geçiş · N notlar · F tam ekran · Home/End baş-son
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function NoteMeta({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "rgba(124,180,255,0.05)", border: "1px solid rgba(124,180,255,0.12)", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontFamily: font.body, fontSize: 12, letterSpacing: "0.18em", color: colors.blueSoft, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: font.body, fontSize: 15.5, color: "rgba(245,248,255,0.85)", marginTop: 6, lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
  else document.exitFullscreen().catch(() => {});
}

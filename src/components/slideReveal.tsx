import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ease } from "../theme";

type SlideRevealCtx = {
  slideIndex: number;
  revealBySlide: Readonly<Record<number, number>>;
};

export const SlideRevealContext = createContext<SlideRevealCtx>({
  slideIndex: 0,
  revealBySlide: {},
});

/** True when the current slide has reached the required reveal step. */
export function useRevealVisible(requiredStep = 1) {
  const { slideIndex, revealBySlide } = useContext(SlideRevealContext);
  return (revealBySlide[slideIndex] ?? 0) >= requiredStep;
}

/** Animated block shown after a reveal click on the current slide. */
export function RevealBlock({
  step = 1,
  style,
  children,
}: {
  step?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const visible = useRevealVisible(step);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: ease.out }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function SlideRevealProvider({
  slideIndex,
  revealBySlide,
  children,
}: {
  slideIndex: number;
  revealBySlide: Record<number, number>;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ slideIndex, revealBySlide }),
    [slideIndex, revealBySlide],
  );
  return <SlideRevealContext.Provider value={value}>{children}</SlideRevealContext.Provider>;
}

/**
 * Extra forward clicks before leaving each deck index (0-based).
 * Must match slideComponents order in slides/index.tsx.
 */
export const REVEAL_STEPS: readonly number[] = [
  0, // 01
  1, // 02 — son kullanıcı
  0, // 03
  1, // 04 — Ford / Ürettiğimi satarım
  1, // 05 — Satabileceğimi üretirim
  1, // 06 — Finansın kuralı
  0, // 08 (07 skipped in deck)
  0, // 09
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 10–18
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 19–27 (+23b, 24b)
];

export function revealMaxForIndex(index: number) {
  return REVEAL_STEPS[index] ?? 0;
}

const TOTAL_REVEAL_STEPS = REVEAL_STEPS.reduce((sum, n) => sum + n, 0);

/** Progress across the whole deck — every slide change and reveal click advances the bar. */
export function revealProgressPct(
  slideIndex: number,
  totalSlides: number,
  revealBySlide: Record<number, number>,
) {
  const maxUnits = totalSlides - 1 + TOTAL_REVEAL_STEPS;
  let units = slideIndex;
  for (let i = 0; i <= slideIndex; i++) {
    units += revealBySlide[i] ?? 0;
  }
  return (units / maxUnits) * 100;
}

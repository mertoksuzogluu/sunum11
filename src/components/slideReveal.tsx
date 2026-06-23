import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useRevealStep } from "./revealContext";
import { ease } from "../theme";

/** Optional prop every slide may receive from Deck (context is the source of truth). */
export type SlideRevealProps = {
  revealStep?: number;
};

/** Animated block shown after a reveal click on the current slide. */
export function RevealBlock({
  revealStep: revealStepProp,
  requiredStep = 1,
  style,
  children,
}: {
  revealStep?: number;
  requiredStep?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const revealStepFromContext = useRevealStep();
  const revealStep = revealStepProp ?? revealStepFromContext;
  if (revealStep < requiredStep) return null;
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

/** Total forward actions: slide changes + all reveal clicks across the deck. */
export function totalForwardSteps(totalSlides: number) {
  if (totalSlides <= 0) return 0;
  const reveals = REVEAL_STEPS.reduce((sum, n) => sum + n, 0);
  return totalSlides - 1 + reveals;
}

/** Completed forward actions up to and including the current slide position. */
export function completedForwardSteps(slideIndex: number, reveals: Record<number, number>) {
  let steps = slideIndex;
  for (let i = 0; i <= slideIndex; i++) {
    steps += reveals[i] ?? 0;
  }
  return steps;
}

export function revealProgressPct(
  slideIndex: number,
  totalSlides: number,
  reveals: Record<number, number> = {},
) {
  const total = totalForwardSteps(totalSlides);
  if (total <= 0) return 0;
  const done = completedForwardSteps(slideIndex, reveals);
  return Math.min(100, (done / total) * 100);
}

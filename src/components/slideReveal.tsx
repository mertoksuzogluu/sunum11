import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { ease } from "../theme";

/** Optional prop every slide may receive from Deck. */
export type SlideRevealProps = {
  revealStep?: number;
};

/** Animated block shown after a reveal click on the current slide. */
export function RevealBlock({
  revealStep = 0,
  requiredStep = 1,
  style,
  children,
}: {
  revealStep?: number;
  requiredStep?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
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

/** Simple 1-based slide position — (slide 4 of 29 ≈ 14%, never hits 100% until last slide). */
export function revealProgressPct(slideIndex: number, totalSlides: number) {
  if (totalSlides <= 0) return 0;
  const safeIndex = Math.max(0, Math.min(slideIndex, totalSlides - 1));
  return ((safeIndex + 1) / totalSlides) * 100;
}

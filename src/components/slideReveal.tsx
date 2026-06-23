import { type CSSProperties, type ReactNode } from "react";
import { useRevealStep } from "./revealContext";

/** Optional prop every slide may receive from Deck (prop wins over context). */
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
  const revealStep = useRevealStep(revealStepProp);
  if (revealStep < requiredStep) return null;
  return (
    <div className="gv-reveal" style={style}>
      {children}
    </div>
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
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, // 19–27 (index 23 = Slide23b reveal)
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

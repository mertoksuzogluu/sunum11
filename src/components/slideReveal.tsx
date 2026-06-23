import { createContext, useContext, type ReactNode } from "react";

type SlideRevealCtx = {
  subStep: number;
};

export const SlideRevealContext = createContext<SlideRevealCtx>({
  subStep: 0,
});

/** True when `subStep` has reached the registered reveal count. */
export function useRevealVisible(requiredStep = 1) {
  const { subStep } = useContext(SlideRevealContext);
  return subStep >= requiredStep;
}

export function SlideRevealProvider({ subStep, children }: { subStep: number; children: ReactNode }) {
  return <SlideRevealContext.Provider value={{ subStep }}>{children}</SlideRevealContext.Provider>;
}

/**
 * Deck slide index (0-based) → extra forward clicks required before leaving.
 * Declared here so registration never races with mount/unmount cleanup.
 */
export const REVEAL_STEPS_BY_INDEX: Record<number, number> = {
  1: 1, // Slide02 — son kullanıcı
  3: 1, // Slide04 — Ürettiğimi satarım
  4: 1, // Slide05 — Satabileceğimi üretirim
  5: 1, // Slide06 — Finansın kuralı
};

export function revealMaxForIndex(index: number) {
  return REVEAL_STEPS_BY_INDEX[index] ?? 0;
}

const TOTAL_REVEAL_STEPS = Object.values(REVEAL_STEPS_BY_INDEX).reduce((sum, n) => sum + n, 0);

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

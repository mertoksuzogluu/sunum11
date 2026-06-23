import { type CSSProperties, type ReactNode } from "react";
import { useRevealStep } from "./revealContext";
import { REVEAL_STEPS } from "./slides";

export { REVEAL_STEPS };

/** Optional prop every slide may receive from Deck (prop wins over context). */
export type SlideRevealProps = {
  revealStep?: number;
};

/**
 * Reveal slot — always mounted so sibling order stays stable (no React remount
 * cascade). Hidden via opacity/max-height until the reveal step is reached.
 */
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
  const visible = revealStep >= requiredStep;
  const { marginBottom, marginTop, ...restStyle } = style ?? {};

  return (
    <div
      data-reveal-slot
      aria-hidden={!visible}
      style={{
        ...restStyle,
        marginTop,
        marginBottom: visible ? marginBottom : 0,
        maxHeight: visible ? 900 : 0,
        opacity: visible ? 1 : 0,
        overflow: "hidden",
        transition: visible
          ? "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), max-height 0.5s ease"
          : undefined,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
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

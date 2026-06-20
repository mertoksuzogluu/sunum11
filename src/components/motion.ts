import type { Variants } from "framer-motion";
import { ease } from "../theme";

/**
 * Inner entrance language of the deck — TRANSFORM ONLY (no opacity).
 *
 * Framer holds an element at its `initial` value until an animation frame runs;
 * if the tab is throttled/occluded the rAF loop pauses and any `opacity: 0`
 * initial would leave content invisible ("blank slide"). By moving only via
 * transform, inner content is always at opacity 1 — it can never disappear. The
 * fade itself is provided robustly at the slide level by a CSS keyframe
 * (`.gv-slide-enter`, driven by the document timeline), so the deck still reads
 * as "fade + motion" while guaranteeing the stage is never blank.
 */
export const fadeUp: Variants = {
  hidden: { y: 36 },
  show: (i: number = 0) => ({
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: ease.out },
  }),
};

export const fadeIn: Variants = {
  hidden: { y: 8 },
  show: (i: number = 0) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.1, ease: ease.soft },
  }),
};

/** Stagger container for sequential reveals. */
export const stagger = (delay = 0.18, start = 0.2): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: start } },
});

export const scaleIn: Variants = {
  hidden: { scale: 0.92 },
  show: (i: number = 0) => ({
    scale: 1,
    transition: { duration: 0.7, delay: 0.1 + i * 0.1, ease: ease.out },
  }),
};

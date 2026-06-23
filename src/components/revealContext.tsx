import { createContext, useContext } from "react";

/** Reveal state for the active slide — object identity bumps on every change. */
export type RevealSnapshot = {
  slideIndex: number;
  step: number;
  version: number;
};

export const RevealStepContext = createContext<RevealSnapshot>({
  slideIndex: 0,
  step: 0,
  version: 0,
});

export function useRevealStep(explicit?: number) {
  const snapshot = useContext(RevealStepContext);
  return explicit ?? snapshot.step;
}

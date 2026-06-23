import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";

type SlideRevealCtx = {
  /** How many click-advance steps remain on this slide (0 = next click goes to next slide). */
  subStep: number;
  /** Register how many extra clicks this slide needs before leaving. */
  setRevealSteps: (steps: number) => void;
};

export const SlideRevealContext = createContext<SlideRevealCtx>({
  subStep: 0,
  setRevealSteps: () => {},
});

/** True when `subStep` has reached the registered reveal count. */
export function useRevealVisible(requiredStep = 1) {
  const { subStep } = useContext(SlideRevealContext);
  return subStep >= requiredStep;
}

/** Call once on mount to require N click-advances before the deck leaves this slide. */
export function useRevealSteps(steps: number) {
  const { setRevealSteps } = useContext(SlideRevealContext);
  useLayoutEffect(() => {
    setRevealSteps(steps);
    return () => setRevealSteps(0);
  }, [steps, setRevealSteps]);
}

export function SlideRevealProvider({
  subStep,
  setRevealSteps,
  children,
}: {
  subStep: number;
  setRevealSteps: (steps: number) => void;
  children: ReactNode;
}) {
  return (
    <SlideRevealContext.Provider value={{ subStep, setRevealSteps }}>
      {children}
    </SlideRevealContext.Provider>
  );
}

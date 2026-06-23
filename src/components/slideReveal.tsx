import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";

type SlideRevealCtx = {
  subStep: number;
  setRevealSteps: (steps: number) => void;
  /** When false, forward clicks are ignored (e.g. while an animation is still running). */
  gateOpen: boolean;
  setGateOpen: (open: boolean) => void;
};

export const SlideRevealContext = createContext<SlideRevealCtx>({
  subStep: 0,
  setRevealSteps: () => {},
  gateOpen: true,
  setGateOpen: () => {},
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

export function useRevealGate(open: boolean) {
  const { setGateOpen } = useContext(SlideRevealContext);
  useLayoutEffect(() => {
    setGateOpen(open);
    return () => setGateOpen(true);
  }, [open, setGateOpen]);
}

export function SlideRevealProvider({
  subStep,
  setRevealSteps,
  gateOpen,
  setGateOpen,
  children,
}: {
  subStep: number;
  setRevealSteps: (steps: number) => void;
  gateOpen: boolean;
  setGateOpen: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <SlideRevealContext.Provider value={{ subStep, setRevealSteps, gateOpen, setGateOpen }}>
      {children}
    </SlideRevealContext.Provider>
  );
}

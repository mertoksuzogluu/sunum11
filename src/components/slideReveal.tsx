import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";

type SlideRevealCtx = {
  subStep: number;
  registerRevealSteps: (steps: number) => void;
  /** When false, forward clicks are ignored (e.g. while an animation is still running). */
  gateOpen: boolean;
  setGateOpen: (open: boolean) => void;
  registerGateBlockedForward: (handler: (() => void) | null) => void;
};

export const SlideRevealContext = createContext<SlideRevealCtx>({
  subStep: 0,
  registerRevealSteps: () => {},
  gateOpen: true,
  setGateOpen: () => {},
  registerGateBlockedForward: () => {},
});

/** True when `subStep` has reached the registered reveal count. */
export function useRevealVisible(requiredStep = 1) {
  const { subStep } = useContext(SlideRevealContext);
  return subStep >= requiredStep;
}

/** Call once on mount to require N click-advances before the deck leaves this slide. */
export function useRevealSteps(steps: number) {
  const { registerRevealSteps } = useContext(SlideRevealContext);
  useLayoutEffect(() => {
    registerRevealSteps(steps);
    return () => registerRevealSteps(0);
  }, [steps, registerRevealSteps]);
}

export function useRevealGate(open: boolean, onBlockedForward?: () => void) {
  const { setGateOpen, registerGateBlockedForward } = useContext(SlideRevealContext);
  useLayoutEffect(() => {
    setGateOpen(open);
    registerGateBlockedForward(open ? null : (onBlockedForward ?? null));
    return () => {
      setGateOpen(true);
      registerGateBlockedForward(null);
    };
  }, [open, onBlockedForward, setGateOpen, registerGateBlockedForward]);
}

export function SlideRevealProvider({
  subStep,
  registerRevealSteps,
  gateOpen,
  setGateOpen,
  registerGateBlockedForward,
  children,
}: {
  subStep: number;
  registerRevealSteps: (steps: number) => void;
  gateOpen: boolean;
  setGateOpen: (open: boolean) => void;
  registerGateBlockedForward: (handler: (() => void) | null) => void;
  children: ReactNode;
}) {
  return (
    <SlideRevealContext.Provider value={{ subStep, registerRevealSteps, gateOpen, setGateOpen, registerGateBlockedForward }}>
      {children}
    </SlideRevealContext.Provider>
  );
}

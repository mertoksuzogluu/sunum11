import { createContext, useContext } from "react";

/** Monotonic counter — bumps on every navigation so entrance hooks can replay. */
export const SlidePlayContext = createContext(0);

export function useSlidePlayKey() {
  return useContext(SlidePlayContext);
}

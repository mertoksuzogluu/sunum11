import { createContext, useContext } from "react";

/** Current reveal sub-step for the active deck index (0 = nothing revealed yet). */
export const RevealStepContext = createContext(0);

export function useRevealStep() {
  return useContext(RevealStepContext);
}

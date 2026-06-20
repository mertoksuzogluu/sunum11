import { useSlidePlayKey } from "./slideContext";

/** Unique counter bumped on every slide navigation — use as React `key` to replay Framer animations. */
export function useReplayKey() {
  return useSlidePlayKey();
}

/** @deprecated Use `useReplayKey()` as a React `key` instead of gating `animate`. */
export function useMotionReady() {
  return true;
}

import { REVEAL_STEPS } from "./slideReveal";

export type DeckState = {
  index: number;
  epoch: number;
  reveals: Record<number, number>;
};

export function revealMaxForIndex(index: number) {
  return REVEAL_STEPS[index] ?? 0;
}

export function revealStepFor(state: DeckState) {
  return state.reveals[state.index] ?? 0;
}

export function clampDeckIndex(index: number, total: number) {
  return Math.max(0, Math.min(total - 1, index));
}

/** Pure forward/back — used by Deck and easy to reason about when debugging. */
export function applyDeckStep(prev: DeckState, delta: number, total: number): DeckState {
  const max = revealMaxForIndex(prev.index);
  const sub = prev.reveals[prev.index] ?? 0;

  if (delta > 0 && sub < max) {
    return {
      ...prev,
      reveals: { ...prev.reveals, [prev.index]: sub + 1 },
    };
  }

  if (delta < 0 && sub > 0) {
    return {
      ...prev,
      reveals: { ...prev.reveals, [prev.index]: sub - 1 },
    };
  }

  const next = clampDeckIndex(prev.index + delta, total);
  if (next === prev.index) return prev;

  return {
    index: next,
    epoch: prev.epoch + 1,
    reveals: prev.reveals,
  };
}

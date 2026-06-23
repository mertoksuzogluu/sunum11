import slidesData from "../data/slides.json";

type SlideMeta = (typeof slidesData)[number];

/**
 * Map deck component index → slides.json array index.
 * Deck skips json id 7; inserts 14b / 23b / 24b without dropping json rows.
 */
export const DECK_TO_JSON_INDEX: readonly number[] = [
  0, 1, 2, 3, 4, 5, // 01–06
  7, 8, 9, 10, 11, 12, // 08–14 (json id 7 skipped)
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, // 14b–22
  22, 23, 24, 25, 26, 27, 28, // 23–27 (+23b, 24b)
];

if (DECK_TO_JSON_INDEX.length !== 29) {
  throw new Error(`DECK_TO_JSON_INDEX (${DECK_TO_JSON_INDEX.length}) must match deck size (29)`);
}

export function metaForDeckIndex(deckIndex: number): SlideMeta {
  const jsonIndex = DECK_TO_JSON_INDEX[deckIndex] ?? deckIndex;
  return slidesData[jsonIndex] ?? slidesData[slidesData.length - 1];
}

import type { ComponentType } from "react";
import type { SlideRevealProps } from "../slideReveal";
import { Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide08, Slide09 } from "./SlidesA";
import { Slide10, Slide11, Slide12, Slide13, Slide14, Slide14b, Slide15, Slide16, Slide17, Slide18 } from "./SlidesB";
import { Slide19, Slide20, Slide21, Slide22, Slide23, Slide23b, Slide24, Slide24b, Slide25, Slide26, Slide27 } from "./SlidesC";

type DeckEntry = {
  id: string;
  component: ComponentType<SlideRevealProps>;
  reveals: number;
};

/** Single source of truth: component order + reveal clicks per slide. */
const deckEntries: DeckEntry[] = [
  { id: "01", component: Slide01, reveals: 0 },
  { id: "02", component: Slide02, reveals: 1 },
  { id: "03", component: Slide03, reveals: 0 },
  { id: "04", component: Slide04, reveals: 1 },
  { id: "05", component: Slide05, reveals: 1 },
  { id: "06", component: Slide06, reveals: 1 },
  { id: "08", component: Slide08, reveals: 0 },
  { id: "09", component: Slide09, reveals: 0 },
  { id: "10", component: Slide10, reveals: 0 },
  { id: "11", component: Slide11, reveals: 0 },
  { id: "12", component: Slide12, reveals: 0 },
  { id: "13", component: Slide13, reveals: 0 },
  { id: "14", component: Slide14, reveals: 0 },
  { id: "14b", component: Slide14b, reveals: 0 },
  { id: "15", component: Slide15, reveals: 0 },
  { id: "16", component: Slide16, reveals: 0 },
  { id: "17", component: Slide17, reveals: 0 },
  { id: "18", component: Slide18, reveals: 0 },
  { id: "19", component: Slide19, reveals: 0 },
  { id: "20", component: Slide20, reveals: 0 },
  { id: "21", component: Slide21, reveals: 0 },
  { id: "22", component: Slide22, reveals: 0 },
  { id: "23", component: Slide23, reveals: 0 },
  { id: "23b", component: Slide23b, reveals: 1 },
  { id: "24", component: Slide24, reveals: 0 },
  { id: "24b", component: Slide24b, reveals: 0 },
  { id: "25", component: Slide25, reveals: 0 },
  { id: "26", component: Slide26, reveals: 0 },
  { id: "27", component: Slide27, reveals: 0 },
];

export const slideComponents = deckEntries.map((e) => e.component);
export const REVEAL_STEPS: readonly number[] = deckEntries.map((e) => e.reveals);

const idx23b = deckEntries.findIndex((e) => e.id === "23b");
const idx24 = deckEntries.findIndex((e) => e.id === "24");
if (deckEntries[idx23b]?.reveals !== 1 || deckEntries[idx24]?.reveals !== 0) {
  throw new Error("Slide23b must have 1 reveal; Slide24 must have 0");
}

import type { ComponentType } from "react";
import type { SlideRevealProps } from "../slideReveal";
import { Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide08, Slide09 } from "./SlidesA";
import { Slide10, Slide11, Slide12, Slide13, Slide14, Slide14b, Slide15, Slide16, Slide17, Slide18 } from "./SlidesB";
import { Slide19, Slide20, Slide21, Slide22, Slide23, Slide23b, Slide24, Slide24b, Slide25, Slide26, Slide27 } from "./SlidesC";

/** Registry mapping slide id (1-based) to its bespoke component. */
export const slideComponents: ComponentType<SlideRevealProps>[] = [
  Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide08, Slide09,
  Slide10, Slide11, Slide12, Slide13, Slide14, Slide14b, Slide15, Slide16, Slide17, Slide18,
  Slide19, Slide20, Slide21, Slide22, Slide23, Slide23b, Slide24, Slide24b, Slide25, Slide26, Slide27,
];

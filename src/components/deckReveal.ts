/**
 * Reveal clicks per deck index — must stay in sync with slideComponents in slides/index.tsx.
 * Index → component: 22=Slide23 (KPI), 23=Slide23b (radikal reveal), 24=Slide24.
 */
export const REVEAL_STEPS: readonly number[] = [
  0, // 01 Slide01
  1, // 02 Slide02
  0, // 03 Slide03
  1, // 04 Slide04
  1, // 05 Slide05
  1, // 06 Slide06
  0, // 08 Slide08
  0, // 09 Slide09
  0, // 10 Slide10
  0, // 11 Slide11
  0, // 12 Slide12
  0, // 13 Slide13
  0, // 14 Slide14
  0, // 14b Slide14b
  0, // 15 Slide15
  0, // 16 Slide16
  0, // 17 Slide17
  0, // 18 Slide18
  0, // 19 Slide19
  0, // 20 Slide20
  0, // 21 Slide21
  0, // 22 Slide22
  0, // 23 Slide23 — KPI
  1, // 23b Slide23b — radikal başlık → tık → bina + foto
  0, // 24 Slide24
  0, // 24b Slide24b
  0, // 25 Slide25
  0, // 26 Slide26
  0, // 27 Slide27
];

export function revealMaxForIndex(index: number) {
  return REVEAL_STEPS[index] ?? 0;
}

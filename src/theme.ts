/**
 * Yeşil Değer — Design tokens
 * Palette derived from the SAsya's brand (royal blue wordmark + gold crown)
 * blended with a premium tech-summit dark/neon atmosphere.
 */

export const colors = {
  // Deep night blue / navy backgrounds
  navy900: "#04122B",
  navy800: "#071A3A",
  navy700: "#09295C",

  // SAsya's corporate bright blue
  blue: "#1667D9",
  blueBright: "#1E73E8",
  blueSoft: "#3E8BFF",

  // Sustainability greens
  green: "#23D18B",
  greenNeon: "#7CFFB2",

  // Neutrals
  iceWhite: "#F5F8FF",
  softGray: "#AAB7C8",

  // Controlled brown / amber for "brown discount" (echoes the gold crown)
  amber: "#B47A3C",
  amberDeep: "#9A6A3A",

  // Functional
  danger: "#E2604B",
} as const;

export const gradients = {
  // Primary stage backdrop
  stage:
    "radial-gradient(120% 120% at 18% 8%, rgba(30,115,232,0.20) 0%, rgba(7,26,58,0) 42%)," +
    "radial-gradient(120% 120% at 88% 92%, rgba(35,209,139,0.16) 0%, rgba(7,26,58,0) 46%)," +
    "linear-gradient(160deg, #071A3A 0%, #04122B 60%, #03101F 100%)",
  blueGreen: "linear-gradient(135deg, #1E73E8 0%, #23D18B 100%)",
  greenNeon: "linear-gradient(135deg, #23D18B 0%, #7CFFB2 100%)",
  brown: "linear-gradient(135deg, #9A6A3A 0%, #B47A3C 100%)",
} as const;

export const font = {
  display: "'Sora', 'Space Grotesk', system-ui, sans-serif",
  heading: "'Space Grotesk', 'Sora', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
} as const;

/** Logical design size of the 16:9 stage. All slides are authored at this size
 *  and uniformly scaled to fit any screen. */
export const STAGE = { width: 1920, height: 1080 } as const;

export const ease = {
  // Premium, controlled easing curves (no bouncy / amateur feel)
  soft: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
};

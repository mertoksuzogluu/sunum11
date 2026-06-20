import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useSlidePlayKey } from "./slideContext";

export const CSS_ANIM_SELECTOR =
  ".gv-reveal, .gv-fade, .gv-rise, .gv-pop, .gv-pop-scale, .gv-scale-in, .gv-chart-bar, .gv-donut-arc, .gv-draw-line";

/** Force CSS keyframe animations to restart (document-timeline safe). */
export function restartCssAnimations(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(CSS_ANIM_SELECTOR).forEach((el) => {
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.removeProperty("animation");
  });
}

export function useCssAnimRestart() {
  const playKey = useSlidePlayKey();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    restartCssAnimations(root);
  }, [playKey]);

  return { ref, playKey };
}

/** Root wrapper for slides that don't use SlideShell but still need CSS anim restart. */
export function CssAnimRoot({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const { ref, playKey } = useCssAnimRestart();
  return (
    <div key={playKey} ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

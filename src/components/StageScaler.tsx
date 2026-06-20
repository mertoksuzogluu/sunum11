import { useLayoutEffect, useState, type ReactNode } from "react";
import { STAGE } from "../theme";

/**
 * Renders children inside a fixed 1920×1080 (16:9) logical stage and scales it
 * to **cover** the viewport — no letterbox bars on the sides or top/bottom.
 * A small edge crop on non-16:9 screens is normal for stage/keynote use.
 */
export default function StageScaler({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const w = window.visualViewport?.width ?? window.innerWidth;
      const h = window.visualViewport?.height ?? window.innerHeight;
      const s = Math.max(w / STAGE.width, h / STAGE.height);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        display: "grid",
        placeItems: "center",
        background: "#03101f",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: STAGE.width,
          height: STAGE.height,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

import { useLayoutEffect, useState, type ReactNode } from "react";
import { STAGE } from "../theme";

/**
 * Renders children inside a fixed 1920x1080 (16:9) logical stage and
 * uniformly scales it to perfectly fit the viewport (letterboxed).
 * Every slide is authored at 1920x1080 so it looks identical everywhere.
 */
export default function StageScaler({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const s = Math.min(
        window.innerWidth / STAGE.width,
        window.innerHeight / STAGE.height
      );
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
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

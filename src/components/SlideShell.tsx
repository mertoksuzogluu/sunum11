import { useLayoutEffect, useRef, type ReactNode } from "react";
import StageBackground from "./StageBackground";
import { useSlidePlayKey } from "./slideContext";
import { restartCssAnimations } from "./cssAnimRestart";
import { STAGE } from "../theme";

/**
 * Standard slide canvas: full 16:9 stage, shared background and a padded
 * content area. CSS classes (`.gv-reveal`, chart helpers) handle all
 * entrance motion — document-timeline safe on every navigation.
 */
export default function SlideShell({
  children,
  bg = "default",
  pad = 130,
  align = "center",
  showBg = true,
}: {
  children: ReactNode;
  bg?: "default" | "split" | "quiet";
  pad?: number;
  align?: "center" | "flex-start";
  staggerDelay?: number;
  staggerStart?: number;
  showBg?: boolean;
}) {
  const playKey = useSlidePlayKey();
  const contentRef = useRef<HTMLDivElement>(null);

  // Restart CSS keyframe reveals on every slide entry (document-timeline safe).
  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    restartCssAnimations(root);
  }, [playKey]);

  return (
    <div style={{ position: "absolute", inset: 0, width: STAGE.width, height: STAGE.height, overflow: "hidden" }}>
      {showBg && <StageBackground variant={bg} />}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          height: "100%",
          padding: `110px ${pad}px 130px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
      >
        {children}
      </div>
    </div>
  );
}

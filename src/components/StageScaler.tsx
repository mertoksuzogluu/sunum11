import { useLayoutEffect, useState, type ReactNode } from "react";
import { STAGE } from "../theme";

/** Viewport size excluding scrollbars (avoids horizontal gap on Windows). */
function viewportSize() {
  return {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
  };
}

/**
 * Fixed 1920×1080 stage scaled to **contain** the viewport.
 * Entire 16:9 canvas stays visible — safe for projection without cropping chrome.
 */
export default function StageScaler({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const update = () => {
      const { w, h } = viewportSize();
      setScale(Math.min(w / STAGE.width, h / STAGE.height));
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    document.addEventListener("fullscreenchange", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      document.removeEventListener("fullscreenchange", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#03101f",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: STAGE.width,
          height: STAGE.height,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

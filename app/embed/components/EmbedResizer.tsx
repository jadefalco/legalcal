"use client";

import { useEffect, useRef } from "react";

export function EmbedResizer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function sendHeight() {
      if (!container) return;
      const height = container.scrollHeight;
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: "resize", height },
          "*"
        );
      }
    }

    // Send initial height
    sendHeight();

    // Observe mutations and resize
    const observer = new MutationObserver(sendHeight);
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    window.addEventListener("resize", sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sendHeight);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

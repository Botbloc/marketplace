// hooks/useContainerWidth.js
"use client";

import { useState, useEffect, useRef } from "react";

export default function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1) Read initial width immediately
    const updateWidth = () => {
      const rect = el.getBoundingClientRect();
      setWidth(rect.width);
      //console.log(rect.width);
    };

    updateWidth();

    // 2) Prefer ResizeObserver if available
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => {
        updateWidth();
      });

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    } else {
      // 3) Fallback for environments without ResizeObserver
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []); // important: no ref.current here

  return { ref, width };
}

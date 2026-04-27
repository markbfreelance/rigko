"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const value = max <= 0 ? 0 : (h.scrollTop / max) * 100;
      setPct(value);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 h-0.5 z-[900] pointer-events-none">
      <div
        className="h-full bg-[#c2000b] shadow-[0_0_8px_#c2000b] transition-[width] duration-100"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

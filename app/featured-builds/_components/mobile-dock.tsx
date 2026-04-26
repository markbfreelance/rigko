"use client";

import type { Build } from "../_data/builds";
import { scrollToSection } from "./use-scroll-spy";

export default function MobileDock({
  builds,
  activeId,
}: {
  builds: Build[];
  activeId: string;
}) {
  if (builds.length === 0) return null;

  return (
    <nav
      aria-label="Build navigation dock"
      className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-2rem)]"
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-xl bg-black/85 dark:bg-black/90 border border-white/10 shadow-2xl">
        {builds.map((b) => {
          const isActive = b.id === activeId;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => scrollToSection(b.id)}
              aria-label={`Jump to ${b.name}`}
              className="p-1.5 -m-1.5 cursor-pointer"
            >
              <span
                className={`block rounded-full transition-all ${
                  isActive ? "w-2.5 h-2.5" : "w-1.5 h-1.5 opacity-60"
                }`}
                style={{
                  background: b.accent,
                  boxShadow: isActive ? `0 0 8px ${b.accent}` : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

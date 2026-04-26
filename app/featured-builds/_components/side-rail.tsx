"use client";

import type { Build } from "../_data/builds";
import { scrollToSection } from "./use-scroll-spy";

export default function SideRail({
  builds,
  activeId,
}: {
  builds: Build[];
  activeId: string;
}) {
  if (builds.length === 0) return null;

  return (
    <nav
      aria-label="Build sections"
      className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-20 flex-col items-end gap-1.5 group/rail"
    >
      {/* Vertical guide line */}
      <span className="absolute right-[15px] top-2 bottom-2 w-px bg-black/10 dark:bg-white/10 pointer-events-none" />

      {builds.map((b) => {
        const isActive = b.id === activeId;
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => scrollToSection(b.id)}
            aria-label={`Jump to ${b.name}`}
            className="group relative flex items-center gap-2 py-1 pr-0 pl-2"
          >
            {/* Label — hover only, never persistent */}
            <span
              className="text-[10px] font-mono uppercase tracking-widest whitespace-nowrap px-2 py-0.5 rounded-full backdrop-blur-md transition-all opacity-0 -translate-x-2 text-black dark:text-white bg-white/80 dark:bg-black/80 border border-black/10 dark:border-white/10 group-hover:opacity-100 group-hover:translate-x-0"
            >
              {b.tier} · {b.name}
            </span>
            {/* Dot */}
            <span
              className={`relative z-10 rounded-full transition-all ${
                isActive ? "w-3 h-3" : "w-2 h-2 group-hover:scale-125"
              }`}
              style={{
                background: b.accent,
                boxShadow: isActive
                  ? `0 0 0 3px var(--background, #f4f4f4), 0 0 0 5px ${b.accent}, 0 0 14px ${b.accent}`
                  : `0 0 0 2px var(--background, #f4f4f4)`,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { CATEGORIES, GUIDES, type GuideCategory } from "../_data/guides";
import GuideCard from "./guide-card";

type Filter = "All" | GuideCategory;

export default function CategoryRail() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (active === "All") return GUIDES;
    return GUIDES.filter((g) => g.category === active);
  }, [active]);

  return (
    <div>
      {/* Filter rail */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 -mx-1 px-1">
        <span className="hidden sm:inline-block text-[9px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-[0.3em] shrink-0">
          Filter //
        </span>
        {CATEGORIES.map((c) => {
          const isActive = active === c.label;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setActive(c.label)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.25em] cursor-pointer transition-all ${
                isActive
                  ? "bg-[#c2000b] border-[#c2000b] text-white shadow-[0_0_0_3px_rgba(194,0,11,0.15)]"
                  : "bg-white/60 dark:bg-black/40 border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#c2000b]/40 hover:text-[#c2000b]"
              }`}
            >
              <Icon icon={c.icon} className="w-3 h-3" />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Counter line */}
      <div className="flex items-center gap-3 mb-6 text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-[0.3em]">
        <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        <span>
          Showing {String(filtered.length).padStart(2, "0")} of{" "}
          {String(GUIDES.length).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center font-mono text-sm text-gray-500 py-16">
          No guides in this category yet. Check back next patch cycle.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}

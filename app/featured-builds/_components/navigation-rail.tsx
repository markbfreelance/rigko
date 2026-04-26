"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { peso } from "../_data/builds";

export type SortMode = "default" | "price-asc" | "price-desc";

export default function NavigationRail({
  allTiers,
  selectedTiers,
  onToggleTier,
  budgetMax,
  budgetMin,
  budgetCeiling,
  onBudgetChange,
  sort,
  onSortChange,
  onReset,
  filteredCount,
  totalCount,
}: {
  allTiers: { tier: string; accent: string }[];
  selectedTiers: Set<string>;
  onToggleTier: (tier: string) => void;
  budgetMax: number;
  budgetMin: number;
  budgetCeiling: number;
  onBudgetChange: (v: number) => void;
  sort: SortMode;
  onSortChange: (s: SortMode) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasFilters =
    selectedTiers.size > 0 ||
    budgetMax < budgetCeiling ||
    sort !== "default";

  return (
    <div className="sticky top-16 md:top-20 z-30 px-4 md:px-12 py-2.5 backdrop-blur-xl bg-[#f4f4f4]/85 dark:bg-[#050100]/85 border-y border-black/5 dark:border-white/5">
      <div className="max-w-[1440px] mx-auto">
        {/* Row 1: Controls + jump chips */}
        <div className="flex items-center gap-2">
          {/* Filter toggle — always prominent */}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="group relative shrink-0 inline-flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full bg-[#c2000b] text-white text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer shadow-lg shadow-[#c2000b]/30 hover:shadow-[#c2000b]/50 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] transition-all overflow-hidden"
          >
            {/* Idle pulse halo — only when closed and no filters */}
            {!filtersOpen && !hasFilters && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[#c2000b] animate-ping opacity-30"
              />
            )}
            {/* Diagonal sheen sweep on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            {/* LED indicator */}
            <span
              aria-hidden
              className={`relative z-10 w-1.5 h-1.5 rounded-full ${
                filtersOpen ? "bg-white" : "bg-white animate-pulse"
              }`}
              style={{ boxShadow: "0 0 6px #fff" }}
            />

            <Icon
              icon="lucide:sliders-horizontal"
              className="relative z-10 w-3.5 h-3.5 transition-transform group-hover:rotate-12"
            />
            <span className="relative z-10">
              {filtersOpen ? "Hide" : "Filters"}
            </span>

            {/* Badge / chevron */}
            {hasFilters ? (
              <span className="relative z-10 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#c2000b] text-[10px] font-black">
                {(selectedTiers.size > 0 ? 1 : 0) +
                  (budgetMax < budgetCeiling ? 1 : 0) +
                  (sort !== "default" ? 1 : 0)}
              </span>
            ) : (
              <Icon
                icon="lucide:chevron-down"
                className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ${
                  filtersOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* Progress count */}
          <div className="flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c2000b] animate-pulse shadow-[0_0_6px_#c2000b]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-700 dark:text-gray-300">
              <span className="font-black text-black dark:text-white">
                {filteredCount}
              </span>
              <span className="opacity-60">/{totalCount}</span>
            </span>
          </div>

          <div className="flex-1" />

          {/* Active filter summary (right side) */}
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 text-[10px] font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 cursor-pointer hover:text-[#c2000b] hover:border-[#c2000b]/40 transition-colors"
            >
              <Icon icon="lucide:rotate-ccw" className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

        {/* Row 2: filter panel */}
        {filtersOpen && (
          <div className="mt-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier filter */}
            <div>
              <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-2">
                Filter_By_Tier
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allTiers.map(({ tier, accent }) => {
                  const selected = selectedTiers.has(tier);
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => onToggleTier(tier)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-widest cursor-pointer transition-all ${
                        selected
                          ? "text-white"
                          : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      }`}
                      style={
                        selected
                          ? { background: accent, borderColor: accent }
                          : undefined
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: selected ? "#fff" : accent,
                        }}
                      />
                      {tier}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                  Max_Budget
                </span>
                <span className="text-[10px] font-mono font-black text-black dark:text-white">
                  {peso(budgetMax)}
                </span>
              </div>
              <input
                type="range"
                min={budgetMin}
                max={budgetCeiling}
                step={1000}
                value={budgetMax}
                onChange={(e) => onBudgetChange(Number(e.target.value))}
                className="w-full accent-[#c2000b]"
              />
              <div className="flex justify-between text-[9px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-1">
                <span>{peso(budgetMin)}</span>
                <span>{peso(budgetCeiling)}</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-2">
                Sort_By
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { v: "default", label: "Tier", icon: "lucide:layers" },
                    {
                      v: "price-asc",
                      label: "₱ Asc",
                      icon: "lucide:arrow-up-narrow-wide",
                    },
                    {
                      v: "price-desc",
                      label: "₱ Desc",
                      icon: "lucide:arrow-down-wide-narrow",
                    },
                  ] as { v: SortMode; label: string; icon: string }[]
                ).map((opt) => {
                  const active = sort === opt.v;
                  return (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => onSortChange(opt.v)}
                      className={`inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md border text-[10px] font-mono uppercase tracking-widest cursor-pointer transition-colors ${
                        active
                          ? "border-[#c2000b] bg-[#c2000b] text-white"
                          : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 text-gray-600 dark:text-gray-400 hover:border-[#c2000b]/40"
                      }`}
                    >
                      <Icon icon={opt.icon} className="w-3 h-3" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {hasFilters && (
                <button
                  type="button"
                  onClick={onReset}
                  className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 cursor-pointer hover:text-[#c2000b]"
                >
                  <Icon icon="lucide:rotate-ccw" className="w-3 h-3" />
                  Reset all
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import type { Build } from "../_data/builds";
import { buildTotal } from "../_data/builds";
import BuildCard from "./build-card";
import OverviewPanel from "./overview-panel";
import NavigationRail, { type SortMode } from "./navigation-rail";
import SideRail from "./side-rail";
import MobileDock from "./mobile-dock";
import { useScrollSpy } from "./use-scroll-spy";

export default function BuildsExplorer({ builds }: { builds: Build[] }) {
  // Derived constants
  const allTiers = useMemo(() => {
    const seen = new Map<string, string>();
    for (const b of builds) {
      if (!seen.has(b.tier)) seen.set(b.tier, b.accent);
    }
    return Array.from(seen, ([tier, accent]) => ({ tier, accent }));
  }, [builds]);

  const totals = useMemo(() => builds.map(buildTotal), [builds]);
  const budgetCeiling = useMemo(
    () => Math.ceil(Math.max(...totals) / 1000) * 1000,
    [totals]
  );
  const budgetMin = useMemo(
    () => Math.floor(Math.min(...totals) / 1000) * 1000,
    [totals]
  );

  // Filter state
  const [selectedTiers, setSelectedTiers] = useState<Set<string>>(new Set());
  const [budgetMax, setBudgetMax] = useState<number>(budgetCeiling);
  const [sort, setSort] = useState<SortMode>("default");

  const toggleTier = (tier: string) => {
    setSelectedTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  };

  const reset = () => {
    setSelectedTiers(new Set());
    setBudgetMax(budgetCeiling);
    setSort("default");
  };

  // Apply filters + sort
  const visibleBuilds = useMemo(() => {
    let list = builds.filter((b) => {
      if (selectedTiers.size > 0 && !selectedTiers.has(b.tier)) return false;
      if (buildTotal(b) > budgetMax) return false;
      return true;
    });
    if (sort === "price-asc") {
      list = [...list].sort((a, b) => buildTotal(a) - buildTotal(b));
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => buildTotal(b) - buildTotal(a));
    }
    return list;
  }, [builds, selectedTiers, budgetMax, sort]);

  const visibleIds = useMemo(
    () => visibleBuilds.map((b) => b.id),
    [visibleBuilds]
  );
  const activeId = useScrollSpy(visibleIds);

  const isFiltered =
    selectedTiers.size > 0 || budgetMax < budgetCeiling || sort !== "default";

  // Hero treatment only when no filter/sort active
  const useHero = !isFiltered && visibleBuilds.length > 0;
  const hero = useHero ? visibleBuilds[0] : null;
  const rest = useHero ? visibleBuilds.slice(1) : visibleBuilds;

  return (
    <>
      {/* Overview panel */}
      <div className="px-4 md:px-12 max-w-[1440px] mx-auto mb-4">
        <OverviewPanel builds={visibleBuilds} activeId={activeId} />
      </div>

      {/* Sticky filter + jump rail */}
      <NavigationRail
        allTiers={allTiers}
        selectedTiers={selectedTiers}
        onToggleTier={toggleTier}
        budgetMax={budgetMax}
        budgetMin={budgetMin}
        budgetCeiling={budgetCeiling}
        onBudgetChange={setBudgetMax}
        sort={sort}
        onSortChange={setSort}
        onReset={reset}
        filteredCount={visibleBuilds.length}
        totalCount={builds.length}
      />

      <main className="px-4 md:px-12 py-10 md:py-14 max-w-[1440px] mx-auto">
        {visibleBuilds.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/10 dark:border-white/10 p-16 text-center">
            <Icon
              icon="lucide:package-x"
              className="w-10 h-10 mx-auto text-gray-400 mb-3"
            />
            <div className="text-sm font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
              No builds match your filters
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#c2000b] text-white text-[10px] font-black uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <Icon icon="lucide:rotate-ccw" className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {hero && (
              <div className="mb-10 md:mb-14">
                <BuildCard build={hero} variant="hero" index={0} />
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {rest.map((b, i) => (
                <BuildCard
                  key={b.id}
                  build={b}
                  variant="standard"
                  index={hero ? i + 1 : i}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Side rail (desktop) + mobile dock */}
      <SideRail builds={visibleBuilds} activeId={activeId} />
      <MobileDock builds={visibleBuilds} activeId={activeId} />
    </>
  );
}

import { Icon } from "@iconify/react";
import { GUIDES, getGuide } from "./_data/guides";
import FeaturedHero from "./_components/featured-hero";
import HubStats from "./_components/hub-stats";
import CategoryRail from "./_components/category-rail";
import ReadingPath from "./_components/reading-path";
import SubscribeStrip from "./_components/subscribe-strip";

export const metadata = {
  title: "Guides — Rigko",
  description:
    "Build smarter rigs without burning a paycheck. PC-building guides written for the Philippines — PHP prices, brownout-tested.",
};

const TRUST = [
  { icon: "lucide:hammer", label: "Bench-tested in Manila" },
  { icon: "lucide:peso-sign", label: "Real PHP street prices" },
  { icon: "lucide:shield-check", label: "No affiliate padding" },
  { icon: "lucide:refresh-cw", label: "Patched every release" },
];

export default function GuidesHubPage() {
  const featured = getGuide("build-your-first-pc")!;

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#f4f4f4] dark:bg-[#050100] transition-colors">
      <div className="px-4 md:px-12 pt-8 md:pt-12 pb-6 max-w-[1440px] mx-auto">
        {/* Page Header */}
        <header className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16 bg-[#c2000b]" />
            <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
              Knowledge_Base // 2026.Q1
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black dark:text-white mb-4">
            Guides_
          </h1>
          <p className="text-sm md:text-base font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
            Build smarter rigs without burning a paycheck. Written by the same
            engineers who price our Featured Builds — for the floods, the
            brownouts, and the budget you actually have.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
            {TRUST.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600 dark:text-gray-400 uppercase tracking-widest"
              >
                <Icon icon={p.icon} className="w-3 h-3 text-[#c2000b] shrink-0" />
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Featured */}
        <FeaturedHero guide={featured} />

        {/* Stats */}
        <HubStats />
      </div>

      {/* Grid section */}
      <section
        id="guide-grid"
        className="px-4 md:px-12 max-w-[1440px] mx-auto mt-16 md:mt-24 scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-12 bg-[#c2000b]" />
          <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
            All_Guides // {String(GUIDES.length).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black dark:text-white mb-3">
          The_full_index
        </h2>
        <p className="text-sm font-mono text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
          Filter by category. Drafts are visible so you know what&apos;s
          coming — they&apos;ll unlock as we ship.
        </p>

        <CategoryRail />

        <ReadingPath />

        <SubscribeStrip />
      </section>

      <p className="px-4 md:px-12 pt-16 pb-28 xl:pb-20 text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest text-center">
        Manuals · PHP examples · Verified Q1 2026 · Built for 220V/60Hz humans
      </p>
    </div>
  );
}

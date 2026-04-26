import { Icon } from "@iconify/react";
import { FEATURED_BUILDS } from "./_data/builds";
import StatTiles from "./_components/stat-tiles";
import HowItWorks from "./_components/how-it-works";
import UseCasePicker from "./_components/use-case-picker";
import BuildsExplorer from "./_components/builds-explorer";

export const metadata = {
  title: "Featured Builds — Rigko",
  description:
    "Curated 2026 PC builds with full parts breakdowns and Philippine peso pricing.",
};

const TRUST_POINTS = [
  { icon: "lucide:hammer", label: "Hand-picked by Rigko engineers" },
  { icon: "lucide:shield-check", label: "Prices verified at PCWorx & Shopee" },
  { icon: "lucide:calendar-clock", label: "Refreshed every quarter" },
  { icon: "lucide:badge-x", label: "No affiliate padding" },
];

export default function FeaturedBuildsPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#f4f4f4] dark:bg-[#050100] transition-colors">
      <div className="px-4 md:px-12 pt-8 md:pt-12 pb-6 max-w-[1440px] mx-auto">
        {/* Page Header */}
        <header className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16 bg-[#c2000b]" />
            <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
              Manifest // 2026.Q1
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black dark:text-white mb-4">
            Featured_Builds
          </h1>
          <p className="text-sm md:text-base font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
            Pre-spec&apos;d PCs for 2026 — six rigs you can clone into the
            builder, customize, and order at current PHP street prices. From
            ₱32K esports starters to RTX 5090 halo machines.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
            {TRUST_POINTS.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600 dark:text-gray-400 uppercase tracking-widest"
              >
                <Icon
                  icon={p.icon}
                  className="w-3 h-3 text-[#c2000b] shrink-0"
                />
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* 3-step explainer */}
        <HowItWorks />

        {/* By-the-numbers trust tiles */}
        <StatTiles />
      </div>

      {/* Goal-first picker */}
      <div className="px-4 md:px-12 max-w-[1440px] mx-auto mb-6">
        <UseCasePicker builds={FEATURED_BUILDS} />
      </div>

      {/* Interactive explorer (overview + filter rail + cards + side rails) */}
      <BuildsExplorer builds={FEATURED_BUILDS} />

      <p className="px-4 md:px-12 pb-28 xl:pb-20 text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest text-center">
        Prices indicative · PHP · Verified Q1 2026 · Subject to retailer stock
      </p>
    </div>
  );
}

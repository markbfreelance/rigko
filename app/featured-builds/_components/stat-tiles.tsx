import { Icon } from "@iconify/react";
import { FEATURED_BUILDS, buildTotal, peso } from "../_data/builds";

export default function StatTiles() {
  const totals = FEATURED_BUILDS.map(buildTotal);
  const min = Math.min(...totals);
  const max = Math.max(...totals);
  const tiers = new Set(FEATURED_BUILDS.map((b) => b.tier)).size;

  const tiles = [
    {
      icon: "lucide:layers",
      label: "Curated_Builds",
      value: String(FEATURED_BUILDS.length).padStart(2, "0"),
      sub: `${tiers} tiers`,
    },
    {
      icon: "lucide:peso-sign",
      label: "Price_Range",
      value: `${peso(min)} → ${peso(max)}`,
      sub: "Verified PHP street",
    },
    {
      icon: "lucide:radio",
      label: "Manifest_Build",
      value: "2026.Q1",
      sub: "Refreshed quarterly",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="relative rounded-2xl border border-black/5 dark:border-white/5 chassis-steel p-4 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center bg-[#c2000b]/10 border border-[#c2000b]/20 text-[#c2000b]">
              <Icon icon={t.icon} className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
              {t.label}
            </span>
          </div>
          <div className="text-lg md:text-xl font-black tracking-tight text-black dark:text-white">
            {t.value}
          </div>
          <div className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-0.5">
            {t.sub}
          </div>
          {/* corner LED */}
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c2000b] shadow-[0_0_6px_#c2000b] animate-pulse" />
        </div>
      ))}
    </div>
  );
}

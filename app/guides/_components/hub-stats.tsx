import { Icon } from "@iconify/react";
import { GUIDES, publishedCount } from "../_data/guides";

export default function HubStats() {
  const drafting = GUIDES.length - publishedCount();
  const avgMinutes = Math.round(
    GUIDES.reduce((sum, g) => sum + g.minutes, 0) / GUIDES.length,
  );

  const tiles = [
    {
      icon: "lucide:book-open",
      label: "Live_Guides",
      value: String(publishedCount()).padStart(2, "0"),
      sub: `${drafting} drafting`,
    },
    {
      icon: "lucide:users",
      label: "Builders_Helped",
      value: "5,210",
      sub: "Q1 2026 · self-reported",
    },
    {
      icon: "lucide:peso-sign",
      label: "Avg_Saved",
      value: "₱4,800",
      sub: "Per first-build",
    },
    {
      icon: "lucide:timer",
      label: "Avg_Read",
      value: `${avgMinutes} min`,
      sub: "Per guide",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
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
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c2000b] shadow-[0_0_6px_#c2000b] animate-pulse" />
        </div>
      ))}
    </div>
  );
}

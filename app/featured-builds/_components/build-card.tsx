import Link from "next/link";
import { Icon } from "@iconify/react";
import type { Build } from "../_data/builds";
import { buildTotal, peso } from "../_data/builds";
import PerfBars from "./perf-bar";
import CostAllocation from "./cost-allocation";
import PartsManifest from "./parts-manifest";

export default function BuildCard({
  build,
  variant = "standard",
  index,
}: {
  build: Build;
  variant?: "hero" | "standard";
  index: number;
}) {
  const total = buildTotal(build);
  const isHero = variant === "hero";

  return (
    <article
      id={build.id}
      className={`group relative rounded-3xl border chassis-steel backdrop-blur-md overflow-hidden scroll-mt-32 transition-shadow ${
        isHero
          ? "border-[#c2000b]/30 shadow-2xl shadow-[#c2000b]/10"
          : "border-black/5 dark:border-white/5 hover:shadow-xl"
      }`}
      style={{
        // Soft accent halo on the card edge
        boxShadow: isHero
          ? `0 0 0 1px ${build.accent}22, 0 30px 80px -40px ${build.accent}55`
          : undefined,
      }}
    >
      {/* Industrial screws */}
      <div className="absolute top-3 left-3 hex-screw scale-75" />
      <div className="absolute top-3 right-3 hex-screw scale-75" />
      <div className="absolute bottom-3 left-3 hex-screw scale-75" />
      <div className="absolute bottom-3 right-3 hex-screw scale-75" />

      {/* Hero accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${build.accent}, transparent)`,
        }}
      />

      {/* Hero badge */}
      {isHero && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] z-10 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2000b] animate-pulse shadow-[0_0_8px_#c2000b]" />
          Featured_Pick · 2026.Q1
        </div>
      )}

      <div className={`relative ${isHero ? "p-5 sm:p-6 md:p-12 pt-10 sm:pt-12" : "p-5 sm:p-6 md:p-8"}`}>
        {/* Build Header */}
        <div
          className={`flex flex-col ${
            isHero ? "lg:flex-row lg:items-end" : "xl:flex-row xl:items-end"
          } justify-between gap-6 mb-6 pb-6 border-b border-black/5 dark:border-white/5`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: build.accent }}
              >
                {build.tier}
              </span>
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                {build.target}
              </span>
              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2
              className={`font-black uppercase tracking-tighter text-black dark:text-white mb-2 break-words ${
                isHero
                  ? "text-3xl sm:text-4xl md:text-6xl"
                  : "text-2xl md:text-3xl"
              }`}
            >
              {build.name}
            </h2>
            {/* Plain-English mission line */}
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full border"
              style={{
                borderColor: `${build.accent}40`,
                background: `${build.accent}10`,
              }}
            >
              <Icon
                icon={build.useCase.icon}
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: build.accent }}
              />
              <span className="text-[11px] md:text-xs font-mono text-gray-700 dark:text-gray-300">
                <span
                  className="font-black uppercase tracking-widest"
                  style={{ color: build.accent }}
                >
                  Best for:
                </span>{" "}
                {build.bestFor}
              </span>
            </div>
            <p className="text-xs md:text-sm font-mono text-gray-500 dark:text-gray-400 max-w-2xl">
              {build.tagline}
            </p>
          </div>
          <div className={`shrink-0 ${isHero ? "lg:text-right" : "xl:text-right"}`}>
            <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase mb-1">
              Total_Cost
            </div>
            <div
              className={`font-black tracking-tighter text-black dark:text-white break-words ${
                isHero ? "text-3xl sm:text-4xl md:text-6xl" : "text-2xl sm:text-3xl md:text-4xl"
              }`}
            >
              {peso(total)}
            </div>
            <Link
              href={`/build?preset=${build.id}`}
              className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full bg-[#c2000b] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#c2000b]/20 hover:scale-105 active:scale-95 transition-transform"
            >
              <Icon icon="lucide:hammer" className="w-3.5 h-3.5" />
              <span>Clone_Build</span>
              <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Cost allocation bar */}
        <div className="mb-6">
          <CostAllocation build={build} />
        </div>

        {/* Highlights + Performance */}
        <div
          className={`grid gap-6 mb-6 ${
            isHero ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-3">
              Why_This_Build
            </h3>
            <ul className="space-y-2.5">
              {build.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-xs md:text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  <Icon
                    icon="lucide:zap"
                    className="w-3.5 h-3.5 shrink-0 mt-1"
                    style={{ color: build.accent }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-3">
              Performance_Targets
            </h3>
            <PerfBars items={build.performance} accent={build.accent} />
          </div>
        </div>

        {/* Parts Manifest (collapsible) */}
        <PartsManifest
          parts={build.parts}
          peripherals={build.peripherals}
          accent={build.accent}
          defaultOpen={isHero}
        />
      </div>
    </article>
  );
}

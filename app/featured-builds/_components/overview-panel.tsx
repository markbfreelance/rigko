"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import type { Build } from "../_data/builds";
import { peso, buildTotal } from "../_data/builds";
import { scrollToSection } from "./use-scroll-spy";

const partsLabel = (b: Build) => {
  const parts = b.parts.length;
  const periph = b.peripherals?.length ?? 0;
  return periph > 0 ? `${parts} parts · ${periph} periph` : `${parts} parts`;
};

export default function OverviewPanel({
  builds,
  activeId,
}: {
  builds: Build[];
  activeId: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className="relative rounded-3xl border border-black/5 dark:border-white/5 chassis-steel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-3 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <Icon icon="lucide:compass" className="w-3.5 h-3.5 text-[#c2000b]" />
          <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
            Pick_Your_Rig
          </span>
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
            · Tap a goal to jump · {builds.length} of 6 builds
          </span>
        </div>
        <Icon
          icon="lucide:chevron-down"
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5">
          {builds.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
              No builds match current filters
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {builds.map((b) => {
                const isActive = b.id === activeId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => scrollToSection(b.id)}
                    className={`group relative text-left cursor-pointer rounded-xl border p-3 transition-all overflow-hidden ${
                      isActive
                        ? "border-[#c2000b] bg-[#c2000b]/5 shadow-lg shadow-[#c2000b]/10"
                        : "border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 hover:border-[#c2000b]/40 hover:-translate-y-0.5 hover:shadow-lg"
                    }`}
                  >
                    {/* Accent glow on hover (non-active only) */}
                    {!isActive && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, ${b.accent}15, transparent 60%)`,
                        }}
                      />
                    )}
                    {/* Top accent strip */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: b.accent }}
                    />

                    {/* Use-case icon badge */}
                    <div
                      className="relative w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${b.accent}18`,
                        color: b.accent,
                      }}
                    >
                      <Icon icon={b.useCase.icon} className="w-4 h-4" />
                    </div>

                    {/* Goal label (loud) */}
                    <div className="relative text-[10px] font-mono font-black uppercase tracking-[0.25em] text-black dark:text-white truncate">
                      {b.useCase.label}
                    </div>
                    {/* Codename (subdued) */}
                    <div className="relative text-[9px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest truncate">
                      {b.name} · {b.tier}
                    </div>
                    {/* Parts count */}
                    <div className="relative flex items-center gap-1 mt-1 text-[9px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                      <Icon icon="lucide:cpu" className="w-2.5 h-2.5" />
                      <span className="truncate">{partsLabel(b)}</span>
                    </div>
                    {/* Price + arrow */}
                    <div className="relative flex items-center justify-between mt-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#c2000b]">
                        {peso(buildTotal(b))}
                      </span>
                      {isActive ? (
                        <Icon
                          icon="lucide:eye"
                          className="w-3 h-3 text-[#c2000b]"
                          aria-label="Currently viewing"
                        />
                      ) : (
                        <Icon
                          icon="lucide:arrow-right"
                          className="w-3 h-3 text-gray-400 group-hover:text-[#c2000b] group-hover:translate-x-0.5 transition-all"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

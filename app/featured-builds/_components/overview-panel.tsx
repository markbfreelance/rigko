"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import type { Build } from "../_data/builds";
import { peso, buildTotal } from "../_data/builds";
import { scrollToSection } from "./use-scroll-spy";

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
        className="w-full flex items-center justify-between gap-3 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon icon="lucide:layout-grid" className="w-3.5 h-3.5 text-[#c2000b]" />
          <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.3em]">
            Manifest_Overview
          </span>
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
            · {builds.length} of 6 builds
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
                    className={`group relative text-left rounded-xl border p-3 transition-all overflow-hidden ${
                      isActive
                        ? "border-[#c2000b] bg-[#c2000b]/5 shadow-lg shadow-[#c2000b]/10"
                        : "border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 hover:border-[#c2000b]/40 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Accent strip */}
                    <div
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: b.accent }}
                    />
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{
                          background: b.accent,
                          boxShadow: `0 0 6px ${b.accent}`,
                        }}
                      />
                      <span className="text-[8px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.25em] truncate">
                        {b.tier}
                      </span>
                    </div>
                    <div className="text-xs font-black uppercase tracking-tight text-black dark:text-white truncate">
                      {b.name}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-[#c2000b] mt-0.5">
                      {peso(buildTotal(b))}
                    </div>
                    {isActive && (
                      <div className="absolute bottom-1.5 right-1.5">
                        <Icon
                          icon="lucide:eye"
                          className="w-3 h-3 text-[#c2000b]"
                        />
                      </div>
                    )}
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

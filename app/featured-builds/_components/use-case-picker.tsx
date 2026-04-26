"use client";

import { Icon } from "@iconify/react";
import type { Build } from "../_data/builds";
import { peso, buildTotal } from "../_data/builds";
import { scrollToSection } from "./use-scroll-spy";

export default function UseCasePicker({ builds }: { builds: Build[] }) {
  return (
    <section
      aria-label="Pick by use-case"
      className="rounded-3xl border border-black/5 dark:border-white/5 chassis-steel p-5 md:p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon icon="lucide:compass" className="w-4 h-4 text-[#c2000b]" />
        <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
          What_Do_You_Need?
        </span>
        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          · Tap a goal — we&apos;ll point you to the right rig
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {builds.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => scrollToSection(b.id)}
            className="group relative text-left rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 p-3 transition-all hover:-translate-y-0.5 hover:shadow-lg overflow-hidden"
            style={{
              // accent on hover via inline custom property
              boxShadow: "none",
            }}
          >
            {/* Accent glow on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(135deg, ${b.accent}15, transparent 60%)`,
              }}
            />
            {/* Top accent bar */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: b.accent }}
            />

            <div
              className="relative w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
              style={{
                backgroundColor: `${b.accent}18`,
                color: b.accent,
              }}
            >
              <Icon icon={b.useCase.icon} className="w-4 h-4" />
            </div>

            <div className="relative">
              <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.25em] mb-0.5">
                {b.useCase.label}
              </div>
              <div className="text-xs font-black uppercase tracking-tight text-black dark:text-white truncate">
                {b.name}
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] font-mono font-bold text-[#c2000b]">
                  {peso(buildTotal(b))}
                </span>
                <Icon
                  icon="lucide:arrow-right"
                  className="w-3 h-3 text-gray-400 group-hover:text-[#c2000b] group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

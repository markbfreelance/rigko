"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import type { Part } from "../_data/builds";
import { peso } from "../_data/builds";

const HERO_CATEGORIES = ["CPU", "GPU", "Case"];

export default function PartsManifest({
  parts,
  peripherals,
  accent,
  defaultOpen = false,
}: {
  parts: Part[];
  peripherals?: Part[];
  accent: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const heroParts = HERO_CATEGORIES.map((cat) =>
    parts.find((p) => p.category === cat)
  ).filter(Boolean) as Part[];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b]">
          Core_Parts_Manifest
        </h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 cursor-pointer text-[10px] font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-[#c2000b] transition-colors"
        >
          <span>
            {open
              ? "Hide all"
              : `Show all ${parts.length}${
                  peripherals && peripherals.length > 0
                    ? ` + ${peripherals.length} periph`
                    : ""
                } parts`}
          </span>
          <Icon
            icon="lucide:chevron-down"
            className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Hero chips when collapsed */}
      {!open && (
        <div className="flex flex-wrap gap-2">
          {heroParts.map((p) => (
            <div
              key={p.category}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20"
            >
              <Icon
                icon={p.icon}
                className="w-3.5 h-3.5"
                style={{ color: accent }}
              />
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                {p.category}
              </span>
              <span className="text-xs font-bold text-black dark:text-white truncate max-w-[180px]">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Full manifest */}
      {open && (
        <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 overflow-hidden">
          {parts.map((part, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 border-b border-black/5 dark:border-white/5 last:border-b-0 hover:bg-[#c2000b]/5 transition-colors"
            >
              <div
                className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border"
                style={{
                  backgroundColor: `${accent}15`,
                  borderColor: `${accent}33`,
                  color: accent,
                }}
              >
                <Icon icon={part.icon} className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">
                  {part.category}
                </div>
                <div className="text-sm font-bold text-black dark:text-white truncate">
                  {part.name}
                </div>
                {part.detail && (
                  <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-tighter truncate">
                    {part.detail}
                  </div>
                )}
              </div>
              <div className="text-sm md:text-base font-black text-[#c2000b] shrink-0">
                {peso(part.price)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Peripherals */}
      {open && peripherals && peripherals.length > 0 && (
        <div className="mt-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-3">
            Recommended_Peripherals
          </h3>
          <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-white/20 dark:bg-black/10 overflow-hidden">
            {peripherals.map((part, i) => (
              <div
                key={i}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-b border-black/5 dark:border-white/5 last:border-b-0"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                  <Icon icon={part.icon} className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">
                    {part.category}
                  </div>
                  <div className="text-sm font-bold text-black dark:text-white truncate">
                    {part.name}
                  </div>
                  {part.detail && (
                    <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-tighter truncate">
                      {part.detail}
                    </div>
                  )}
                </div>
                <div className="text-sm md:text-base font-black text-gray-700 dark:text-gray-300 shrink-0">
                  {peso(part.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

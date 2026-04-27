"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export type Failure = {
  symptom: string;
  causes: string[];
  fix: string;
};

export default function FailuresAccordion({ items }: { items: Failure[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="my-6 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden divide-y divide-black/10 dark:divide-white/10">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="bg-white/40 dark:bg-black/20">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#c2000b]/10 border border-[#c2000b]/20 text-[#c2000b]">
                <Icon icon="lucide:circle-alert" className="w-3.5 h-3.5" />
              </span>
              <span className="flex-1 text-sm font-mono font-bold text-black dark:text-white">
                {f.symptom}
              </span>
              <Icon
                icon="lucide:chevron-down"
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isOpen ? "rotate-180 text-[#c2000b]" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pl-14">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#c2000b] mb-2">
                  Likely_Causes //
                </p>
                <ul className="space-y-1.5 mb-4">
                  {f.causes.map((c, ci) => (
                    <li
                      key={ci}
                      className="flex items-start gap-2 text-xs font-mono text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-[#c2000b]">▸</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 mb-1">
                  Fix //
                </p>
                <p className="text-xs font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
                  {f.fix}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

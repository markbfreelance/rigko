"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export type ChecklistItem = {
  label: string;
  hint?: string;
};

export default function PartsChecklist({
  items,
  storageKey,
}: {
  items: ChecklistItem[];
  storageKey?: string;
}) {
  const [checked, setChecked] = useState<Set<number>>(() => new Set());

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      if (storageKey && typeof window !== "undefined") {
        try {
          localStorage.setItem(storageKey, JSON.stringify([...next]));
        } catch {}
      }
      return next;
    });
  }

  const done = checked.size;
  const pct = Math.round((done / items.length) * 100);

  return (
    <div className="my-6 rounded-2xl border border-black/10 dark:border-white/10 chassis-steel overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10 dark:border-white/10">
        <Icon
          icon="lucide:clipboard-check"
          className="w-4 h-4 text-[#c2000b]"
        />
        <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.3em] font-black">
          Pre-Flight // Parts
        </span>
        <span className="ml-auto text-[10px] font-mono text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          {done} / {items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-black/5 dark:bg-white/5">
        <div
          className="h-full bg-[#c2000b] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="divide-y divide-dashed divide-black/10 dark:divide-white/10">
        {items.map((item, i) => {
          const isChecked = checked.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <span
                  className={`shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isChecked
                      ? "bg-[#c2000b] border-[#c2000b]"
                      : "border-black/20 dark:border-white/20"
                  }`}
                >
                  {isChecked && (
                    <Icon icon="lucide:check" className="w-3 h-3 text-white" />
                  )}
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className={`block text-sm font-mono ${
                      isChecked
                        ? "text-gray-400 dark:text-gray-600 line-through"
                        : "text-black dark:text-white"
                    } transition-colors`}
                  >
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="block text-[11px] font-mono text-gray-500 dark:text-gray-500 mt-0.5">
                      {item.hint}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

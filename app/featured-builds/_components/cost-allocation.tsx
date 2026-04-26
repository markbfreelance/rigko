import type { Build } from "../_data/builds";
import { peso } from "../_data/builds";

const CATEGORY_COLORS: Record<string, string> = {
  GPU: "#c2000b",
  CPU: "#06b6d4",
  Motherboard: "#a855f7",
  Memory: "#10b981",
  Cooler: "#3b82f6",
  Storage: "#f59e0b",
  PSU: "#ec4899",
  Case: "#64748b",
};

const FALLBACK = "#94a3b8";

export default function CostAllocation({ build }: { build: Build }) {
  const partsTotal = build.parts.reduce((s, p) => s + p.price, 0);

  // Aggregate by category
  const byCategory = new Map<string, number>();
  for (const p of build.parts) {
    byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + p.price);
  }

  const segments = Array.from(byCategory.entries())
    .map(([category, price]) => ({
      category,
      price,
      pct: (price / partsTotal) * 100,
      color: CATEGORY_COLORS[category] ?? FALLBACK,
    }))
    .sort((a, b) => b.price - a.price);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
          Cost_Allocation
        </span>
        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
          {peso(partsTotal)} core
        </span>
      </div>
      <div className="flex h-2 w-full rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
        {segments.map((s) => (
          <div
            key={s.category}
            className="h-full transition-[width] duration-700 ease-out"
            style={{ width: `${s.pct}%`, background: s.color }}
            title={`${s.category} · ${peso(s.price)} (${s.pct.toFixed(0)}%)`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3">
        {segments.slice(0, 5).map((s) => (
          <div
            key={s.category}
            className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600 dark:text-gray-400"
          >
            <span
              className="inline-block w-2 h-2 rounded-sm"
              style={{ background: s.color }}
            />
            <span className="uppercase tracking-tighter">{s.category}</span>
            <span className="font-black text-black dark:text-white">
              {s.pct.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

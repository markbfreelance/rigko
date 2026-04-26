type Perf = { label: string; value: string };

// Highest fps target across the manifest defines the bar scale ceiling.
const FPS_SCALE = 360;

function parseFps(value: string): number | null {
  const m = value.match(/(\d+)\+?\s*fps/i);
  if (!m) return null;
  return parseInt(m[1], 10);
}

function fpsColor(fps: number): string {
  if (fps >= 240) return "#c2000b";
  if (fps >= 120) return "#10b981";
  if (fps >= 60) return "#06b6d4";
  return "#f59e0b";
}

export default function PerfBars({ items, accent }: { items: Perf[]; accent: string }) {
  return (
    <div className="space-y-3">
      {items.map((p, i) => {
        const fps = parseFps(p.value);
        const pct = fps ? Math.min(100, (fps / FPS_SCALE) * 100) : null;
        const color = fps ? fpsColor(fps) : accent;
        return (
          <div key={i}>
            <div className="flex items-center justify-between gap-3 text-[11px] md:text-xs font-mono mb-1.5">
              <span className="text-gray-500 dark:text-gray-400 uppercase tracking-tight truncate">
                {p.label}
              </span>
              <span className="font-black text-black dark:text-white shrink-0">
                {p.value}
              </span>
            </div>
            <div className="relative h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
              {pct !== null ? (
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}80, ${color})`,
                    boxShadow: `0 0 8px ${color}80`,
                  }}
                />
              ) : (
                <div
                  className="absolute inset-y-0 left-0 right-0 rounded-full opacity-40"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)`,
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

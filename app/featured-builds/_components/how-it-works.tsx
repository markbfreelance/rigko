import { Icon } from "@iconify/react";

const STEPS = [
  {
    n: "01",
    icon: "lucide:list-checks",
    title: "Pick a rig",
    body: "Browse 6 hand-picked builds, each tuned for a specific goal. Filter by budget or use-case.",
  },
  {
    n: "02",
    icon: "lucide:copy",
    title: "Clone to builder",
    body: "One click loads every part into the Rigko builder — no copy-paste, no missing screws.",
  },
  {
    n: "03",
    icon: "lucide:shopping-bag",
    title: "Customize & buy",
    body: "Swap any part for what's in stock. Buy locally at PCWorx, Lazada, or your favorite shop.",
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-label="How this page works"
      className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8"
    >
      {STEPS.map((step, i) => (
        <div
          key={step.n}
          className="relative rounded-2xl border border-black/5 dark:border-white/5 chassis-steel p-5 overflow-hidden"
        >
          {/* Step number watermark */}
          <span
            aria-hidden
            className="absolute -bottom-4 -right-2 text-7xl font-black text-black/[0.03] dark:text-white/[0.04] tracking-tighter select-none"
          >
            {step.n}
          </span>

          {/* Connector line on md+ */}
          {i < STEPS.length - 1 && (
            <span
              aria-hidden
              className="hidden md:block absolute top-8 -right-2 w-4 h-px bg-[#c2000b]/30 z-10"
            />
          )}

          <div className="relative flex items-start gap-3">
            <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[#c2000b] text-white shadow-lg shadow-[#c2000b]/20">
              <Icon icon={step.icon} className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
                  Step_{step.n}
                </span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-black dark:text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

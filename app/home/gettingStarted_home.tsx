import { Cpu, ShieldCheck, TrendingDown, Zap } from "lucide-react";

const steps = [
  {
    icon: Cpu,
    title: "Pick Your Parts",
    description:
      "Browse our database of 10,000+ components with real-time Philippine pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Check Compatibility",
    description:
      "Our engine catches socket, clearance, and power issues before you buy.",
  },
  {
    icon: TrendingDown,
    title: "Compare & Save",
    description:
      "Track prices across 50+ retailers. Get alerts when your parts drop.",
  },
  {
    icon: Zap,
    title: "Build & Enjoy",
    description:
      "Follow step-by-step guides and fire up your brand-new rig.",
  },
];

export default function GettingStartedHome() {
  return (
    <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-white/[0.02]">
      <div className="absolute inset-0 circuit-pattern" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            New to PC Building?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Rigko makes it easy. Four simple steps from picking parts to
            powering on.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 relative inline-flex">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 dark:from-cyan-500/10 dark:to-violet-500/10">
                  <step.icon className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-[10px] font-bold text-white shadow-lg">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

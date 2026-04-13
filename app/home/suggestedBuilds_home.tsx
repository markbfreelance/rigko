import { Cpu, Monitor, HardDrive, CircuitBoard, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Budget",
    tagline: "Great 1080p gaming & productivity",
    range: "₱25,000 – ₱35,000",
    gradient: "from-emerald-400 to-cyan-500",
    iconBg:
      "bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    specs: [
      { icon: Cpu, label: "CPU", value: "Ryzen 5 5600" },
      { icon: Monitor, label: "GPU", value: "RX 6600" },
      { icon: CircuitBoard, label: "RAM", value: "16GB DDR4" },
      { icon: HardDrive, label: "Storage", value: "512GB NVMe" },
    ],
  },
  {
    name: "Mid-Range",
    tagline: "1440p gaming & content creation",
    range: "₱45,000 – ₱65,000",
    gradient: "from-cyan-400 to-violet-500",
    iconBg:
      "bg-violet-500/10 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    featured: true,
    specs: [
      { icon: Cpu, label: "CPU", value: "Ryzen 5 7600" },
      { icon: Monitor, label: "GPU", value: "RTX 4060 Ti" },
      { icon: CircuitBoard, label: "RAM", value: "32GB DDR5" },
      { icon: HardDrive, label: "Storage", value: "1TB NVMe" },
    ],
  },
  {
    name: "High-End",
    tagline: "4K gaming & heavy workloads",
    range: "₱80,000 – ₱150,000",
    gradient: "from-violet-400 to-rose-500",
    iconBg:
      "bg-rose-500/10 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    specs: [
      { icon: Cpu, label: "CPU", value: "Ryzen 7 7800X3D" },
      { icon: Monitor, label: "GPU", value: "RTX 4080 Super" },
      { icon: CircuitBoard, label: "RAM", value: "32GB DDR5" },
      { icon: HardDrive, label: "Storage", value: "2TB NVMe" },
    ],
  },
];

export default function SuggestedBuildsHome() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Builds for Every Budget
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hand-picked configurations at the best prices from Philippine
            retailers. Every build is compatibility-checked.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className="group relative">
              {/* Gradient glow on hover */}
              <div
                className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-b ${tier.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}
              />

              <div className="relative h-full rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-gray-950 p-8 group-hover:border-transparent transition-colors duration-300 flex flex-col">
                {/* Tier label */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}
                  >
                    {tier.name}
                  </span>
                  {tier.featured && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <p className="text-2xl font-bold font-mono mb-2">
                  {tier.range}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
                  {tier.tagline}
                </p>

                {/* Specs */}
                <div className="space-y-4 flex-1">
                  {tier.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tier.iconBg}`}
                      >
                        <spec.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-600">
                          {spec.label}
                        </p>
                        <p className="text-sm font-semibold">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className={`mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${tier.gradient} px-6 text-sm font-semibold text-white opacity-90 hover:opacity-100 transition-opacity`}
                >
                  View Build
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

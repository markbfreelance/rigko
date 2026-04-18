"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const builds = [
  {
    title: "Entry-Level Warrior",
    price: "₱32,450",
    specs: [
      { label: "CPU", value: "Ryzen 5 5600", icon: "solar:cpu-bold" },
      { label: "GPU", value: "RTX 3060 12GB", icon: "solar:videocard-bold" },
      { label: "RAM", value: "16GB DDR4 3200", icon: "solar:graph-bold" },
    ],
    tag: "BUDGET_KING",
  },
  {
    title: "The Mid-Range sweetspot",
    price: "₱68,200",
    specs: [
      { label: "CPU", value: "Core i5-14600K", icon: "solar:cpu-bold" },
      { label: "GPU", value: "RTX 4070 Super", icon: "solar:videocard-bold" },
      { label: "RAM", value: "32GB DDR5 6000", icon: "solar:graph-bold" },
    ],
    tag: "PERFORMANCE",
  },
  {
    title: "Ultimate 4K Beast",
    price: "₱184,990",
    specs: [
      { label: "CPU", value: "Core i9-14900K", icon: "solar:cpu-bold" },
      { label: "GPU", value: "RTX 4090 24GB", icon: "solar:videocard-bold" },
      { label: "RAM", value: "64GB DDR5 7200", icon: "solar:graph-bold" },
    ],
    tag: "ENTHUSIAST",
  },
];

export default function SuggestedBuildsHome() {
  return (
    <section className="w-full bg-[#f9f9f9] dark:bg-black py-24 px-4 md:px-12 relative transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
          <div>
            <div className="text-[#c2000b] text-xs font-bold tracking-widest uppercase mb-3">Curated Configurations</div>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight transition-colors">FEATURED_BUILDS</h2>
          </div>
          <button className="flex items-center gap-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors text-sm font-medium">
            VIEW_ALL_MODELS <Icon icon="solar:arrow-right-linear" />
          </button>
        </div>

        {/* Build Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builds.map((build, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="reveal flex flex-col bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-3xl p-8 hover:shadow-xl dark:hover:bg-white/[0.06] transition-all group overflow-hidden relative shadow-sm"
            >
              {/* Card Background Decoration */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[120px] leading-none text-black dark:text-white opacity-[0.02] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                0{idx + 1}
              </div>

              <div className="flex justify-between items-start mb-12">
                <div className="bg-[#c2000b]/10 text-[#c2000b] px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase border border-[#c2000b]/20">
                  {build.tag}
                </div>
                <div className="text-2xl font-bold text-black dark:text-white tracking-tight transition-colors">{build.price}</div>
              </div>

              <h3 className="text-xl font-bold text-black dark:text-white mb-8 group-hover:text-[#c2000b] dark:group-hover:text-[#c2000b] transition-colors">{build.title}</h3>
              
              <div className="space-y-4 mb-10 pt-6 border-t border-black/5 dark:border-white/5 font-mono transition-colors">
                {build.specs.map((spec, sidx) => (
                  <div key={sidx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-black/40 dark:text-white/40 text-sm transition-colors">
                      <Icon icon={spec.icon} className="w-4 h-4" />
                      {spec.label}
                    </div>
                    <div className="text-black dark:text-white text-sm transition-colors">{build.specs[sidx].value}</div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-black/5 dark:bg-white/5 text-black dark:text-white py-4 rounded-2xl text-sm font-bold hover:text-white hover:bg-[#c2000b] transition-all border border-black/10 dark:border-white/10 group-hover:border-[#c2000b]/50">
                CONFIGURE_ASSETS
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

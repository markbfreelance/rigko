"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const steps = [
  {
    title: "1. Specification",
    desc: "Browse 10,000+ components with verified PH retailer pricing.",
    icon: "solar:settings-bold-duotone",
  },
  {
    title: "2. Compatibility",
    desc: "Real-time verification of sockets, dimensions, and power draw.",
    icon: "solar:shield-check-bold-duotone",
  },
  {
    title: "3. Market Sync",
    desc: "Instant price comparison across Lazada, Shopee, and local hubs.",
    icon: "solar:refresh-bold-duotone",
  },
  {
    title: "4. Deployment",
    desc: "Complete your build with step-by-step assembly instructions.",
    icon: "solar:flash-drive-bold-duotone",
  },
];

export default function GettingStartedHome() {
  return (
    <section className="w-full bg-[#fdfdfd] dark:bg-[#0a0a0a] py-24 md:py-32 relative z-20 overflow-hidden transition-colors">
      
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        {/* Left Side: Illustration / Abstract */}
        <div className="reveal w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-[320px] md:max-w-[450px] aspect-square rounded-[3rem] bg-gradient-to-br from-[#c2000b]/20 to-transparent border border-[#c2000b]/10 flex items-center justify-center group overflow-hidden">
             <div className="absolute inset-0 hardware-grid opacity-20"></div>
             
             {/* Center Iconography */}
             <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-[#c2000b] flex items-center justify-center shadow-2xl shadow-[#c2000b]/30 animate-float">
                   <Icon icon="solar:cpu-bold" className="w-12 h-12 text-white" />
                </div>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-[#c2000b]/20 transition-colors">
                      <Icon icon="solar:videocard-bold" className="w-6 h-6 text-black/40 dark:text-white/40 transition-colors" />
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-[#c2000b]/20 transition-colors">
                      <Icon icon="solar:ssd-round-bold" className="w-6 h-6 text-black/40 dark:text-white/40 transition-colors" />
                   </div>
                </div>
             </div>

             {/* Dynamic Circles */}
             <div className="absolute inset-0 border-[60px] border-black/5 dark:border-white/5 rounded-full scale-[1.5] group-hover:scale-[1.6] transition-transform duration-1000"></div>
          </div>
        </div>

        {/* Right Side: content */}
        <div className="reveal w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
          <div className="text-[#c2000b] text-xs font-bold tracking-widest uppercase mb-4">Precision Engineering</div>
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-10 leading-tight tracking-tight transition-colors break-all sm:break-normal">BUILD_PROCESS</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {steps.map((step, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#c2000b] transition-colors">
                    <Icon icon={step.icon} className="w-4 h-4 text-[#c2000b] group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-[#c2000b] transition-colors">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-mono transition-colors">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-black/10 dark:border-white/5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 transition-colors">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-black dark:text-white transition-colors">U{i}</div>
               ))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-500 font-medium transition-colors">
               <span className="text-black dark:text-white">5,000+ Builders</span> already configured their rigs this month.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

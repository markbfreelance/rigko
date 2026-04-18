"use client";

import { motion } from "framer-motion";
import HardwareDeck from "../components/hardware-deck";

export default function HeroHome() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfdfd] via-transparent to-[#fdfdfd] dark:from-black dark:to-black z-0 pointer-events-none transition-colors"></div>
      
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 relative z-10 flex flex-col items-center pointer-events-none w-full">
        
        {/* Hero Text */}
        <div className="reveal text-center relative w-full flex flex-col items-center">
          {/* Removed Fog Effect per user request */}
          <div className="absolute inset-0 -z-10 pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c2000b]/20 bg-[#c2000b]/5 text-[#c2000b] text-xs font-bold tracking-widest uppercase mb-8 pointer-events-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c2000b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c2000b]"></span>
              </span>
              Next-Gen Assembly
            </div>
            
            <h1 className="text-6xl md:text-9xl font-bold tracking-tight text-black/90 dark:text-white mb-6 leading-tight select-none pointer-events-auto transition-colors">
              CUSTOM RIG?<br />
              <span className="text-[#c2000b] pr-[0.1em]">YOUR RIG.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.2em] font-medium opacity-100 md:opacity-80 mb-12 pointer-events-auto transition-colors [text-shadow:_1px_1px_0_#fff,_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_0_0_8px_#fff] md:[text-shadow:none] dark:[text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_0_0_8px_#000]">
              NO. 1 PC BUILDING PLATFORM IN SOUTHEAST ASIA
            </p>

            <div className="flex flex-col items-center gap-8 w-full pointer-events-none transition-colors">
              <button className="bg-[#c2000b] text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-[#8b0000] transition-all transform hover:scale-105 shadow-2xl shadow-[#c2000b]/40 pointer-events-auto">
                BUILD YOUR RIG
              </button>
              
              <div className="text-black/30 dark:text-white/30 font-mono text-[10px] uppercase tracking-[0.4em] text-center leading-relaxed pointer-events-auto transition-colors">
                  RELAY_MNL_STABLE // 10,482 NODES INDEXED
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scattered Hardware Debris Field - Placed after Hero Text to assist stacking */}
      <HardwareDeck />
      
      {/* Mobile-specific Bokeh Blur Overlay (Blurs parts near edges, keeps center clear) */}
      {/* Mobile-specific Bokeh Blur Overlay (Blurs parts near edges, keeps center clear) */}
      <div className="absolute inset-0 md:hidden dark:hidden z-[8] pointer-events-none [backdrop-filter:blur(1px)] [mask-image:radial-gradient(circle_at_center,transparent_10%,black_10%)] [-webkit-mask-image:radial-gradient(circle_at_center,transparent_10%,black_10%)]"></div>
      
      {/* Dark Mode Vignette (Maintain shadow for industrial feel) */}
      <div className="absolute inset-0 hidden dark:block md:dark:hidden shadow-[inset_0_0_200px_rgba(0,0,0,0.5)] z-[8] pointer-events-none"></div>

      {/* Aesthetic Accents (Terminal Debris) */}
      <div className="absolute bottom-12 left-12 hidden lg:block z-10">
         <div className="font-mono text-[10px] text-[#c2000b] uppercase vertical-text tracking-widest bg-white/60 dark:bg-black/40 p-2 border-l border-[#c2000b]/30 backdrop-blur-sm transition-colors">
            SEA_NODE_MNL_01
         </div>
      </div>

    </section>
  );
}

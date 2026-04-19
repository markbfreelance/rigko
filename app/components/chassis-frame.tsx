"use client";

import { useEffect, useState } from "react";

export default function ChassisFrame() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col md:block">
      {/* Top Frame Bezel (Navbar Shroud) */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-20 chassis-steel border-b-2 border-[var(--chassis-border)] z-20">
        <div className="absolute inset-0 chassis-mesh opacity-10"></div>
        {/* Corner Screws - Hidden on mobile for cleaner logo space */}
        <div className="absolute top-4 left-4 hex-screw scale-75 hidden md:block"></div>
        <div className="absolute top-4 right-4 hex-screw scale-75 hidden md:block"></div>
        
        {/* Top Vent Details - Smaller on mobile */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 md:gap-1 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 md:w-3 h-0.5 md:h-1 bg-black/60 dark:bg-black rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Left Frame Pillar */}
      <div className="hidden lg:block absolute top-0 left-0 w-12 h-full chassis-steel border-r-2 border-[var(--chassis-border)]">
        <div className="flex flex-col items-center gap-24 py-32 opacity-30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-px bg-black/10 dark:bg-white/20"></div>
          ))}
        </div>
      </div>

      {/* Right Frame Pillar */}
      <div className="hidden lg:block absolute top-0 right-0 w-12 h-full chassis-steel border-l-2 border-[var(--chassis-border)]">
        <div className="flex flex-col items-center gap-24 py-32 opacity-30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-px bg-black/10 dark:bg-white/20"></div>
          ))}
        </div>
      </div>

      {/* Side Vent Shadows - Adds depth to the "glass" look */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none transition-shadow duration-500"></div>
    </div>
  );
}

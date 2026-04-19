"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const LAYOUT = {
  ROWS: {
    1: { y: 20, x: 20 }, // Top (Chassis & MOBO)
    2: { y: 35, x: 40 }, // High-Mid (RAM)
    3: { y: 52, x: 35 }, // Center (GPU & PSU)
    4: { y: 75, x: 22 }, // Low-Mid (CPUs)
    5: { y: 92, x: 20 }  // Bottom (SSD & AIO)
  }
};

const components = [
  // ROW 1: TOP (Chassis & MOBO)
  { 
    id: "CHASSIS", 
    side: "left",
    label: "PC CASE",
    scale: 1.1,
    row: 1,
    nudge: { x: 0, y: 0 },
    rotation: -2,
    icon: (
      <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-2xl">
        <rect x="10" y="10" width="100" height="140" rx="4" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <circle cx="30" cy="40" r="15" fill="none" stroke="var(--deck-accent)" strokeWidth="0.8" opacity="0.6" className="animate-pulse" />
        <circle cx="30" cy="80" r="15" fill="none" stroke="var(--deck-accent)" strokeWidth="0.8" opacity="0.6" className="animate-pulse" />
        <circle cx="30" cy="120" r="15" fill="none" stroke="var(--deck-accent)" strokeWidth="0.8" opacity="0.6" className="animate-pulse" />
        <rect x="108" y="15" width="2" height="130" fill="var(--deck-accent)" opacity="0.8" className="shadow-[0_0_15px_var(--deck-accent)] animate-pulse" />
      </svg>
    )
  },
  { 
    id: "MOBO", 
    side: "right",
    label: "MOBO",
    scale: 0.85,
    row: 1,
    nudge: { x: 0, y: 0 },
    rotation: 2,
    icon: (
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* PCB Base */}
        <rect x="5" y="5" width="90" height="110" rx="2" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="1" />
        {/* CPU Socket Area */}
        <rect x="30" y="25" width="40" height="40" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        {/* VRM Heatsinks */}
        <rect x="25" y="15" width="50" height="8" rx="1" fill="var(--deck-secondary)" />
        <rect x="15" y="25" width="10" height="40" rx="1" fill="var(--deck-secondary)" />
        {/* RAM Slots */}
        <g stroke="var(--deck-stroke)" strokeWidth="0.5">
          <rect x="75" y="20" width="2" height="50" fill="var(--deck-secondary)" />
          <rect x="80" y="20" width="2" height="50" fill="var(--deck-secondary)" />
          <rect x="85" y="20" width="2" height="50" fill="var(--deck-secondary)" />
          <rect x="90" y="20" width="2" height="50" fill="var(--deck-secondary)" />
        </g>
        {/* PCIe Slots */}
        <rect x="15" y="75" width="70" height="4" rx="0.5" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" />
        <rect x="15" y="90" width="70" height="4" rx="0.5" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" />
        {/* PCH Lighting */}
        <rect x="65" y="80" width="20" height="20" rx="1" fill="var(--deck-secondary)" />
        <rect x="70" y="85" width="10" height="10" fill="var(--deck-accent)" opacity="0.6" className="animate-pulse shadow-[0_0_10px_var(--deck-accent)]" />
      </svg>
    )
  },

  // ROW 2: UPPER MID (RAM)
  { 
    id: "RAM_1", 
    side: "left",
    label: "16GB RAM",
    scale: 0.55,
    row: 2,
    nudge: { x: 0, y: 0 },
    rotation: -5,
    icon: (
      <svg viewBox="0 0 120 50" className="w-full h-full">
        <path d="M5 35h110V15l-10-5H15l-10 5z" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <rect x="15" y="11" width="90" height="4" fill="var(--deck-accent)" className="animate-pulse" />
        <rect x="10" y="36" width="100" height="3" fill="var(--deck-gold)" opacity="0.8" />
      </svg>
    )
  },
  { 
    id: "RAM_2", 
    side: "right",
    label: "32GB RAM",
    scale: 0.55,
    row: 2,
    nudge: { x: 0, y: 0 },
    rotation: 5,
    icon: (
      <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-xl">
        <path d="M5 45 L115 45 L115 20 L90 10 L30 10 L5 20 Z" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <path d="M5 20 L30 10 L90 10 L115 20 L115 15 L90 5 L30 5 L5 15 Z" fill="var(--deck-accent)" className="animate-pulse shadow-[0_0_20px_var(--deck-accent)]" />
        <rect x="15" y="46" width="90" height="3" fill="var(--deck-gold)" opacity="0.8" />
      </svg>
    )
  },

  // ROW 3: CENTER FLANK (GPU & PSU)
  { 
    id: "GRAPHICS", 
    side: "left",
    label: "Video Card",
    scale: 0.8,
    row: 3,
    nudge: { x: 0, y: 0 },
    rotation: 90,
    icon: (
      <svg viewBox="0 0 160 80" className="w-full h-full drop-shadow-2xl">
        <rect x="5" y="15" width="150" height="50" rx="2" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <path d="M10 20h140 v40 h-140z" fill="var(--deck-secondary)" />
        <path d="M15 20v40 M25 20v40 M35 20v40 M125 20v40 M135 20v40 M145 20v40" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="40" cy="40" r="18" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="40" cy="40" r="12" fill="none" stroke="var(--deck-accent)" strokeWidth="0.5" opacity="0.4" className="animate-pulse" />
        <circle cx="80" cy="40" r="18" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="80" cy="40" r="12" fill="none" stroke="var(--deck-accent)" strokeWidth="0.5" opacity="0.4" className="animate-pulse" />
        <circle cx="120" cy="40" r="18" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="120" cy="40" r="12" fill="none" stroke="var(--deck-accent)" strokeWidth="0.5" opacity="0.4" className="animate-pulse" />
        <rect x="30" y="17" width="100" height="1.5" fill="var(--deck-accent)" className="animate-pulse shadow-[0_0_10px_var(--deck-accent)]" />
        <rect x="15" y="65" width="50" height="4" fill="var(--deck-gold)" stroke="var(--deck-gold)" strokeWidth="0.5" opacity="0.8" />
        <path d="M17 65v4 M21 65v4 M25 65v4 M55 65v4 M59 65v4" stroke="black" strokeWidth="0.2" opacity="0.4" />
      </svg>
    )
  },
  { 
    id: "ENERGY", 
    side: "right",
    label: "PSU",
    scale: 0.65,
    row: 3,
    nudge: { x: 0, y: 0 },
    rotation: 0,
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="5" y="5" width="90" height="90" rx="4" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <circle cx="50" cy="45" r="35" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="50" cy="45" r="30" fill="none" stroke="var(--deck-accent)" strokeWidth="0.5" opacity="0.3" className="animate-pulse" />
        <path d="M25 45h50 M50 20v50 M30 30l40 40 M30 60l40-40" stroke="var(--deck-stroke)" strokeWidth="0.5" opacity="0.5" />
        <rect x="15" y="75" width="10" height="10" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <rect x="30" y="75" width="10" height="10" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <rect x="45" y="75" width="10" height="10" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <rect x="60" y="75" width="10" height="10" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <text x="50" y="48" fontSize="8" textAnchor="middle" fill="var(--deck-accent)" opacity="0.8" className="font-mono font-bold">PWR_C1</text>
      </svg>
    )
  },

  // ROW 4: LOWER MID (CPUs + SSD & AIO Wings)
  { 
    id: "DATA_1", 
    side: "left",
    label: "NVMe",
    scale: 0.45,
    row: 4,
    x_override: 42,
    nudge: { x: 0, y: 0 },
    rotation: 15,
    icon: (
      <svg viewBox="0 0 120 40" className="w-full h-full drop-shadow-lg">
        {/* PCB Board */}
        <rect x="5" y="12" width="110" height="16" rx="1" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        
        {/* Gold Pins Connector */}
        <g transform="translate(108, 14)">
          {[...Array(8)].map((_, i) => (
            <rect key={i} x={0} y={i * 1.5} width="4" height="0.8" fill="var(--deck-gold)" opacity="0.9" />
          ))}
        </g>
 
        {/* Mounting Notch */}
        <circle cx="8" cy="20" r="2.5" fill="black" />
        <rect x="5" y="18.5" width="4" height="3" fill="black" />
 
        {/* Controller Chip */}
        <rect x="85" y="14" width="12" height="12" rx="0.5" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <rect x="87" y="16" width="8" height="8" fill="none" stroke="var(--deck-accent)" strokeWidth="0.2" opacity="0.4" />
 
        {/* NAND Flash Chips */}
        <rect x="35" y="14" width="18" height="12" rx="0.5" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <rect x="58" y="14" width="18" height="12" rx="0.5" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        
        {/* Circuit Traces */}
        <path d="M20 18h10 M20 22h10 M80 20h5" stroke="var(--deck-gold)" strokeWidth="0.2" opacity="0.3" />
 
        {/* Label and Activity LED */}
        <rect x="30" y="13" width="50" height="2" fill="var(--deck-accent)" opacity="0.8" className="animate-pulse" />
        <circle cx="102" cy="20" r="1.5" fill="var(--deck-accent)" className="animate-pulse shadow-[0_0_8px_var(--deck-accent)]" />
      </svg>
    )
  },
  { 
    id: "INTEL_CORE", 
    side: "left",
    label: "i-PROCIE",
    scale: 0.5,
    row: 4,
    x_override: 20,
    nudge: { x: 0, y: 0 },
    rotation: -15,
    icon: (
      <svg viewBox="0 0 100 120" className="w-full h-full">
        <rect x="15" y="15" width="70" height="90" rx="3" fill="var(--deck-procie)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <g fill="var(--deck-secondary)" stroke="none">
           <rect x="23" y="20" width="54" height="80" rx="4" />
           <rect x="18" y="45" width="64" height="30" rx="2" fill="var(--deck-secondary)" />
           <path d="M25 22h50 M25 98h50" stroke="var(--deck-stroke)" strokeWidth="0.5" opacity="0.3" />
        </g>
      </svg>
    )
  },
  { 
    id: "RYZEN_CORE", 
    side: "right",
    label: "R-PROCIE",
    scale: 0.5,
    row: 4,
    x_override: 20,
    nudge: { x: 0, y: 0 },
    rotation: 10,
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="19" y="19" width="62" height="62" rx="4" fill="var(--deck-procie)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <path d="M19 19 L27 19 L19 27 Z" fill="var(--deck-gold)" opacity="0.6" />
        <g fill="var(--deck-secondary)" stroke="none">
           <rect x="30" y="30" width="40" height="40" />
           <rect x="45" y="22" width="10" height="10" />
           <rect x="45" y="68" width="10" height="10" />
           <rect x="22" y="44" width="13" height="12" />
           <rect x="65" y="44" width="13" height="12" />
           <path d="M22 34 V30 Q22 22 30 22 H34 V34 Z" />
           <path d="M66 34 V22 H70 Q78 22 78 30 V34 Z" />
           <path d="M22 66 V70 Q22 78 30 78 H34 V66 Z" />
           <path d="M66 66 V78 H70 Q78 78 78 70 V66 Z" />
        </g>
        <g fill="var(--deck-stroke)" opacity="0.6">
           <circle cx="20" cy="38" r="0.8" /><circle cx="23" cy="38" r="0.8" />
           <circle cx="20" cy="41" r="0.8" /><circle cx="23" cy="41" r="0.8" />
           <circle cx="20" cy="59" r="0.8" /><circle cx="23" cy="59" r="0.8" />
           <circle cx="20" cy="62" r="0.8" /><circle cx="23" cy="62" r="0.8" />
           <circle cx="77" cy="38" r="0.8" /><circle cx="80" cy="38" r="0.8" />
           <circle cx="77" cy="41" r="0.8" /><circle cx="80" cy="41" r="0.8" />
           <circle cx="77" cy="59" r="0.8" /><circle cx="80" cy="59" r="0.8" />
           <circle cx="77" cy="62" r="0.8" /><circle cx="80" cy="62" r="0.8" />
        </g>
      </svg>
    )
  },
  { 
    id: "THERMAL", 
    side: "right",
    label: "AIO",
    scale: 0.65,
    row: 4,
    x_override: 42,
    nudge: { x: 0, y: 0 },
    rotation: 30,
    icon: (
      <svg viewBox="0 0 140 140" className="w-full h-full">
        {/* Radiator Unit */}
        <rect x="20" y="10" width="100" height="35" rx="2" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="1" />
        <rect x="23" y="12.5" width="30" height="30" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="38" cy="27.5" r="12" fill="none" stroke="var(--deck-accent)" strokeWidth="0.5" opacity="0.4" className="animate-pulse" />
        <rect x="55" y="12.5" width="30" height="30" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="70" cy="27.5" r="12" fill="none" stroke="var(--deck-accent)" strokeWidth="0.5" opacity="0.4" className="animate-pulse" />
        <rect x="87" y="12.5" width="30" height="30" rx="1" fill="var(--deck-secondary)" stroke="var(--deck-stroke)" strokeWidth="0.5" />
        <circle cx="102" cy="27.5" r="12" fill="none" stroke="var(--deck-accent)" strokeWidth="0.5" opacity="0.4" className="animate-pulse" />
        {/* Sleeved Tubes & Pump */}
        <path d="M38 42.5 Q38 65 60 80" fill="none" stroke="var(--deck-secondary)" strokeWidth="6" />
        <path d="M102 42.5 Q102 65 80 80" fill="none" stroke="var(--deck-secondary)" strokeWidth="6" />
        <rect x="45" y="80" width="50" height="50" rx="6" fill="var(--deck-pcb)" stroke="var(--deck-stroke)" strokeWidth="2" />
        <circle cx="70" cy="105" r="15" fill="none" stroke="var(--deck-accent)" strokeWidth="1" className="animate-pulse" />
      </svg>
    )
  },
];

export default function HardwareDeck({ activeIds, variant = "idle", partNames }: { activeIds?: string[], variant?: "idle" | "build", partNames?: Record<string, string> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State to hold persistent random coordinates so they don't re-roll on every activeIds update
  const [placedParts, setPlacedParts] = useState<Record<string, { x: number, y: number, rotation: number }>>({});

  useEffect(() => {
    if (variant !== "build" || !activeIds) return;
    
    setPlacedParts(prev => {
      const updated = { ...prev };
      let changed = false;
      
      // Spawn new items with random coordinates
      activeIds.forEach(id => {
        if (!updated[id]) {
          updated[id] = {
            x: Math.random() * 20 + 40, // perfectly center-clustered (40% to 60%)
            y: Math.random() * 20 + 40, // vertically centered drop
            rotation: (Math.random() - 0.5) * 60 // -30 to 30 degrees rotation
          };
          changed = true;
        }
      });

      // Erase items that were removed
      Object.keys(updated).forEach(id => {
         if (!activeIds.includes(id)) {
            delete updated[id];
            changed = true;
         }
      });

      return changed ? updated : prev;
    });
  }, [activeIds, variant]);

  // If in builder mode, only map the physically added parts
  if (variant === "build") {
    const builderComps = components.filter(c => activeIds?.includes(c.id));
    const baseScale = 0.65; // User requested perfectly scaled

    return (
      <div className="absolute inset-0 pointer-events-none" ref={containerRef}>
        <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
          {builderComps.map((comp) => {
            const placed = placedParts[comp.id];
            if (!placed) return null; // Avoid render before effect triggers

            // Semantic layering so parts logically stack (e.g., RAM always over PSU/Mobo)
            const zIndexBase = ({
               CHASSIS: 1, MOBO: 2, ENERGY: 4, DATA_1: 5, INTEL_CORE: 6, RYZEN_CORE: 6, 
               RAM_1: 8, RAM_2: 8, GRAPHICS: 10, THERMAL: 12
            } as Record<string, number>)[comp.id] || 10;

            return (
              <motion.div
                key={comp.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%", rotate: placed.rotation }}
                animate={{ 
                  opacity: 1, 
                  scale: comp.scale * baseScale, 
                  x: "-50%", y: "-50%", rotate: placed.rotation, zIndex: zIndexBase 
                }}
                whileHover={{ scale: comp.scale * 1.05 * baseScale }}
                whileDrag={{ zIndex: 200, scale: comp.scale * 1.1 * baseScale, cursor: "grabbing" }}
                style={{
                  position: "absolute",
                  top: `${placed.y}%`,
                  left: `${placed.x}%`,
                  width: "280px",
                  height: "280px",
                  pointerEvents: "none", // Prevent wrapper from capturing empty space
                }}
                className="cursor-grab drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
              >
                {/* Delegate hit-detection strictly to the inner ink paths */}
                <div className="group/part w-full h-full flex flex-col items-center justify-center p-2 pointer-events-none [&_svg]:pointer-events-none [&_svg_*]:pointer-events-auto relative">
                  {/* Floating hover label — counter-rotated and counter-scaled to always appear upright at full size */}
                  <div 
                    className="absolute -top-6 left-1/2 opacity-0 group-hover/part:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap origin-bottom"
                    style={{
                      transform: `translateX(-50%) rotate(${-placed.rotation}deg) scale(${1 / (comp.scale * baseScale)})`,
                    }}
                  >
                    <div className="px-2 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-[#c2000b]/60 text-[9px] font-mono uppercase tracking-[0.2em] text-black dark:text-white shadow-[0_0_12px_rgba(194,0,11,0.3)]">
                      {partNames?.[comp.id] ?? comp.label}
                    </div>
                  </div>
                  {comp.icon}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- LEGACY IDLE GRID LOGIC (Original Structure for Homepage) ---

  const getComponentGroups = () => {
    const activeComps = components.filter(c => !activeIds || activeIds.includes(c.id));
    const inactiveComps = components.filter(c => activeIds && !activeIds.includes(c.id));
    return [...inactiveComps, ...activeComps];
  };

  const displayComps = getComponentGroups();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        {displayComps.map((comp, idx) => {
          const isActive = !activeIds || activeIds.includes(comp.id);
          const rowConfig = LAYOUT.ROWS[comp.row as keyof typeof LAYOUT.ROWS];
          const xDist = (comp as any).x_override || rowConfig.x;
          const finalX = comp.side === "left" ? 50 - xDist + (comp.nudge?.x || 0) : 50 + xDist + (comp.nudge?.x || 0);
            
          return (
            <motion.div
              key={comp.id + idx}
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%", zIndex: 5 }}
              animate={{ 
                opacity: isActive ? 1 : 1, 
                scale: isActive ? comp.scale : comp.scale, 
                x: "-50%", y: "-50%", zIndex: 5 
              }}
              transition={{ duration: 1.2, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: `${rowConfig.y + (comp.nudge?.y || 0)}%`,
                left: `${finalX}%`,
                width: "280px",
                height: "280px",
                pointerEvents: "auto"
              }}
              whileHover={{ zIndex: 80, scale: comp.scale * 1.05 }}
              className="group/part cursor-grab active:cursor-grabbing"
            >
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, idx % 2 === 0 ? 3 : -3, 0] }}
                transition={{ duration: 8 + idx, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <motion.div 
                  initial={{ rotate: comp.rotation }}
                  animate={{ rotate: [comp.rotation, comp.rotation + 0.3, comp.rotation - 0.3, comp.rotation] }}
                  transition={{ duration: 8 + idx, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center p-2 transition-all duration-500 group-hover/part:drop-shadow-[0_0_25px_rgba(194,0,11,0.4)]"
                >
                   {comp.icon}
                </motion.div>
                <motion.div 
                  initial={{ rotate: 0, scale: 1 / comp.scale }}
                  animate={{ rotate: 0, scale: 1 / comp.scale }}
                  className="absolute top-0 right-0 p-2 bg-[var(--deck-label-bg)] backdrop-blur-2xl border border-[var(--deck-accent)]/60 opacity-0 group-hover/part:opacity-100 transition-opacity duration-300 font-mono text-[11px] text-[var(--deck-label-text)] tracking-[0.2em] shadow-[0_0_20px_rgba(194,0,11,0.4)] uppercase whitespace-nowrap z-50 pointer-events-none origin-top-right"
                >
                   {comp.label}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Header from "../components/header";
import Footer from "../components/footer";
import HardwareDeck from "../components/hardware-deck";

// Mock Data
const CATEGORIES = [
  { id: "cpu", name: "Processor", icon: "solar:cpu-bold" },
  { id: "gpu", name: "Graphics Card", icon: "solar:videocard-bold" },
  { id: "mobo", name: "Motherboard", icon: "solar:chip-bold" },
  { id: "ram", name: "Memory", icon: "solar:graph-bold" },
  { id: "storage", name: "Storage", icon: "solar:ssd-round-bold" },
  { id: "psu", name: "Power Supply", icon: "solar:plug-circle-bold" },
  { id: "case", name: "Chassis", icon: "solar:case-bold" },
];

const PARTS = {
  cpu: [
    { id: "r5-5600", name: "AMD Ryzen 5 5600", price: 7850, specs: "6C/12T, 4.4GHz", brand: "AMD", wattage: 65 },
    { id: "i5-13600k", name: "Intel Core i5-13600K", price: 18950, specs: "14C/20T, 5.1GHz", brand: "Intel", wattage: 125 },
    { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", price: 24500, specs: "8C/16T, 5.0GHz", brand: "AMD", wattage: 120 },
  ],
  gpu: [
    { id: "rtx-3060", name: "RTX 3060 12GB", price: 16500, specs: "12GB GDDR6", brand: "NVIDIA", wattage: 170 },
    { id: "rtx-4070-s", name: "RTX 4070 Super", price: 38950, specs: "12GB GDDR6X", brand: "NVIDIA", wattage: 220 },
    { id: "rx-7800-xt", name: "Radeon RX 7800 XT", price: 32500, specs: "16GB GDDR6", brand: "AMD", wattage: 263 },
  ],
  // ... more categories can be added
};
export default function BuildPage() {
  const [activeCategory, setActiveCategory] = useState("cpu");
  const [selectedParts, setSelectedParts] = useState<Record<string, any>>({});
  
  const totalPrice = Object.values(selectedParts).reduce((acc, part) => acc + (part?.price || 0), 0);
  const totalWattage = Object.values(selectedParts).reduce((acc, part) => acc + (part?.wattage || 0), 0);

  const handleSelect = (category: string, part: any) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: prev[category]?.id === part.id ? null : part
    }));
  };

  const getActiveIds = () => {
    const ids = ["CHASSIS", "MOBO"]; // Base components always visible
    Object.entries(selectedParts).forEach(([cat, part]) => {
      if (!part) return;
      if (cat === "cpu") {
        ids.push(part.brand === "AMD" ? "RYZEN_CORE" : "INTEL_CORE");
      } else if (cat === "gpu") {
        ids.push("GRAPHICS");
      } else if (cat === "ram") {
        ids.push("RAM_1", "RAM_2");
      } else if (cat === "storage") {
        ids.push("DATA_1");
      } else if (cat === "psu") {
        ids.push("ENERGY");
      } else if (cat === "case") {
        // Since Chassis is always on, we just mark it active
      }
    });
    return ids;
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] dark:bg-[#050100] transition-colors overflow-x-hidden">
      <Header />
      
      <main className="pt-24 md:pt-28 pb-32 px-4 md:px-12 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
        
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          
          {/* Left: Category Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-6 px-4">Assembly_Index</h2>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all border group ${
                    activeCategory === cat.id 
                    ? "bg-[#c2000b] text-white border-[#c2000b] shadow-lg shadow-[#c2000b]/20" 
                    : "bg-white dark:bg-black border-black/5 dark:border-white/5 text-gray-500 hover:border-[#c2000b]/50"
                  }`}
                >
                  <Icon icon={cat.icon} className={`text-xl ${activeCategory === cat.id ? "text-white" : "text-[#c2000b]/60"}`} />
                  <span className="text-xs font-bold uppercase tracking-tighter">{cat.name}</span>
                  {selectedParts[cat.id] && (
                    <Icon icon="solar:check-circle-bold" className="ml-auto text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Part Catalog */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tighter">
                  Select_{activeCategory}
                </h1>
                <p className="text-[10px] font-mono text-gray-500 uppercase mt-1 tracking-widest">
                  PH_LOCAL_INVENTORY // STATUS: LIVE_SYNC
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                {(PARTS[activeCategory as keyof typeof PARTS] || []).map((part, idx) => (
                  <motion.div
                    key={part.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSelect(activeCategory, part)}
                    className={`cursor-pointer group relative p-6 rounded-3xl border-2 transition-all ${
                      selectedParts[activeCategory]?.id === part.id
                      ? "bg-white dark:bg-black border-[#c2000b] shadow-2xl"
                      : "bg-white dark:bg-black border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-[10px] font-black text-[#c2000b] border border-[#c2000b]/20 px-2 py-0.5 rounded-full uppercase">
                        {part.brand}
                      </div>
                      <div className="text-lg font-black text-black dark:text-white tracking-tighter">
                        ₱{part.price.toLocaleString()}
                      </div>
                    </div>
                    
                    <h3 className="text-base font-bold text-black dark:text-white mb-2 leading-tight group-hover:text-[#c2000b] transition-colors uppercase">
                      {part.name}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{part.specs}</p>
                    
                    <div className="mt-8 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                          <Icon icon="solar:bolt-bold" />
                          {part.wattage}W
                       </div>
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                         selectedParts[activeCategory]?.id === part.id
                         ? "bg-[#c2000b] text-white"
                         : "bg-black/5 dark:bg-white/5 text-transparent"
                       }`}>
                         <Icon icon="solar:check-read-linear" className="text-lg" />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {!(PARTS[activeCategory as keyof typeof PARTS]) && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-[3rem] opacity-40">
                   <Icon icon="solar:ghost-bold" className="text-6xl mb-4" />
                   <p className="font-mono text-[10px] uppercase tracking-[0.4em]">Inventory_Empty // Restocking</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Assembly Preview */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-black border-2 border-[#c2000b]/20 rounded-[3rem] p-8 aspect-[3/4] overflow-hidden flex flex-col group shadow-2xl">
               <div className="absolute inset-0 chassis-mesh opacity-5"></div>
               <div className="absolute inset-0 hardware-grid opacity-10"></div>
               
               <div className="relative z-10 mb-8">
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b]">Virtual_Assembly_Render</h2>
                 <p className="text-[9px] font-mono text-gray-500 uppercase mt-1">Status: {totalPrice > 0 ? "IN_PROGRESS" : "IDLE"}</p>
               </div>

               <div className="flex-1 relative -mx-12 -my-20">
                  <HardwareDeck activeIds={getActiveIds()} variant="build" />
               </div>

               <div className="relative z-10 pt-8 border-t border-black/5 dark:border-white/5 mt-auto">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Estimated_Total</span>
                    <span className="text-2xl font-black text-black dark:text-white tracking-tighter">₱{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-black/5 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      key="progress-bar"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      className="h-full bg-[#c2000b] rounded-full"
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>

      </main>

      {/* Persistent Build Terminal (Bottom Bar) */}
      <div className="fixed bottom-0 left-0 w-full z-[150] bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-black/10 dark:border-white/10 px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex gap-12">
            <div>
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">Components</div>
              <div className="text-base font-black text-black dark:text-white uppercase tracking-tighter">
                {Object.values(selectedParts).filter(Boolean).length} / {CATEGORIES.length}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">Power_Draw</div>
              <div className="text-base font-black text-black dark:text-white uppercase tracking-tighter flex items-center gap-2">
                {totalWattage} <span className="text-[10px]">WATT</span>
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">System_Health</div>
              <div className="text-base font-black text-[#c2000b] uppercase tracking-tighter flex items-center gap-2 animate-pulse">
                <Icon icon="solar:shield-check-bold" />
                OFFLINE
              </div>
            </div>
          </div>

          <button className={`px-12 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
            totalPrice > 0 
            ? "bg-[#c2000b] text-white shadow-xl shadow-[#c2000b]/30 hover:scale-105 active:scale-95" 
            : "bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed"
          }`}>
            Finalize_Configuration
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

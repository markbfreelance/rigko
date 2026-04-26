"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

import { CATEGORIES, PERIPHERAL_CATEGORIES } from "./_data/parts";
import { checkCompatibility as checkCompat } from "./_lib/compatibility";
import MobileLayout from "./_components/mobile-layout";
import DesktopLayout from "./_components/desktop-layout";

// Lazy-load the HUD drawer; its chunk is not compiled or shipped
// until the user first opens the drawer.
const RenderHudDrawer = dynamic(() => import("./_components/render-hud-drawer"), {
  ssr: false,
});

export default function BuildPage() {
  const [activeCategory, setActiveCategory] = useState("cpu");
  const [selectedParts, setSelectedParts] = useState<Record<string, any>>({});
  const [selectedPeripherals, setSelectedPeripherals] = useState<
    Record<string, any>
  >({});
  const [enabledPeripherals, setEnabledPeripherals] = useState<string[]>([]);

  const [isHudOpen, setIsHudOpen] = useState(false);
  const [isSelectingMode, setIsSelectingMode] = useState(false);
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const toggleCategory = (id: string) =>
    setExpandedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  const [searchQuery, setSearchQuery] = useState("");
  const [hasOpenedHud, setHasOpenedHud] = useState(false);

  const totalPrice =
    Object.values(selectedParts).reduce(
      (acc, part) => acc + (part?.price || 0),
      0,
    ) +
    Object.values(selectedPeripherals).reduce(
      (acc, item) => acc + (item?.price || 0),
      0,
    );
  const totalWattage = Object.values(selectedParts).reduce((acc, part) => {
    if (part?.tdp) return acc + part.tdp;
    if (part?.power_draw) return acc + part.power_draw;
    return acc;
  }, 0);

  const checkCompatibility = (category: string, part: any) =>
    checkCompat(category, part, { selectedParts, totalWattage });

  const handleSelect = (category: string, item: any) => {
    // Determine if it's a peripheral
    const isPeripheral = PERIPHERAL_CATEGORIES.some((pc) => pc.id === category);

    if (isPeripheral) {
      setSelectedPeripherals((prev) => ({
        ...prev,
        [category]: prev[category]?.id === item.id ? null : item,
      }));

      const isSelecting = selectedPeripherals[category]?.id !== item.id;
      if (isSelecting && item && window.innerWidth < 1024) {
        setTimeout(() => setIsSelectingMode(false), 400); // Return to index on mobile
      }
      return;
    }

    const { compatible } = checkCompatibility(category, item);
    if (!compatible) return;

    setSelectedParts((prev) => ({
      ...prev,
      [category]: prev[category]?.id === item.id ? null : item,
    }));

    // Auto-advance logic (Now default protocol)
    const isSelecting = selectedParts[category]?.id !== item.id;
    if (isSelecting && item) {
      const currentIndex = CATEGORIES.findIndex((c) => c.id === category);
      if (currentIndex !== -1 && currentIndex < CATEGORIES.length - 1) {
        setTimeout(
          () => setActiveCategory(CATEGORIES[currentIndex + 1].id),
          300,
        );
      }

      // On mobile, return to the master index after selection
      if (window.innerWidth < 1024) {
        setTimeout(() => setIsSelectingMode(false), 400); // Slight delay for feedback
      }
    }
  };

  const togglePeripheral = (categoryId: string) => {
    setEnabledPeripherals((prev) => {
      if (prev.includes(categoryId)) {
        // Remove item selection if the category is disabled
        setSelectedPeripherals((s) => {
          const next = { ...s };
          delete next[categoryId];
          return next;
        });
        // Deselect if it was the active category
        setActiveCategory((curr) => (curr === categoryId ? "cpu" : curr));
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const getActiveIds = () => {
    const ids: string[] = [];
    if (selectedParts["case"]) ids.push("CHASSIS");
    if (selectedParts["mobo"]) ids.push("MOBO");

    Object.entries(selectedParts).forEach(([cat, part]) => {
      if (!part) return;
      if (cat === "cpu") {
        ids.push(part.brand === "AMD" ? "RYZEN_CORE" : "INTEL_CORE");
      } else if (cat === "gpu") {
        ids.push("GRAPHICS");
      } else if (cat === "ram") {
        ids.push(part.type === "DDR4" ? "RAM_1" : "RAM_2");
      } else if (cat === "psu") {
        ids.push("ENERGY");
      } else if (cat === "storage") {
        ids.push("DATA_1");
      } else if (cat === "cooler") {
        ids.push("THERMAL");
      }
    });
    return ids;
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#050100] transition-colors overflow-x-clip is-builder-page">

      <main className="pt-24 md:pt-28 pb-32 px-4 md:px-12 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
        <MobileLayout
          getActiveIds={getActiveIds}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedParts={selectedParts}
          selectedPeripherals={selectedPeripherals}
          enabledPeripherals={enabledPeripherals}
          expandedCats={expandedCats}
          toggleCategory={toggleCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSelectingMode={isSelectingMode}
          setIsSelectingMode={setIsSelectingMode}
          handleSelect={handleSelect}
          togglePeripheral={togglePeripheral}
          checkCompatibility={checkCompatibility}
          totalPrice={totalPrice}
          totalWattage={totalWattage}
        />
        <DesktopLayout
          getActiveIds={getActiveIds}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedParts={selectedParts}
          selectedPeripherals={selectedPeripherals}
          enabledPeripherals={enabledPeripherals}
          expandedCats={expandedCats}
          toggleCategory={toggleCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSelectingMode={isSelectingMode}
          setIsSelectingMode={setIsSelectingMode}
          handleSelect={handleSelect}
          togglePeripheral={togglePeripheral}
          checkCompatibility={checkCompatibility}
          totalPrice={totalPrice}
          totalWattage={totalWattage}
        />
      </main>

      {/* Mobile Render HUD Drawer (lazy: chunk loads on first open) */}
      {hasOpenedHud && (
        <RenderHudDrawer
          isOpen={isHudOpen}
          onClose={() => setIsHudOpen(false)}
          selectedParts={selectedParts}
          selectedPeripherals={selectedPeripherals}
          totalPrice={totalPrice}
          getActiveIds={getActiveIds}
        />
      )}

      {/* Mobile HUD Toggle Button */}
      <div className="fixed bottom-24 right-4 z-160 lg:hidden">
        <button
          onClick={() => {
            setHasOpenedHud(true);
            setIsHudOpen(true);
          }}
          className="w-14 h-14 rounded-full bg-[#c2000b] text-white flex flex-col items-center justify-center shadow-2xl active:scale-95 transition-transform border-4 border-[#050100]"
        >
          <Icon
            icon="solar:globus-linear"
            className="text-xl mb-0.5 animate-spin-slow"
          />
          <span className="text-[7px] font-black uppercase tracking-tighter">
            HUD
          </span>
        </button>
      </div>

      {/* Persistent Build Terminal (Bottom Bar) */}
      <div className="sticky bottom-0 left-0 w-full z-150 chassis-steel backdrop-blur-md border-t border-black/10 dark:border-white/10 px-8 py-4">
        {/* Industrial Bezel Screws */}
        <div className="absolute top-2 left-2 hex-screw scale-75"></div>
        <div className="absolute top-2 right-2 hex-screw scale-75"></div>
        <div className="absolute bottom-2 left-2 hex-screw scale-75"></div>
        <div className="absolute bottom-2 right-2 hex-screw scale-75"></div>

        <div className="max-w-[1440px] mx-auto flex items-center justify-between relative z-10 gap-x-4">
          <div className="flex gap-6 md:gap-12 flex-1 min-w-0">
            <div className="min-w-0">
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">
                Items
              </div>
              <div className="text-sm md:text-base font-black text-black dark:text-white uppercase tracking-tighter">
                {Object.values(selectedParts).filter(Boolean).length}/
                {CATEGORIES.length}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">
                Energy
              </div>
              <div className="text-sm md:text-base font-black text-black dark:text-white uppercase tracking-tighter flex items-center gap-1 md:gap-2">
                {totalWattage}W
              </div>
            </div>
            <div className="hidden xs:block min-w-0">
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">
                Total
              </div>
              <div className="text-sm md:text-base font-black text-black dark:text-white tracking-tighter truncate">
                ₱{totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Only show price on mobile if not in stats group */}
            <div className="xs:hidden text-base font-black text-black dark:text-white tracking-tighter">
              ₱{totalPrice.toLocaleString()}
            </div>
            <button
              className={`px-6 md:px-12 py-2.5 md:py-3 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest transition-all ${
                totalPrice > 0
                  ? "bg-[#c2000b] text-white shadow-xl shadow-[#c2000b]/30 hover:scale-105 active:scale-95"
                  : "bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed"
              }`}
            >
              {totalPrice > 0 ? "Finalize" : "Empty"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

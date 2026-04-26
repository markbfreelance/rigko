"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import HardwareDeck from "../../components/hardware-deck";
import {
  CATEGORIES,
  PERIPHERAL_CATEGORIES,
  PARTS,
  PERIPHERALS,
} from "../_data/parts";
import type { BuilderViewProps } from "./builder-types";

export default function DesktopLayout({
  activeCategory,
  setActiveCategory,
  selectedParts,
  selectedPeripherals,
  enabledPeripherals,
  expandedCats,
  toggleCategory,
  searchQuery,
  setSearchQuery,
  isSelectingMode,
  setIsSelectingMode,
  handleSelect,
  togglePeripheral,
  checkCompatibility,
  totalPrice,
  totalWattage,
  getActiveIds,
}: BuilderViewProps) {
  return (
    <>
        {/* Desktop Layout (Maintains original side-by-side) */}
        <div className="hidden lg:flex flex-row gap-8 h-[calc(100vh-14rem)]">
          {/* Left: Category Sidebar (Desktop Only) */}
          <div className="hidden lg:block w-64 shrink-0 h-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-6 px-4">
                SELECT YOUR PARTS
              </h2>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all border group ${
                    activeCategory === cat.id
                      ? "bg-[#c2000b] text-white border-[#c2000b] shadow-lg shadow-[#c2000b]/20"
                      : "bg-white dark:bg-[#111111] border-black/5 dark:border-white/5 text-gray-500 hover:border-[#c2000b]/50"
                  }`}
                >
                  {typeof cat.icon === "string" && (
                    <Icon
                      icon={cat.icon}
                      className={`text-xl ${activeCategory === cat.id ? "text-white" : "text-[#c2000b]/60"}`}
                    />
                  )}
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    {cat.name}
                  </span>
                  {selectedParts[cat.id] && (
                    <Icon
                      icon="solar:check-circle-bold"
                      className={`ml-auto text-xl transition-colors ${activeCategory === cat.id ? "text-white" : "text-[#c2000b]"}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-4 px-4">
                PERIPHERALS
              </h2>
              <div className="p-4 rounded-xl border border-[#e5e5e5] dark:border-[#222222] relative overflow-hidden isolate">
                {/* Pegboard Background Layer */}
                <div className="absolute inset-0 pegboard-mesh z-0 pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-3 gap-y-8 gap-x-2">
                  {PERIPHERAL_CATEGORIES.map((pcat) => {
                    const sel = selectedPeripherals[pcat.id];
                    const isActive = enabledPeripherals.includes(pcat.id);
                    return (
                      <button
                        key={pcat.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePeripheral(pcat.id);
                        }}
                        className="flex flex-col items-center gap-2 group relative"
                      >
                        <div
                          className={`relative shrink-0 w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center border-2 transition-all shadow-md group/iconbox ${
                            sel
                              ? "bg-[#c2000b] border-[#ff4d4d] text-white shadow-[0_0_15px_rgba(194,0,11,0.3)]"
                              : isActive
                                ? "bg-white dark:bg-[#1a1a1a] border-[#c2000b] text-[#c2000b]"
                                : "bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#222222] text-gray-500 group-hover:border-[#c2000b]/30"
                          }`}
                        >
                          {/* Hook visual */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>

                          {/* Default Icon */}
                          <Icon
                            icon={pcat.icon}
                            className="text-xl group-hover:hidden"
                          />

                          {/* Hover Icon (+ or x) */}
                          <Icon
                            icon={
                              isActive
                                ? "solar:close-circle-bold"
                                : "solar:add-circle-bold"
                            }
                            className={`text-xl hidden group-hover:block ${!sel && isActive ? "text-[#c2000b]" : ""}`}
                          />
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <span className="text-[7px] font-black uppercase tracking-widest text-black dark:text-white mb-0.5">
                            {pcat.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Category Selection Rows */}
                <div className="relative z-10 mt-8 space-y-2">
                  <AnimatePresence>
                    {PERIPHERAL_CATEGORIES.filter((p) =>
                      enabledPeripherals.includes(p.id),
                    ).map((pcat) => {
                      const sel = selectedPeripherals[pcat.id];
                      const isActive = activeCategory === pcat.id;
                      return (
                        <motion.div
                          key={`row-desktop-anim-${pcat.id}`}
                          initial={{ opacity: 0, height: 0, x: -20 }}
                          animate={{ opacity: 1, height: "auto", x: 0 }}
                          exit={{ opacity: 0, height: 0, x: -20 }}
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2">
                            <div className="w-full flex items-start gap-2 transition-all group/row">
                              {/* Block 1: The Icon (1 Pin) */}
                              <div
                                className={`relative shrink-0 w-11 h-11 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center rounded-xl border-2 transition-all ${
                                  isActive
                                    ? "bg-white dark:bg-[#1a1a1a] border-[#c2000b] shadow-[0_4px_12px_rgba(194,0,11,0.1)]"
                                    : "bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#222222] group-hover/row:border-[#c2000b]/30"
                                }`}
                              >
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                                <Icon
                                  icon={pcat.icon}
                                  className={`text-xl transition-all ${
                                    sel
                                      ? "text-[#c2000b]"
                                      : isActive
                                        ? "text-[#c2000b]"
                                        : "text-gray-500"
                                  }`}
                                />
                              </div>

                              {/* Block 2: The Details Container (2 Pins) */}
                              <div
                                className={`relative flex-1 flex flex-col rounded-xl border-2 transition-all ${
                                  isActive
                                    ? "bg-white dark:bg-[#1a1a1a] border-[#c2000b] shadow-[0_4px_12px_rgba(194,0,11,0.1)]"
                                    : "bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#222222] group-hover/row:border-[#c2000b]/30"
                                }`}
                              >
                                <div className="absolute -top-1.5 left-4 w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full z-10"></div>
                                <div className="absolute -top-1.5 right-4 w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full z-10"></div>

                                {/* Header Action */}
                                <button
                                  onClick={() => toggleCategory(pcat.id)}
                                  className="w-full flex items-center justify-between p-2.5 relative z-10"
                                >
                                  <span
                                    className={`text-[11px] font-bold uppercase tracking-tighter ${isActive ? "text-[#c2000b]" : "text-black dark:text-white"}`}
                                  >
                                    {pcat.name}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    {sel && (
                                      <span
                                        className={`text-[9px] font-black uppercase truncate max-w-[100px] ${isActive ? "text-[#c2000b]" : "text-gray-500"}`}
                                      >
                                        {sel.name}
                                      </span>
                                    )}
                                    <Icon
                                      icon="solar:alt-arrow-down-linear"
                                      className={`text-gray-400 transition-transform duration-300 ${expandedCats.includes(pcat.id) ? "rotate-180 text-[#c2000b]" : "group-hover/row:text-[#c2000b]"}`}
                                    />
                                  </div>
                                </button>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                  {expandedCats.includes(pcat.id) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="bg-black/2 dark:bg-white/2 border-t border-black/5 dark:border-white/5 overflow-hidden rounded-b-xl"
                                    >
                                      <div className="p-2.5 pt-2">
                                        {sel ? (
                                          <div className="flex flex-col gap-2">
                                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                                              <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5">
                                                {sel.brand}
                                              </div>
                                              <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest leading-tight flex items-center">
                                                {pcat.id === "monitor" &&
                                                  `${sel.size}" // ${sel.resolution} // ${sel.refresh_rate}Hz // ${sel.panel}`}
                                                {pcat.id === "keyboard" &&
                                                  `${sel.type} // ${sel.switches} // ${sel.layout}`}
                                                {pcat.id === "mouse" &&
                                                  `${sel.dpi} DPI // ${sel.weight}g // ${sel.wireless ? "Wireless" : "Wired"}`}
                                                {pcat.id === "headset" &&
                                                  `${sel.connection} // ${sel.surround}`}
                                                {pcat.id === "speaker" &&
                                                  `${sel.power} // ${sel.connection}`}
                                                {pcat.id === "webcam" &&
                                                  `${sel.resolution} // ${sel.fps} fps`}
                                              </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                              <span className="text-[10px] font-black text-[#c2000b]">
                                                ₱{sel.price.toLocaleString()}
                                              </span>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setActiveCategory(pcat.id);
                                                  setIsSelectingMode(true);
                                                }}
                                                className="h-6 px-4 text-[8px] font-black uppercase tracking-widest rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-500 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                              >
                                                CHANGE
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex flex-col items-center justify-center py-1">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveCategory(pcat.id);
                                                setIsSelectingMode(true);
                                              }}
                                              className="w-full h-7 rounded-full bg-[#c2000b] text-white text-[8px] font-black uppercase tracking-widest hover:bg-[#a00009] transition-colors shadow-sm"
                                            >
                                              ADD_{pcat.name}
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Part Catalog */}
          <div className="flex-1 min-w-0 flex flex-col h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
              <h1 className="text-xl md:text-3xl font-black text-black dark:text-white uppercase tracking-tighter shrink-0">
                Select_{activeCategory}
              </h1>

              <div className="relative flex-1 max-w-md">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <Icon icon="solar:magnifer-linear" className="text-lg" />
                </div>
                <input
                  type="text"
                  placeholder={`Search_${activeCategory}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full pl-12 pr-6 py-2.5 text-[11px] font-mono uppercase tracking-widest text-black dark:text-white focus:outline-none focus:border-[#c2000b]/50 placeholder:text-gray-500 transition-all shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>

            {/* Parts Selection */}
            <div className="flex-1 overflow-y-auto pr-2 pt-4 custom-scrollbar grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-max content-start">
              <AnimatePresence>
                {(PARTS[activeCategory as keyof typeof PARTS] || [])
                  .concat(
                    PERIPHERALS[activeCategory as keyof typeof PERIPHERALS] ||
                      [],
                  )
                  .filter(
                    (part) =>
                      part.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      (part.brand &&
                        part.brand
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())),
                  )
                  .map((part, idx) => {
                    const { compatible, reason, warning } = checkCompatibility(
                      activeCategory,
                      part,
                    );
                    const isSelected =
                      selectedParts[activeCategory]?.id === part.id ||
                      selectedPeripherals[activeCategory]?.id === part.id;

                    return (
                      <motion.div
                        key={part.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleSelect(activeCategory, part)}
                        className={`cursor-pointer group relative p-4 md:p-6 rounded-3xl border-2 transition-all ${
                          isSelected
                            ? "bg-white dark:bg-[#111111] border-[#c2000b] shadow-2xl scale-[1.02]"
                            : !compatible
                              ? "bg-gray-50 dark:bg-white/5 border-transparent opacity-50 cursor-not-allowed"
                              : warning
                                ? "bg-white dark:bg-[#111111] border-yellow-500/50 hover:border-yellow-500 shadow-lg shadow-yellow-500/5 transition-colors"
                                : "bg-white dark:bg-[#111111] border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20"
                        }`}
                      >
                        {/* Warning/Error Badges */}
                        {(!compatible || (warning && !isSelected)) && (
                          <div className="absolute inset-x-0 -top-3 z-20 flex justify-center">
                            <div
                              className={`backdrop-blur-md text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border flex items-center gap-2 shadow-xl ${
                                !compatible
                                  ? "bg-[#c2000b] border-[#c2000b]"
                                  : "bg-yellow-600/90 border-yellow-400/50"
                              }`}
                            >
                              <Icon
                                icon={
                                  !compatible
                                    ? "solar:danger-bold"
                                    : "solar:shield-warning-bold"
                                }
                                className="text-white text-base"
                              />
                              {reason}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                          <div className="flex flex-col gap-1">
                            <div className="text-[10px] font-black text-[#c2000b] border border-[#c2000b]/20 px-2 py-0.5 rounded-full uppercase self-start">
                              {part.brand}
                            </div>
                            {part.socket && (
                              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
                                Socket: {part.socket}
                              </div>
                            )}
                            {part.form_factor && (
                              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
                                Size: {part.form_factor}
                              </div>
                            )}
                          </div>
                          <div className="text-lg font-black text-black dark:text-white tracking-tighter">
                            ₱{part.price.toLocaleString()}
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-black dark:text-white mb-2 leading-tight group-hover:text-[#c2000b] transition-colors uppercase">
                          {part.name}
                        </h3>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                          {part.specs}
                        </p>

                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            {(part.wattage || part.power_draw) && (
                              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                                <Icon icon="solar:bolt-bold" />
                                {part.wattage || part.power_draw}W
                              </div>
                            )}
                            {part.length && (
                              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                                <Icon icon="solar:ruler-bold" />
                                {part.length}mm
                              </div>
                            )}
                          </div>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-[#c2000b] text-white"
                                : "bg-black/5 dark:bg-white/5 text-transparent"
                            }`}
                          >
                            <Icon
                              icon="solar:check-read-linear"
                              className="text-lg"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>

              {!PARTS[activeCategory as keyof typeof PARTS] && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-[3rem] opacity-40">
                  <Icon icon="solar:ghost-bold" className="text-6xl mb-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em]">
                    Inventory_Empty // Restocking
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Assembly Preview (Desktop Only) */}
          <div className="hidden lg:block w-[400px] shrink-0 h-full">
            <div
              className="relative h-full flex flex-col group"
              style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))" }}
            >
              {/* Red Geometric Border (Underlay) */}
              <div
                className="absolute inset-0 bg-[#c2000b]/40 z-0"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 18px 70%, 18px 30%, 0% 25%)",
                }}
              ></div>

              {/* Black Cockpit Background (Main Layer) */}
              <div
                className="absolute inset-0 bg-white dark:bg-[#111111] overflow-hidden z-0"
                style={{
                  clipPath:
                    "polygon(2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) calc(100% - 2px), 2px calc(100% - 2px), 2px 75%, 20px 70%, 20px 30%, 2px 25%)",
                }}
              >
                <div className="absolute inset-0 chassis-mesh opacity-5"></div>
                <div className="absolute inset-0 hardware-grid opacity-10"></div>
              </div>

              {/* Internal Content (Pushed inward to clear the notch) */}
              <div className="relative z-10 p-8 pl-12 h-full flex flex-col pointer-events-none">
                <div className="relative z-10 mb-4 shrink-0">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b]">
                    ASSEMBLY DESK
                  </h2>
                  <p className="text-[9px] font-mono text-gray-500 uppercase mt-1">
                    Status: {totalPrice > 0 ? "IN_PROGRESS" : "IDLE"}
                  </p>
                </div>

                <div className="flex-1 relative -mx-24 -my-16 pointer-events-auto">
                  <HardwareDeck
                    activeIds={getActiveIds()}
                    variant="build"
                    partNames={{
                      ...(selectedParts["case"]
                        ? { CHASSIS: selectedParts["case"]!.name }
                        : {}),
                      ...(selectedParts["mobo"]
                        ? { MOBO: selectedParts["mobo"]!.name }
                        : {}),
                      ...(selectedParts["cpu"]
                        ? {
                            [selectedParts["cpu"]!.brand === "AMD"
                              ? "RYZEN_CORE"
                              : "INTEL_CORE"]: selectedParts["cpu"]!.name,
                          }
                        : {}),
                      ...(selectedParts["gpu"]
                        ? { GRAPHICS: selectedParts["gpu"]!.name }
                        : {}),
                      ...(selectedParts["ram"]
                        ? {
                            [selectedParts["ram"]!.type === "DDR4"
                              ? "RAM_1"
                              : "RAM_2"]: selectedParts["ram"]!.name,
                          }
                        : {}),
                      ...(selectedParts["psu"]
                        ? { ENERGY: selectedParts["psu"]!.name }
                        : {}),
                      ...(selectedParts["storage"]
                        ? { DATA_1: selectedParts["storage"]!.name }
                        : {}),
                      ...(selectedParts["cooler"]
                        ? { THERMAL: selectedParts["cooler"]!.name }
                        : {}),
                    }}
                  />
                </div>

                {/* Parts Summary List */}
                <div className="relative z-10 shrink-0 mt-2 mb-6 overflow-y-auto max-h-[140px] pr-2 custom-scrollbar border-t border-black/5 dark:border-white/5 pt-4 pointer-events-auto">
                  <div className="space-y-2">
                    {[
                      ...Object.entries(selectedParts),
                      ...Object.entries(selectedPeripherals),
                    ].map(([catId, part]) => {
                      if (!part) return null;
                      const category =
                        CATEGORIES.find((c) => c.id === catId) ||
                        PERIPHERAL_CATEGORIES.find((c) => c.id === catId);
                      return (
                        <div
                          key={catId}
                          className="flex justify-between items-center text-[9px] font-mono group/item"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 dark:text-gray-500 uppercase w-16 shrink-0">
                              {category?.name}
                            </span>
                            <span className="text-black dark:text-white font-bold truncate max-w-[150px]">
                              {part.name}
                            </span>
                          </div>
                          <span className="text-[#c2000b] font-black shrink-0">
                            ₱{part.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                    {Object.values(selectedParts).filter(Boolean).length ===
                      0 &&
                      Object.values(selectedPeripherals).filter(Boolean)
                        .length === 0 && (
                        <p className="text-[9px] font-mono text-gray-400 dark:text-gray-600 uppercase italic opacity-50">
                          Empty_Manifest // Waiting_For_Input
                        </p>
                      )}
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-black/5 dark:border-white/5 mt-auto shrink-0 pointer-events-auto">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">
                      Estimated_Total
                    </span>
                    <span className="text-2xl font-black text-black dark:text-white tracking-tighter">
                      ₱{totalPrice.toLocaleString()}
                    </span>
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
        </div>
    </>
  );
}

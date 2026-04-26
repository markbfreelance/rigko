"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  CATEGORIES,
  PERIPHERAL_CATEGORIES,
} from "../_data/parts";
import type { BuilderViewProps } from "./builder-types";

export default function MobileLayout({
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
  PARTS,
  PERIPHERALS,
}: BuilderViewProps) {
  return (
    <>
        {/* Mobile View Switching: Index vs Catalog */}
        <div className="lg:hidden">
          <AnimatePresence>
            {!isSelectingMode ? (
              /* Master Assembly Index checklist */
              <motion.div
                key="mobile-index"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="mb-6">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] px-2 mb-4">
                    SELECT YOUR PARTS
                  </h2>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat, idx) => {
                      const selectedPart = selectedParts[cat.id];
                      const isExpanded = expandedCats.includes(cat.id);

                      return (
                        <div
                          key={cat.id}
                          className="w-full flex flex-col rounded-xl border border-black/5 dark:border-white/5 chassis-steel backdrop-blur-md transition-all overflow-hidden"
                        >
                          {/* Row Header */}
                          <div
                            onClick={() => toggleCategory(cat.id)}
                            className="w-full flex items-center justify-between p-4 cursor-pointer active:bg-black/5 dark:active:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                                  selectedPart
                                    ? "bg-[#c2000b]/10 border-[#c2000b]/30 text-[#c2000b]"
                                    : "bg-black/10 dark:bg-white/5 border-white/5 text-gray-400"
                                }`}
                              >
                                {typeof cat.icon === "string" && (
                                  <Icon icon={cat.icon} className="text-lg" />
                                )}
                              </div>
                              <div className="text-[11px] font-bold text-black dark:text-white uppercase tracking-tighter">
                                {cat.name}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {selectedPart && !isExpanded && (
                                <div className="text-[9px] font-black text-[#c2000b] uppercase truncate max-w-[120px]">
                                  {selectedPart.name}
                                </div>
                              )}
                              <Icon
                                icon="solar:alt-arrow-down-linear"
                                className={`text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-black/2 dark:bg-white/2 border-t border-black/5 dark:border-white/5"
                              >
                                <div className="p-4 flex items-center justify-between gap-4">
                                  <div className="flex-1">
                                    {selectedPart ? (
                                      <div className="space-y-1">
                                        <div className="text-[11px] font-black text-[#c2000b] uppercase leading-tight mb-1">
                                          {selectedPart.name}
                                        </div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                                          <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded border border-black/5 dark:border-white/5">
                                            {selectedPart.brand}
                                          </div>
                                          <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                                            {cat.id === "cpu" &&
                                              `${selectedPart.cores}C/${selectedPart.threads}T // ${selectedPart.socket}`}
                                            {cat.id === "mobo" &&
                                              `${selectedPart.chipset} // ${selectedPart.form_factor}`}
                                            {cat.id === "ram" &&
                                              `${selectedPart.capacity}GB // ${selectedPart.speed}MHz`}
                                            {cat.id === "gpu" &&
                                              `${selectedPart.vram}GB VRAM`}
                                            {cat.id === "storage" &&
                                              `${selectedPart.capacity}GB // ${selectedPart.type}`}
                                            {cat.id === "psu" &&
                                              `${selectedPart.wattage}W // ${selectedPart.efficiency_rating}`}
                                            {cat.id === "cooler" &&
                                              `${selectedPart.type} COOLING`}
                                          </div>
                                          <div className="text-[8px] font-mono text-[#c2000b] font-bold uppercase">
                                            ₱
                                            {selectedPart.price.toLocaleString()}
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveCategory(cat.id);
                                      setIsSelectingMode(true);
                                    }}
                                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all ${
                                      selectedPart
                                        ? "bg-black/5 dark:bg-white/5 text-gray-500 border border-white/10"
                                        : "bg-[#c2000b] text-white shadow-lg shadow-[#c2000b]/20"
                                    }`}
                                  >
                                    {selectedPart
                                      ? "CHANGE"
                                      : `ADD_${cat.name}`}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── PERIPHERALS PEGBOARD ── */}
                <div className="mt-8">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] px-2 mb-4">
                    PERIPHERALS
                  </h2>
                  <div className="p-4 rounded-xl border border-[#e5e5e5] dark:border-[#222222] relative overflow-hidden isolate">
                    {/* Pegboard Background Layer */}
                    <div className="absolute inset-0 pegboard-mesh z-0 pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-3 gap-y-8 gap-x-4">
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
                              className={`relative shrink-0 w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl flex items-center justify-center border-2 transition-all shadow-md group/iconbox ${
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
                    <div className="relative z-10 mt-8 space-y-3">
                      <AnimatePresence>
                        {PERIPHERAL_CATEGORIES.filter((p) =>
                          enabledPeripherals.includes(p.id),
                        ).map((pcat) => {
                          const sel = selectedPeripherals[pcat.id];
                          const isActive = activeCategory === pcat.id;
                          return (
                            <motion.div
                              key={`row-anim-${pcat.id}`}
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
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
                                    className={`relative shrink-0 w-12 h-12 min-w-[48px] min-h-[48px] flex flex-col items-center justify-center rounded-xl border-2 transition-all ${
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
                                      className="w-full flex items-center justify-between p-3 relative z-10"
                                    >
                                      <span
                                        className={`text-[11px] font-bold uppercase tracking-tighter ${isActive ? "text-[#c2000b]" : "text-black dark:text-white"}`}
                                      >
                                        {pcat.name}
                                      </span>
                                      <div className="flex items-center gap-3">
                                        {sel && (
                                          <span
                                            className={`text-[9px] font-black uppercase truncate max-w-[120px] ${isActive ? "text-[#c2000b]" : "text-gray-500"}`}
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
                                          animate={{
                                            height: "auto",
                                            opacity: 1,
                                          }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="bg-black/2 dark:bg-white/2 border-t border-black/5 dark:border-white/5 overflow-hidden rounded-b-xl"
                                        >
                                          <div className="p-3 pt-2">
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
                                                    ₱
                                                    {sel.price.toLocaleString()}
                                                  </span>
                                                  <button
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setActiveCategory(
                                                        pcat.id,
                                                      );
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
              </motion.div>
            ) : (
              /* Selection Mode / Part Catalog */
              <motion.div
                key="mobile-catalog"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Back Link */}
                <button
                  onClick={() => setIsSelectingMode(false)}
                  className="flex items-center gap-3 text-gray-500 hover:text-[#c2000b] transition-colors group mb-4"
                >
                  <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-[#c2000b]/50 group-hover:bg-[#c2000b]/10">
                    <Icon icon="solar:arrow-left-linear" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    RETURN_TO_INDEX
                  </span>
                </button>

                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter shrink-0">
                    Select_{activeCategory}
                  </h1>

                  <div className="relative w-full">
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

                <div className="grid grid-cols-1 gap-4 pt-4">
                  <AnimatePresence>
                    {(PARTS[activeCategory as keyof typeof PARTS] || [])
                      .concat(
                        PERIPHERALS[
                          activeCategory as keyof typeof PERIPHERALS
                        ] || [],
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
                        const { compatible, reason, warning } =
                          checkCompatibility(activeCategory, part);
                        const isPeripheralActive = PERIPHERAL_CATEGORIES.some(
                          (pc) => pc.id === activeCategory,
                        );
                        const isSelected = isPeripheralActive
                          ? selectedPeripherals[activeCategory]?.id === part.id
                          : selectedParts[activeCategory]?.id === part.id;

                        return (
                          <motion.div
                            key={part.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`group relative p-4 rounded-2xl border transition-all ${
                              isSelected
                                ? "bg-[#c2000b]/5 border-[#c2000b] shadow-[0_0_20px_rgba(194,0,11,0.1)]"
                                : !compatible
                                  ? "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 opacity-60 grayscale"
                                  : "bg-white dark:bg-[#111111] border-black/5 dark:border-white/5 hover:border-[#c2000b]/30"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-mono text-[#c2000b] font-bold">
                                    {part.brand}
                                  </span>
                                  {!compatible && (
                                    <span className="px-2 py-0.5 rounded-full bg-[#c2000b] text-white text-[8px] font-bold uppercase tracking-tighter border border-[#c2000b]">
                                      {reason || "INCOMPATIBLE"}
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-sm font-black text-black dark:text-white uppercase tracking-tighter leading-tight mb-2">
                                  {part.name}
                                </h3>

                                {/* Price and Action */}
                                <div className="flex items-center justify-between mt-4">
                                  <div className="text-lg font-black text-[#c2000b] tracking-tighter">
                                    ₱{part.price.toLocaleString()}
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleSelect(activeCategory, part)
                                    }
                                    disabled={!compatible}
                                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg transition-all ${
                                      isSelected
                                        ? "bg-black text-white shadow-black/20"
                                        : "bg-[#c2000b] text-white shadow-[#c2000b]/20 hover:scale-105 active:scale-95"
                                    }`}
                                  >
                                    {isSelected ? "REMOVE" : "SELECT_PART"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import HardwareDeck from "../../components/hardware-deck";
import { CATEGORIES, PERIPHERAL_CATEGORIES } from "../_data/parts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedParts: Record<string, any>;
  selectedPeripherals: Record<string, any>;
  totalPrice: number;
  getActiveIds: () => string[];
};

export default function RenderHudDrawer({
  isOpen,
  onClose,
  selectedParts,
  selectedPeripherals,
  totalPrice,
  getActiveIds,
}: Props) {
  const mobileConstraintsRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-1050 lg:hidden"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[320px] z-1100 lg:hidden flex flex-col"
            style={{ filter: "drop-shadow(-10px 0 20px rgba(0,0,0,0.5))" }}
          >
            <div className="relative w-full h-full flex flex-col group">
              {/* Red Geometric Border (Underlay) - Side Notch */}
              <div
                className="absolute inset-0 bg-[#c2000b] z-0"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 18px 70%, 18px 30%, 0% 25%)",
                }}
              ></div>

              {/* Black Cockpit Background (Main Layer) - Side Notch */}
              <div
                className="absolute inset-0 bg-white dark:bg-linear-to-br dark:from-[#121212] dark:to-[#080808] overflow-hidden z-0"
                style={{
                  clipPath:
                    "polygon(2px 0%, 100% 0%, 100% 100%, 2px 100%, 2px 75%, 20px 70%, 20px 30%, 2px 25%)",
                }}
              >
                <div className="absolute inset-0 chassis-mesh opacity-5"></div>
                <div className="absolute inset-0 hardware-grid opacity-10"></div>
              </div>

              {/* Drawer Content */}
              <div className="relative z-10 flex flex-col h-full pl-12 pr-6 pt-24 pb-12">
                {/* Assembly Render Viewport - Strictly Contained Workstation */}
                <div
                  ref={mobileConstraintsRef}
                  className="flex-1 relative ml-12 mb-12 mt-8 pl-24 pr-12 pb-16 touch-none"
                >
                  <HardwareDeck
                    activeIds={getActiveIds()}
                    variant="build"
                    dragConstraints={mobileConstraintsRef}
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

                {/* List Summary */}
                <div className="relative z-10 shrink-0 mt-2 mb-6 overflow-y-auto max-h-[140px] pr-2 custom-scrollbar border-t border-black/5 dark:border-white/5 pt-4">
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
                            <span className="text-gray-400 dark:text-gray-500 uppercase w-12 shrink-0">
                              {category?.name}
                            </span>
                            <span className="text-black dark:text-white font-bold truncate max-w-[120px]">
                              {part.name}
                            </span>
                          </div>
                          <span className="text-[#c2000b] font-black shrink-0 ml-2">
                            ₱{part.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total Block */}
                <div className="relative z-10 pt-6 border-t border-black/5 dark:border-white/5 mt-auto shrink-0">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">
                      Estimated_Total
                    </span>
                    <span className="text-xl font-black text-black dark:text-white tracking-tighter">
                      ₱{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-black/5 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                    <motion.div
                      key="hud-progress-bar"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      className="h-full bg-[#c2000b] rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Close Drawer Button & Title Unified */}
              <div className="absolute top-6 left-12 right-8 flex items-center justify-between z-210">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b]">
                    ASSEMBLY DESK
                  </h2>
                  <p className="text-[9px] font-mono text-gray-500 uppercase mt-1">
                    Status: {totalPrice > 0 ? "IN_PROGRESS" : "IDLE"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ededed] dark:bg-(--chassis-metal) text-black dark:text-white shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.1)] active:scale-95 transition-all"
                >
                  <Icon icon="lucide:x" className="text-xl" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

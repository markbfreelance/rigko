import type { CompatibilityResult } from "../_lib/compatibility";

export type BuilderViewProps = {
  activeCategory: string;
  setActiveCategory: (id: string) => void;

  selectedParts: Record<string, any>;
  selectedPeripherals: Record<string, any>;
  enabledPeripherals: string[];

  expandedCats: string[];
  toggleCategory: (id: string) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  isSelectingMode: boolean;
  setIsSelectingMode: (b: boolean) => void;

  handleSelect: (category: string, item: any) => void;
  togglePeripheral: (categoryId: string) => void;
  checkCompatibility: (category: string, part: any) => CompatibilityResult;

  totalPrice: number;
  totalWattage: number;

  getActiveIds: () => string[];
  
  PARTS: Record<string, any[]>;
  PERIPHERALS: Record<string, any[]>;
};

// Pure compatibility checks for the PC builder.
// No React dependencies; safe to unit-test.

export type CompatibilityResult = {
  compatible: boolean;
  reason?: string;
  warning?: boolean;
};

export type CompatibilityContext = {
  selectedParts: Record<string, any>;
  totalWattage: number;
};

export function checkCompatibility(
  category: string,
  part: any,
  ctx: CompatibilityContext,
): CompatibilityResult {
  if (!part) return { compatible: true };

  const { selectedParts, totalWattage } = ctx;
  const { cpu, mobo, gpu, psu, case: pcCase, cooler } = selectedParts;

  // CPU vs MOBO (Socket)
  if (category === "mobo" && cpu && part.socket !== cpu.socket) {
    return { compatible: false, reason: `Requires ${cpu.socket} Socket` };
  }
  if (category === "cpu" && mobo && part.socket !== mobo.socket) {
    return { compatible: false, reason: `Requires ${mobo.socket} Board` };
  }

  // MOBO vs RAM (Type)
  if (category === "ram" && mobo && part.type !== mobo.ram_type) {
    return { compatible: false, reason: `Requires ${mobo.ram_type} Memory` };
  }
  if (
    category === "mobo" &&
    selectedParts.ram &&
    part.ram_type !== selectedParts.ram.type
  ) {
    return { compatible: false, reason: `Board needs ${part.ram_type} RAM` };
  }

  // GPU vs Case (Length)
  if (category === "case" && gpu && part.max_gpu_length < gpu.length) {
    return { compatible: false, reason: `GPU Too Long (${gpu.length}mm)` };
  }
  if (category === "gpu" && pcCase && part.length > pcCase.max_gpu_length) {
    return {
      compatible: false,
      reason: `Case Limit ${pcCase.max_gpu_length}mm`,
    };
  }

  // Cooler vs Case (Height)
  if (
    category === "case" &&
    cooler?.type === "air" &&
    part.max_cooler_height < cooler.height
  ) {
    return {
      compatible: false,
      reason: `Cooler Too High (${cooler.height}mm)`,
    };
  }
  if (
    category === "cooler" &&
    pcCase &&
    part.type === "air" &&
    part.height > pcCase.max_cooler_height
  ) {
    return {
      compatible: false,
      reason: `Case Limit ${pcCase.max_cooler_height}mm`,
    };
  }

  // Cooler Socket Support
  if (
    category === "cooler" &&
    cpu &&
    !part.socket_support.includes(cpu.socket)
  ) {
    return { compatible: false, reason: `Socket ${cpu.socket} Unsupported` };
  }

  // Case Form Factor Support
  if (
    category === "case" &&
    mobo &&
    !part.form_factor_support.includes(mobo.form_factor)
  ) {
    return { compatible: false, reason: `${mobo.form_factor} Unsupported` };
  }
  if (
    category === "mobo" &&
    pcCase &&
    !pcCase.form_factor_support.includes(part.form_factor)
  ) {
    return {
      compatible: false,
      reason: `Case doesn't support ${part.form_factor}`,
    };
  }

  // PSU Form Factor (SFX vs ATX)
  if (
    category === "case" &&
    psu &&
    part.psu_support !== psu.form_factor &&
    part.psu_support === "SFX" &&
    psu.form_factor === "ATX"
  ) {
    return { compatible: false, reason: "Requires SFX Power Supply" };
  }
  if (
    category === "psu" &&
    pcCase &&
    pcCase.psu_support === "SFX" &&
    part.form_factor === "ATX"
  ) {
    return { compatible: false, reason: "Case requires SFX PSU" };
  }

  // PSU Margin Check (80% Rule)
  if (category === "psu") {
    const marginThreshold = part.wattage * 0.8;
    if (totalWattage > part.wattage) {
      return {
        compatible: false,
        reason: `System Draw Exceeds PSU (${totalWattage}W)`,
      };
    }
    if (totalWattage > marginThreshold) {
      return {
        compatible: true,
        warning: true,
        reason: "Safety margin < 20%",
      };
    }
  }

  return { compatible: true };
}

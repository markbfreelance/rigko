"use server";

import { prisma } from "@/lib/prisma";

export async function getParts() {
  const [cpus, mobos, rams, gpus, storages, psus, coolers, cases] = await Promise.all([
    prisma.cpu.findMany(),
    prisma.motherboard.findMany(),
    prisma.ram.findMany(),
    prisma.gpu.findMany(),
    prisma.storage.findMany(),
    prisma.psu.findMany(),
    prisma.cooler.findMany(),
    prisma.case.findMany(),
  ]);

  return {
    cpu: cpus,
    mobo: mobos,
    ram: rams,
    gpu: gpus,
    storage: storages,
    psu: psus,
    cooler: coolers,
    case: cases,
  };
}

export async function getPeripherals() {
  const peripherals = await prisma.peripheral.findMany();
  
  // Group by category to match the expected structure
  const grouped: Record<string, any[]> = {};
  
  peripherals.forEach((p) => {
    if (!grouped[p.category]) {
      grouped[p.category] = [];
    }
    
    // Merge specs back into the object to match the original structure
    const { specs, ...rest } = p;
    grouped[p.category].push({
      ...rest,
      ...(specs as object),
    });
  });
  
  return grouped;
}

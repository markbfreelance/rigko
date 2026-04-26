import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

const PARTS = {
  cpu: [
    { name: "Ryzen 5 3600", brand: "AMD", socket: "AM4", cores: 6, threads: 12, base_clock: 3.6, boost_clock: 4.2, tdp: 65, integrated_graphics: false, generation: "Ryzen 3000", ram_type: "DDR4", price: 5450 },
    { name: "Ryzen 5 5600", brand: "AMD", socket: "AM4", cores: 6, threads: 12, base_clock: 3.5, boost_clock: 4.4, tdp: 65, integrated_graphics: false, generation: "Ryzen 5000", ram_type: "DDR4", price: 7850 },
    { name: "Ryzen 7 5800X", brand: "AMD", socket: "AM4", cores: 8, threads: 16, base_clock: 3.8, boost_clock: 4.7, tdp: 105, integrated_graphics: false, generation: "Ryzen 5000", ram_type: "DDR4", price: 12450 },
    { name: "Ryzen 5 7600", brand: "AMD", socket: "AM5", cores: 6, threads: 12, base_clock: 3.8, boost_clock: 5.1, tdp: 65, integrated_graphics: true, generation: "Ryzen 7000", ram_type: "DDR5", price: 13200 },
    { name: "Ryzen 7 7700X", brand: "AMD", socket: "AM5", cores: 8, threads: 16, base_clock: 4.5, boost_clock: 5.4, tdp: 105, integrated_graphics: true, generation: "Ryzen 7000", ram_type: "DDR5", price: 21500 },
    { name: "Core i3-12100F", brand: "Intel", socket: "LGA1700", cores: 4, threads: 8, base_clock: 3.3, boost_clock: 4.3, tdp: 58, integrated_graphics: false, generation: "12th Gen", ram_type: "DDR4", price: 5200 },
    { name: "Core i5-12400F", brand: "Intel", socket: "LGA1700", cores: 6, threads: 12, base_clock: 2.5, boost_clock: 4.4, tdp: 65, integrated_graphics: false, generation: "12th Gen", ram_type: "DDR4", price: 7950 },
    { name: "Core i5-13400F", brand: "Intel", socket: "LGA1700", cores: 10, threads: 16, base_clock: 2.5, boost_clock: 4.6, tdp: 65, integrated_graphics: false, generation: "13th Gen", ram_type: "DDR5", price: 12800 },
    { name: "Core i7-12700K", brand: "Intel", socket: "LGA1700", cores: 12, threads: 20, base_clock: 3.6, boost_clock: 5.0, tdp: 125, integrated_graphics: true, generation: "12th Gen", ram_type: "DDR5", price: 18450 },
    { name: "Core i7-13700K", brand: "Intel", socket: "LGA1700", cores: 16, threads: 24, base_clock: 3.4, boost_clock: 5.4, tdp: 125, integrated_graphics: true, generation: "13th Gen", ram_type: "DDR5", price: 24500 },
  ],
  mobo: [
    { name: "MSI B450M PRO", brand: "MSI", socket: "AM4", chipset: "B450", form_factor: "mATX", ram_type: "DDR4", ram_slots: 2, max_ram: 64, pcie_version: "Gen3", m2_slots: 1, sata_ports: 4, wifi: false, price: 3850 },
    { name: "ASUS B550M-A", brand: "ASUS", socket: "AM4", chipset: "B550", form_factor: "mATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 2, sata_ports: 4, wifi: false, price: 5450 },
    { name: "Gigabyte X570 AORUS Elite", brand: "Gigabyte", socket: "AM4", chipset: "X570", form_factor: "ATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 2, sata_ports: 6, wifi: true, price: 12800 },
    { name: "ASUS TUF B650-PLUS", brand: "ASUS", socket: "AM5", chipset: "B650", form_factor: "ATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 3, sata_ports: 4, wifi: true, price: 14500 },
    { name: "MSI PRO B650M", brand: "MSI", socket: "AM5", chipset: "B650", form_factor: "mATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 2, sata_ports: 4, wifi: false, price: 9850 },
    { name: "Gigabyte B660M DS3H", brand: "Gigabyte", socket: "LGA1700", chipset: "B660", form_factor: "mATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 2, sata_ports: 4, wifi: false, price: 6200 },
    { name: "ASRock B760M Steel Legend", brand: "ASRock", socket: "LGA1700", chipset: "B760", form_factor: "mATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 3, sata_ports: 4, wifi: true, price: 10450 },
    { name: "ASUS PRIME Z790-P", brand: "ASUS", socket: "LGA1700", chipset: "Z790", form_factor: "ATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 4, sata_ports: 6, wifi: true, price: 14200 },
    { name: "MSI MAG B760 TOMAHAWK", brand: "MSI", socket: "LGA1700", chipset: "B760", form_factor: "ATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 3, sata_ports: 6, wifi: true, price: 12800 },
    { name: "Gigabyte H610M S2H", brand: "Gigabyte", socket: "LGA1700", chipset: "H610", form_factor: "mATX", ram_type: "DDR4", ram_slots: 2, max_ram: 64, pcie_version: "Gen3", m2_slots: 1, sata_ports: 4, wifi: false, price: 4200 },
  ],
  ram: [
    { name: "Corsair Vengeance LPX 16GB", brand: "Corsair", type: "DDR4", capacity: 16, speed: 3200, sticks: 2, cas_latency: 16, price: 2850 },
    { name: "Corsair Vengeance RGB 32GB", brand: "Corsair", type: "DDR4", capacity: 32, speed: 3600, sticks: 2, cas_latency: 18, price: 5450 },
    { name: "G.Skill Ripjaws V 16GB", brand: "G.Skill", type: "DDR4", capacity: 16, speed: 3000, sticks: 2, cas_latency: 16, price: 2650 },
    { name: "Kingston Fury Beast 16GB", brand: "Kingston", type: "DDR4", capacity: 16, speed: 3200, sticks: 2, cas_latency: 16, price: 3100 },
    { name: "G.Skill Trident Z RGB 32GB", brand: "G.Skill", type: "DDR4", capacity: 32, speed: 3600, sticks: 2, cas_latency: 18, price: 6200 },
    { name: "Corsair Vengeance 16GB DDR5", brand: "Corsair", type: "DDR5", capacity: 16, speed: 5200, sticks: 2, cas_latency: 40, price: 4850 },
    { name: "G.Skill Ripjaws S5 16GB", brand: "G.Skill", type: "DDR5", capacity: 16, speed: 6000, sticks: 2, cas_latency: 36, price: 5400 },
    { name: "Kingston Fury Beast 32GB DDR5", brand: "Kingston", type: "DDR5", capacity: 32, speed: 5600, sticks: 2, cas_latency: 40, price: 8200 },
    { name: "TeamGroup Delta RGB 32GB DDR5", brand: "TeamGroup", type: "DDR5", capacity: 32, speed: 6000, sticks: 2, cas_latency: 38, price: 7950 },
    { name: "Crucial 16GB DDR5", brand: "Crucial", type: "DDR5", capacity: 16, speed: 4800, sticks: 2, cas_latency: 40, price: 4200 },
  ],
  gpu: [
    { name: "GTX 1650", brand: "NVIDIA", vram: 4, length: 229, power_draw: 75, pcie_version: "Gen3", recommended_psu: 400, price: 7850 },
    { name: "RTX 3050", brand: "NVIDIA", vram: 8, length: 242, power_draw: 130, pcie_version: "Gen4", recommended_psu: 500, price: 14500 },
    { name: "RTX 3060", brand: "NVIDIA", vram: 12, length: 242, power_draw: 170, pcie_version: "Gen4", recommended_psu: 550, price: 18200 },
    { name: "RTX 4060", brand: "NVIDIA", vram: 8, length: 245, power_draw: 115, pcie_version: "Gen4", recommended_psu: 550, price: 19850 },
    { name: "RTX 4070", brand: "NVIDIA", vram: 12, length: 267, power_draw: 200, pcie_version: "Gen4", recommended_psu: 650, price: 38450 },
    { name: "RX 6500 XT", brand: "AMD", vram: 4, length: 240, power_draw: 107, pcie_version: "Gen4", recommended_psu: 400, price: 9200 },
    { name: "RX 6600", brand: "AMD", vram: 8, length: 267, power_draw: 132, pcie_version: "Gen4", recommended_psu: 500, price: 12800 },
    { name: "RX 6700 XT", brand: "AMD", vram: 12, length: 267, power_draw: 230, pcie_version: "Gen4", recommended_psu: 650, price: 21500 },
    { name: "RX 6800", brand: "AMD", vram: 16, length: 300, power_draw: 250, pcie_version: "Gen4", recommended_psu: 700, price: 28500 },
    { name: "RTX 4080", brand: "NVIDIA", vram: 16, length: 310, power_draw: 320, pcie_version: "Gen4", recommended_psu: 750, price: 72000 },
  ],
  storage: [
    { name: "Kingston A400 240GB", brand: "Kingston", type: "SSD", interface: "SATA", capacity: 240, read_speed: 500, write_speed: 450, price: 1250 },
    { name: "Samsung 870 EVO 1TB", brand: "Samsung", type: "SSD", interface: "SATA", capacity: 1000, read_speed: 560, write_speed: 530, price: 5450 },
    { name: "WD Blue 1TB HDD", brand: "Western Digital", type: "HDD", interface: "SATA", capacity: 1000, read_speed: 150, write_speed: 140, price: 2850 },
    { name: "Seagate Barracuda 2TB", brand: "Seagate", type: "HDD", interface: "SATA", capacity: 2000, read_speed: 220, write_speed: 200, price: 3450 },
    { name: "Samsung 970 EVO Plus 1TB", brand: "Samsung", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 3500, write_speed: 3300, price: 5800 },
    { name: "WD Black SN770 1TB", brand: "Western Digital", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 5150, write_speed: 4900, price: 6200 },
    { name: "Crucial P3 1TB", brand: "Crucial", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 3500, write_speed: 3000, price: 4200 },
    { name: "Samsung 980 Pro 2TB", brand: "Samsung", type: "SSD", interface: "NVMe", capacity: 2000, read_speed: 7000, write_speed: 5000, price: 10500 },
    { name: "WD Blue SN570 500GB", brand: "Western Digital", type: "SSD", interface: "NVMe", capacity: 500, read_speed: 3500, write_speed: 3000, price: 3100 },
    { name: "Seagate FireCuda 530 1TB", brand: "Seagate", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 7300, write_speed: 6900, price: 8450 },
  ],
  psu: [
    { name: "Corsair CV450", brand: "Corsair", wattage: 450, efficiency_rating: "80+ Bronze", modular: "none", form_factor: "ATX", price: 2450 },
    { name: "Corsair CV550", brand: "Corsair", wattage: 550, efficiency_rating: "80+ Bronze", modular: "none", form_factor: "ATX", price: 2950 },
    { name: "Cooler Master MWE 650", brand: "Cooler Master", wattage: 650, efficiency_rating: "80+ Bronze", modular: "semi", form_factor: "ATX", price: 3850 },
    { name: "Seasonic S12III 650", brand: "Seasonic", wattage: 650, efficiency_rating: "80+ Bronze", modular: "none", form_factor: "ATX", price: 3450 },
    { name: "Corsair RM750", brand: "Corsair", wattage: 750, efficiency_rating: "80+ Gold", modular: "full", form_factor: "ATX", price: 6450 },
    { name: "Seasonic Focus GX-750", brand: "Seasonic", wattage: 750, efficiency_rating: "80+ Gold", modular: "full", form_factor: "ATX", price: 7200 },
    { name: "EVGA 600 W1", brand: "EVGA", wattage: 600, efficiency_rating: "80+ White", modular: "none", form_factor: "ATX", price: 2850 },
    { name: "Thermaltake Toughpower 850W", brand: "Thermaltake", wattage: 850, efficiency_rating: "80+ Gold", modular: "full", form_factor: "ATX", price: 8450 },
    { name: "Corsair SF600", brand: "Corsair", wattage: 600, efficiency_rating: "80+ Gold", modular: "full", form_factor: "SFX", price: 7850 },
    { name: "SilverStone SX700", brand: "SilverStone", wattage: 700, efficiency_rating: "80+ Gold", modular: "full", form_factor: "SFX", price: 8900 },
  ],
  cooler: [
    { name: "Cooler Master Hyper 212", brand: "Cooler Master", type: "air", socket_support: "AM4, AM5, LGA1700", height: 159, price: 1850 },
    { name: "Deepcool AK400", brand: "Deepcool", type: "air", socket_support: "AM4, AM5, LGA1700", height: 155, price: 1450 },
    { name: "Noctua NH-D15", brand: "Noctua", type: "air", socket_support: "AM4, AM5, LGA1700", height: 165, price: 5450 },
    { name: "be quiet! Pure Rock 2", brand: "be quiet!", type: "air", socket_support: "AM4, AM5, LGA1700", height: 155, price: 2150 },
    { name: "Cryorig H7", brand: "Cryorig", type: "air", socket_support: "AM4, LGA1700", height: 145, price: 1800 },
    { name: "NZXT Kraken X53", brand: "NZXT", type: "liquid", socket_support: "AM4, AM5, LGA1700", radiator_size: 240, price: 7850 },
    { name: "Corsair H100i", brand: "Corsair", type: "liquid", socket_support: "AM4, AM5, LGA1700", radiator_size: 240, price: 8200 },
    { name: "NZXT Kraken X63", brand: "NZXT", type: "liquid", socket_support: "AM4, AM5, LGA1700", radiator_size: 280, price: 8900 },
    { name: "Arctic Liquid Freezer II 360", brand: "Arctic", type: "liquid", socket_support: "AM4, AM5, LGA1700", radiator_size: 360, price: 8450 },
    { name: "Cooler Master ML240L", brand: "Cooler Master", type: "liquid", socket_support: "AM4, AM5, LGA1700", radiator_size: 240, price: 4200 },
  ],
  case: [
    { name: "NZXT H510", brand: "NZXT", form_factor_support: "ATX, mATX, ITX", max_gpu_length: 381, max_cooler_height: 165, psu_support: "ATX", fan_slots: 4, price: 4200 },
    { name: "NZXT H5 Flow", brand: "NZXT", form_factor_support: "ATX, mATX, ITX", max_gpu_length: 365, max_cooler_height: 165, psu_support: "ATX", fan_slots: 6, price: 4950 },
    { name: "Cooler Master Q300L", brand: "Cooler Master", form_factor_support: "mATX, ITX", max_gpu_length: 360, max_cooler_height: 159, psu_support: "ATX", fan_slots: 6, price: 2850 },
    { name: "Corsair 4000D Airflow", brand: "Corsair", form_factor_support: "ATX, mATX, ITX", max_gpu_length: 360, max_cooler_height: 170, psu_support: "ATX", fan_slots: 6, price: 5450 },
    { name: "Phanteks P300A", brand: "Phanteks", form_factor_support: "ATX, mATX, ITX", max_gpu_length: 355, max_cooler_height: 160, psu_support: "ATX", fan_slots: 4, price: 3850 },
    { name: "Lian Li Lancool 215", brand: "Lian Li", form_factor_support: "ATX, mATX, ITX", max_gpu_length: 370, max_cooler_height: 166, psu_support: "ATX", fan_slots: 6, price: 5800 },
    { name: "Fractal Design Meshify C", brand: "Fractal Design", form_factor_support: "ATX, mATX, ITX", max_gpu_length: 315, max_cooler_height: 170, psu_support: "ATX", fan_slots: 7, price: 5200 },
    { name: "Thermaltake Versa H18", brand: "Thermaltake", form_factor_support: "mATX, ITX", max_gpu_length: 350, max_cooler_height: 155, psu_support: "ATX", fan_slots: 5, price: 2450 },
    { name: "SilverStone SG13", brand: "SilverStone", form_factor_support: "ITX", max_gpu_length: 266, max_cooler_height: 61, psu_support: "SFX", fan_slots: 2, price: 3100 },
    { name: "NZXT H210", brand: "NZXT", form_factor_support: "ITX", max_gpu_length: 325, max_cooler_height: 165, psu_support: "SFX", fan_slots: 4, price: 4450 },
  ],
};

const PERIPHERALS = {
  monitor: [
    { name: "LG 24MK600M", brand: "LG", price: 7200, specs: { size: 24, resolution: "1080p", refresh_rate: 75, panel: "IPS" } },
    { name: "LG 27GP850-B", brand: "LG", price: 22500, specs: { size: 27, resolution: "1440p", refresh_rate: 180, panel: "Nano IPS" } },
    { name: "Samsung Odyssey G5", brand: "Samsung", price: 17800, specs: { size: 27, resolution: "1440p", refresh_rate: 165, panel: "VA" } },
    { name: "ASUS TUF VG27AQ", brand: "ASUS", price: 19500, specs: { size: 27, resolution: "1440p", refresh_rate: 165, panel: "IPS" } },
    { name: "MSI MAG274QRF-QD", brand: "MSI", price: 21000, specs: { size: 27, resolution: "1440p", refresh_rate: 165, panel: "QD-IPS" } },
    { name: "Gigabyte M28U", brand: "Gigabyte", price: 29500, specs: { size: 28, resolution: "4K", refresh_rate: 144, panel: "IPS" } },
  ],
  keyboard: [
    { name: "Redragon K552", brand: "Redragon", price: 1850, specs: { type: "Mechanical", switches: "Red", layout: "TKL", rgb: true } },
    { name: "Keychron K8", brand: "Keychron", price: 4200, specs: { type: "Mechanical", switches: "Gateron Brown", layout: "TKL", rgb: false } },
    { name: "Logitech G Pro X", brand: "Logitech", price: 6800, specs: { type: "Mechanical", switches: "GX Blue", layout: "TKL", rgb: true } },
    { name: "HyperX Alloy FPS", brand: "HyperX", price: 5200, specs: { type: "Mechanical", switches: "Cherry MX Red", layout: "TKL", rgb: false } },
    { name: "Ducky One 3", brand: "Ducky", price: 7500, specs: { type: "Mechanical", switches: "Cherry MX Brown", layout: "Full", rgb: true } },
    { name: "AKKO 3068B", brand: "AKKO", price: 3800, specs: { type: "Mechanical", switches: "CS Jelly Pink", layout: "65%", rgb: true } },
  ],
  mouse: [
    { name: "Logitech G102", brand: "Logitech", price: 1050, specs: { dpi: 8000, buttons: 6, weight: 85, wireless: false } },
    { name: "Razer DeathAdder V3", brand: "Razer", price: 3850, specs: { dpi: 30000, buttons: 6, weight: 59, wireless: false } },
    { name: "Logitech G Pro X Superlight 2", brand: "Logitech", price: 8500, specs: { dpi: 32000, buttons: 5, weight: 60, wireless: true } },
    { name: "Zowie EC2-C", brand: "Zowie", price: 4200, specs: { dpi: 3200, buttons: 5, weight: 73, wireless: false } },
    { name: "Pulsar X2", brand: "Pulsar", price: 5800, specs: { dpi: 26000, buttons: 6, weight: 52, wireless: true } },
    { name: "SteelSeries Aerox 3", brand: "SteelSeries", price: 4500, specs: { dpi: 18000, buttons: 6, weight: 68, wireless: true } },
  ],
  headset: [
    { name: "HyperX Cloud II", brand: "HyperX", price: 4500, specs: { driver: "53mm", connection: "USB", surround: "7.1" } },
    { name: "Logitech G435", brand: "Logitech", price: 4200, specs: { driver: "40mm", connection: "Wireless", surround: "None" } },
    { name: "SteelSeries Arctis Nova Pro", brand: "SteelSeries", price: 18500, specs: { driver: "40mm", connection: "Wireless", surround: "360°" } },
    { name: "Razer BlackShark V2 X", brand: "Razer", price: 3200, specs: { driver: "50mm", connection: "3.5mm", surround: "7.1" } },
    { name: "ASUS ROG Delta S", brand: "ASUS", price: 9500, specs: { driver: "50mm", connection: "USB-C", surround: "7.1" } },
    { name: "Audio-Technica ATH-GL3", brand: "Audio-Technica", price: 6800, specs: { driver: "45mm", connection: "3.5mm", surround: "None" } },
  ],
  speaker: [
    { name: "Logitech Z120", brand: "Logitech", price: 650, specs: { connection: "USB", power: "1.2W" } },
    { name: "Creative Pebble V3", brand: "Creative", price: 1850, specs: { connection: "USB-C/Bluetooth", power: "8W" } },
    { name: "Razer Nommo V2", brand: "Razer", price: 12500, specs: { connection: "USB/Bluetooth", power: "30W" } },
  ],
  webcam: [
    { name: "Logitech C270", brand: "Logitech", price: 1450, specs: { resolution: "720p", fps: 30 } },
    { name: "Logitech C922 PRO", brand: "Logitech", price: 5800, specs: { resolution: "1080p", fps: 60 } },
    { name: "Razer Kiyo Pro", brand: "Razer", price: 9500, specs: { resolution: "1080p/HDR", fps: 60 } },
  ],
};

async function main() {
  console.log("Cleaning up database...");
  await prisma.peripheral.deleteMany();
  await prisma.case.deleteMany();
  await prisma.cooler.deleteMany();
  await prisma.psu.deleteMany();
  await prisma.storage.deleteMany();
  await prisma.gpu.deleteMany();
  await prisma.ram.deleteMany();
  await prisma.motherboard.deleteMany();
  await prisma.cpu.deleteMany();

  console.log("Seeding CPUs...");
  for (const item of PARTS.cpu) {
    await prisma.cpu.create({ data: item });
  }

  console.log("Seeding Motherboards...");
  for (const item of PARTS.mobo) {
    await prisma.motherboard.create({ data: item });
  }

  console.log("Seeding RAMs...");
  for (const item of PARTS.ram) {
    await prisma.ram.create({ data: item });
  }

  console.log("Seeding GPUs...");
  for (const item of PARTS.gpu) {
    await prisma.gpu.create({ data: item });
  }

  console.log("Seeding Storages...");
  for (const item of PARTS.storage) {
    await prisma.storage.create({ data: item });
  }

  console.log("Seeding PSUs...");
  for (const item of PARTS.psu) {
    await prisma.psu.create({ data: item });
  }

  console.log("Seeding Coolers...");
  for (const item of PARTS.cooler) {
    await prisma.cooler.create({ data: item });
  }

  console.log("Seeding Cases...");
  for (const item of PARTS.case) {
    await prisma.case.create({ data: item });
  }

  console.log("Seeding Peripherals...");
  for (const [category, items] of Object.entries(PERIPHERALS)) {
    for (const item of items) {
      await prisma.peripheral.create({
        data: {
          category,
          name: item.name,
          brand: item.brand,
          price: item.price,
          specs: item.specs as any,
        },
      });
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

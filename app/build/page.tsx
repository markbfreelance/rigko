"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Header from "../components/header";
import Footer from "../components/footer";
import HardwareDeck from "../components/hardware-deck";


// Mock Data with Master Schema Technical Fields
const CATEGORIES = [
  { id: "cpu", name: "procie", icon: "solar:cpu-bold" },
  { id: "mobo", name: "mobo", icon: "solar:server-bold" },
  { id: "ram", name: "ram", icon: "solar:graph-bold" },
  { id: "gpu", name: "gpu", icon: "ph:graphics-card-fill" },
  { id: "storage", name: "storage", icon: "solar:ssd-round-bold" },
  { id: "psu", name: "psu", icon: "solar:plug-circle-bold" },
  { id: "case", name: "case", icon: "solar:case-bold" },
  { id: "cooler", name: "cooling", icon: "solar:snowflake-bold" },
];

const PERIPHERAL_CATEGORIES = [
  { id: "monitor", name: "monitor", icon: "solar:monitor-bold-duotone" },
  { id: "keyboard", name: "keyboard", icon: "solar:keyboard-bold-duotone" },
  { id: "mouse", name: "mouse", icon: "solar:mouse-bold-duotone" },
  { id: "headset", name: "headset", icon: "solar:headphones-square-bold-duotone" },
  { id: "speaker", name: "speaker", icon: "solar:speaker-bold-duotone" },
  { id: "webcam", name: "webcam", icon: "solar:videocamera-bold-duotone" },
];

const PARTS: Record<string, any[]> = {
  cpu: [
    { id: "cpu-1", name: "Ryzen 5 3600", brand: "AMD", socket: "AM4", cores: 6, threads: 12, base_clock: 3.6, boost_clock: 4.2, tdp: 65, integrated_graphics: false, generation: "Ryzen 3000", ram_type: "DDR4", price: 5450 },
    { id: "cpu-2", name: "Ryzen 5 5600", brand: "AMD", socket: "AM4", cores: 6, threads: 12, base_clock: 3.5, boost_clock: 4.4, tdp: 65, integrated_graphics: false, generation: "Ryzen 5000", ram_type: "DDR4", price: 7850 },
    { id: "cpu-3", name: "Ryzen 7 5800X", brand: "AMD", socket: "AM4", cores: 8, threads: 16, base_clock: 3.8, boost_clock: 4.7, tdp: 105, integrated_graphics: false, generation: "Ryzen 5000", ram_type: "DDR4", price: 12450 },
    { id: "cpu-4", name: "Ryzen 5 7600", brand: "AMD", socket: "AM5", cores: 6, threads: 12, base_clock: 3.8, boost_clock: 5.1, tdp: 65, integrated_graphics: true, generation: "Ryzen 7000", ram_type: "DDR5", price: 13200 },
    { id: "cpu-5", name: "Ryzen 7 7700X", brand: "AMD", socket: "AM5", cores: 8, threads: 16, base_clock: 4.5, boost_clock: 5.4, tdp: 105, integrated_graphics: true, generation: "Ryzen 7000", ram_type: "DDR5", price: 21500 },
    { id: "cpu-6", name: "Core i3-12100F", brand: "Intel", socket: "LGA1700", cores: 4, threads: 8, base_clock: 3.3, boost_clock: 4.3, tdp: 58, integrated_graphics: false, generation: "12th Gen", ram_type: "DDR4", price: 5200 },
    { id: "cpu-7", name: "Core i5-12400F", brand: "Intel", socket: "LGA1700", cores: 6, threads: 12, base_clock: 2.5, boost_clock: 4.4, tdp: 65, integrated_graphics: false, generation: "12th Gen", ram_type: "DDR4", price: 7950 },
    { id: "cpu-8", name: "Core i5-13400F", brand: "Intel", socket: "LGA1700", cores: 10, threads: 16, base_clock: 2.5, boost_clock: 4.6, tdp: 65, integrated_graphics: false, generation: "13th Gen", ram_type: "DDR5", price: 12800 },
    { id: "cpu-9", name: "Core i7-12700K", brand: "Intel", socket: "LGA1700", cores: 12, threads: 20, base_clock: 3.6, boost_clock: 5.0, tdp: 125, integrated_graphics: true, generation: "12th Gen", ram_type: "DDR5", price: 18450 },
    { id: "cpu-10", name: "Core i7-13700K", brand: "Intel", socket: "LGA1700", cores: 16, threads: 24, base_clock: 3.4, boost_clock: 5.4, tdp: 125, integrated_graphics: true, generation: "13th Gen", ram_type: "DDR5", price: 24500 }
  ],
  mobo: [
    { id: "mobo-1", name: "MSI B450M PRO", brand: "MSI", socket: "AM4", chipset: "B450", form_factor: "mATX", ram_type: "DDR4", ram_slots: 2, max_ram: 64, pcie_version: "Gen3", m2_slots: 1, sata_ports: 4, wifi: false, price: 3850 },
    { id: "mobo-2", name: "ASUS B550M-A", brand: "ASUS", socket: "AM4", chipset: "B550", form_factor: "mATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 2, sata_ports: 4, wifi: false, price: 5450 },
    { id: "mobo-3", name: "Gigabyte X570 AORUS Elite", brand: "Gigabyte", socket: "AM4", chipset: "X570", form_factor: "ATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 2, sata_ports: 6, wifi: true, price: 12800 },
    { id: "mobo-4", name: "ASUS TUF B650-PLUS", brand: "ASUS", socket: "AM5", chipset: "B650", form_factor: "ATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 3, sata_ports: 4, wifi: true, price: 14500 },
    { id: "mobo-5", name: "MSI PRO B650M", brand: "MSI", socket: "AM5", chipset: "B650", form_factor: "mATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 2, sata_ports: 4, wifi: false, price: 9850 },
    { id: "mobo-6", name: "Gigabyte B660M DS3H", brand: "Gigabyte", socket: "LGA1700", chipset: "B660", form_factor: "mATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 2, sata_ports: 4, wifi: false, price: 6200 },
    { id: "mobo-7", name: "ASRock B760M Steel Legend", brand: "ASRock", socket: "LGA1700", chipset: "B760", form_factor: "mATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 3, sata_ports: 4, wifi: true, price: 10450 },
    { id: "mobo-8", name: "ASUS PRIME Z790-P", brand: "ASUS", socket: "LGA1700", chipset: "Z790", form_factor: "ATX", ram_type: "DDR5", ram_slots: 4, max_ram: 128, pcie_version: "Gen5", m2_slots: 4, sata_ports: 6, wifi: true, price: 14200 },
    { id: "mobo-9", name: "MSI MAG B760 TOMAHAWK", brand: "MSI", socket: "LGA1700", chipset: "B760", form_factor: "ATX", ram_type: "DDR4", ram_slots: 4, max_ram: 128, pcie_version: "Gen4", m2_slots: 3, sata_ports: 6, wifi: true, price: 12800 },
    { id: "mobo-10", name: "Gigabyte H610M S2H", brand: "Gigabyte", socket: "LGA1700", chipset: "H610", form_factor: "mATX", ram_type: "DDR4", ram_slots: 2, max_ram: 64, pcie_version: "Gen3", m2_slots: 1, sata_ports: 4, wifi: false, price: 4200 }
  ],
  ram: [
    { id: "ram-1", name: "Corsair Vengeance LPX 16GB", brand: "Corsair", type: "DDR4", capacity: 16, speed: 3200, sticks: 2, cas_latency: 16, price: 2850 },
    { id: "ram-2", name: "Corsair Vengeance RGB 32GB", brand: "Corsair", type: "DDR4", capacity: 32, speed: 3600, sticks: 2, cas_latency: 18, price: 5450 },
    { id: "ram-3", name: "G.Skill Ripjaws V 16GB", brand: "G.Skill", type: "DDR4", capacity: 16, speed: 3000, sticks: 2, cas_latency: 16, price: 2650 },
    { id: "ram-4", name: "Kingston Fury Beast 16GB", brand: "Kingston", type: "DDR4", capacity: 16, speed: 3200, sticks: 2, cas_latency: 16, price: 3100 },
    { id: "ram-5", name: "G.Skill Trident Z RGB 32GB", brand: "G.Skill", type: "DDR4", capacity: 32, speed: 3600, sticks: 2, cas_latency: 18, price: 6200 },
    { id: "ram-6", name: "Corsair Vengeance 16GB DDR5", brand: "Corsair", type: "DDR5", capacity: 16, speed: 5200, sticks: 2, cas_latency: 40, price: 4850 },
    { id: "ram-7", name: "G.Skill Ripjaws S5 16GB", brand: "G.Skill", type: "DDR5", capacity: 16, speed: 6000, sticks: 2, cas_latency: 36, price: 5400 },
    { id: "ram-8", name: "Kingston Fury Beast 32GB DDR5", brand: "Kingston", type: "DDR5", capacity: 32, speed: 5600, sticks: 2, cas_latency: 40, price: 8200 },
    { id: "ram-9", name: "TeamGroup Delta RGB 32GB DDR5", brand: "TeamGroup", type: "DDR5", capacity: 32, speed: 6000, sticks: 2, cas_latency: 38, price: 7950 },
    { id: "ram-10", name: "Crucial 16GB DDR5", brand: "Crucial", type: "DDR5", capacity: 16, speed: 4800, sticks: 2, cas_latency: 40, price: 4200 }
  ],
  gpu: [
    { id: "gpu-1", name: "GTX 1650", brand: "NVIDIA", vram: 4, length: 229, power_draw: 75, pcie_version: "Gen3", recommended_psu: 400, price: 7850 },
    { id: "gpu-2", name: "RTX 3050", brand: "NVIDIA", vram: 8, length: 242, power_draw: 130, pcie_version: "Gen4", recommended_psu: 500, price: 14500 },
    { id: "gpu-3", name: "RTX 3060", brand: "NVIDIA", vram: 12, length: 242, power_draw: 170, pcie_version: "Gen4", recommended_psu: 550, price: 18200 },
    { id: "gpu-4", name: "RTX 4060", brand: "NVIDIA", vram: 8, length: 245, power_draw: 115, pcie_version: "Gen4", recommended_psu: 550, price: 19850 },
    { id: "gpu-5", name: "RTX 4070", brand: "NVIDIA", vram: 12, length: 267, power_draw: 200, pcie_version: "Gen4", recommended_psu: 650, price: 38450 },
    { id: "gpu-6", name: "RX 6500 XT", brand: "AMD", vram: 4, length: 240, power_draw: 107, pcie_version: "Gen4", recommended_psu: 400, price: 9200 },
    { id: "gpu-7", name: "RX 6600", brand: "AMD", vram: 8, length: 267, power_draw: 132, pcie_version: "Gen4", recommended_psu: 500, price: 12800 },
    { id: "gpu-8", name: "RX 6700 XT", brand: "AMD", vram: 12, length: 267, power_draw: 230, pcie_version: "Gen4", recommended_psu: 650, price: 21500 },
    { id: "gpu-9", name: "RX 6800", brand: "AMD", vram: 16, length: 300, power_draw: 250, pcie_version: "Gen4", recommended_psu: 700, price: 28500 },
    { id: "gpu-10", name: "RTX 4080", brand: "NVIDIA", vram: 16, length: 310, power_draw: 320, pcie_version: "Gen4", recommended_psu: 750, price: 72000 }
  ],
  storage: [
    { id: "storage-1", name: "Kingston A400 240GB", brand: "Kingston", type: "SSD", interface: "SATA", capacity: 240, read_speed: 500, write_speed: 450, price: 1250 },
    { id: "storage-2", name: "Samsung 870 EVO 1TB", brand: "Samsung", type: "SSD", interface: "SATA", capacity: 1000, read_speed: 560, write_speed: 530, price: 5450 },
    { id: "storage-3", name: "WD Blue 1TB HDD", brand: "Western Digital", type: "HDD", interface: "SATA", capacity: 1000, read_speed: 150, write_speed: 140, price: 2850 },
    { id: "storage-4", name: "Seagate Barracuda 2TB", brand: "Seagate", type: "HDD", interface: "SATA", capacity: 2000, read_speed: 220, write_speed: 200, price: 3450 },
    { id: "storage-5", name: "Samsung 970 EVO Plus 1TB", brand: "Samsung", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 3500, write_speed: 3300, price: 5800 },
    { id: "storage-6", name: "WD Black SN770 1TB", brand: "Western Digital", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 5150, write_speed: 4900, price: 6200 },
    { id: "storage-7", name: "Crucial P3 1TB", brand: "Crucial", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 3500, write_speed: 3000, price: 4200 },
    { id: "storage-8", name: "Samsung 980 Pro 2TB", brand: "Samsung", type: "SSD", interface: "NVMe", capacity: 2000, read_speed: 7000, write_speed: 5000, price: 10500 },
    { id: "storage-9", name: "WD Blue SN570 500GB", brand: "Western Digital", type: "SSD", interface: "NVMe", capacity: 500, read_speed: 3500, write_speed: 3000, price: 3100 },
    { id: "storage-10", name: "Seagate FireCuda 530 1TB", brand: "Seagate", type: "SSD", interface: "NVMe", capacity: 1000, read_speed: 7300, write_speed: 6900, price: 8450 }
  ],
  psu: [
    { id: "psu-1", name: "Corsair CV450", brand: "Corsair", wattage: 450, efficiency_rating: "80+ Bronze", modular: "none", form_factor: "ATX", price: 2450 },
    { id: "psu-2", name: "Corsair CV550", brand: "Corsair", wattage: 550, efficiency_rating: "80+ Bronze", modular: "none", form_factor: "ATX", price: 2950 },
    { id: "psu-3", name: "Cooler Master MWE 650", brand: "Cooler Master", wattage: 650, efficiency_rating: "80+ Bronze", modular: "semi", form_factor: "ATX", price: 3850 },
    { id: "psu-4", name: "Seasonic S12III 650", brand: "Seasonic", wattage: 650, efficiency_rating: "80+ Bronze", modular: "none", form_factor: "ATX", price: 3450 },
    { id: "psu-5", name: "Corsair RM750", brand: "Corsair", wattage: 750, efficiency_rating: "80+ Gold", modular: "full", form_factor: "ATX", price: 6450 },
    { id: "psu-6", name: "Seasonic Focus GX-750", brand: "Seasonic", wattage: 750, efficiency_rating: "80+ Gold", modular: "full", form_factor: "ATX", price: 7200 },
    { id: "psu-7", name: "EVGA 600 W1", brand: "EVGA", wattage: 600, efficiency_rating: "80+ White", modular: "none", form_factor: "ATX", price: 2850 },
    { id: "psu-8", name: "Thermaltake Toughpower 850W", brand: "Thermaltake", wattage: 850, efficiency_rating: "80+ Gold", modular: "full", form_factor: "ATX", price: 8450 },
    { id: "psu-9", name: "Corsair SF600", brand: "Corsair", wattage: 600, efficiency_rating: "80+ Gold", modular: "full", form_factor: "SFX", price: 7850 },
    { id: "psu-10", name: "SilverStone SX700", brand: "SilverStone", wattage: 700, efficiency_rating: "80+ Gold", modular: "full", form_factor: "SFX", price: 8900 }
  ],
  cooler: [
    { id: "cooler-1", name: "Cooler Master Hyper 212", brand: "Cooler Master", type: "air", socket_support: ["AM4", "AM5", "LGA1700"], height: 159, radiator_size: null, price: 1850 },
    { id: "cooler-2", name: "Deepcool AK400", brand: "Deepcool", type: "air", socket_support: ["AM4", "AM5", "LGA1700"], height: 155, radiator_size: null, price: 1450 },
    { id: "cooler-3", name: "Noctua NH-D15", brand: "Noctua", type: "air", socket_support: ["AM4", "AM5", "LGA1700"], height: 165, radiator_size: null, price: 5450 },
    { id: "cooler-4", name: "be quiet! Pure Rock 2", brand: "be quiet!", type: "air", socket_support: ["AM4", "AM5", "LGA1700"], height: 155, radiator_size: null, price: 2150 },
    { id: "cooler-5", name: "Cryorig H7", brand: "Cryorig", type: "air", socket_support: ["AM4", "LGA1700"], height: 145, radiator_size: null, price: 1800 },
    { id: "cooler-6", name: "NZXT Kraken X53", brand: "NZXT", type: "liquid", socket_support: ["AM4", "AM5", "LGA1700"], height: null, radiator_size: 240, price: 7850 },
    { id: "cooler-7", name: "Corsair H100i", brand: "Corsair", type: "liquid", socket_support: ["AM4", "AM5", "LGA1700"], height: null, radiator_size: 240, price: 8200 },
    { id: "cooler-8", name: "NZXT Kraken X63", brand: "NZXT", type: "liquid", socket_support: ["AM4", "AM5", "LGA1700"], height: null, radiator_size: 280, price: 8900 },
    { id: "cooler-9", name: "Arctic Liquid Freezer II 360", brand: "Arctic", type: "liquid", socket_support: ["AM4", "AM5", "LGA1700"], height: null, radiator_size: 360, price: 8450 },
    { id: "cooler-10", name: "Cooler Master ML240L", brand: "Cooler Master", type: "liquid", socket_support: ["AM4", "AM5", "LGA1700"], height: null, radiator_size: 240, price: 4200 }
  ],
  case: [
    { id: "case-1", name: "NZXT H510", brand: "NZXT", form_factor_support: ["ATX", "mATX", "ITX"], max_gpu_length: 381, max_cooler_height: 165, psu_support: "ATX", fan_slots: 4, price: 4200 },
    { id: "case-2", name: "NZXT H5 Flow", brand: "NZXT", form_factor_support: ["ATX", "mATX", "ITX"], max_gpu_length: 365, max_cooler_height: 165, psu_support: "ATX", fan_slots: 6, price: 4950 },
    { id: "case-3", name: "Cooler Master Q300L", brand: "Cooler Master", form_factor_support: ["mATX", "ITX"], max_gpu_length: 360, max_cooler_height: 159, psu_support: "ATX", fan_slots: 6, price: 2850 },
    { id: "case-4", name: "Corsair 4000D Airflow", brand: "Corsair", form_factor_support: ["ATX", "mATX", "ITX"], max_gpu_length: 360, max_cooler_height: 170, psu_support: "ATX", fan_slots: 6, price: 5450 },
    { id: "case-5", name: "Phanteks P300A", brand: "Phanteks", form_factor_support: ["ATX", "mATX", "ITX"], max_gpu_length: 355, max_cooler_height: 160, psu_support: "ATX", fan_slots: 4, price: 3850 },
    { id: "case-6", name: "Lian Li Lancool 215", brand: "Lian Li", form_factor_support: ["ATX", "mATX", "ITX"], max_gpu_length: 370, max_cooler_height: 166, psu_support: "ATX", fan_slots: 6, price: 5800 },
    { id: "case-7", name: "Fractal Design Meshify C", brand: "Fractal Design", form_factor_support: ["ATX", "mATX", "ITX"], max_gpu_length: 315, max_cooler_height: 170, psu_support: "ATX", fan_slots: 7, price: 5200 },
    { id: "case-8", name: "Thermaltake Versa H18", brand: "Thermaltake", form_factor_support: ["mATX", "ITX"], max_gpu_length: 350, max_cooler_height: 155, psu_support: "ATX", fan_slots: 5, price: 2450 },
    { id: "case-9", name: "SilverStone SG13", brand: "SilverStone", form_factor_support: ["ITX"], max_gpu_length: 266, max_cooler_height: 61, psu_support: "SFX", fan_slots: 2, price: 3100 },
    { id: "case-10", name: "NZXT H210", brand: "NZXT", form_factor_support: ["ITX"], max_gpu_length: 325, max_cooler_height: 165, psu_support: "SFX", fan_slots: 4, price: 4450 }
  ]
};

const PERIPHERALS: Record<string, any[]> = {
  monitor: [
    { id: "mon-1", name: "LG 24MK600M", brand: "LG", size: 24, resolution: "1080p", refresh_rate: 75, panel: "IPS", price: 7200 },
    { id: "mon-2", name: "LG 27GP850-B", brand: "LG", size: 27, resolution: "1440p", refresh_rate: 180, panel: "Nano IPS", price: 22500 },
    { id: "mon-3", name: "Samsung Odyssey G5", brand: "Samsung", size: 27, resolution: "1440p", refresh_rate: 165, panel: "VA", price: 17800 },
    { id: "mon-4", name: "ASUS TUF VG27AQ", brand: "ASUS", size: 27, resolution: "1440p", refresh_rate: 165, panel: "IPS", price: 19500 },
    { id: "mon-5", name: "MSI MAG274QRF-QD", brand: "MSI", size: 27, resolution: "1440p", refresh_rate: 165, panel: "QD-IPS", price: 21000 },
    { id: "mon-6", name: "Gigabyte M28U", brand: "Gigabyte", size: 28, resolution: "4K", refresh_rate: 144, panel: "IPS", price: 29500 },
  ],
  keyboard: [
    { id: "kb-1", name: "Redragon K552", brand: "Redragon", type: "Mechanical", switches: "Red", layout: "TKL", rgb: true, price: 1850 },
    { id: "kb-2", name: "Keychron K8", brand: "Keychron", type: "Mechanical", switches: "Gateron Brown", layout: "TKL", rgb: false, price: 4200 },
    { id: "kb-3", name: "Logitech G Pro X", brand: "Logitech", type: "Mechanical", switches: "GX Blue", layout: "TKL", rgb: true, price: 6800 },
    { id: "kb-4", name: "HyperX Alloy FPS", brand: "HyperX", type: "Mechanical", switches: "Cherry MX Red", layout: "TKL", rgb: false, price: 5200 },
    { id: "kb-5", name: "Ducky One 3", brand: "Ducky", type: "Mechanical", switches: "Cherry MX Brown", layout: "Full", rgb: true, price: 7500 },
    { id: "kb-6", name: "AKKO 3068B", brand: "AKKO", type: "Mechanical", switches: "CS Jelly Pink", layout: "65%", rgb: true, price: 3800 },
  ],
  mouse: [
    { id: "ms-1", name: "Logitech G102", brand: "Logitech", dpi: 8000, buttons: 6, weight: 85, wireless: false, price: 1050 },
    { id: "ms-2", name: "Razer DeathAdder V3", brand: "Razer", dpi: 30000, buttons: 6, weight: 59, wireless: false, price: 3850 },
    { id: "ms-3", name: "Logitech G Pro X Superlight 2", brand: "Logitech", dpi: 32000, buttons: 5, weight: 60, wireless: true, price: 8500 },
    { id: "ms-4", name: "Zowie EC2-C", brand: "Zowie", dpi: 3200, buttons: 5, weight: 73, wireless: false, price: 4200 },
    { id: "ms-5", name: "Pulsar X2", brand: "Pulsar", dpi: 26000, buttons: 6, weight: 52, wireless: true, price: 5800 },
    { id: "ms-6", name: "SteelSeries Aerox 3", brand: "SteelSeries", dpi: 18000, buttons: 6, weight: 68, wireless: true, price: 4500 },
  ],
  headset: [
    { id: "hs-1", name: "HyperX Cloud II", brand: "HyperX", driver: "53mm", connection: "USB", surround: "7.1", price: 4500 },
    { id: "hs-2", name: "Logitech G435", brand: "Logitech", driver: "40mm", connection: "Wireless", surround: "None", price: 4200 },
    { id: "hs-3", name: "SteelSeries Arctis Nova Pro", brand: "SteelSeries", driver: "40mm", connection: "Wireless", surround: "360°", price: 18500 },
    { id: "hs-4", name: "Razer BlackShark V2 X", brand: "Razer", driver: "50mm", connection: "3.5mm", surround: "7.1", price: 3200 },
    { id: "hs-5", name: "ASUS ROG Delta S", brand: "ASUS", driver: "50mm", connection: "USB-C", surround: "7.1", price: 9500 },
    { id: "hs-6", name: "Audio-Technica ATH-GL3", brand: "Audio-Technica", driver: "45mm", connection: "3.5mm", surround: "None", price: 6800 },
  ],
  speaker: [
    { id: "spk-1", name: "Logitech Z120", brand: "Logitech", connection: "USB", power: "1.2W", price: 650 },
    { id: "spk-2", name: "Creative Pebble V3", brand: "Creative", connection: "USB-C/Bluetooth", power: "8W", price: 1850 },
    { id: "spk-3", name: "Razer Nommo V2", brand: "Razer", connection: "USB/Bluetooth", power: "30W", price: 12500 },
  ],
  webcam: [
    { id: "cam-1", name: "Logitech C270", brand: "Logitech", resolution: "720p", fps: 30, price: 1450 },
    { id: "cam-2", name: "Logitech C922 PRO", brand: "Logitech", resolution: "1080p", fps: 60, price: 5800 },
    { id: "cam-3", name: "Razer Kiyo Pro", brand: "Razer", resolution: "1080p/HDR", fps: 60, price: 9500 },
  ],
};

export default function BuildPage() {
  const [activeCategory, setActiveCategory] = useState("cpu");
  const [selectedParts, setSelectedParts] = useState<Record<string, any>>({});
  const [selectedPeripherals, setSelectedPeripherals] = useState<Record<string, any>>({});
  const [activePeripheral, setActivePeripheral] = useState<string | null>(null);

  const [isHudOpen, setIsHudOpen] = useState(false);
  const [isSelectingMode, setIsSelectingMode] = useState(false);
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mobileConstraintsRef = useRef<HTMLDivElement>(null);
  
  const totalPrice = Object.values(selectedParts).reduce((acc, part) => acc + (part?.price || 0), 0);
  const totalWattage = Object.values(selectedParts).reduce((acc, part) => {
     if (part?.tdp) return acc + part.tdp;
     if (part?.power_draw) return acc + part.power_draw;
     return acc;
  }, 0);

  const checkCompatibility = (category: string, part: any): { compatible: boolean; reason?: string; warning?: boolean } => {
    if (!part) return { compatible: true };

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
    if (category === "mobo" && selectedParts.ram && part.ram_type !== selectedParts.ram.type) {
       return { compatible: false, reason: `Board needs ${part.ram_type} RAM` };
    }

    // GPU vs Case (Length)
    if (category === "case" && gpu && part.max_gpu_length < gpu.length) {
      return { compatible: false, reason: `GPU Too Long (${gpu.length}mm)` };
    }
    if (category === "gpu" && pcCase && part.length > pcCase.max_gpu_length) {
      return { compatible: false, reason: `Case Limit ${pcCase.max_gpu_length}mm` };
    }

    // Cooler vs Case (Height)
    if (category === "case" && cooler?.type === "air" && part.max_cooler_height < cooler.height) {
      return { compatible: false, reason: `Cooler Too High (${cooler.height}mm)` };
    }
    if (category === "cooler" && pcCase && part.type === "air" && part.height > pcCase.max_cooler_height) {
       return { compatible: false, reason: `Case Limit ${pcCase.max_cooler_height}mm` };
    }

    // Cooler Socket Support
    if (category === "cooler" && cpu && !part.socket_support.includes(cpu.socket)) {
       return { compatible: false, reason: `Socket ${cpu.socket} Unsupported` };
    }

    // Case Form Factor Support
    if (category === "case" && mobo && !part.form_factor_support.includes(mobo.form_factor)) {
       return { compatible: false, reason: `${mobo.form_factor} Unsupported` };
    }
    if (category === "mobo" && pcCase && !pcCase.form_factor_support.includes(part.form_factor)) {
       return { compatible: false, reason: `Case doesn't support ${part.form_factor}` };
    }

    // PSU Form Factor (SFX vs ATX)
    if (category === "case" && psu && part.psu_support !== psu.form_factor && part.psu_support === "SFX" && psu.form_factor === "ATX") {
       return { compatible: false, reason: "Requires SFX Power Supply" };
    }
    if (category === "psu" && pcCase && pcCase.psu_support === "SFX" && part.form_factor === "ATX") {
       return { compatible: false, reason: "Case requires SFX PSU" };
    }

    // PSU Margin Check (80% Rule)
    if (category === "psu") {
      const marginThreshold = part.wattage * 0.8;
      if (totalWattage > part.wattage) {
        return { compatible: false, reason: `System Draw Exceeds PSU (${totalWattage}W)` };
      }
      if (totalWattage > marginThreshold) {
        return { compatible: true, warning: true, reason: "Safety margin < 20%" };
      }
    }

    return { compatible: true };
  };

  const handleSelect = (category: string, part: any) => {
    const { compatible } = checkCompatibility(category, part);
    if (!compatible) return;

    setSelectedParts(prev => ({
      ...prev,
      [category]: prev[category]?.id === part.id ? null : part
    }));

    // Auto-advance logic (Now default protocol)
    const isSelecting = selectedParts[category]?.id !== part.id;
    if (isSelecting && part) {
      const currentIndex = CATEGORIES.findIndex(c => c.id === category);
      if (currentIndex < CATEGORIES.length - 1) {
        setTimeout(() => setActiveCategory(CATEGORIES[currentIndex + 1].id), 300);
      }
      
      // On mobile, return to the master index after selection
      if (window.innerWidth < 1024) {
        setTimeout(() => setIsSelectingMode(false), 400); // Slight delay for feedback
      }
    }
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
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#050100] transition-colors overflow-x-hidden is-builder-page">
      <Header />
      
      <main className="pt-24 md:pt-28 pb-32 px-4 md:px-12 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
        
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
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] px-2 mb-4">SELECT YOUR PARTS</h2>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat, idx) => {
                      const selectedPart = selectedParts[cat.id];
                      const isExpanded = expandedCats.includes(cat.id);

                      return (
                        <div key={cat.id} className="w-full flex flex-col rounded-xl border border-black/5 dark:border-white/5 chassis-steel backdrop-blur-md transition-all overflow-hidden">
                          {/* Row Header */}
                          <div 
                            onClick={() => setExpandedCats(prev => isExpanded ? prev.filter(id => id !== cat.id) : [...prev, cat.id])}
                            className="w-full flex items-center justify-between p-4 cursor-pointer active:bg-black/5 dark:active:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                                selectedPart ? "bg-[#c2000b]/10 border-[#c2000b]/30 text-[#c2000b]" : "bg-black/10 dark:bg-white/5 border-white/5 text-gray-400"
                              }`}>
                                {typeof cat.icon === 'string' && <Icon icon={cat.icon} className="text-lg" />}
                              </div>
                              <div className="text-[11px] font-bold text-black dark:text-white uppercase tracking-tighter">
                                {cat.name}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {selectedPart && !isExpanded && (
                                <div className="text-[9px] font-black text-[#c2000b] uppercase truncate max-w-[120px]">{selectedPart.name}</div>
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
                                        <div className="text-[11px] font-black text-[#c2000b] uppercase leading-tight mb-1">{selectedPart.name}</div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                                          <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded border border-black/5 dark:border-white/5">
                                            {selectedPart.brand}
                                          </div>
                                          <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                                            {cat.id === "cpu" && `${selectedPart.cores}C/${selectedPart.threads}T // ${selectedPart.socket}`}
                                            {cat.id === "mobo" && `${selectedPart.chipset} // ${selectedPart.form_factor}`}
                                            {cat.id === "ram" && `${selectedPart.capacity}GB // ${selectedPart.speed}MHz`}
                                            {cat.id === "gpu" && `${selectedPart.vram}GB VRAM`}
                                            {cat.id === "storage" && `${selectedPart.capacity}GB // ${selectedPart.type}`}
                                            {cat.id === "psu" && `${selectedPart.wattage}W // ${selectedPart.efficiency_rating}`}
                                            {cat.id === "cooler" && `${selectedPart.type} COOLING`}
                                          </div>
                                          <div className="text-[8px] font-mono text-[#c2000b] font-bold uppercase">
                                            ₱{selectedPart.price.toLocaleString()}
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
                                    {selectedPart ? "CHANGE" : `ADD_${cat.name}`}
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
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] px-2 mb-4">PERIPHERALS</h2>
                  <div className="p-4 rounded-xl border border-[#e5e5e5] dark:border-[#222222] relative overflow-hidden isolate">
                    {/* Pegboard Background Layer */}
                    <div className="absolute inset-0 pegboard-mesh z-0 pointer-events-none"></div>
                    
                    <div className="relative z-10 grid grid-cols-3 gap-y-8 gap-x-4">
                      {PERIPHERAL_CATEGORIES.map((pcat) => {
                      const sel = selectedPeripherals[pcat.id];
                      const isOpen = activePeripheral === pcat.id;
                      return (
                        <button 
                          key={pcat.id} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePeripheral(isOpen ? null : pcat.id);
                          }}
                          className="flex flex-col items-center gap-2 group relative"
                        >
                          <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all shadow-md ${
                            sel 
                            ? "bg-[#c2000b] border-[#ff4d4d] text-white shadow-[0_0_15px_rgba(194,0,11,0.3)]" 
                            : "bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#222222] text-gray-400 group-hover:border-[#c2000b]/30"
                          }`}>
                            {/* Hook visual */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                            <Icon icon={pcat.icon} className="text-xl" />
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[7px] font-black uppercase tracking-widest text-black dark:text-white mb-0.5">{pcat.name}</span>
                            {sel && (
                              <span className="text-[6px] font-mono text-[#c2000b] font-bold uppercase leading-tight truncate w-full max-w-[52px]">
                                {sel.name}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Peripheral picker dropdown (Mobile) */}
                  <AnimatePresence>
                    {activePeripheral && (
                      <motion.div
                        key={`dropdown-${activePeripheral}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-4 rounded-2xl border border-[#c2000b] bg-white dark:bg-[#111] overflow-hidden shadow-xl"
                      >
                        <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#c2000b]">
                            {PERIPHERAL_CATEGORIES.find(p => p.id === activePeripheral)?.name}
                          </span>
                          <button onClick={() => setActivePeripheral(null)} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                            <Icon icon="solar:close-circle-linear" />
                          </button>
                        </div>
                        <div className="p-2 space-y-1.5 max-h-52 overflow-y-auto custom-scrollbar">
                          {(PERIPHERALS[activePeripheral] || []).map((item: any) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                setSelectedPeripherals(prev => ({ ...prev, [activePeripheral]: prev[activePeripheral]?.id === item.id ? null : item }));
                                setActivePeripheral(null);
                              }}
                              className={`w-full text-left p-2.5 rounded-xl border text-[10px] transition-all ${
                                selectedPeripherals[activePeripheral]?.id === item.id
                                  ? "bg-[#c2000b]/10 border-[#c2000b] text-[#c2000b]"
                                  : "border-black/5 dark:border-white/5 text-black dark:text-white hover:border-[#c2000b]/30"
                              }`}
                            >
                              <div className="font-black uppercase tracking-tighter">{item.name}</div>
                              <div className="font-mono text-gray-400 text-[8px] mt-0.5">
                                {activePeripheral === "monitor" && `${item.size}" · ${item.resolution} · ${item.refresh_rate}Hz · ${item.panel}`}
                                {activePeripheral === "keyboard" && `${item.type} · ${item.switches} · ${item.layout}`}
                                {activePeripheral === "mouse" && `${item.dpi} DPI · ${item.weight}g${item.wireless ? " · Wireless" : ""}`}
                                {activePeripheral === "headset" && `${item.driver} · ${item.connection} · ${item.surround || "Stereo"}`}
                                {activePeripheral === "speaker" && `${item.connection} · ${item.power}`}
                                {activePeripheral === "webcam" && `${item.resolution} · ${item.fps} FPS`}
                              </div>
                              <div className="text-[#c2000b] font-black mt-1">₱{item.price.toLocaleString()}</div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                  <span className="text-[10px] font-black uppercase tracking-widest">RETURN_TO_INDEX</span>
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
                      .filter(part => 
                        part.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (part.brand && part.brand.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .map((part, idx) => {
                      const { compatible, reason, warning } = checkCompatibility(activeCategory, part);
                      const isSelected = selectedParts[activeCategory]?.id === part.id;
                      
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
                                <span className="text-[10px] font-mono text-[#c2000b] font-bold">{part.brand}</span>
                                {!compatible && (
                                  <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[8px] font-bold uppercase tracking-tighter border border-orange-500/20">
                                    INCOMPATIBLE
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
                                  onClick={() => handleSelect(activeCategory, part)}
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
        
        {/* Desktop Layout (Maintains original side-by-side) */}
        <div className="hidden lg:flex flex-row gap-8 h-full">
          
          {/* Left: Category Sidebar (Desktop Only) */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-6 px-4">SELECT YOUR PARTS</h2>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all border group ${
                    activeCategory === cat.id 
                    ? "bg-[#c2000b] text-white border-[#c2000b] shadow-lg shadow-[#c2000b]/20" 
                    : "bg-white dark:bg-[#111111] border-black/5 dark:border-white/5 text-gray-500 hover:border-[#c2000b]/50"
                  }`}
                >
                  {typeof cat.icon === 'string' && (
                    <Icon icon={cat.icon} className={`text-xl ${activeCategory === cat.id ? "text-white" : "text-[#c2000b]/60"}`} />
                  )}
                  <span className="text-xs font-bold uppercase tracking-tighter">{cat.name}</span>
                  {selectedParts[cat.id] && (
                    <Icon icon="solar:check-circle-bold" className={`ml-auto text-xl transition-colors ${activeCategory === cat.id ? "text-white" : "text-[#c2000b]"}`} />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-4 px-4">PERIPHERALS</h2>
              <div className="p-4 rounded-xl border border-[#e5e5e5] dark:border-[#222222] relative overflow-hidden isolate">
                {/* Pegboard Background Layer */}
                <div className="absolute inset-0 pegboard-mesh z-0 pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-3 gap-y-8 gap-x-2">
                  {PERIPHERAL_CATEGORIES.map((pcat) => {
                  const sel = selectedPeripherals[pcat.id];
                  const isOpen = activePeripheral === pcat.id;
                  return (
                    <button 
                      key={pcat.id} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePeripheral(isOpen ? null : pcat.id);
                      }}
                      className="flex flex-col items-center gap-2 group relative"
                    >
                      <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all shadow-md ${
                        sel 
                        ? "bg-[#c2000b] border-[#ff4d4d] text-white shadow-[0_0_15px_rgba(194,0,11,0.3)]" 
                        : "bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#222222] text-gray-400 group-hover:border-[#c2000b]/30"
                      }`}>
                        {/* Hook visual */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                        <Icon icon={pcat.icon} className="text-xl" />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-[7px] font-black uppercase tracking-widest text-black dark:text-white mb-0.5">{pcat.name}</span>
                        {sel && (
                          <span className="text-[6px] font-mono text-[#c2000b] font-bold uppercase leading-tight truncate w-full max-w-[52px]">
                            {sel.name}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Peripheral picker dropdown */}
              <AnimatePresence>
                {activePeripheral && (
                  <motion.div
                    key={`dropdown-desktop-${activePeripheral}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-3 rounded-2xl border border-[#c2000b] bg-white dark:bg-[#111] overflow-hidden shadow-xl"
                  >
                    <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#c2000b]">
                        {PERIPHERAL_CATEGORIES.find(p => p.id === activePeripheral)?.name}
                      </span>
                      <button onClick={() => setActivePeripheral(null)} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                        <Icon icon="solar:close-circle-linear" />
                      </button>
                    </div>
                    <div className="p-2 space-y-1.5 max-h-52 overflow-y-auto custom-scrollbar">
                      {activePeripheral && (PERIPHERALS[activePeripheral] || []).map((item: any) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedPeripherals(prev => ({ ...prev, [activePeripheral]: prev[activePeripheral]?.id === item.id ? null : item }));
                            setActivePeripheral(null);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border text-[10px] transition-all ${
                            selectedPeripherals[activePeripheral]?.id === item.id
                              ? "bg-[#c2000b]/10 border-[#c2000b] text-[#c2000b]"
                              : "border-black/5 dark:border-white/5 text-black dark:text-white hover:border-[#c2000b]/30"
                          }`}
                        >
                          <div className="font-black uppercase tracking-tighter">{item.name}</div>
                          <div className="font-mono text-gray-400 text-[8px] mt-0.5">
                            {activePeripheral === "monitor" && `${item.size}" · ${item.resolution} · ${item.refresh_rate}Hz · ${item.panel}`}
                            {activePeripheral === "keyboard" && `${item.type} · ${item.switches} · ${item.layout}`}
                            {activePeripheral === "mouse" && `${item.dpi} DPI · ${item.weight}g${item.wireless ? " · Wireless" : ""}`}
                            {activePeripheral === "headset" && `${item.driver} · ${item.connection} · ${item.surround || "Stereo"}`}
                            {activePeripheral === "speaker" && `${item.connection} · ${item.power}`}
                            {activePeripheral === "webcam" && `${item.resolution} · ${item.fps} FPS`}
                          </div>
                          <div className="text-[#c2000b] font-black mt-1">₱{item.price.toLocaleString()}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

          {/* Center: Part Catalog */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {(PARTS[activeCategory as keyof typeof PARTS] || [])
                  .filter(part => 
                    part.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    (part.brand && part.brand.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((part, idx) => {
                  const { compatible, reason, warning } = checkCompatibility(activeCategory, part);
                  const isSelected = selectedParts[activeCategory]?.id === part.id;
                  
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
                        ? "bg-gray-50 dark:bg-white/5 border-transparent opacity-40 grayscale cursor-not-allowed"
                        : warning
                        ? "bg-white dark:bg-[#111111] border-yellow-500/50 hover:border-yellow-500 shadow-lg shadow-yellow-500/5 transition-colors"
                        : "bg-white dark:bg-[#111111] border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20"
                      }`}
                    >
                      {/* Warning/Error Badges */}
                      {(!compatible || (warning && !isSelected)) && (
                        <div className="absolute inset-x-0 -top-3 z-20 flex justify-center">
                           <div className={`backdrop-blur-md text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border flex items-center gap-2 shadow-xl ${
                             !compatible ? "bg-black/90 border-red-500/50" : "bg-yellow-600/90 border-yellow-400/50"
                           }`}>
                              <Icon icon={!compatible ? "solar:danger-bold" : "solar:shield-warning-bold"} className={!compatible ? "text-[#c2000b]" : "text-white"} />
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
                             <div className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">Socket: {part.socket}</div>
                          )}
                          {part.form_factor && (
                             <div className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">Size: {part.form_factor}</div>
                          )}
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
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                           isSelected
                           ? "bg-[#c2000b] text-white"
                           : "bg-black/5 dark:bg-white/5 text-transparent"
                         }`}>
                           <Icon icon="solar:check-read-linear" className="text-lg" />
                         </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {!(PARTS[activeCategory as keyof typeof PARTS]) && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-[3rem] opacity-40">
                   <Icon icon="solar:ghost-bold" className="text-6xl mb-4" />
                   <p className="font-mono text-[10px] uppercase tracking-[0.4em]">Inventory_Empty // Restocking</p>
                </div>
              )}
            </div>
          </div>

          
          {/* Right: Live Assembly Preview (Desktop Only) */}
          <div className="hidden lg:block w-[400px] shrink-0">
           <div 
             className="sticky top-28 h-[calc(100vh-14rem)] flex flex-col group"
             style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))" }}
           >
               {/* Red Geometric Border (Underlay) */}
               <div 
                 className="absolute inset-0 bg-[#c2000b]/40 z-0"
                 style={{ 
                   clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 18px 70%, 18px 30%, 0% 25%)" 
                 }}
               ></div>

               {/* Black Cockpit Background (Main Layer) */}
               <div 
                 className="absolute inset-0 bg-white dark:bg-[#111111] overflow-hidden z-0"
                 style={{
                   clipPath: "polygon(2px 2px, calc(100% - 2px) 2px, calc(100% - 2px) calc(100% - 2px), 2px calc(100% - 2px), 2px 75%, 20px 70%, 20px 30%, 2px 25%)" 
                 }}
               >
                 <div className="absolute inset-0 chassis-mesh opacity-5"></div>
                 <div className="absolute inset-0 hardware-grid opacity-10"></div>
               </div>
               
               {/* Internal Content (Pushed inward to clear the notch) */}
               <div className="relative z-10 p-8 pl-12 h-full flex flex-col pointer-events-none">
                 
                 <div className="relative z-10 mb-4 shrink-0">
                   <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b]">ASSEMBLY DESK</h2>
                   <p className="text-[9px] font-mono text-gray-500 uppercase mt-1">Status: {totalPrice > 0 ? "IN_PROGRESS" : "IDLE"}</p>
                 </div>

                 <div className="flex-1 relative -mx-24 -my-16 pointer-events-auto">
                    <HardwareDeck 
                      activeIds={getActiveIds()} 
                      variant="build"
                      partNames={{
                        ...(selectedParts["case"]    ? { CHASSIS:    selectedParts["case"]!.name }    : {}),
                        ...(selectedParts["mobo"]    ? { MOBO:       selectedParts["mobo"]!.name }    : {}),
                        ...(selectedParts["cpu"]     ? { [selectedParts["cpu"]!.brand === "AMD" ? "RYZEN_CORE" : "INTEL_CORE"]: selectedParts["cpu"]!.name } : {}),
                        ...(selectedParts["gpu"]     ? { GRAPHICS:   selectedParts["gpu"]!.name }    : {}),
                        ...(selectedParts["ram"]     ? { [selectedParts["ram"]!.type === "DDR4" ? "RAM_1" : "RAM_2"]: selectedParts["ram"]!.name } : {}),
                        ...(selectedParts["psu"]     ? { ENERGY:     selectedParts["psu"]!.name }    : {}),
                        ...(selectedParts["storage"] ? { DATA_1:     selectedParts["storage"]!.name } : {}),
                        ...(selectedParts["cooler"]  ? { THERMAL:    selectedParts["cooler"]!.name }  : {}),
                      }}
                    />
                 </div>

                 {/* Parts Summary List */}
                 <div className="relative z-10 shrink-0 mt-2 mb-6 overflow-y-auto max-h-[140px] pr-2 custom-scrollbar border-t border-black/5 dark:border-white/5 pt-4 pointer-events-auto">
                    <div className="space-y-2">
                      {Object.entries(selectedParts).map(([catId, part]) => {
                        if (!part) return null;
                        const category = CATEGORIES.find(c => c.id === catId);
                        return (
                          <div key={catId} className="flex justify-between items-center text-[9px] font-mono group/item">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 dark:text-gray-500 uppercase w-16 shrink-0">{category?.name}</span>
                              <span className="text-black dark:text-white font-bold truncate max-w-[150px]">{part.name}</span>
                            </div>
                            <span className="text-[#c2000b] font-black shrink-0">₱{part.price.toLocaleString()}</span>
                          </div>
                        );
                      })}
                      {Object.values(selectedParts).filter(Boolean).length === 0 && (
                        <p className="text-[9px] font-mono text-gray-400 dark:text-gray-600 uppercase italic opacity-50">Empty_Manifest // Waiting_For_Input</p>
                      )}
                    </div>
                 </div>

                 <div className="relative z-10 pt-6 border-t border-black/5 dark:border-white/5 mt-auto shrink-0 pointer-events-auto">
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
        </div>

      </main>
      
      {/* Mobile Render HUD Drawer */}
      <AnimatePresence>
        {isHudOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHudOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1050] lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] z-[1100] lg:hidden flex flex-col"
              style={{ filter: "drop-shadow(-10px 0 20px rgba(0,0,0,0.5))" }}
            >
              <div className="relative w-full h-full flex flex-col group">
                {/* Red Geometric Border (Underlay) - Side Notch */}
                <div 
                  className="absolute inset-0 bg-[#c2000b] z-0"
                  style={{ 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 18px 70%, 18px 30%, 0% 25%)" 
                  }}
                ></div>

                {/* Black Cockpit Background (Main Layer) - Side Notch */}
                <div 
                  className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-[#121212] dark:to-[#080808] overflow-hidden z-0"
                  style={{
                    clipPath: "polygon(2px 0%, 100% 0%, 100% 100%, 2px 100%, 2px 75%, 20px 70%, 20px 30%, 2px 25%)" 
                  }}
                >
                  <div className="absolute inset-0 chassis-mesh opacity-5"></div>
                  <div className="absolute inset-0 hardware-grid opacity-10"></div>
                </div>

                {/* Drawer Content */}
                <div className="relative z-10 flex flex-col h-full pl-12 pr-6 pt-24 pb-12">
                   {/* Assembly Render Viewport - Strictly Contained Workstation */}
                   <div ref={mobileConstraintsRef} className="flex-1 relative ml-12 mb-12 mt-8 pl-24 pr-12 pb-16 touch-none">
                     <HardwareDeck 
                       activeIds={getActiveIds()} 
                       variant="build"
                       dragConstraints={mobileConstraintsRef}
                       partNames={{
                         ...(selectedParts["case"]    ? { CHASSIS:    selectedParts["case"]!.name }    : {}),
                         ...(selectedParts["mobo"]    ? { MOBO:       selectedParts["mobo"]!.name }    : {}),
                         ...(selectedParts["cpu"]     ? { [selectedParts["cpu"]!.brand === "AMD" ? "RYZEN_CORE" : "INTEL_CORE"]: selectedParts["cpu"]!.name } : {}),
                         ...(selectedParts["gpu"]     ? { GRAPHICS:   selectedParts["gpu"]!.name }    : {}),
                         ...(selectedParts["ram"]     ? { [selectedParts["ram"]!.type === "DDR4" ? "RAM_1" : "RAM_2"]: selectedParts["ram"]!.name } : {}),
                         ...(selectedParts["psu"]     ? { ENERGY:     selectedParts["psu"]!.name }    : {}),
                         ...(selectedParts["storage"] ? { DATA_1:     selectedParts["storage"]!.name } : {}),
                         ...(selectedParts["cooler"]  ? { THERMAL:    selectedParts["cooler"]!.name }  : {}),
                       }}
                     />
                   </div>

                   {/* List Summary */}
                   <div className="relative z-10 shrink-0 mt-2 mb-6 overflow-y-auto max-h-[140px] pr-2 custom-scrollbar border-t border-black/5 dark:border-white/5 pt-4">
                      <div className="space-y-2">
                        {Object.entries(selectedParts).map(([catId, part]) => {
                          if (!part) return null;
                          const category = CATEGORIES.find(c => c.id === catId);
                          return (
                            <div key={catId} className="flex justify-between items-center text-[9px] font-mono group/item">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 dark:text-gray-500 uppercase w-12 shrink-0">{category?.name}</span>
                                <span className="text-black dark:text-white font-bold truncate max-w-[120px]">{part.name}</span>
                              </div>
                              <span className="text-[#c2000b] font-black shrink-0 ml-2">₱{part.price.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </div>
                   </div>

                   {/* Total Block */}
                   <div className="relative z-10 pt-6 border-t border-black/5 dark:border-white/5 mt-auto shrink-0">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">Estimated_Total</span>
                        <span className="text-xl font-black text-black dark:text-white tracking-tighter">₱{totalPrice.toLocaleString()}</span>
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
                     <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b]">ASSEMBLY DESK</h2>
                     <p className="text-[9px] font-mono text-gray-500 uppercase mt-1">Status: {totalPrice > 0 ? "IN_PROGRESS" : "IDLE"}</p>
                   </div>
                   <button 
                     onClick={() => setIsHudOpen(false)}
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

      {/* Mobile HUD Toggle Button */}
      <div className="fixed bottom-24 right-4 z-160 lg:hidden">
         <button
           onClick={() => setIsHudOpen(true)}
           className="w-14 h-14 rounded-full bg-[#c2000b] text-white flex flex-col items-center justify-center shadow-2xl active:scale-95 transition-transform border-4 border-[#050100]"
         >
            <Icon icon="solar:globus-linear" className="text-xl mb-0.5 animate-spin-slow" />
            <span className="text-[7px] font-black uppercase tracking-tighter">HUD</span>
         </button>
      </div>

      {/* Persistent Build Terminal (Bottom Bar) */}
      <div className="fixed bottom-0 left-0 w-full z-150 chassis-steel backdrop-blur-md border-t border-black/10 dark:border-white/10 px-8 py-4">
        {/* Industrial Bezel Screws */}
        <div className="absolute top-2 left-2 hex-screw scale-75"></div>
        <div className="absolute top-2 right-2 hex-screw scale-75"></div>
        <div className="absolute bottom-2 left-2 hex-screw scale-75"></div>
        <div className="absolute bottom-2 right-2 hex-screw scale-75"></div>

        <div className="max-w-[1440px] mx-auto flex items-center justify-between relative z-10 gap-x-4">
          <div className="flex gap-6 md:gap-12 flex-1 min-w-0">
            <div className="min-w-0">
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">Items</div>
              <div className="text-sm md:text-base font-black text-black dark:text-white uppercase tracking-tighter">
                {Object.values(selectedParts).filter(Boolean).length}/{CATEGORIES.length}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">Energy</div>
              <div className="text-sm md:text-base font-black text-black dark:text-white uppercase tracking-tighter flex items-center gap-1 md:gap-2">
                {totalWattage}W
              </div>
            </div>
            <div className="hidden xs:block min-w-0">
              <div className="text-[9px] font-mono text-gray-500 uppercase mb-1">Total</div>
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
            <button className={`px-6 md:px-12 py-2.5 md:py-3 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest transition-all ${
              totalPrice > 0 
              ? "bg-[#c2000b] text-white shadow-xl shadow-[#c2000b]/30 hover:scale-105 active:scale-95" 
              : "bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed"
            }`}>
              {totalPrice > 0 ? "Finalize" : "Empty"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

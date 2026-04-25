import Link from "next/link";
import {
  Cpu,
  CircuitBoard,
  MemoryStick,
  Gpu,
  HardDrive,
  Plug,
  Box,
  Snowflake,
  Monitor,
  Keyboard,
  Hammer,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "Featured Builds — Rigko",
  description:
    "Curated 2026 PC builds with full parts breakdowns and Philippine peso pricing.",
};

type Part = {
  category: string;
  icon: LucideIcon;
  name: string;
  detail?: string;
  price: number;
};

type Build = {
  id: string;
  name: string;
  tagline: string;
  tier: string;
  target: string;
  highlights: string[];
  performance: { label: string; value: string }[];
  accent: string;
  parts: Part[];
  peripherals?: Part[];
};

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

const FEATURED_BUILDS: Build[] = [
  {
    id: "manila-sentry",
    name: "Manila Sentry",
    tagline: "Reliable 1080p workhorse for students and shift gamers.",
    tier: "Entry",
    target: "1080p / 60–144fps Esports",
    accent: "#10b981",
    highlights: [
      "DDR5 platform on AM5 — upgrade-ready through 2027",
      "PCIe 4.0 NVMe boot drive, 1 TB capacity",
      "Whisper-quiet single-tower air cooler",
    ],
    performance: [
      { label: "Valorant 1080p", value: "260+ fps avg" },
      { label: "CS2 1080p Low", value: "320+ fps avg" },
      { label: "Cyberpunk 1080p Med", value: "70 fps avg" },
    ],
    parts: [
      {
        category: "CPU",
        icon: Cpu,
        name: "AMD Ryzen 5 7500F",
        detail: "6C / 12T · AM5 · 65W",
        price: 9500,
      },
      {
        category: "Cooler",
        icon: Snowflake,
        name: "Thermalright Peerless Assassin 120 SE",
        detail: "Dual-tower air · 157mm",
        price: 2200,
      },
      {
        category: "Motherboard",
        icon: CircuitBoard,
        name: "MSI PRO B650M-A WiFi",
        detail: "mATX · DDR5 · Wi-Fi 6E",
        price: 9800,
      },
      {
        category: "Memory",
        icon: MemoryStick,
        name: "Kingston Fury Beast 32GB",
        detail: "2×16GB · DDR5-6000 CL36",
        price: 6400,
      },
      {
        category: "GPU",
        icon: Gpu,
        name: "NVIDIA GeForce RTX 5060 8GB",
        detail: "Blackwell · 145W · DLSS 4",
        price: 22500,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "WD Black SN770 1TB",
        detail: "PCIe 4.0 NVMe · 5,150 MB/s read",
        price: 4500,
      },
      {
        category: "PSU",
        icon: Plug,
        name: "MSI MAG A650BN",
        detail: "650W · 80+ Bronze",
        price: 3800,
      },
      {
        category: "Case",
        icon: Box,
        name: "Tecware Forge M",
        detail: "mATX · 3× ARGB fans included",
        price: 3200,
      },
    ],
    peripherals: [
      {
        category: "Monitor",
        icon: Monitor,
        name: "Xiaomi G24i 24\"",
        detail: "1080p · 180Hz IPS",
        price: 7800,
      },
      {
        category: "Keyboard + Mouse",
        icon: Keyboard,
        name: "Logitech G G213 + G102",
        detail: "Membrane RGB · 8K DPI optical",
        price: 3400,
      },
    ],
  },
  {
    id: "cebu-striker",
    name: "Cebu Striker",
    tagline: "1440p sweet-spot built around the new RTX 5060 Ti.",
    tier: "Mid-Range",
    target: "1440p High / Streaming Ready",
    accent: "#06b6d4",
    highlights: [
      "Zen 5 8-core efficiency, no e-cores to manage",
      "16GB VRAM headroom for modded titles and AI workloads",
      "Gen5 NVMe shaves 30% off level loads vs Gen4",
    ],
    performance: [
      { label: "Apex 1440p Comp", value: "240 fps avg" },
      { label: "Cyberpunk 1440p RT-Med + DLSS-Q", value: "110 fps avg" },
      { label: "Blender BMW", value: "1m 04s" },
    ],
    parts: [
      {
        category: "CPU",
        icon: Cpu,
        name: "AMD Ryzen 7 9700X",
        detail: "8C / 16T · Zen 5 · 65W",
        price: 22000,
      },
      {
        category: "Cooler",
        icon: Snowflake,
        name: "DeepCool LE520",
        detail: "240mm AIO · 3-yr warranty",
        price: 5200,
      },
      {
        category: "Motherboard",
        icon: CircuitBoard,
        name: "ASUS TUF Gaming B650-E WiFi",
        detail: "ATX · DDR5 · Wi-Fi 6E",
        price: 13500,
      },
      {
        category: "Memory",
        icon: MemoryStick,
        name: "G.Skill Trident Z5 Neo 32GB",
        detail: "2×16GB · DDR5-6000 CL30 EXPO",
        price: 7800,
      },
      {
        category: "GPU",
        icon: Gpu,
        name: "NVIDIA GeForce RTX 5060 Ti 16GB",
        detail: "Blackwell · 180W · DLSS 4 + FG",
        price: 31500,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "Crucial T500 2TB",
        detail: "PCIe 4.0 NVMe · 7,400 MB/s read",
        price: 9200,
      },
      {
        category: "PSU",
        icon: Plug,
        name: "Corsair RM750e (2024)",
        detail: "750W · 80+ Gold · ATX 3.1",
        price: 7600,
      },
      {
        category: "Case",
        icon: Box,
        name: "Lian Li LANCOOL 216",
        detail: "Mid-tower · 2× 160mm intake",
        price: 5800,
      },
    ],
    peripherals: [
      {
        category: "Monitor",
        icon: Monitor,
        name: "LG 27GP750 27\"",
        detail: "1440p · 180Hz · IPS",
        price: 18500,
      },
    ],
  },
  {
    id: "davao-apex",
    name: "Davao Apex",
    tagline: "Streaming-grade rig with the gaming king of Zen 5.",
    tier: "High-End",
    target: "1440p Ultra / 4K High",
    accent: "#c2000b",
    highlights: [
      "9800X3D delivers up to 25% lift in CPU-bound titles",
      "RTX 5070 Ti hits 1440p ultra with DLSS-Q ceilings",
      "ATX 3.1 PSU with native 12V-2x6 cable for one-cable GPU",
    ],
    performance: [
      { label: "Cyberpunk 1440p Ultra RT", value: "120 fps + DLSS-Q" },
      { label: "MSFS 2024 Ultra", value: "85 fps avg" },
      { label: "OBS x264 1080p60 Slow", value: "0 dropped frames" },
    ],
    parts: [
      {
        category: "CPU",
        icon: Cpu,
        name: "AMD Ryzen 7 9800X3D",
        detail: "8C / 16T · 96MB 3D V-Cache · 120W",
        price: 32000,
      },
      {
        category: "Cooler",
        icon: Snowflake,
        name: "ARCTIC Liquid Freezer III 360",
        detail: "360mm AIO · VRM fan",
        price: 9500,
      },
      {
        category: "Motherboard",
        icon: CircuitBoard,
        name: "Gigabyte X870 AORUS Elite WiFi7",
        detail: "ATX · USB4 · Wi-Fi 7",
        price: 19500,
      },
      {
        category: "Memory",
        icon: MemoryStick,
        name: "Corsair Vengeance RGB 32GB",
        detail: "2×16GB · DDR5-6400 CL32 EXPO",
        price: 8800,
      },
      {
        category: "GPU",
        icon: Gpu,
        name: "NVIDIA GeForce RTX 5070 Ti 16GB",
        detail: "Blackwell · 300W · DLSS 4 + MFG",
        price: 58500,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "Samsung 990 Pro 2TB",
        detail: "PCIe 4.0 NVMe · 7,450 MB/s read",
        price: 11500,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "Seagate IronWolf 4TB HDD",
        detail: "Bulk capture & archive · 5,400 RPM",
        price: 6200,
      },
      {
        category: "PSU",
        icon: Plug,
        name: "Seasonic Focus GX-850 ATX 3.1",
        detail: "850W · 80+ Gold · 12V-2x6",
        price: 9800,
      },
      {
        category: "Case",
        icon: Box,
        name: "Fractal Design North XL",
        detail: "Mid-tower · walnut + mesh",
        price: 11500,
      },
    ],
  },
  {
    id: "pinatubo-reactor",
    name: "Pinatubo Reactor",
    tagline: "Uncompromising 4K rig for creators and enthusiasts.",
    tier: "Enthusiast",
    target: "4K Ultra / Creator Workstation",
    accent: "#a855f7",
    highlights: [
      "9950X3D pairs 16-core throughput with V-Cache gaming gains",
      "ATX 3.1 1000W headroom for transients and OC",
      "64GB DDR5-6400 CL30 for AI inference + 8K timeline editing",
    ],
    performance: [
      { label: "Cyberpunk 4K PT", value: "85 fps + DLSS-P + MFG" },
      { label: "Premiere Pro 8K", value: "Smooth scrub at 1/2" },
      { label: "Stable Diffusion XL", value: "5.6 it/s @ 1024" },
    ],
    parts: [
      {
        category: "CPU",
        icon: Cpu,
        name: "AMD Ryzen 9 9950X3D",
        detail: "16C / 32T · 128MB cache · 170W",
        price: 44000,
      },
      {
        category: "Cooler",
        icon: Snowflake,
        name: "Corsair iCUE LINK H170i LCD",
        detail: "420mm AIO · LCD pump",
        price: 21500,
      },
      {
        category: "Motherboard",
        icon: CircuitBoard,
        name: "ASUS ROG Strix X870E-E Gaming WiFi",
        detail: "ATX · PCIe 5.0 x16 + 5.0 NVMe · USB4",
        price: 31500,
      },
      {
        category: "Memory",
        icon: MemoryStick,
        name: "G.Skill Trident Z5 Neo RGB 64GB",
        detail: "2×32GB · DDR5-6400 CL32 EXPO",
        price: 17500,
      },
      {
        category: "GPU",
        icon: Gpu,
        name: "NVIDIA GeForce RTX 5080 16GB",
        detail: "Blackwell · 360W · 4K-class DLSS 4",
        price: 82000,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "Crucial T705 2TB",
        detail: "PCIe 5.0 NVMe · 14,500 MB/s read",
        price: 14500,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "Samsung 990 Pro 4TB",
        detail: "PCIe 4.0 NVMe · scratch / project",
        price: 21500,
      },
      {
        category: "PSU",
        icon: Plug,
        name: "Corsair RM1000x SHIFT ATX 3.1",
        detail: "1000W · 80+ Gold · side-mount cables",
        price: 13500,
      },
      {
        category: "Case",
        icon: Box,
        name: "Lian Li O11 Vision Compact",
        detail: "Tri-pane · vertical GPU ready",
        price: 12500,
      },
    ],
    peripherals: [
      {
        category: "Monitor",
        icon: Monitor,
        name: "LG 32GS95UE 32\" QD-OLED",
        detail: "4K 240Hz / 1080p 480Hz dual-mode",
        price: 78500,
      },
    ],
  },
  {
    id: "apolaki-throne",
    name: "Apolaki Throne",
    tagline: "No-compromise halo build with the RTX 5090.",
    tier: "Halo",
    target: "8K Capture / 4K 240Hz / AI Lab",
    accent: "#f59e0b",
    highlights: [
      "32GB GDDR7 on the 5090 for local LLM + diffusion stacks",
      "Dual Gen5 NVMe in a delta-fan motherboard for sustained writes",
      "1300W ATX 3.1 platinum runs cool under sustained transients",
    ],
    performance: [
      { label: "Cyberpunk 4K PT", value: "120+ fps DLSS-Q + MFG x4" },
      { label: "Llama-3 70B Q4", value: "~28 tok/s local" },
      { label: "DaVinci 8K RAW", value: "Real-time grade" },
    ],
    parts: [
      {
        category: "CPU",
        icon: Cpu,
        name: "AMD Ryzen 9 9950X3D",
        detail: "16C / 32T · 128MB cache · 170W",
        price: 44000,
      },
      {
        category: "Cooler",
        icon: Snowflake,
        name: "Custom EK-Quantum 360mm Loop",
        detail: "Hardline · CPU + GPU block",
        price: 48500,
      },
      {
        category: "Motherboard",
        icon: CircuitBoard,
        name: "ASUS ROG Crosshair X870E Hero",
        detail: "ATX · 2× Gen5 M.2 · 10G LAN",
        price: 42500,
      },
      {
        category: "Memory",
        icon: MemoryStick,
        name: "G.Skill Trident Z5 Royal Neo 64GB",
        detail: "2×32GB · DDR5-7200 CL34 EXPO",
        price: 21500,
      },
      {
        category: "GPU",
        icon: Gpu,
        name: "NVIDIA GeForce RTX 5090 32GB",
        detail: "Blackwell · 575W · 12V-2x6",
        price: 158000,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "Samsung 9100 Pro 2TB",
        detail: "PCIe 5.0 NVMe · 14,800 MB/s read",
        price: 17500,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "Crucial T705 4TB",
        detail: "PCIe 5.0 NVMe · project drive",
        price: 28500,
      },
      {
        category: "PSU",
        icon: Plug,
        name: "Seasonic PRIME PX-1300 ATX 3.1",
        detail: "1300W · 80+ Platinum · 12V-2x6 native",
        price: 19500,
      },
      {
        category: "Case",
        icon: Box,
        name: "Hyte Y70 Touch",
        detail: "Touchscreen panel · vertical GPU",
        price: 22500,
      },
    ],
    peripherals: [
      {
        category: "Monitor",
        icon: Monitor,
        name: "Samsung Odyssey OLED G80SD 32\"",
        detail: "4K 240Hz QD-OLED · DP 2.1",
        price: 84500,
      },
    ],
  },
  {
    id: "boracay-compact",
    name: "Boracay Compact",
    tagline: "Carry-on ITX rig that punches at 1440p.",
    tier: "Compact",
    target: "1440p / Travel & LAN",
    accent: "#3b82f6",
    highlights: [
      "11 L volume — fits in a backpack panel",
      "SFX-L 850W keeps RTX 5070 fed under transients",
      "Dual 280mm radiator support if you go custom later",
    ],
    performance: [
      { label: "Valorant 1440p", value: "360+ fps avg" },
      { label: "Cyberpunk 1440p High", value: "95 fps + DLSS-Q" },
      { label: "Idle noise", value: "23 dBA @ 1m" },
    ],
    parts: [
      {
        category: "CPU",
        icon: Cpu,
        name: "AMD Ryzen 7 9700X",
        detail: "8C / 16T · 65W eco-mode",
        price: 22000,
      },
      {
        category: "Cooler",
        icon: Snowflake,
        name: "Noctua NH-L12Sx77 Black",
        detail: "Low-profile · 77mm height",
        price: 6800,
      },
      {
        category: "Motherboard",
        icon: CircuitBoard,
        name: "ASRock B650I Lightning WiFi",
        detail: "Mini-ITX · DDR5 · 2.5G LAN",
        price: 14500,
      },
      {
        category: "Memory",
        icon: MemoryStick,
        name: "Kingston Fury Renegade 32GB",
        detail: "2×16GB · DDR5-6400 CL32 EXPO",
        price: 8200,
      },
      {
        category: "GPU",
        icon: Gpu,
        name: "NVIDIA GeForce RTX 5070 12GB",
        detail: "Blackwell dual-fan · 250W",
        price: 42500,
      },
      {
        category: "Storage",
        icon: HardDrive,
        name: "WD Black SN850X 2TB",
        detail: "PCIe 4.0 NVMe · 7,300 MB/s read",
        price: 9800,
      },
      {
        category: "PSU",
        icon: Plug,
        name: "Corsair SF850L (2024)",
        detail: "SFX-L · 850W · 80+ Gold · ATX 3.1",
        price: 12500,
      },
      {
        category: "Case",
        icon: Box,
        name: "Fractal Design Terra",
        detail: "11 L · wood front · vertical GPU",
        price: 13500,
      },
    ],
  },
];

const buildTotal = (b: Build) =>
  b.parts.reduce((sum, p) => sum + p.price, 0) +
  (b.peripherals?.reduce((sum, p) => sum + p.price, 0) ?? 0);

export default function FeaturedBuildsPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#f4f4f4] dark:bg-[#050100] transition-colors">
      <main className="px-4 md:px-12 py-12 md:py-20 max-w-[1440px] mx-auto">
        {/* Page Header */}
        <header className="mb-12 md:mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16 bg-[#c2000b]" />
            <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
              Manifest // 2026.Q1
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black dark:text-white mb-4">
            Featured_Builds
          </h1>
          <p className="text-sm md:text-base font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
            Six curated rigs spec&apos;d for 2026 — from 1080p starters to RTX
            5090 halo machines. Every line item is sourced at current Philippine
            street prices, no upsell padding.
          </p>
        </header>

        {/* Builds */}
        <div className="space-y-10 md:space-y-14">
          {FEATURED_BUILDS.map((build) => {
            const total = buildTotal(build);
            return (
              <article
                key={build.id}
                className="relative rounded-3xl border border-black/5 dark:border-white/5 chassis-steel backdrop-blur-md overflow-hidden"
              >
                {/* Industrial screws */}
                <div className="absolute top-3 left-3 hex-screw scale-75" />
                <div className="absolute top-3 right-3 hex-screw scale-75" />
                <div className="absolute bottom-3 left-3 hex-screw scale-75" />
                <div className="absolute bottom-3 right-3 hex-screw scale-75" />

                <div className="relative p-6 md:p-10">
                  {/* Build Header */}
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-8 border-b border-black/5 dark:border-white/5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span
                          className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                          style={{ backgroundColor: build.accent }}
                        >
                          {build.tier}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          {build.target}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black dark:text-white mb-2">
                        {build.name}
                      </h2>
                      <p className="text-xs md:text-sm font-mono text-gray-500 dark:text-gray-400 max-w-2xl">
                        {build.tagline}
                      </p>
                    </div>
                    <div className="lg:text-right shrink-0">
                      <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Total_Cost
                      </div>
                      <div className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white">
                        {peso(total)}
                      </div>
                      <Link
                        href={`/build?preset=${build.id}`}
                        className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full bg-[#c2000b] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#c2000b]/20 hover:scale-105 active:scale-95 transition-transform"
                      >
                        <Hammer className="w-3.5 h-3.5" />
                        <span>Clone_Build</span>
                      </Link>
                    </div>
                  </div>

                  {/* Highlights + Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-4">
                        Why_This_Build
                      </h3>
                      <ul className="space-y-2.5">
                        {build.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-xs md:text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed"
                          >
                            <Zap className="text-[#c2000b] w-3.5 h-3.5 shrink-0 mt-1" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-4">
                        Performance_Targets
                      </h3>
                      <div className="space-y-2">
                        {build.performance.map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-4 text-xs md:text-sm font-mono py-2 border-b border-black/5 dark:border-white/5 last:border-b-0"
                          >
                            <span className="text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                              {p.label}
                            </span>
                            <span className="font-black text-black dark:text-white text-right">
                              {p.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Parts Manifest */}
                  <div className="mb-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-4">
                      Core_Parts_Manifest
                    </h3>
                    <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 overflow-hidden">
                      {build.parts.map((part, i) => {
                        const PartIcon = part.icon;
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-b border-black/5 dark:border-white/5 last:border-b-0"
                          >
                            <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-[#c2000b]/10 border border-[#c2000b]/20 text-[#c2000b]">
                              <PartIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">
                                {part.category}
                              </div>
                              <div className="text-sm font-bold text-black dark:text-white truncate">
                                {part.name}
                              </div>
                              {part.detail && (
                                <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-tighter truncate">
                                  {part.detail}
                                </div>
                              )}
                            </div>
                            <div className="text-sm md:text-base font-black text-[#c2000b] shrink-0">
                              {peso(part.price)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Peripherals (optional) */}
                  {build.peripherals && build.peripherals.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c2000b] mb-4">
                        Recommended_Peripherals
                      </h3>
                      <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-white/20 dark:bg-black/10 overflow-hidden">
                        {build.peripherals.map((part, i) => {
                          const PartIcon = part.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-b border-black/5 dark:border-white/5 last:border-b-0"
                            >
                              <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                                <PartIcon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">
                                  {part.category}
                                </div>
                                <div className="text-sm font-bold text-black dark:text-white truncate">
                                  {part.name}
                                </div>
                                {part.detail && (
                                  <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-tighter truncate">
                                    {part.detail}
                                  </div>
                                )}
                              </div>
                              <div className="text-sm md:text-base font-black text-gray-700 dark:text-gray-300 shrink-0">
                                {peso(part.price)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="mt-12 text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest text-center">
          Prices indicative · PHP · Verified Q1 2026 · Subject to retailer
          stock
        </p>
      </main>
    </div>
  );
}

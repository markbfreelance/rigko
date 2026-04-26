export type Part = {
  category: string;
  icon: string;
  name: string;
  detail?: string;
  price: number;
};

export type Build = {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  useCase: { label: string; icon: string };
  tier: string;
  target: string;
  highlights: string[];
  performance: { label: string; value: string }[];
  accent: string;
  parts: Part[];
  peripherals?: Part[];
};

export const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

export const buildPartsTotal = (b: Build) =>
  b.parts.reduce((sum, p) => sum + p.price, 0);

export const buildTotal = (b: Build) =>
  buildPartsTotal(b) +
  (b.peripherals?.reduce((sum, p) => sum + p.price, 0) ?? 0);

export const FEATURED_BUILDS: Build[] = [
  {
    id: "sentry",
    name: "Sentry-01",
    tagline: "Reliable 1080p workhorse for students and shift gamers.",
    bestFor: "Esports players who want 240+ fps on a budget.",
    useCase: { label: "Esports", icon: "lucide:crosshair" },
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
      { category: "CPU", icon: "lucide:cpu", name: "AMD Ryzen 5 7500F", detail: "6C / 12T · AM5 · 65W", price: 9500 },
      { category: "Cooler", icon: "lucide:snowflake", name: "Thermalright Peerless Assassin 120 SE", detail: "Dual-tower air · 157mm", price: 2200 },
      { category: "Motherboard", icon: "lucide:circuit-board", name: "MSI PRO B650M-A WiFi", detail: "mATX · DDR5 · Wi-Fi 6E", price: 9800 },
      { category: "Memory", icon: "lucide:memory-stick", name: "Kingston Fury Beast 32GB", detail: "2×16GB · DDR5-6000 CL36", price: 6400 },
      { category: "GPU", icon: "lucide:gpu", name: "NVIDIA GeForce RTX 5060 8GB", detail: "Blackwell · 145W · DLSS 4", price: 22500 },
      { category: "Storage", icon: "lucide:hard-drive", name: "WD Black SN770 1TB", detail: "PCIe 4.0 NVMe · 5,150 MB/s read", price: 4500 },
      { category: "PSU", icon: "lucide:plug", name: "MSI MAG A650BN", detail: "650W · 80+ Bronze", price: 3800 },
      { category: "Case", icon: "lucide:box", name: "Tecware Forge M", detail: "mATX · 3× ARGB fans included", price: 3200 },
    ],
    peripherals: [
      { category: "Monitor", icon: "lucide:monitor", name: 'Xiaomi G24i 24"', detail: "1080p · 180Hz IPS", price: 7800 },
      { category: "Keyboard + Mouse", icon: "lucide:keyboard", name: "Logitech G G213 + G102", detail: "Membrane RGB · 8K DPI optical", price: 3400 },
    ],
  },
  {
    id: "striker",
    name: "Striker-02",
    tagline: "1440p sweet-spot built around the new RTX 5060 Ti.",
    bestFor: "Mainstream gamers who want 1440p Ultra without overspending.",
    useCase: { label: "Sweet Spot", icon: "lucide:scale" },
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
      { category: "CPU", icon: "lucide:cpu", name: "AMD Ryzen 7 9700X", detail: "8C / 16T · Zen 5 · 65W", price: 22000 },
      { category: "Cooler", icon: "lucide:snowflake", name: "DeepCool LE520", detail: "240mm AIO · 3-yr warranty", price: 5200 },
      { category: "Motherboard", icon: "lucide:circuit-board", name: "ASUS TUF Gaming B650-E WiFi", detail: "ATX · DDR5 · Wi-Fi 6E", price: 13500 },
      { category: "Memory", icon: "lucide:memory-stick", name: "G.Skill Trident Z5 Neo 32GB", detail: "2×16GB · DDR5-6000 CL30 EXPO", price: 7800 },
      { category: "GPU", icon: "lucide:gpu", name: "NVIDIA GeForce RTX 5060 Ti 16GB", detail: "Blackwell · 180W · DLSS 4 + FG", price: 31500 },
      { category: "Storage", icon: "lucide:hard-drive", name: "Crucial T500 2TB", detail: "PCIe 4.0 NVMe · 7,400 MB/s read", price: 9200 },
      { category: "PSU", icon: "lucide:plug", name: "Corsair RM750e (2024)", detail: "750W · 80+ Gold · ATX 3.1", price: 7600 },
      { category: "Case", icon: "lucide:box", name: "Lian Li LANCOOL 216", detail: "Mid-tower · 2× 160mm intake", price: 5800 },
    ],
    peripherals: [
      { category: "Monitor", icon: "lucide:monitor", name: 'LG 27GP750 27"', detail: "1440p · 180Hz · IPS", price: 18500 },
    ],
  },
  {
    id: "apex",
    name: "Apex-03",
    tagline: "Streaming-grade rig with the gaming king of Zen 5.",
    bestFor: "Streamers who want zero dropped frames while gaming at 1440p Ultra.",
    useCase: { label: "Streamer", icon: "lucide:radio-tower" },
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
      { category: "CPU", icon: "lucide:cpu", name: "AMD Ryzen 7 9800X3D", detail: "8C / 16T · 96MB 3D V-Cache · 120W", price: 32000 },
      { category: "Cooler", icon: "lucide:snowflake", name: "ARCTIC Liquid Freezer III 360", detail: "360mm AIO · VRM fan", price: 9500 },
      { category: "Motherboard", icon: "lucide:circuit-board", name: "Gigabyte X870 AORUS Elite WiFi7", detail: "ATX · USB4 · Wi-Fi 7", price: 19500 },
      { category: "Memory", icon: "lucide:memory-stick", name: "Corsair Vengeance RGB 32GB", detail: "2×16GB · DDR5-6400 CL32 EXPO", price: 8800 },
      { category: "GPU", icon: "lucide:gpu", name: "NVIDIA GeForce RTX 5070 Ti 16GB", detail: "Blackwell · 300W · DLSS 4 + MFG", price: 58500 },
      { category: "Storage", icon: "lucide:hard-drive", name: "Samsung 990 Pro 2TB", detail: "PCIe 4.0 NVMe · 7,450 MB/s read", price: 11500 },
      { category: "Storage", icon: "lucide:hard-drive", name: "Seagate IronWolf 4TB HDD", detail: "Bulk capture & archive · 5,400 RPM", price: 6200 },
      { category: "PSU", icon: "lucide:plug", name: "Seasonic Focus GX-850 ATX 3.1", detail: "850W · 80+ Gold · 12V-2x6", price: 9800 },
      { category: "Case", icon: "lucide:box", name: "Fractal Design North XL", detail: "Mid-tower · walnut + mesh", price: 11500 },
    ],
  },
  {
    id: "reactor",
    name: "Reactor-04",
    tagline: "Uncompromising 4K rig for creators and enthusiasts.",
    bestFor: "4K creators editing video, rendering 3D, or running heavy workloads.",
    useCase: { label: "Creator", icon: "lucide:clapperboard" },
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
      { category: "CPU", icon: "lucide:cpu", name: "AMD Ryzen 9 9950X3D", detail: "16C / 32T · 128MB cache · 170W", price: 44000 },
      { category: "Cooler", icon: "lucide:snowflake", name: "Corsair iCUE LINK H170i LCD", detail: "420mm AIO · LCD pump", price: 21500 },
      { category: "Motherboard", icon: "lucide:circuit-board", name: "ASUS ROG Strix X870E-E Gaming WiFi", detail: "ATX · PCIe 5.0 x16 + 5.0 NVMe · USB4", price: 31500 },
      { category: "Memory", icon: "lucide:memory-stick", name: "G.Skill Trident Z5 Neo RGB 64GB", detail: "2×32GB · DDR5-6400 CL32 EXPO", price: 17500 },
      { category: "GPU", icon: "lucide:gpu", name: "NVIDIA GeForce RTX 5080 16GB", detail: "Blackwell · 360W · 4K-class DLSS 4", price: 82000 },
      { category: "Storage", icon: "lucide:hard-drive", name: "Crucial T705 2TB", detail: "PCIe 5.0 NVMe · 14,500 MB/s read", price: 14500 },
      { category: "Storage", icon: "lucide:hard-drive", name: "Samsung 990 Pro 4TB", detail: "PCIe 4.0 NVMe · scratch / project", price: 21500 },
      { category: "PSU", icon: "lucide:plug", name: "Corsair RM1000x SHIFT ATX 3.1", detail: "1000W · 80+ Gold · side-mount cables", price: 13500 },
      { category: "Case", icon: "lucide:box", name: "Lian Li O11 Vision Compact", detail: "Tri-pane · vertical GPU ready", price: 12500 },
    ],
    peripherals: [
      { category: "Monitor", icon: "lucide:monitor", name: 'LG 32GS95UE 32" QD-OLED', detail: "4K 240Hz / 1080p 480Hz dual-mode", price: 78500 },
    ],
  },
  {
    id: "monolith",
    name: "Monolith-05",
    tagline: "No-compromise halo build with the RTX 5090.",
    bestFor: "Local AI tinkerers and 4K maximalists who want the best of everything.",
    useCase: { label: "AI / Halo", icon: "lucide:brain" },
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
      { category: "CPU", icon: "lucide:cpu", name: "AMD Ryzen 9 9950X3D", detail: "16C / 32T · 128MB cache · 170W", price: 44000 },
      { category: "Cooler", icon: "lucide:snowflake", name: "Custom EK-Quantum 360mm Loop", detail: "Hardline · CPU + GPU block", price: 48500 },
      { category: "Motherboard", icon: "lucide:circuit-board", name: "ASUS ROG Crosshair X870E Hero", detail: "ATX · 2× Gen5 M.2 · 10G LAN", price: 42500 },
      { category: "Memory", icon: "lucide:memory-stick", name: "G.Skill Trident Z5 Royal Neo 64GB", detail: "2×32GB · DDR5-7200 CL34 EXPO", price: 21500 },
      { category: "GPU", icon: "lucide:gpu", name: "NVIDIA GeForce RTX 5090 32GB", detail: "Blackwell · 575W · 12V-2x6", price: 158000 },
      { category: "Storage", icon: "lucide:hard-drive", name: "Samsung 9100 Pro 2TB", detail: "PCIe 5.0 NVMe · 14,800 MB/s read", price: 17500 },
      { category: "Storage", icon: "lucide:hard-drive", name: "Crucial T705 4TB", detail: "PCIe 5.0 NVMe · project drive", price: 28500 },
      { category: "PSU", icon: "lucide:plug", name: "Seasonic PRIME PX-1300 ATX 3.1", detail: "1300W · 80+ Platinum · 12V-2x6 native", price: 19500 },
      { category: "Case", icon: "lucide:box", name: "Hyte Y70 Touch", detail: "Touchscreen panel · vertical GPU", price: 22500 },
    ],
    peripherals: [
      { category: "Monitor", icon: "lucide:monitor", name: 'Samsung Odyssey OLED G80SD 32"', detail: "4K 240Hz QD-OLED · DP 2.1", price: 84500 },
    ],
  },
  {
    id: "cube",
    name: "Cube-06",
    tagline: "Carry-on ITX rig that punches at 1440p.",
    bestFor: "LAN warriors and small-desk setups that still need RTX 5070 punch.",
    useCase: { label: "Compact", icon: "lucide:package" },
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
      { category: "CPU", icon: "lucide:cpu", name: "AMD Ryzen 7 9700X", detail: "8C / 16T · 65W eco-mode", price: 22000 },
      { category: "Cooler", icon: "lucide:snowflake", name: "Noctua NH-L12Sx77 Black", detail: "Low-profile · 77mm height", price: 6800 },
      { category: "Motherboard", icon: "lucide:circuit-board", name: "ASRock B650I Lightning WiFi", detail: "Mini-ITX · DDR5 · 2.5G LAN", price: 14500 },
      { category: "Memory", icon: "lucide:memory-stick", name: "Kingston Fury Renegade 32GB", detail: "2×16GB · DDR5-6400 CL32 EXPO", price: 8200 },
      { category: "GPU", icon: "lucide:gpu", name: "NVIDIA GeForce RTX 5070 12GB", detail: "Blackwell dual-fan · 250W", price: 42500 },
      { category: "Storage", icon: "lucide:hard-drive", name: "WD Black SN850X 2TB", detail: "PCIe 4.0 NVMe · 7,300 MB/s read", price: 9800 },
      { category: "PSU", icon: "lucide:plug", name: "Corsair SF850L (2024)", detail: "SFX-L · 850W · 80+ Gold · ATX 3.1", price: 12500 },
      { category: "Case", icon: "lucide:box", name: "Fractal Design Terra", detail: "11 L · wood front · vertical GPU", price: 13500 },
    ],
  },
];

export type GuideLevel = "Beginner" | "Intermediate" | "Advanced";

export type GuideCategory =
  | "Beginner"
  | "Upgrades"
  | "Troubleshooting"
  | "Cooling & Cables"
  | "OS & BIOS"
  | "PH-Specific";

export type GuideMeta = {
  slug: string;
  index: string; // G_01
  title: string;
  summary: string;
  level: GuideLevel;
  /** Estimated reading/doing time in minutes */
  minutes: number;
  category: GuideCategory;
  tags: string[];
  icon: string; // iconify
  /** Difficulty out of 5, used for the ascii bar */
  difficulty: 1 | 2 | 3 | 4 | 5;
  author: string;
  verified: string; // ISO-ish display string
  /** When false, the card renders as a "drafting" placeholder and the slug page is unavailable */
  published: boolean;
  /** Optional: outcomes shown on the featured hero */
  outcomes?: string[];
};

export const GUIDES: GuideMeta[] = [
  {
    slug: "build-your-first-pc",
    index: "G_01",
    title: "Build Your First PC",
    summary:
      "From empty case to first POST. Eight steps, twelve gotchas, zero copium — written for the Manila brownout reality.",
    level: "Beginner",
    minutes: 22,
    category: "Beginner",
    tags: ["assembly", "first-build", "PHP-budget"],
    icon: "lucide:hammer",
    difficulty: 2,
    author: "@rigko/eng",
    verified: "2026.04.18",
    published: true,
    outcomes: [
      "A booted, BIOS-validated rig",
      "Clean cable routing on the back panel",
      "Stable temps under a 10-min CPU stress",
      "A Windows or Linux install ready for drivers",
    ],
  },
  {
    slug: "first-upgrade-gpu",
    index: "G_02",
    title: "Your First GPU Upgrade",
    summary:
      "How to drop in a new card without frying your PSU, your warranty, or your patience. Includes the PH 220V wattage math.",
    level: "Beginner",
    minutes: 12,
    category: "Upgrades",
    tags: ["GPU", "PSU", "compatibility"],
    icon: "lucide:cpu",
    difficulty: 2,
    author: "@rigko/eng",
    verified: "2026.04.10",
    published: false,
  },
  {
    slug: "no-post-checklist",
    index: "G_03",
    title: "No POST? No Panic.",
    summary:
      "A 14-point boot-failure flowchart. Diagnose dead RAM, mis-seated GPUs, and dead motherboards before you RMA anything.",
    level: "Intermediate",
    minutes: 9,
    category: "Troubleshooting",
    tags: ["debug", "POST", "BIOS"],
    icon: "lucide:circle-alert",
    difficulty: 3,
    author: "@rigko/support",
    verified: "2026.04.02",
    published: false,
  },
  {
    slug: "cable-management-101",
    index: "G_04",
    title: "Cable Management 101",
    summary:
      "Routing patterns that actually fit a Tecware Forge M, plus the velcro vs. zip-tie debate, settled with photos.",
    level: "Beginner",
    minutes: 14,
    category: "Cooling & Cables",
    tags: ["cables", "airflow", "aesthetic"],
    icon: "lucide:cable",
    difficulty: 2,
    author: "@rigko/eng",
    verified: "2026.03.28",
    published: false,
  },
  {
    slug: "fan-curves-and-airflow",
    index: "G_05",
    title: "Fan Curves & Airflow",
    summary:
      "Positive vs. negative pressure, dust filters, and why your humid Pasig bedroom hates your GPU.",
    level: "Intermediate",
    minutes: 11,
    category: "Cooling & Cables",
    tags: ["cooling", "airflow", "noise"],
    icon: "lucide:fan",
    difficulty: 3,
    author: "@rigko/eng",
    verified: "2026.03.21",
    published: false,
  },
  {
    slug: "bios-first-boot",
    index: "G_06",
    title: "BIOS First-Boot Checklist",
    summary:
      "EXPO/XMP, Resizable BAR, secure boot, fan headers — eight switches to flip before you ever see Windows.",
    level: "Intermediate",
    minutes: 10,
    category: "OS & BIOS",
    tags: ["BIOS", "XMP", "EXPO"],
    icon: "lucide:terminal",
    difficulty: 3,
    author: "@rigko/eng",
    verified: "2026.03.14",
    published: false,
  },
  {
    slug: "windows-clean-install",
    index: "G_07",
    title: "Windows: Clean Install Without the Bloat",
    summary:
      "A Rufus USB, a debloat script, and the driver order that won't break HDR or your audio stack.",
    level: "Beginner",
    minutes: 13,
    category: "OS & BIOS",
    tags: ["Windows", "drivers", "Rufus"],
    icon: "lucide:disc-3",
    difficulty: 2,
    author: "@rigko/support",
    verified: "2026.03.07",
    published: false,
  },
  {
    slug: "brownouts-and-avr",
    index: "G_08",
    title: "Brownouts, AVRs & Your PSU",
    summary:
      "Why a ₱1,500 AVR is the cheapest insurance in your build, and how to size one against your real wattage.",
    level: "Beginner",
    minutes: 8,
    category: "PH-Specific",
    tags: ["AVR", "PSU", "Meralco"],
    icon: "lucide:plug-zap",
    difficulty: 1,
    author: "@rigko/eng",
    verified: "2026.02.28",
    published: false,
  },
  {
    slug: "humidity-and-dust",
    index: "G_09",
    title: "Humidity, Dust & Tropical Builds",
    summary:
      "Silica gel myths, intake-side filters, and a maintenance schedule for builds living above 70% RH.",
    level: "Beginner",
    minutes: 7,
    category: "PH-Specific",
    tags: ["humidity", "dust", "maintenance"],
    icon: "lucide:droplets",
    difficulty: 1,
    author: "@rigko/eng",
    verified: "2026.02.21",
    published: false,
  },
];

export const CATEGORIES: { label: "All" | GuideCategory; icon: string }[] = [
  { label: "All", icon: "lucide:layout-grid" },
  { label: "Beginner", icon: "lucide:sparkles" },
  { label: "Upgrades", icon: "lucide:arrow-up-circle" },
  { label: "Troubleshooting", icon: "lucide:wrench" },
  { label: "Cooling & Cables", icon: "lucide:fan" },
  { label: "OS & BIOS", icon: "lucide:terminal" },
  { label: "PH-Specific", icon: "lucide:flag" },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function publishedCount(): number {
  return GUIDES.filter((g) => g.published).length;
}

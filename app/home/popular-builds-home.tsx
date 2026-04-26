import { Icon } from "@iconify/react";

const builds = [
  {
    name: "The Manila Grinder",
    author: "JuanBuild",
    price: "₱32,500",
    rating: 4.8,
    reviews: 124,
    tags: ["Budget", "1080p"],
    gradient: "from-emerald-500 to-cyan-500",
    specs: "R5 5600 · RX 6600 · 16GB",
  },
  {
    name: "Taal Fury",
    author: "PCMasterPH",
    price: "₱58,000",
    rating: 4.9,
    reviews: 89,
    tags: ["Mid-Range", "1440p"],
    gradient: "from-cyan-500 to-blue-500",
    specs: "R5 7600 · RTX 4060 Ti · 32GB",
  },
  {
    name: "Boracay Breeze",
    author: "ITXenthusiast",
    price: "₱45,000",
    rating: 4.7,
    reviews: 67,
    tags: ["Compact", "ITX"],
    gradient: "from-blue-500 to-violet-500",
    specs: "R5 7600 · RTX 4060 · 16GB",
  },
  {
    name: "Pinatubo Peak",
    author: "OverclockKing",
    price: "₱135,000",
    rating: 5.0,
    reviews: 42,
    tags: ["High-End", "4K"],
    gradient: "from-violet-500 to-rose-500",
    specs: "R7 7800X3D · RTX 4080 S · 32GB",
  },
  {
    name: "Cebu Surfer",
    author: "TechTitaJen",
    price: "₱52,000",
    rating: 4.8,
    reviews: 156,
    tags: ["Balanced", "Streaming"],
    gradient: "from-cyan-500 to-violet-500",
    specs: "R7 5700X · RTX 4060 Ti · 32GB",
  },
  {
    name: "Apo Ascent",
    author: "RGBmaxPH",
    price: "₱95,000",
    rating: 4.9,
    reviews: 73,
    tags: ["Enthusiast", "RGB"],
    gradient: "from-rose-500 to-orange-500",
    specs: "i7-14700K · RTX 4070 Ti S · 32GB",
  },
];

export default function PopularBuildsHome() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Popular Builds
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Community favorites with verified pricing.
            </p>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            View all builds
            <Icon icon="lucide:arrow-right" className="h-4 w-4" />
          </a>
        </div>

        {/* Build grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {builds.map((build) => (
            <a
              key={build.name}
              href="#"
              className="group relative rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-gray-950 p-6 hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-200 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none"
            >
              {/* Gradient accent bar */}
              <div
                className={`h-1 w-12 rounded-full bg-gradient-to-r ${build.gradient} mb-5`}
              />

              <h3 className="text-lg font-bold mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {build.name}
              </h3>

              <p className="text-sm font-mono text-gray-500 dark:text-gray-500 mb-4">
                {build.specs}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {build.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.04]">
                <span className="text-xl font-bold font-mono">
                  {build.price}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:star" className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-sm font-semibold">{build.rating}</span>
                    <span className="text-xs text-gray-400">
                      ({build.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Icon icon="lucide:user" className="h-3 w-3" />
                    {build.author}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile "View all" link */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400"
          >
            View all builds
            <Icon icon="lucide:arrow-right" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

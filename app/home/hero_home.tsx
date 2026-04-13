import { ArrowRight, Zap } from "lucide-react";

export default function HeroHome() {
  return (
    <section className="relative overflow-hidden">
      {/* Circuit grid background */}
      <div className="absolute inset-0 circuit-pattern" />

      {/* Gradient glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-cyan-500/[0.07] via-violet-500/[0.07] to-transparent rounded-full blur-3xl dark:from-cyan-500/[0.05] dark:via-violet-500/[0.05]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-200 dark:border-cyan-500/20 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 tracking-wide">
              Tracking prices from 50+ PH retailers
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]">
            Build Your Dream Rig,{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Best Prices in SEA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compare PC component prices across Southeast Asian retailers. Check
            compatibility, track price drops, and build smarter — all in
            Philippine Peso.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110 transition-all duration-200"
            >
              <Zap className="h-4 w-4" />
              Start Building
            </a>
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-white/10 px-8 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
            >
              Browse Parts
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 border-t border-gray-200 dark:border-white/[0.06] pt-10">
            {[
              { value: "10K+", label: "Components" },
              { value: "50+", label: "Retailers" },
              { value: "₱", label: "Real-time Prices" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold font-mono bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

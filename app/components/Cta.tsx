import { Zap, ArrowRight, Cpu, Monitor, HardDrive } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-gray-950 dark:bg-white">
      {/* Circuit grid — inverted contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgb(0_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Gradient orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />

      {/* Floating component icons */}
      <div className="absolute top-12 left-[10%] opacity-[0.07] dark:opacity-[0.06]">
        <Cpu className="h-24 w-24 text-white dark:text-gray-900 rotate-12" />
      </div>
      <div className="absolute bottom-12 right-[10%] opacity-[0.07] dark:opacity-[0.06]">
        <Monitor className="h-20 w-20 text-white dark:text-gray-900 -rotate-12" />
      </div>
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 opacity-[0.05] dark:opacity-[0.04]">
        <HardDrive className="h-16 w-16 text-white dark:text-gray-900 rotate-6" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          {/* Urgency badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 dark:border-gray-900/10 bg-white/[0.06] dark:bg-gray-900/[0.06] px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400 dark:text-amber-500 fill-amber-400 dark:fill-amber-500" />
            <span className="text-xs font-semibold text-white/80 dark:text-gray-600 tracking-wide uppercase">
              Free forever &middot; No sign-up needed
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white dark:text-gray-900 leading-[1.1]">
            Stop Overpaying.{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 dark:from-cyan-600 dark:via-blue-600 dark:to-violet-600 bg-clip-text text-transparent">
              Start Comparing.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-gray-400 dark:text-gray-500 max-w-xl mx-auto">
            Join thousands of Filipino builders who save an average of{" "}
            <span className="font-bold text-white dark:text-gray-900">
              ₱3,500
            </span>{" "}
            per build with Rigko&apos;s real-time price comparison.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 dark:from-cyan-600 dark:to-violet-600 px-10 text-base font-bold text-white shadow-2xl shadow-cyan-500/25 dark:shadow-violet-600/20 hover:shadow-cyan-500/40 dark:hover:shadow-violet-600/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Zap className="h-5 w-5" />
              Start Building — It&apos;s Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white dark:text-gray-900">
                5,200+
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Builds created
              </p>
            </div>
            <div className="h-8 w-px bg-white/10 dark:bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white dark:text-gray-900">
                ₱18M+
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Savings tracked
              </p>
            </div>
            <div className="h-8 w-px bg-white/10 dark:bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white dark:text-gray-900">
                4.9/5
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                User rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

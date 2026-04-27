import Link from "next/link";
import { Icon } from "@iconify/react";
import type { GuideMeta } from "../_data/guides";
import LevelPill from "./level-pill";

export default function FeaturedHero({ guide }: { guide: GuideMeta }) {
  return (
    <section
      aria-label="Featured guide"
      className="relative mt-10 rounded-3xl border-2 border-black/10 dark:border-white/10 overflow-hidden chassis-steel"
    >
      {/* Corner LEDs */}
      <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#c2000b] shadow-[0_0_8px_#c2000b] animate-pulse" />
      <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#c2000b]/40" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Left: copy */}
        <div className="lg:col-span-3 p-6 md:p-10 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#c2000b]" />
            <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
              Featured // {guide.index}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white mb-3 leading-[0.95]">
            {guide.title.replace(/ /g, "_")}
          </h2>

          <p className="text-sm md:text-base font-mono text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-6">
            {guide.summary}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <LevelPill level={guide.level} />
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-600 dark:text-gray-400">
              <Icon icon="lucide:clock" className="w-3 h-3 text-[#c2000b]" />
              {guide.minutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-600 dark:text-gray-400">
              <Icon icon="lucide:user" className="w-3 h-3 text-[#c2000b]" />
              {guide.author}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-600 dark:text-gray-400">
              <Icon icon="lucide:badge-check" className="w-3 h-3 text-[#c2000b]" />
              Verified {guide.verified}
            </span>
          </div>

          {/* Outcomes */}
          {guide.outcomes && (
            <ul className="space-y-2 mb-8">
              {guide.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-2 text-xs md:text-sm font-mono text-gray-700 dark:text-gray-300"
                >
                  <Icon
                    icon="lucide:check-circle-2"
                    className="w-4 h-4 text-[#c2000b] shrink-0 mt-0.5"
                  />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/guides/${guide.slug}`}
              className="inline-flex items-center gap-2 bg-[#c2000b] text-white border-2 border-[#c2000b] pl-4 pr-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-tighter hover:bg-[#a10009] transition-all shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]"
            >
              <Icon icon="solar:hammer-bold" className="text-sm" />
              Start the build
              <Icon icon="lucide:arrow-right" className="text-sm" />
            </Link>
            <Link
              href="#guide-grid"
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300 hover:text-[#c2000b] transition-colors"
            >
              <Icon icon="lucide:list" className="w-3.5 h-3.5" />
              All guides ↓
            </Link>
          </div>
        </div>

        {/* Right: faux terminal */}
        <div className="lg:col-span-2 relative bg-[#050100] p-6 md:p-8 border-t-2 lg:border-t-0 lg:border-l-2 border-black/10 dark:border-white/10 overflow-hidden">
          {/* scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
               style={{ background: "linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 50%)", backgroundSize: "100% 4px" }} />
          {/* glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#c2000b]/20 blur-3xl" />

          <div className="relative z-10 font-mono text-[11px] leading-relaxed text-emerald-400/80">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-[9px] uppercase tracking-[0.3em] text-white/40">
                rigko@guide:~$
              </span>
            </div>

            <p className="text-white/50">{"// Loading flagship tutorial..."}</p>
            <p className="mt-2">
              <span className="text-[#c2000b]">$</span> rigko guide --start{" "}
              <span className="text-white">{guide.slug}</span>
            </p>
            <p className="text-white/40 mt-1">
              [ok] manifest verified · {guide.verified}
            </p>
            <p className="text-white/40">[ok] difficulty {guide.difficulty}/5</p>
            <p className="text-white/40">
              [ok] regions: PH · prices: PHP · 220V/60Hz
            </p>
            <p className="mt-3">
              <span className="text-[#c2000b]">{">"}</span> sections loaded:{" "}
              <span className="text-white">08</span>
            </p>
            <p>
              <span className="text-[#c2000b]">{">"}</span> callouts: tip ·
              warning · ph-note · pro
            </p>
            <p className="mt-3 text-white/60">
              press <span className="text-white">[ENTER]</span> to begin
              <span className="inline-block w-2 h-3 ml-1 align-middle bg-emerald-400 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Icon } from "@iconify/react";
import type { GuideMeta } from "../_data/guides";
import LevelPill from "./level-pill";

export default function GuideCard({ guide }: { guide: GuideMeta }) {
  const drafting = !guide.published;

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    drafting ? (
      <div
        aria-disabled
        className="group relative flex flex-col h-full rounded-2xl border border-dashed border-black/15 dark:border-white/10 bg-transparent p-5 cursor-not-allowed opacity-80"
      >
        {children}
      </div>
    ) : (
      <Link
        href={`/guides/${guide.slug}`}
        className="group relative flex flex-col h-full rounded-2xl border border-black/5 dark:border-white/5 chassis-steel p-5 transition-all hover:-translate-y-0.5 hover:border-[#c2000b]/40 hover:shadow-[0_8px_24px_-8px_rgba(194,0,11,0.25)]"
      >
        {children}
      </Link>
    );

  return (
    <Wrapper>
      {/* Drafting ribbon */}
      {drafting && (
        <span className="absolute top-3 right-3 text-[8px] font-mono uppercase tracking-[0.3em] px-1.5 py-0.5 border border-black/15 dark:border-white/15 text-gray-500 dark:text-gray-500 bg-white/40 dark:bg-black/40 backdrop-blur-sm">
          Drafting //
        </span>
      )}

      {/* Top row: index + icon */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
          {guide.index}
        </span>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            drafting
              ? "bg-black/5 dark:bg-white/5 text-gray-500"
              : "bg-[#c2000b]/10 border border-[#c2000b]/20 text-[#c2000b] group-hover:bg-[#c2000b] group-hover:text-white"
          } transition-colors`}
        >
          <Icon icon={guide.icon} className="w-5 h-5" />
        </div>
      </div>

      {/* Pills row */}
      <div className="flex items-center flex-wrap gap-2 mb-3">
        <LevelPill level={guide.level} />
        <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-500">
          <Icon icon="lucide:clock" className="w-3 h-3" />
          {guide.minutes} min
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-500">
          <Icon icon="lucide:bar-chart-2" className="w-3 h-3" />
          {guide.difficulty}/5
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-lg md:text-xl font-black uppercase tracking-tight leading-tight mb-2 ${
          drafting
            ? "text-gray-600 dark:text-gray-500"
            : "text-black dark:text-white group-hover:text-[#c2000b]"
        } transition-colors`}
      >
        {guide.title}
      </h3>

      {/* Summary */}
      <p className="text-xs font-mono text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
        {guide.summary}
      </p>

      {/* Tags */}
      <div className="flex items-center flex-wrap gap-1.5 mt-4 pt-4 border-t border-dashed border-black/10 dark:border-white/10">
        {guide.tags.map((t) => (
          <span
            key={t}
            className="text-[9px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500"
          >
            #{t}
          </span>
        ))}
      </div>

      {/* Hover arrow */}
      {!drafting && (
        <div className="absolute bottom-5 right-5 w-7 h-7 rounded-full bg-[#c2000b] text-white flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <Icon icon="lucide:arrow-right" className="w-4 h-4" />
        </div>
      )}
    </Wrapper>
  );
}

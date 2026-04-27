import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { GUIDES, getGuide } from "../_data/guides";
import LevelPill from "../_components/level-pill";
import TocRail from "../_components/toc-rail";
import ReadingProgress from "../_components/reading-progress";
import BuildYourFirstPcContent, {
  TOC as BUILD_YOUR_FIRST_PC_TOC,
} from "../_content/build-your-first-pc";
import type { TocItem } from "../_components/toc-rail";

const CONTENT_REGISTRY: Record<
  string,
  { Component: React.ComponentType; toc: TocItem[] }
> = {
  "build-your-first-pc": {
    Component: BuildYourFirstPcContent,
    toc: BUILD_YOUR_FIRST_PC_TOC,
  },
};

export function generateStaticParams() {
  return GUIDES.filter((g) => g.published).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found — Rigko" };
  return {
    title: `${guide.title} — Rigko Guides`,
    description: guide.summary,
  };
}

function DifficultyBar({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[10px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`w-3 h-1.5 rounded-sm ${
            n <= level ? "bg-[#c2000b]" : "bg-black/10 dark:bg-white/10"
          }`}
        />
      ))}
    </span>
  );
}

export default async function GuideSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const entry = CONTENT_REGISTRY[slug];

  // Drafting state — not yet wired into registry
  if (!guide.published || !entry) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-[#f4f4f4] dark:bg-[#050100] transition-colors">
        <div className="max-w-2xl mx-auto px-4 md:px-12 py-24 text-center">
          <div className="inline-flex items-center gap-2 mb-4 text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c2000b] animate-pulse" />
            Drafting // {guide.index}
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white mb-4">
            {guide.title}
          </h1>
          <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-8">
            This guide is still being written. We ship a new one every other
            Tuesday — check back, or jump on the patch-notes list to get
            pinged when it&apos;s live.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 bg-[#c2000b] text-white px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-tighter hover:bg-[#a10009] transition-colors"
          >
            <Icon icon="lucide:arrow-left" className="w-4 h-4" />
            Back to Guides
          </Link>
        </div>
      </div>
    );
  }

  const { Component, toc } = entry;

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#f4f4f4] dark:bg-[#050100] transition-colors">
      <ReadingProgress />

      <div className="max-w-[1440px] mx-auto px-4 md:px-12 pt-8 md:pt-12 pb-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 dark:text-gray-500 mb-6"
        >
          <Link href="/guides" className="hover:text-[#c2000b] transition-colors">
            Guides
          </Link>
          <Icon icon="lucide:chevron-right" className="w-3 h-3" />
          <span className="text-black dark:text-white truncate max-w-[60vw]">
            {guide.title}
          </span>
        </nav>

        {/* Hero */}
        <header className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#c2000b]" />
            <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
              Manual // {guide.index}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black dark:text-white mb-4 leading-[0.95]">
            {guide.title}
          </h1>
          <p className="text-sm md:text-base font-mono text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {guide.summary}
          </p>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-6">
            <LevelPill level={guide.level} />
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">
              <Icon icon="lucide:clock" className="w-3 h-3 text-[#c2000b]" />
              {guide.minutes} min
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">
              <Icon icon="lucide:user" className="w-3 h-3 text-[#c2000b]" />
              {guide.author}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">
              <Icon icon="lucide:badge-check" className="w-3 h-3 text-[#c2000b]" />
              Verified {guide.verified}
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">
              <Icon icon="lucide:bar-chart-2" className="w-3 h-3 text-[#c2000b]" />
              <span>Difficulty</span>
              <DifficultyBar level={guide.difficulty} />
            </span>
          </div>

          {/* Outcomes box */}
          {guide.outcomes && (
            <div className="rounded-2xl border-2 border-black/10 dark:border-white/10 chassis-steel p-5">
              <div className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.3em] font-black mb-3">
                Outcomes // What you&apos;ll have at the end
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {guide.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-2 text-xs font-mono text-gray-700 dark:text-gray-300"
                  >
                    <Icon
                      icon="lucide:check-circle-2"
                      className="w-4 h-4 text-[#c2000b] shrink-0 mt-0.5"
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* Body + sticky TOC */}
        <div className="flex gap-12 items-start">
          <div className="flex-1 min-w-0">
            <Component />

            {/* Edit / feedback footer */}
            <footer className="mt-16 pt-8 border-t-2 border-dashed border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-[0.3em]">
                Last verified // {guide.verified} · {guide.author}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:guides@rigko.ph?subject=Feedback: ${guide.title}`}
                  className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300 hover:text-[#c2000b] transition-colors"
                >
                  <Icon icon="lucide:flag" className="w-3 h-3" />
                  Spotted an error?
                </a>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300 hover:text-[#c2000b] transition-colors"
                >
                  <Icon icon="lucide:arrow-left" className="w-3 h-3" />
                  All guides
                </Link>
              </div>
            </footer>
          </div>

          <TocRail items={toc} />
        </div>
      </div>
    </div>
  );
}

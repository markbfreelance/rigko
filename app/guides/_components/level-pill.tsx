import type { GuideLevel } from "../_data/guides";

const STYLES: Record<GuideLevel, string> = {
  Beginner:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Intermediate:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Advanced:
    "bg-[#c2000b]/10 text-[#c2000b] border-[#c2000b]/30",
};

export default function LevelPill({ level }: { level: GuideLevel }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-mono uppercase tracking-[0.25em] ${STYLES[level]}`}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {level}
    </span>
  );
}

import { Icon } from "@iconify/react";

export type CalloutVariant = "tip" | "warning" | "ph-note" | "pro";

const VARIANTS: Record<
  CalloutVariant,
  { label: string; icon: string; ring: string; bg: string; text: string }
> = {
  tip: {
    label: "Tip",
    icon: "lucide:lightbulb",
    ring: "border-l-4 border-emerald-500",
    bg: "bg-emerald-500/5",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  warning: {
    label: "Warning",
    icon: "lucide:alert-triangle",
    ring: "border-l-4 border-amber-500",
    bg: "bg-amber-500/5",
    text: "text-amber-700 dark:text-amber-400",
  },
  "ph-note": {
    label: "PH-Note",
    icon: "lucide:flag",
    ring: "border-l-4 border-[#c2000b]",
    bg: "bg-[#c2000b]/5",
    text: "text-[#c2000b]",
  },
  pro: {
    label: "Pro",
    icon: "lucide:star",
    ring: "border-l-4 border-violet-500",
    bg: "bg-violet-500/5",
    text: "text-violet-700 dark:text-violet-400",
  },
};

export default function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const v = VARIANTS[variant];
  return (
    <aside
      className={`my-6 rounded-r-xl ${v.ring} ${v.bg} px-4 py-3 not-prose`}
    >
      <div
        className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] ${v.text} mb-1.5`}
      >
        <Icon icon={v.icon} className="w-3.5 h-3.5" />
        <span className="font-black">// {v.label}</span>
        {title && <span className="text-current/70 normal-case tracking-tight font-bold">— {title}</span>}
      </div>
      <div className="text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

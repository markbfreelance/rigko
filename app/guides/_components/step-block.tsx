import { Icon } from "@iconify/react";

export default function StepBlock({
  number,
  id,
  title,
  goal,
  children,
}: {
  number: string;
  id: string;
  title: string;
  goal: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-32 py-10 border-t-2 border-dashed border-black/10 dark:border-white/10 first:border-t-0 first:pt-2"
    >
      {/* Step number watermark */}
      <span
        aria-hidden
        className="absolute top-2 right-0 text-[8rem] md:text-[10rem] font-black text-black/[0.04] dark:text-white/[0.04] tracking-tighter select-none leading-none pointer-events-none"
      >
        {number}
      </span>

      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#c2000b] text-white font-black text-xs shadow-lg shadow-[#c2000b]/30">
            {number}
          </span>
          <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
            Step_{number}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-2 leading-tight">
          {title}
        </h2>

        <p className="flex items-start gap-2 text-sm md:text-base font-mono text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-2xl">
          <Icon
            icon="lucide:target"
            className="w-4 h-4 text-[#c2000b] shrink-0 mt-1"
          />
          <span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c2000b] mr-2">
              Goal //
            </span>
            {goal}
          </span>
        </p>

        <div className="space-y-4 max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

export function Substeps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2.5 my-4">
      {items.map((s, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full border border-[#c2000b]/30 text-[#c2000b] text-[10px] font-black">
            {i + 1}
          </span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );
}

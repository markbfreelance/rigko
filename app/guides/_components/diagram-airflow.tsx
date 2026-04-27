import { Icon } from "@iconify/react";

/**
 * Pure-CSS/SVG airflow diagram. Front+bottom intake, rear+top exhaust,
 * positive pressure target. No image assets.
 */
export default function DiagramAirflow() {
  return (
    <figure className="my-6 rounded-2xl border border-black/10 dark:border-white/10 chassis-steel p-5 overflow-hidden">
      <div className="flex items-center gap-2 text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.3em] font-black mb-4">
        <Icon icon="lucide:wind" className="w-3.5 h-3.5" />
        Diagram // Airflow_Path
      </div>

      <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
        {/* Case */}
        <div className="absolute inset-2 border-2 border-black/30 dark:border-white/20 rounded-md bg-black/[0.02] dark:bg-white/[0.02]" />

        {/* Components inside */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-6 gap-2 text-[8px] font-mono uppercase tracking-widest text-gray-500">
          <div className="col-span-2 row-span-2 col-start-2 border border-dashed border-black/20 dark:border-white/15 rounded-sm flex items-center justify-center">
            MOBO
          </div>
          <div className="col-start-3 row-start-1 border border-dashed border-black/20 dark:border-white/15 rounded-sm flex items-center justify-center text-[#c2000b]">
            CPU
          </div>
          <div className="col-span-2 col-start-2 row-start-3 border border-dashed border-black/20 dark:border-white/15 rounded-sm flex items-center justify-center">
            GPU
          </div>
        </div>

        {/* Intake arrows (left, blue-ish via emerald for "cool") */}
        <ArrowIn label="INTAKE" className="absolute left-0 top-1/4 -translate-x-1/2" />
        <ArrowIn label="INTAKE" className="absolute left-0 top-2/3 -translate-x-1/2" />

        {/* Exhaust arrows (right + top, red) */}
        <ArrowOut label="EXHAUST" className="absolute right-0 top-1/3 translate-x-1/2" />
        <ArrowOut
          label="EXHAUST"
          vertical
          className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </div>

      <figcaption className="mt-4 text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest text-center">
        Target: 2 intake · 2 exhaust · slight positive pressure
      </figcaption>
    </figure>
  );
}

function ArrowIn({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 text-emerald-500 ${className}`}>
      <Icon icon="lucide:arrow-right" className="w-5 h-5" />
      <span className="text-[8px] font-mono uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function ArrowOut({
  label,
  vertical,
  className,
}: {
  label: string;
  vertical?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1 text-[#c2000b] ${
        vertical ? "flex-col" : ""
      } ${className}`}
    >
      <Icon
        icon={vertical ? "lucide:arrow-up" : "lucide:arrow-right"}
        className="w-5 h-5"
      />
      <span className="text-[8px] font-mono uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

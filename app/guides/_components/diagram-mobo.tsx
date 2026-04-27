import { Icon } from "@iconify/react";

/**
 * ATX motherboard component layout — pure CSS grid, no images.
 */
export default function DiagramMobo() {
  return (
    <figure className="my-6 rounded-2xl border border-black/10 dark:border-white/10 chassis-steel p-5">
      <div className="flex items-center gap-2 text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.3em] font-black mb-4">
        <Icon icon="lucide:circuit-board" className="w-3.5 h-3.5" />
        Diagram // ATX_Layout
      </div>

      <div className="relative w-full aspect-[4/3] max-w-lg mx-auto rounded-md border-2 border-emerald-700/30 bg-emerald-900/10 dark:bg-emerald-900/20 p-3">
        {/* Traces */}
        <div className="absolute inset-3 hardware-grid opacity-50" />

        <div className="relative grid grid-cols-6 grid-rows-5 gap-1.5 h-full">
          <Block area="col-span-2 row-span-1" label="I/O REAR" tone="muted" />
          <Block area="col-span-2 row-span-2 col-start-3 row-start-2" label="CPU" tone="accent" />
          <Block area="col-span-1 row-span-2 col-start-5 row-start-2" label="DIMM" tone="default" />
          <Block area="col-span-1 row-span-2 col-start-6 row-start-2" label="DIMM" tone="default" />
          <Block area="col-span-3 row-span-1 col-start-1 row-start-4" label="PCIE x16" tone="accent" />
          <Block area="col-span-2 row-span-1 col-start-4 row-start-4" label="M.2 NVMe" tone="default" />
          <Block area="col-span-2 row-span-1 col-start-1 row-start-5" label="CHIPSET" tone="muted" />
          <Block area="col-span-2 row-span-1 col-start-3 row-start-5" label="SATA" tone="muted" />
          <Block area="col-span-2 row-span-1 col-start-5 row-start-5" label="24-PIN" tone="accent" />
        </div>
      </div>

      <figcaption className="mt-4 text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest text-center">
        Roughly to scale · ATX form factor · standoff pattern follows the same grid
      </figcaption>
    </figure>
  );
}

function Block({
  area,
  label,
  tone,
}: {
  area: string;
  label: string;
  tone: "default" | "accent" | "muted";
}) {
  const toneCls =
    tone === "accent"
      ? "border-[#c2000b]/60 bg-[#c2000b]/10 text-[#c2000b]"
      : tone === "muted"
      ? "border-emerald-700/40 bg-emerald-900/10 text-emerald-300/70"
      : "border-emerald-700/40 bg-emerald-900/20 text-emerald-200/80";
  return (
    <div
      className={`${area} ${toneCls} border rounded-sm flex items-center justify-center text-[8px] font-mono uppercase tracking-widest font-bold`}
    >
      {label}
    </div>
  );
}

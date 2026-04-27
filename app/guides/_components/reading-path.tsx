import { Icon } from "@iconify/react";

const PATH = [
  {
    n: "01",
    title: "Build Your First PC",
    body: "Assemble a working rig from a flat-pack of parts. Survive your first POST.",
    icon: "lucide:hammer",
  },
  {
    n: "02",
    title: "BIOS First-Boot Checklist",
    body: "Flip the eight switches that turn raw silicon into the speed you actually paid for.",
    icon: "lucide:terminal",
  },
  {
    n: "03",
    title: "Your First GPU Upgrade",
    body: "Six months in, drop a new card without nuking the PSU or your warranty.",
    icon: "lucide:cpu",
  },
];

export default function ReadingPath() {
  return (
    <section className="mt-20 md:mt-28">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 max-w-12 bg-[#c2000b]" />
        <span className="text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
          Reading_Path // Suggested
        </span>
        <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
      </div>

      <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black dark:text-white mb-3">
        From flat-pack to flex_build
      </h2>
      <p className="text-sm font-mono text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
        We rank our guides for new builders. Read these three in order — six
        months later you&apos;re not the same person on Reddit asking what
        EXPO is.
      </p>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Connector line on md+ */}
        <span
          aria-hidden
          className="hidden md:block absolute top-8 left-[8.333%] right-[8.333%] h-px border-t-2 border-dashed border-[#c2000b]/30"
        />

        {PATH.map((s, i) => (
          <div
            key={s.n}
            className="relative rounded-2xl border border-black/5 dark:border-white/5 chassis-steel p-5"
          >
            <div className="relative flex items-center gap-3 mb-3">
              <div className="relative shrink-0 w-10 h-10 rounded-full bg-[#c2000b] text-white flex items-center justify-center font-black text-xs shadow-lg shadow-[#c2000b]/30 z-10">
                {s.n}
              </div>
              <Icon icon={s.icon} className="w-5 h-5 text-[#c2000b]" />
              {i < PATH.length - 1 && (
                <Icon
                  icon="lucide:chevron-right"
                  className="hidden md:block ml-auto w-5 h-5 text-[#c2000b]/40"
                />
              )}
            </div>
            <h3 className="text-base font-black uppercase tracking-tight text-black dark:text-white mb-1.5">
              {s.title}
            </h3>
            <p className="text-xs font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

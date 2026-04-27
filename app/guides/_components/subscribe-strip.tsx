"use client";

import { Icon } from "@iconify/react";

export default function SubscribeStrip() {
  return (
    <section
      aria-label="Subscribe"
      className="mt-20 md:mt-28 relative rounded-3xl overflow-hidden border-2 border-black/10 dark:border-white/10 bg-[#050100]"
    >
      <div className="absolute inset-0 hardware-grid opacity-30" />
      <div className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-[#c2000b]/20 blur-3xl" />
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background:
            "linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 p-6 md:p-10 items-center">
        <div className="md:col-span-3">
          <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-[#c2000b] uppercase tracking-[0.4em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c2000b] shadow-[0_0_8px_#c2000b] animate-pulse" />
            Patch_Notes // Subscribe
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-2 leading-tight">
            New guide every other Tuesday.
          </h3>
          <p className="text-sm font-mono text-white/60 max-w-xl">
            One email. No affiliate fluff. PHP-priced parts, real-world
            failures, and the occasional BIOS war story.
          </p>
        </div>

        <form
          action="#"
          method="post"
          className="md:col-span-2 flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-0 border-2 border-white/10 bg-black/40 rounded-full overflow-hidden focus-within:border-[#c2000b] transition-colors">
            <Icon
              icon="lucide:at-sign"
              className="w-4 h-4 text-white/40 ml-4"
            />
            <input
              type="email"
              required
              placeholder="you@example.ph"
              className="flex-1 bg-transparent px-3 py-3 text-xs font-mono text-white placeholder:text-white/30 outline-none"
            />
            <button
              type="submit"
              className="bg-[#c2000b] text-white px-4 py-3 text-[11px] font-black uppercase tracking-tighter hover:bg-[#a10009] transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </div>
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.25em]">
            // No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}

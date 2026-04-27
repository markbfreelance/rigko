"use client";

import { useScrollSpy, scrollToSection } from "../../featured-builds/_components/use-scroll-spy";

export type TocItem = { id: string; label: string; number?: string };

export default function TocRail({ items }: { items: TocItem[] }) {
  const ids = items.map((i) => i.id);
  const activeId = useScrollSpy(ids);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Guide sections"
      className="hidden xl:block sticky top-28 self-start w-64 shrink-0"
    >
      <div className="text-[9px] font-mono text-[#c2000b] uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c2000b] shadow-[0_0_8px_#c2000b] animate-pulse" />
        On_This_Page //
      </div>
      <ul className="relative space-y-1 border-l border-black/10 dark:border-white/10 pl-4">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="relative">
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute -left-[17px] top-1.5 bottom-1.5 w-0.5 bg-[#c2000b] rounded-full shadow-[0_0_6px_#c2000b]" />
              )}
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-[11px] font-mono py-1.5 leading-snug transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#c2000b] font-bold"
                    : "text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.number && (
                  <span className="text-[#c2000b]/50 mr-1.5 font-black">
                    {item.number}
                  </span>
                )}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

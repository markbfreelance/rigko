"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently dominant in the viewport.
 * Uses IntersectionObserver with a top-biased rootMargin.
 */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>("");
  const idsKey = ids.join("|");

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // idsKey collapses array changes into a stable dep
  }, [idsKey, ids]);

  // Fall back to first id if current activeId is no longer in the list
  return ids.includes(activeId) ? activeId : ids[0] ?? "";
}

export function scrollToSection(id: string, offset = 120) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      let delay = 0.1;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationDelay = `${delay}s`;
          entry.target.classList.add("animate-enter");
          observer.unobserve(entry.target);
          delay += 0.1;
        }
      });
    }, observerOptions);

    // Small delay ensures DOM is completely mounted after page transition
    const timeout = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        // Quick visual fail-safe: don't double-animate elements already animated
        if (!el.classList.contains("animate-enter")) {
          observer.observe(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

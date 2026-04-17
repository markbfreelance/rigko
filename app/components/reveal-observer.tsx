"use client";

import { useEffect } from "react";

export default function RevealObserver() {
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

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

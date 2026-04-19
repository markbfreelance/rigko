"use client";

import { usePathname } from "next/navigation";

export default function VisualEffects() {
  const pathname = usePathname();
  
  // Disable global effects specifically on the builder page
  if (pathname === "/build") return null;

  return (
    <>
      <div className="vignette" />
      <div className="crt-overlay" />
    </>
  );
}

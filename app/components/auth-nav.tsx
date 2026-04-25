"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { logout } from "@/app/actions/auth";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface AuthNavProps {
  user: { username: string } | null;
}

export default function AuthNav({ user }: AuthNavProps) {
  const [pending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  if (!user) {
    return (
      <Link
        href="/login"
        className="relative flex items-center justify-center w-full sm:w-auto bg-[#ededed] dark:bg-[var(--chassis-metal)] text-black dark:text-white px-6 py-3 sm:py-2 rounded-full text-[11px] font-black uppercase tracking-widest sm:tracking-tighter hover:bg-[#c2000b] dark:hover:bg-[#c2000b] hover:text-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)]"
      >
        <span>LOGIN</span>
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="relative flex items-center gap-2 bg-[#f5f5f5] dark:bg-black border-2 border-[var(--chassis-border)] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white pl-4 pr-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest hover:border-[#c2000b] transition-all cursor-pointer"
      >
        <span className="max-w-[120px] truncate">{user.username}</span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-52 rounded-2xl border-2 border-[var(--chassis-border)] bg-[#f5f5f5] dark:bg-black shadow-xl overflow-hidden z-50"
        >
          <Link
            href="/saved-rigs"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-tighter text-black dark:text-white hover:bg-[#c2000b] hover:text-white transition-colors"
          >
            <Icon icon="solar:bookmark-bold" className="text-sm" />
            <span>Saved Rigs</span>
          </Link>
          <div className="h-px bg-[var(--chassis-border)]" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              startTransition(() => logout());
            }}
            disabled={pending}
            className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-tighter text-black dark:text-white hover:bg-[#c2000b] hover:text-white transition-colors disabled:opacity-50"
          >
            <Icon icon="solar:logout-3-bold" className="text-sm" />
            <span>{pending ? "..." : "Logout"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

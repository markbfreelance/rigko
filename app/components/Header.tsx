"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { Icon } from "@iconify/react";

const navLinks = [
  { label: "Build a Rig", href: "#" },
  { label: "Marketplace", href: "#" },
  { label: "Guides", href: "#" },
  { label: "PH Prices", href: "#" },
];

export default function Header({ children }: { children?: React.ReactNode }) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-20 z-[200] flex items-center bg-transparent pointer-events-none">
      <div className="mx-auto w-full max-w-[1440px] px-8 md:px-16 flex items-center justify-between pointer-events-auto">
        {/* Logo Section - Flush with steel */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 bg-[#c2000b]/20 blur-md rounded-full group-hover:bg-[#c2000b]/40 transition-colors"></div>
            <Image 
              src="/rigko-logo.svg" 
              alt="Rigko Logo" 
              fill
              className="object-contain relative z-10"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-black dark:text-white uppercase leading-none transition-colors">
              Rigko
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Etched into Shroud */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-6 py-2 text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button - The "Power Button" */}
        <div className="flex items-center gap-8">
          {/* I/O Port Accents */}
          <div className="hidden md:flex gap-3 opacity-40">
            <div className="w-4 h-4 rounded-full io-port"></div>
            <div className="w-4 h-4 rounded-full io-port"></div>
            <div className="w-6 h-2 rounded-sm io-port"></div>
          </div>

          <div className="flex items-center gap-3">
          {mounted && (
            <button 
              onClick={toggleTheme}
              className="relative flex items-center w-12 h-6 bg-white dark:bg-[#050100] border-2 border-[#c2000b]/50 hover:border-[#c2000b] rounded-full transition-all group cursor-pointer"
              aria-label="Toggle Theme"
            >
              <div className="absolute inset-0 bg-[#c2000b]/0 blur-md group-hover:bg-[#ff0000]/30 transition-all rounded-full pointer-events-none"></div>
              
              {/* Internal Track Icons */}
              <div className="absolute inset-0 w-full flex items-center justify-between px-1.5 text-[10px] text-black/50 dark:text-white/30 pointer-events-none transition-colors">
                <Icon icon="mdi:white-balance-sunny" />
                <Icon icon="mdi:moon-waning-crescent" />
              </div>

              {/* Slider Thumb LED */}
              <div 
                className={`relative z-10 w-4 h-4 bg-[#c2000b] rounded-full shadow-[0_0_8px_rgba(194,0,11,0.8)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  theme === "dark" ? "translate-x-[24px]" : "translate-x-1"
                }`}
              ></div>
            </button>
          )}

            {children}

          </div>
        </div>
      </div>
    </header>
  );
}

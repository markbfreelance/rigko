"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Build a Rig", href: "/build" },
  { label: "Marketplace", href: "#" },
  { label: "Guides", href: "#" },
  { label: "PH Prices", href: "#" },
];

export default function Header({ children }: { children?: React.ReactNode }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-20 z-[200] flex items-center bg-transparent pointer-events-none">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-16 flex items-center justify-between pointer-events-auto">
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
            <Link
              key={link.label}
              href={link.href}
              className="px-6 py-2 text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
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

            <div className="hidden sm:flex items-center gap-3">
              {children}
              <Link href="/build" className="group relative">
                <div className="absolute inset-0 bg-[#c2000b]/50 blur-xl group-hover:bg-[#ff0000]/70 transition-all rounded-full"></div>
                <div className="relative flex items-center gap-2 bg-[#f5f5f5] dark:bg-black border-2 border-[#c2000b] text-black dark:text-white pl-4 pr-6 py-2 rounded-full text-[11px] font-black uppercase tracking-tighter hover:bg-[#c2000b] dark:hover:bg-[#c2000b] hover:text-white transition-all shadow-[0_0_20px_rgba(194,0,11,0.2)] dark:shadow-[0_0_20px_rgba(194,0,11,0.4)]">
                  <Icon icon="solar:hammer-bold" className="text-sm" />
                  <span className="hidden xs:inline">START BUILDING</span>
                  <span className="xs:hidden">BUILD</span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 border-2 border-[#c2000b]/50 hover:border-[#c2000b] bg-white dark:bg-black text-[#c2000b] transition-all rounded-full shadow-[0_0_15px_rgba(194,0,11,0.2)] dark:shadow-[0_0_20px_rgba(194,0,11,0.3)]"
            >
              <Icon 
                icon={isMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} 
                className="text-xl drop-shadow-[0_0_8px_rgba(194,0,11,0.8)]" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[190] pointer-events-auto"
            />
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-[#050100] border-l-2 border-[#c2000b]/30 z-[201] pointer-events-auto p-12 flex flex-col pt-24 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-0 inset-x-0 h-32 chassis-mesh opacity-10 pointer-events-none"></div>
              
              <nav className="flex flex-col gap-8 mb-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-black tracking-widest text-gray-400 dark:text-gray-500 hover:text-[#c2000b] dark:hover:text-[#c2000b] transition-all uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-6 mt-auto">
                <div className="sm:hidden flex flex-col gap-4 w-full">
                  <div className="w-full">{children}</div>
                  <Link 
                    href="/build" 
                    onClick={() => setIsMenuOpen(false)}
                    className="relative flex items-center justify-center bg-[#c2000b] text-white px-6 py-3 border-2 border-[#c2000b] rounded-full text-[11px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(194,0,11,0.3)] w-full active:scale-95 transition-transform"
                  >
                    <Icon icon="solar:hammer-bold" className="absolute left-6 text-lg" />
                    START BUILDING
                  </Link>
                </div>
                
                <div className="pt-8 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c2000b] opacity-50 block mb-4">sys://nav/v2.0.4</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

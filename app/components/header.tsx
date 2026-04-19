"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Build a Rig", href: "/build" },
  { label: "Marketplace", href: "#" },
  { label: "Guides", href: "#" },
  { label: "PH Prices", href: "#" },
];

export default function Header({ children }: { children?: React.ReactNode }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] pointer-events-none">
      {/* Industrial Shroud - The visual background of the header, restricted to h-16/20 */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-20 chassis-steel backdrop-blur-md border-b border-black/5 dark:border-white/5 pointer-events-auto" />
      
      <div className="relative z-10 mx-auto w-full h-16 md:h-20 max-w-[1440px] px-4 md:px-16 flex items-center justify-between pointer-events-auto">
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


          <div className="flex items-center gap-3">
          {mounted && (
            <button 
              onClick={toggleTheme}
              className="relative flex items-center w-12 h-6 bg-[#ededed] dark:bg-[var(--chassis-metal)] shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.05)] rounded-full transition-all group cursor-pointer"
              aria-label="Toggle Theme"
            >
              
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
                <div className="relative flex items-center gap-2 bg-[#c2000b] text-white border-2 border-[#c2000b] pl-4 pr-6 py-2 rounded-full text-[11px] font-black uppercase tracking-tighter hover:bg-[#a10009] transition-all shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]">
                  <Icon icon="solar:hammer-bold" className="text-sm" />
                  <span className="hidden xs:inline">START BUILDING</span>
                  <span className="xs:hidden">BUILD</span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-[#c2000b] text-white border-2 border-[#c2000b] rounded-full transition-all active:scale-95 shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]"
            >
              <Icon 
                icon={isMenuOpen ? "lucide:x" : "solar:hamburger-menu-linear"} 
                className="text-xl" 
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[210] pointer-events-auto"
            />
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] z-[220] pointer-events-auto flex flex-col pt-24"
              style={{ filter: "drop-shadow(-10px 0 20px rgba(0,0,0,0.5))" }}
            >
              {/* Internal Mobile Close Button - Physical Top Right */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-12 flex items-center justify-center w-10 h-10 bg-[#ededed] dark:bg-[var(--chassis-metal)] text-black dark:text-white rounded-full transition-all active:scale-95 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.1)] z-[210]"
                aria-label="Close Menu"
              >
                <Icon icon="lucide:x" className="text-xl" />
              </button>

              {/* Red Geometric Border (Underlay) - Only Left Edge Glow */}
              <div 
                className="absolute inset-0 bg-[#c2000b] z-0"
                style={{ 
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 18px 70%, 18px 30%, 0% 25%)" 
                }}
              ></div>

              {/* Main Background Layer - Overlaps Top, Right, Bottom perfectly */}
              <div 
                className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-[#121212] dark:to-[#080808] z-0"
                style={{
                  clipPath: "polygon(2px 0%, 100% 0%, 100% 100%, 2px 100%, 2px 75%, 20px 70%, 20px 30%, 2px 25%)" 
                }}
              >
                <div className="absolute top-0 inset-x-0 h-32 chassis-mesh opacity-10 pointer-events-none"></div>
              </div>
              
              <div className="relative z-10 flex flex-col h-full p-12 pl-16">
                <nav className="flex flex-col gap-8 mb-auto items-end">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-black tracking-widest text-gray-400 dark:text-gray-500 hover:text-[#c2000b] dark:hover:text-[#c2000b] transition-all uppercase text-right"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-6 mt-auto">
                  <div className="sm:hidden flex flex-col gap-4 items-center w-full">
                    <div className="w-full">{children}</div>
                    <Link 
                      href="/build" 
                      onClick={() => setIsMenuOpen(false)}
                      className="relative flex items-center justify-center bg-[#c2000b] text-white px-6 py-3 border-2 border-[#c2000b] rounded-full text-[11px] font-black uppercase tracking-widest shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] w-full active:scale-95 transition-transform"
                    >
                      <Icon icon="solar:hammer-bold" className="absolute left-6 text-lg" />
                      START BUILDING
                    </Link>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Build a Rig", href: "#" },
  { label: "Marketplace", href: "#" },
  { label: "Guides", href: "#" },
  { label: "PH Prices", href: "#" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-20 z-[110] flex items-center bg-transparent pointer-events-none">
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
            <span className="text-xl font-bold tracking-tighter text-white uppercase leading-none">
              Rigko
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Etched into Shroud */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-6 py-2 text-[11px] font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest hover:bg-white/5"
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

          <button className="group relative">
            <div className="absolute inset-0 bg-[#c2000b]/50 blur-xl group-hover:bg-[#ff0000]/70 transition-all rounded-full"></div>
            <div className="relative flex items-center bg-black border-2 border-[#c2000b] text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-tighter hover:bg-[#c2000b] transition-all shadow-[0_0_20px_rgba(194,0,11,0.4)]">
              START BUILDING
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

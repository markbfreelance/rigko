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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-8 w-8 hover:scale-110 transition-transform duration-300">
              <Image 
                src="/rigko-logo.svg" 
                alt="Rigko Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white uppercase">
              Rigko
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all hover:bg-white/5 rounded-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="flex items-center">
            <button className="bg-[#c2000b] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#8b0000] transition-colors shadow-lg shadow-[#c2000b]/20">
              BUILD_NOW
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

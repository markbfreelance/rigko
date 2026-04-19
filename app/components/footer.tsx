"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Build a PC", href: "#" },
      { label: "Part List", href: "#" },
      { label: "Prices", href: "#" },
      { label: "Deals", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

import LightningScreen from "./lightning-screen";

export default function Footer() {
  return (
    <footer className="w-full chassis-steel pt-16 pb-16 relative z-[110] border-t-2 border-[var(--chassis-border)]">
      {/* Structural Hardware Detail (The "Seam") */}
      <div className="absolute top-4 left-6 hex-screw scale-75"></div>
      <div className="absolute top-4 right-6 hex-screw scale-75"></div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 mb-12 pt-12">
          
          {/* LCD Status Screen - Left Panel */}
          <div className="md:col-span-3 lg:col-span-2 relative group">
            <div className="absolute -inset-1 bg-black rounded-lg border-t border-l border-white/5 border-b border-r border-white/10 shadow-2xl"></div>
            <div className="relative bg-[#050100] border-2 border-black rounded-md overflow-hidden shadow-[0_0_40px_rgba(194,0,11,0.1)] p-8">
              {/* High-Voltage Lightning Backdrop */}
              <div className="absolute inset-0">
                <LightningScreen 
                  hue={360}
                  speed={0.5}
                  xOffset={-1.5}
                  intensity={1.6}
                  size={1.4}
                />
              </div>
              {/* Screen CRT Effect Overlay */}
              <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
              
              <Link href="/" className="flex items-center gap-4 mb-6 relative z-10">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 bg-[#c2000b] blur-sm animate-pulse opacity-50"></div>
                  <Image src="/rigko-logo.svg" alt="Rigko Logo" fill className="relative z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white uppercase tracking-tighter text-glow">Rigko</span>
                </div>
              </Link>

              <p className="text-gray-400 text-[11px] font-mono leading-relaxed uppercase opacity-80 mb-8 border-l-2 border-[#c2000b] pl-4">
                INDUSTRIAL_PC_CONFIGURATOR // DATA_DRIVEN_BUILDS // PH_HARDWARE_INDEX.ACCESS_GRANTED.
              </p>

              <div className="flex gap-4 relative z-10">
                {["brandico:github", "brandico:twitter-bird", "brandico:facebook-rect"].map(icon => (
                  <a key={icon} href="#" className="w-10 h-10 border border-[#c2000b]/20 flex items-center justify-center text-[#c2000b] hover:text-white hover:bg-[#c2000b] transition-all bg-black shadow-[inset_0_0_10px_rgba(194,0,11,0.2)]">
                    <Icon icon={icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {footerLinks.map(group => (
            <div key={group.title} className="min-w-0 text-center lg:text-left">
              <h4 className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase mb-6 tracking-[0.2em] transition-colors">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-500 hover:text-[#ff0000] dark:text-gray-600 dark:hover:text-[#ff0000] text-[11px] font-bold transition-colors uppercase tracking-tight">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-8 border-t border-black/10 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             {/* Industrial I/O Ports */}
             <div className="flex gap-2 opacity-50">
               <div className="w-3 h-3 rounded-full io-port"></div>
               <div className="w-3 h-3 rounded-full io-port"></div>
               <div className="w-5 h-2 rounded-sm io-port self-center"></div>
             </div>
             <p className="text-gray-600 text-[9px] font-mono tracking-widest uppercase">
              VERSION: 1.0.4-STABLE // BUILD_CYCLE: {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8 flex-wrap justify-center">
            {["Security", "Status", "Sitemap"].map(link => (
              <a key={link} href="#" className="text-gray-600 hover:text-black dark:hover:text-white text-[10px] uppercase font-bold tracking-tighter">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

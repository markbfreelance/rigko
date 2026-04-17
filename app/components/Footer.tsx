"use client";

import Image from "next/image";
import Link from "next/link";
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
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black pt-20 pb-10 px-4 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative h-6 w-6">
                <Image src="/rigko-logo.svg" alt="Rigko Logo" fill />
              </div>
              <span className="text-xl font-bold text-white uppercase tracking-tight">Rigko</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              The intelligent PC configurator for next-gen builders. Providing real-time market data and precision compatibility for the PH hardware community.
            </p>
            <div className="flex gap-4 mt-8">
              {["brandico:github", "brandico:twitter-bird", "brandico:facebook-rect"].map(icon => (
                <a key={icon} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#c2000b] hover:border-[#c2000b] transition-all">
                  <Icon icon={icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map(group => (
            <div key={group.title}>
              <h4 className="text-white font-bold text-sm uppercase mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-500 hover:text-white text-sm transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Rigko Hardware Systems. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-white text-xs">Security</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs">Status</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { outfit, geistMono } from "./fonts";
import "./globals.css";
import ThemeProvider from "./components/theme-provider";
import RevealObserver from "./components/reveal-observer";
import ChassisFrame from "./components/chassis-frame";
import { Analytics } from "@vercel/analytics/next";

// REFRESH_TRIGGER: kebab-case transition complete
export const metadata: Metadata = {
  title: "Rigko — Premium PC Part Picker & Builder",
  description:
    "Compare PC component prices across Southeast Asian retailers. Build your dream rig with real-time price tracking and compatibility checking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen w-full flex flex-col antialiased selection:bg-[#c2000b] selection:text-white scanlines relative"
        suppressHydrationWarning
      >
        <div className="vignette"></div>
        <RevealObserver />
        <ChassisFrame />
        <ThemeProvider>
          <div className="flex-1 w-full">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

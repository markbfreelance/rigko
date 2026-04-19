import type { Metadata, Viewport } from "next";
import { outfit, geistMono } from "./fonts";
import "./globals.css";
import ThemeProvider from "./components/theme-provider";
import RevealObserver from "./components/reveal-observer";
import ChassisFrame from "./components/chassis-frame";
import VisualEffects from "./components/visual-effects";
import { Analytics } from "@vercel/analytics/next";

// REFRESH_TRIGGER: kebab-case transition complete
const siteUrl = "https://rigko.com";
const description =
  "Compare PC component prices across Southeast Asian retailers. Build your dream rig with real-time price tracking and compatibility checking.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Rigko — Premium PC Part Picker & Builder",
  description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Rigko — Build Your Dream Rig",
    description,
    url: siteUrl,
    siteName: "Rigko",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rigko — Premium PC Part Picker & Builder",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rigko — Build Your Dream Rig",
    description,
    images: ["/og-image.png"],
  },
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
        className="min-h-dvh w-full flex flex-col antialiased selection:bg-[#c2000b] selection:text-white relative"
        suppressHydrationWarning
      >
        <VisualEffects />
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

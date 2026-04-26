import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Reduce dev-server memory footprint: don't preload every page's
    // modules at server start. Pages compile lazily on first request.
    // See node_modules/next/dist/docs/01-app/02-guides/memory-usage.md
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;

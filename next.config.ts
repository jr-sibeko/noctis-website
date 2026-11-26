import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Off: keeps things simple while we build (fixes the new Date() error)
  cacheComponents: false,

  // Connects Tailwind to Next.js (from the original file, do not remove)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Lets the site use photos from Unsplash and Pexels
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;

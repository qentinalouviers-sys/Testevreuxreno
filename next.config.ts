import type { NextConfig } from "next";

/**
 * Export statique activé uniquement pour le déploiement GitHub Pages
 * (variable STATIC_EXPORT=true dans le workflow CI).
 * Par défaut, le projet reste un app Next.js complet (déployable Vercel).
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticExport
    ? { output: "export", basePath, trailingSlash: true }
    : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

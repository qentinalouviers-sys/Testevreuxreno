import type { NextConfig } from "next";

/**
 * Export statique activé pour le déploiement GitHub Pages
 * (STATIC_EXPORT=true dans le workflow CI).
 * Par défaut le projet reste une app Next.js complète (déployable Vercel/Node).
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: "export", basePath, trailingSlash: true } : {}),
  images: {
    unoptimized: isStaticExport,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

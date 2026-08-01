import type { Metadata } from "next";
import "../globals.css";
import { cormorant, jost } from "../fonts";
import { asset } from "@/lib/asset";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} — Huile d'olive vierge extra`,
  description:
    "Al Arifa, huile d'olive vierge extra première pression à froid. Sélectionnez votre langue.",
  robots: { index: false, follow: true },
  icons: { icon: asset("/favicon.svg") },
};

/**
 * Racine du site (`/`) : un second layout racine, distinct de celui des pages
 * localisées, dont le seul rôle est d'accueillir l'écran de choix de langue.
 */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

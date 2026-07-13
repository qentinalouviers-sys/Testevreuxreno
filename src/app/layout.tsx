import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { company, siteUrl } from "@/config/company";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `Rénovation énergétique à Évreux (Eure) | ${company.name}`;
const description =
  "Divisez votre facture de chauffage par 2. Isolation, pompe à chaleur, aides MaPrimeRénov' gérées de A à Z. Artisans certifiés RGE à Évreux et dans tout l'Eure (27). Devis gratuit sous 24h.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${company.name}`,
  },
  description,
  keywords: [
    "rénovation énergétique Évreux",
    "isolation Eure",
    "pompe à chaleur Évreux",
    "MaPrimeRénov Eure",
    "artisan RGE Évreux",
    "aides rénovation Normandie",
  ],
  authors: [{ name: company.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: company.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#1B4332",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}

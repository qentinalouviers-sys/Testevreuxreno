import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_META } from "@/i18n/config";
import { PRODUCERS, PRODUCTS } from "@/lib/marketplace";
import { SITE } from "@/lib/site";

/** Pages publiques uniquement — panier, espace producteur et admin sont exclus. */
const PATHS = [
  "",
  "/produits",
  "/producteurs",
  "/histoire",
  "/vendre",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
  "/cgv",
  ...PRODUCTS.map((p) => `/produits/${p.slug}`),
  ...PRODUCERS.map((p) => `/producteurs/${p.slug}`),
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [LOCALE_META[l].htmlLang, `${SITE.url}/${l}${path}`]),
        ),
      },
    })),
  );
}

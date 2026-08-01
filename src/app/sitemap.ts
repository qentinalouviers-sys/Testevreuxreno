import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_META } from "@/i18n/config";
import { SITE } from "@/lib/site";

/** Pages publiques uniquement — l'espace pro et l'admin sont exclus. */
const PATHS = ["", "/histoire", "/commande", "/contact", "/mentions-legales", "/confidentialite", "/cgv"];

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

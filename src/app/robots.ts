import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/fr/pro", "/en/pro", "/pt/pro", "/ar/pro", "/zh/pro", "/fr/admin", "/en/admin", "/pt/admin", "/ar/admin", "/zh/admin"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

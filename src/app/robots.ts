import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Espaces privés et pages de tunnel : sans intérêt pour l'indexation.
      disallow: ["*/pro", "*/admin", "*/panier", "*/commande"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { PRODUCT } from "@/lib/catalog";
import { SITE } from "@/lib/site";

/** Données structurées produit + organisation, pour les moteurs de recherche. */
export function JsonLd() {
  const { t, locale } = useLocale();

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phoneDisplay,
        description: t.meta.description,
        address: {
          "@type": "PostalAddress",
          addressCountry: "PT",
          addressRegion: SITE.address.region,
        },
      },
      {
        "@type": "Product",
        name: `${t.product.name} — ${t.product.variant}`,
        description: t.product.description,
        sku: PRODUCT.sku,
        category: t.product.subtitle,
        image: `${SITE.url}${PRODUCT.image}`,
        brand: { "@type": "Brand", name: SITE.name },
        countryOfOrigin: "PT",
        offers: {
          "@type": "Offer",
          price: PRODUCT.retailPrice,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/${locale}/commande`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

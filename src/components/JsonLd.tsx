"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { getProducer, getProductBySlug } from "@/lib/marketplace";
import { SITE } from "@/lib/site";

/** Organisation + place de marché, pour la page d'accueil. */
export function JsonLd() {
  const { t } = useLocale();

  const data = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Fiche produit structurée. Le vendeur déclaré est le producteur, pas la
 * plateforme : c'est lui qui vend sous sa marque.
 */
export function ProductJsonLd({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const product = getProductBySlug(slug);
  const producer = product ? getProducer(product.producerId) : undefined;
  if (!product || !producer) return null;

  const copy = t.catalogData.products[product.id as keyof typeof t.catalogData.products];

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${producer.name}`,
    description: copy?.description,
    sku: product.id,
    category: t.catalog.categories[product.category],
    ...(product.image ? { image: `${SITE.url}${product.image}` } : {}),
    brand: { "@type": "Brand", name: producer.name },
    countryOfOrigin: producer.country,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/${locale}/produits/${product.slug}`,
      seller: { "@type": "Organization", name: producer.name },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

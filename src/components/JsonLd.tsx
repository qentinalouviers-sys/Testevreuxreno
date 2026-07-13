import { company, siteUrl } from "@/config/company";
import { faq } from "@/data/faq";

/** LocalBusiness — profil de l'entreprise pour Google. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: company.name,
    description: `${company.tagline}. Artisans certifiés RGE, spécialistes de l'isolation, des pompes à chaleur et des aides MaPrimeRénov'.`,
    url: siteUrl,
    telephone: company.phone.href,
    email: company.email,
    priceRange: "€€",
    image: `${siteUrl}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.address.geo.latitude,
      longitude: company.address.geo.longitude,
    },
    areaServed: company.serviceAreas.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: company.openingHoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.rating.value,
      reviewCount: company.rating.count,
      bestRating: 5,
    },
    foundingDate: String(company.foundedYear),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage — rich snippet des questions/réponses. */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

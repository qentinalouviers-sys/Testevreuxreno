/** Coordonnées et réglages globaux de la maison Al Arifa. */

export const SITE = {
  name: "Al Arifa",
  legalName: "Al Arifa",
  domain: "al-arifa.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://al-arifa.com",
  email: "contact@al-arifa.com",
  phone: "+33600000000",
  phoneDisplay: "+33 6 00 00 00 00",
  /** Numéro WhatsApp au format international sans « + » ni espaces. */
  whatsapp: "33600000000",
  address: {
    country: "Portugal",
    region: "Alentejo",
  },
  social: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

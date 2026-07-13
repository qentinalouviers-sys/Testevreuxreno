/**
 * Configuration centrale de l'entreprise.
 * Un seul endroit à modifier pour changer nom, coordonnées, certifications…
 */

export const company = {
  name: "NormaRénov",
  legalName: "NormaRénov SARL",
  tagline: "Rénovation énergétique à Évreux et dans l'Eure",
  foundedYear: 2012,

  // ── Contact ──────────────────────────────────────────────
  phone: {
    display: "02 32 00 00 00",
    // Format E.164 sans espaces pour les liens tel:
    href: "+33232000000",
  },
  email: "contact@normarenov.fr",

  address: {
    street: "12 rue de la Harpe",
    postalCode: "27000",
    city: "Évreux",
    region: "Normandie",
    department: "Eure (27)",
    country: "France",
    // Coordonnées géographiques d'Évreux (pour le JSON-LD LocalBusiness)
    geo: {
      latitude: 49.0241,
      longitude: 1.1508,
    },
  },

  // ── Horaires d'ouverture ─────────────────────────────────
  hours: [
    { days: "Lundi – Vendredi", time: "8h30 – 18h30" },
    { days: "Samedi", time: "9h00 – 12h00" },
    { days: "Dimanche", time: "Fermé" },
  ],
  // Format schema.org openingHours
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:30" },
    { days: ["Saturday"], opens: "09:00", closes: "12:00" },
  ],

  // ── Réassurance / chiffres clés ──────────────────────────
  rating: {
    value: 4.9,
    count: 127,
    googleUrl: "https://www.google.com/search?q=normarenov+evreux+avis",
  },

  // ── Certifications ───────────────────────────────────────
  certifications: [
    { label: "RGE Qualibat", detail: "Reconnu Garant de l'Environnement" },
    { label: "MaPrimeRénov'", detail: "Mandataire agréé" },
    { label: "Qualifelec", detail: "Installations électriques" },
  ],

  // ── Zone d'intervention ──────────────────────────────────
  serviceAreas: [
    "Évreux",
    "Louviers",
    "Vernon",
    "Bernay",
    "Val-de-Reuil",
    "Gaillon",
    "Pacy-sur-Eure",
    "Verneuil d'Avre et d'Iton",
  ],

  // ── Réseaux / liens ──────────────────────────────────────
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },

  // ── SIRET / mentions légales (placeholders) ──────────────
  legal: {
    siret: "000 000 000 00000",
    rcs: "RCS Évreux 000 000 000",
    capital: "10 000 €",
    tva: "FR00000000000",
    insurance: "MAAF Pro — Assurance décennale n° 0000000",
    director: "Le gérant",
    dpoEmail: "rgpd@normarenov.fr",
    hostName: "Vercel Inc.",
    hostAddress: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  },
} as const;

export type Company = typeof company;

/** URL publique du site (sans slash final). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.normarenov.fr"
).replace(/\/$/, "");

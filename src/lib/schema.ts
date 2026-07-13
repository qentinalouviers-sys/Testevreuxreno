import { z } from "zod";

// ── Options des étapes du formulaire ──────────────────────────
export const projectTypes = [
  "Isolation",
  "Pompe à chaleur",
  "Chauffe-eau thermodynamique",
  "Fenêtres / menuiseries",
  "Ventilation (VMC)",
  "Rénovation globale",
] as const;

export const housingTypes = ["Maison individuelle", "Appartement"] as const;

export const constructionPeriods = ["Avant 1990", "Après 1990"] as const;

export const ownerStatuses = ["Propriétaire", "Locataire"] as const;

// ── Schéma par étape ──────────────────────────────────────────
export const stepSchemas = [
  z.object({
    projectType: z.enum(projectTypes, {
      required_error: "Sélectionnez un type de projet.",
    }),
  }),
  z.object({
    housingType: z.enum(housingTypes, {
      required_error: "Sélectionnez votre type de logement.",
    }),
    constructionPeriod: z.enum(constructionPeriods, {
      required_error: "Indiquez la période de construction.",
    }),
  }),
  z.object({
    ownerStatus: z.enum(ownerStatuses, {
      required_error: "Précisez votre statut.",
    }),
    postalCode: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "Code postal invalide (5 chiffres)."),
  }),
  z.object({
    firstName: z.string().trim().min(2, "Indiquez votre prénom."),
    lastName: z.string().trim().min(2, "Indiquez votre nom."),
    phone: z
      .string()
      .trim()
      .regex(
        /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
        "Numéro de téléphone invalide."
      ),
    email: z.string().trim().email("Adresse email invalide."),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Le consentement est requis." }),
    }),
    // Honeypot anti-spam : doit rester vide.
    company: z.string().max(0).optional(),
  }),
] as const;

// ── Schéma complet (validation serveur) ───────────────────────
export const leadSchema = z.object({
  projectType: z.enum(projectTypes),
  housingType: z.enum(housingTypes),
  constructionPeriod: z.enum(constructionPeriods),
  ownerStatus: z.enum(ownerStatuses),
  postalCode: z.string().regex(/^\d{5}$/),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  consent: z.literal(true),
  company: z.string().max(0).optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

/** Valeurs par défaut du formulaire (état 100 % en mémoire). */
export const defaultLeadValues: Partial<LeadFormData> = {
  postalCode: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  consent: undefined,
  company: "",
};

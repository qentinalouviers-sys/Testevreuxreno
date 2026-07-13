export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number; // 1–5
  date: string; // format libre, affiché tel quel
  text: string;
  /** Initiales affichées dans l'avatar (fallback sans photo). */
  initials: string;
  /** Couleur de fond de l'avatar (classe utilitaire Tailwind). */
  avatarColor: string;
};

/**
 * Avis clients — structure calquée sur l'API Google Places
 * (author_name, rating, text, relative_time_description).
 * Remplaçable plus tard par un appel API sans toucher aux composants.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Sylvie M.",
    city: "Évreux",
    rating: 5,
    date: "il y a 2 semaines",
    text: "Isolation des combles et pompe à chaleur installées en 3 jours. L'équipe a monté tout le dossier MaPrimeRénov' à notre place, on n'a rien eu à gérer. Facture de chauffage divisée par deux cet hiver !",
    initials: "SM",
    avatarColor: "bg-[#2D6A4F]",
  },
  {
    id: "r2",
    name: "Thierry L.",
    city: "Louviers",
    rating: 5,
    date: "il y a 1 mois",
    text: "Très professionnel du premier contact à la fin du chantier. Devis clair, aucun surcoût, artisans ponctuels et soigneux. Je recommande sans hésiter pour une rénovation dans l'Eure.",
    initials: "TL",
    avatarColor: "bg-[#1B4332]",
  },
  {
    id: "r3",
    name: "Nathalie B.",
    city: "Vernon",
    rating: 5,
    date: "il y a 1 mois",
    text: "Nous avions peur de la paperasse pour les aides. NormaRénov a tout pris en charge : nous avons touché plus de 9 000 € de MaPrimeRénov'. Chauffe-eau thermodynamique nickel.",
    initials: "NB",
    avatarColor: "bg-[#F4A261] text-[#1B4332]",
  },
  {
    id: "r4",
    name: "Jean-Pierre D.",
    city: "Bernay",
    rating: 5,
    date: "il y a 2 mois",
    text: "Remplacement de ma vieille chaudière fioul par une PAC air/eau. Résultat au top, maison bien plus confortable. Entreprise locale et sérieuse, ça change tout.",
    initials: "JD",
    avatarColor: "bg-[#2D6A4F]",
  },
  {
    id: "r5",
    name: "Corinne F.",
    city: "Val-de-Reuil",
    rating: 5,
    date: "il y a 2 mois",
    text: "Audit énergétique très complet, on a enfin compris par où commencer. Conseils honnêtes, pas de vente forcée. On a fait l'isolation en priorité, exactement comme conseillé.",
    initials: "CF",
    avatarColor: "bg-[#1B4332]",
  },
  {
    id: "r6",
    name: "Marc et Isabelle R.",
    city: "Évreux",
    rating: 5,
    date: "il y a 3 mois",
    text: "Changement des fenêtres et VMC double flux. Plus aucun courant d'air, la maison est saine et silencieuse. Chantier propre, équipe agréable. Un grand merci.",
    initials: "MR",
    avatarColor: "bg-[#F4A261] text-[#1B4332]",
  },
  {
    id: "r7",
    name: "Philippe G.",
    city: "Gaillon",
    rating: 4,
    date: "il y a 3 mois",
    text: "Bon travail sur l'isolation des murs par l'extérieur. Léger retard sur le planning à cause de la météo, mais prévenu à l'avance. Résultat impeccable et bien fini.",
    initials: "PG",
    avatarColor: "bg-[#2D6A4F]",
  },
  {
    id: "r8",
    name: "Aurélie T.",
    city: "Pacy-sur-Eure",
    rating: 5,
    date: "il y a 4 mois",
    text: "Interlocuteur unique du début à la fin, on se sent accompagnés. Le simulateur d'aides était juste, on a eu exactement le montant annoncé. Parfait pour une première rénovation.",
    initials: "AT",
    avatarColor: "bg-[#1B4332]",
  },
  {
    id: "r9",
    name: "Didier H.",
    city: "Vernon",
    rating: 5,
    date: "il y a 5 mois",
    text: "Pompe à chaleur et isolation des combles perdus. Économies visibles dès le premier mois. Des artisans RGE compétents et à l'écoute, je les recommande à mes voisins.",
    initials: "DH",
    avatarColor: "bg-[#2D6A4F]",
  },
];

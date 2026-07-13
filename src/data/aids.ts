export type AidTier = {
  profile: string;
  incomeHint: string;
  color: string; // classe de fond de l'étiquette
  maPrimeRenov: string;
  example: string;
};

/** Profils de revenus MaPrimeRénov' (barème indicatif, à titre d'exemple). */
export const aidTiers: AidTier[] = [
  {
    profile: "Revenus très modestes",
    incomeHint: "Profil « Bleu »",
    color: "bg-[#1B4332]",
    maPrimeRenov: "Jusqu'à 90 % du montant HT",
    example: "PAC air/eau : jusqu'à 5 000 € + CEE",
  },
  {
    profile: "Revenus modestes",
    incomeHint: "Profil « Jaune »",
    color: "bg-[#2D6A4F]",
    maPrimeRenov: "Jusqu'à 75 % du montant HT",
    example: "PAC air/eau : jusqu'à 4 000 € + CEE",
  },
  {
    profile: "Revenus intermédiaires",
    incomeHint: "Profil « Violet »",
    color: "bg-[#B5838D]",
    maPrimeRenov: "Jusqu'à 60 % du montant HT",
    example: "PAC air/eau : jusqu'à 3 000 € + CEE",
  },
  {
    profile: "Revenus supérieurs",
    incomeHint: "Profil « Rose »",
    color: "bg-[#F4A261]",
    maPrimeRenov: "CEE + éco-PTZ",
    example: "Prime CEE + prêt à taux zéro",
  },
];

export type AidScheme = {
  name: string;
  description: string;
};

export const aidSchemes: AidScheme[] = [
  {
    name: "MaPrimeRénov'",
    description:
      "L'aide principale de l'État, versée par l'Anah. Son montant dépend de vos revenus et du gain énergétique des travaux. Accessible à tous les propriétaires.",
  },
  {
    name: "Certificats d'Économie d'Énergie (CEE)",
    description:
      "Une prime financée par les fournisseurs d'énergie, cumulable avec MaPrimeRénov'. Déduite directement de votre devis, sans condition de revenus.",
  },
  {
    name: "Éco-prêt à taux zéro",
    description:
      "Un prêt sans intérêts jusqu'à 50 000 € pour financer le reste à charge de vos travaux de rénovation, remboursable sur 20 ans maximum.",
  },
];

export type Stat = {
  /** Valeur cible pour le compteur animé. */
  value: number;
  /** Nombre de décimales à afficher. */
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 850, suffix: "+", label: "chantiers réalisés dans l'Eure" },
  { value: 1.2, decimals: 1, suffix: " M€", label: "d'aides obtenues pour nos clients" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "sur Google (127 avis vérifiés)" },
  { value: 12, suffix: " ans", label: "d'expertise locale à Évreux" },
];

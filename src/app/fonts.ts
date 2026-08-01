import { Cormorant_Garamond, Jost } from "next/font/google";

/** Serif de titrage — l'écho typographique du lettrage gravé sur le bidon. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  // Deux graisses suffisent au titrage : chaque graisse supplémentaire
  // ajoute un fichier préchargé pour rien.
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Grotesque géométrique pour les libellés en petites capitales espacées. */
export const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jost",
  display: "swap",
});

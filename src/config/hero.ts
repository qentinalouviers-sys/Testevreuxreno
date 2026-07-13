/**
 * Média du hero (haut de page).
 *
 * Pour un vrai effet vidéo cinématique :
 *   1. Déposez votre clip dans `public/hero/hero.mp4`
 *      (idéalement : plan drone d'une maison, chantier, ou pompe à chaleur —
 *       muet, 8–15 s, boucle fluide, < 6 Mo, 1080p).
 *      Optionnel : `public/hero/hero.webm` pour un poids réduit.
 *   2. Renseignez `videoSrc` ci-dessous (ex. "/hero/hero.mp4").
 *
 * Tant que `videoSrc` est vide, le hero utilise la photo (poster) avec
 * exactement la même chorégraphie au scroll.
 */
export const heroMedia = {
  /** Chemin local ("/hero/hero.mp4") ou URL absolue. Vide = photo seule. */
  videoSrc: "",
  /** Format WebM optionnel (servi en priorité s'il est présent). */
  videoSrcWebm: "",
  /** Image affichée en fond + poster de la vidéo (chargement instantané). */
  poster:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80",
  alt: "Maison individuelle rénovée en Normandie",
} as const;

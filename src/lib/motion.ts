import type { Variants } from "framer-motion";

/** Courbe d'accélération « premium » réutilisée partout. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Reveal simple : fondu + translation vers le haut. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Conteneur qui décale l'apparition de ses enfants (grids). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Enfant d'un stagger (card, badge…). */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

/** Apparition mot par mot du titre hero. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

/** Réglage viewport standard : une seule fois, déclenché avant le bord. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

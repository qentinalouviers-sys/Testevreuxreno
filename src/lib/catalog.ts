/** Référentiel produit — source unique pour le site et l'espace pro. */

export const PRODUCT = {
  sku: "ALA-HERITAGE-5L",
  /** Prix public conseillé TTC, en euros. */
  retailPrice: 89,
  /** Prix de base professionnel HT, en euros (avant remise client). */
  tradeBasePrice: 62,
  volumeLitres: 5,
  /**
   * Visuel détouré (fond transparent) généré par `npm run product:cutout`
   * à partir de `assets/al-arifa-5l-source.jpeg`.
   */
  image: "/product/al-arifa-5l.webp",
  imageWidth: 1000,
  imageHeight: 1526,
} as const;

/** Paliers dégressifs indicatifs appliqués par défaut à un compte pro sans tarif négocié. */
export const TRADE_TIERS: { min: number; price: number }[] = [
  { min: 144, price: 52 },
  { min: 48, price: 56 },
  { min: 12, price: 59 },
  { min: 1, price: PRODUCT.tradeBasePrice },
];

/** Prix unitaire HT pour une quantité, hors tarif personnalisé. */
export function tierPrice(quantity: number): number {
  const tier = TRADE_TIERS.find((t) => quantity >= t.min);
  return tier ? tier.price : PRODUCT.tradeBasePrice;
}

/**
 * Prix unitaire retenu pour un compte : le tarif négocié en admin s'il existe,
 * sinon le palier dégressif correspondant à la quantité.
 */
export function unitPriceFor(quantity: number, customPrice?: number | null): number {
  if (typeof customPrice === "number" && customPrice > 0) return customPrice;
  return tierPrice(quantity);
}

/** Remise en % par rapport au prix public conseillé. */
export function discountPercent(price: number): number {
  return Math.round((1 - price / PRODUCT.retailPrice) * 100);
}

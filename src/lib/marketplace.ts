/**
 * Modèle de la place de marché.
 *
 * Chaque producteur vend sous sa propre marque. Un panier peut donc contenir
 * des articles de plusieurs producteurs, et le paiement se scinde en autant de
 * virements que de producteurs concernés — c'est le modèle Stripe Connect
 * « separate charges and transfers » : un seul PaymentIntent encaissé par la
 * plateforme, puis un `transfer` par producteur, reliés par un `transfer_group`.
 *
 * Rien n'est refacturé : la commission est prélevée à la source sur chaque
 * virement, elle n'est jamais une créance à recouvrer auprès du producteur.
 */

/** Part de la plateforme, en pourcentage, par défaut. Ajustable par producteur en admin. */
export const DEFAULT_COMMISSION_RATE = 30;

/** Frais Stripe indicatifs pour une carte européenne, portés par la plateforme. */
export const STRIPE_FEE = { percent: 1.5, fixed: 0.25 } as const;

export type Category = "huile" | "miel" | "epices" | "fruits-secs" | "sel" | "olives";

export type Producer = {
  id: string;
  slug: string;
  /** Marque commerciale du producteur — jamais traduite. */
  name: string;
  country: string;
  region: string;
  /** Code pays ISO pour le drapeau. */
  flag: "pt" | "ma" | "tn" | "es" | "it" | "gr";
  founded: string;
  /** Taux de commission de la plateforme, en %. */
  commissionRate: number;
  /** État de l'onboarding Stripe Connect du producteur. */
  payouts: "active" | "pending" | "none";
  /** Franco de port, en euros, propre à chaque producteur. */
  freeShippingFrom: number;
  shippingCost: number;
};

export type Product = {
  id: string;
  slug: string;
  producerId: string;
  /** Nom commercial — conservé dans sa langue d'origine, comme sur l'étiquette. */
  name: string;
  category: Category;
  format: string;
  /** Prix public TTC en euros. */
  price: number;
  /** Prix professionnel HT, à partir de 12 unités. */
  tradePrice: number;
  image?: string;
  featured?: boolean;
};

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export const PRODUCERS: Producer[] = [
  {
    id: "al-arifa",
    slug: "al-arifa",
    name: "Al Arifa",
    country: "Portugal",
    region: "Alentejo",
    flag: "pt",
    founded: "1898",
    commissionRate: 30,
    payouts: "active",
    freeShippingFrom: 180,
    shippingCost: 12,
  },
  {
    id: "kerkennah",
    slug: "domaine-kerkennah",
    name: "Domaine Kerkennah",
    country: "Tunisie",
    region: "Sfax",
    flag: "tn",
    founded: "1954",
    commissionRate: 30,
    payouts: "active",
    freeShippingFrom: 150,
    shippingCost: 14,
  },
  {
    id: "cedres",
    slug: "miel-des-cedres",
    name: "Miel des Cèdres",
    country: "Maroc",
    region: "Moyen Atlas",
    flag: "ma",
    founded: "1987",
    commissionRate: 28,
    payouts: "active",
    freeShippingFrom: 120,
    shippingCost: 11,
  },
  {
    id: "taliouine",
    slug: "safran-de-taliouine",
    name: "Safran de Taliouine",
    country: "Maroc",
    region: "Souss-Massa",
    flag: "ma",
    founded: "1976",
    commissionRate: 30,
    payouts: "active",
    freeShippingFrom: 90,
    shippingCost: 9,
  },
  {
    id: "ronda",
    slug: "almendras-de-ronda",
    name: "Almendras de Ronda",
    country: "Espagne",
    region: "Andalousie",
    flag: "es",
    founded: "1921",
    commissionRate: 30,
    payouts: "pending",
    freeShippingFrom: 140,
    shippingCost: 10,
  },
  {
    id: "trapani",
    slug: "sale-di-trapani",
    name: "Sale di Trapani",
    country: "Italie",
    region: "Sicile",
    flag: "it",
    founded: "1834",
    commissionRate: 32,
    payouts: "active",
    freeShippingFrom: 100,
    shippingCost: 10,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "arifa-5l",
    slug: "al-arifa-selection-heritage-5l",
    producerId: "al-arifa",
    name: "Sélection Héritage",
    category: "huile",
    format: "5 L",
    price: 89,
    tradePrice: 62,
    image: "/product/al-arifa-5l.webp",
    featured: true,
  },
  {
    id: "arifa-500",
    slug: "al-arifa-selection-heritage-500ml",
    producerId: "al-arifa",
    name: "Sélection Héritage",
    category: "huile",
    format: "500 ml",
    price: 19,
    tradePrice: 13,
    image: "/product/al-arifa-5l.webp",
  },
  {
    id: "kerkennah-bio",
    slug: "kerkennah-chetoui-bio",
    producerId: "kerkennah",
    name: "Chétoui Bio",
    category: "huile",
    format: "750 ml",
    price: 26,
    tradePrice: 18,
    featured: true,
  },
  {
    id: "kerkennah-olives",
    slug: "kerkennah-olives-meslalla",
    producerId: "kerkennah",
    name: "Olives Meslalla",
    category: "olives",
    format: "400 g",
    price: 12,
    tradePrice: 8,
  },
  {
    id: "cedres-cedre",
    slug: "miel-de-cedre",
    producerId: "cedres",
    name: "Miel de Cèdre",
    category: "miel",
    format: "250 g",
    price: 34,
    tradePrice: 24,
    featured: true,
  },
  {
    id: "cedres-oranger",
    slug: "miel-fleur-d-oranger",
    producerId: "cedres",
    name: "Miel Fleur d'Oranger",
    category: "miel",
    format: "250 g",
    price: 22,
    tradePrice: 15,
  },
  {
    id: "taliouine-safran",
    slug: "safran-filaments-premiere-categorie",
    producerId: "taliouine",
    name: "Safran Filaments",
    category: "epices",
    format: "2 g",
    price: 42,
    tradePrice: 30,
    featured: true,
  },
  {
    id: "taliouine-ras",
    slug: "ras-el-hanout-vingt-sept-epices",
    producerId: "taliouine",
    name: "Ras el-Hanout",
    category: "epices",
    format: "80 g",
    price: 16,
    tradePrice: 11,
  },
  {
    id: "ronda-marcona",
    slug: "amandes-marcona",
    producerId: "ronda",
    name: "Almendra Marcona",
    category: "fruits-secs",
    format: "500 g",
    price: 24,
    tradePrice: 17,
  },
  {
    id: "ronda-huile",
    slug: "huile-d-amande-douce",
    producerId: "ronda",
    name: "Aceite de Almendra",
    category: "huile",
    format: "250 ml",
    price: 29,
    tradePrice: 20,
  },
  {
    id: "trapani-fleur",
    slug: "fleur-de-sel-de-trapani",
    producerId: "trapani",
    name: "Fiore di Sale",
    category: "sel",
    format: "200 g",
    price: 14,
    tradePrice: 9,
    featured: true,
  },
  {
    id: "trapani-herbes",
    slug: "sel-aux-herbes-de-sicile",
    producerId: "trapani",
    name: "Sale alle Erbe",
    category: "sel",
    format: "150 g",
    price: 11,
    tradePrice: 7,
  },
];

export const CATEGORIES: Category[] = ["huile", "miel", "epices", "fruits-secs", "sel", "olives"];

/* ------------------------------------------------------------------ */
/* Accès catalogue                                                     */
/* ------------------------------------------------------------------ */

export function getProducer(id: string): Producer | undefined {
  return PRODUCERS.find((p) => p.id === id);
}

export function getProducerBySlug(slug: string): Producer | undefined {
  return PRODUCERS.find((p) => p.slug === slug);
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByProducer(producerId: string): Product[] {
  return PRODUCTS.filter((p) => p.producerId === producerId);
}

export function featuredProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

/* ------------------------------------------------------------------ */
/* Répartition                                                         */
/* ------------------------------------------------------------------ */

const round = (value: number) => Math.round(value * 100) / 100;

export type Split = {
  /** Montant payé par le client pour ce producteur, port compris. */
  gross: number;
  /** Part reversée au producteur. */
  producer: number;
  /** Part conservée par la plateforme, avant frais Stripe. */
  platform: number;
  commissionRate: number;
};

/**
 * Répartit un montant entre producteur et plateforme.
 * Les frais de port sont reversés intégralement au producteur : c'est lui qui
 * expédie, il serait absurde de lui en prélever une commission.
 */
export function splitAmount(goodsTotal: number, shipping: number, commissionRate: number): Split {
  const platform = round((goodsTotal * commissionRate) / 100);
  return {
    gross: round(goodsTotal + shipping),
    producer: round(goodsTotal - platform + shipping),
    platform,
    commissionRate,
  };
}

/** Frais Stripe indicatifs sur un encaissement, portés par la plateforme. */
export function stripeFee(amount: number): number {
  return round((amount * STRIPE_FEE.percent) / 100 + STRIPE_FEE.fixed);
}

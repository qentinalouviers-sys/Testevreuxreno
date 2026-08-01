"use client";

import {
  getProducer,
  getProduct,
  splitAmount,
  stripeFee,
  type Producer,
  type Product,
  type Split,
} from "./marketplace";

const KEY = "alarifa.cart.v1";

export type CartLine = { productId: string; quantity: number };

/** Un groupe = tout ce qu'un même producteur doit expédier, avec sa répartition. */
export type CartGroup = {
  producer: Producer;
  lines: { product: Product; quantity: number; total: number }[];
  goods: number;
  shipping: number;
  total: number;
  split: Split;
};

export type CartSummary = {
  groups: CartGroup[];
  itemCount: number;
  goods: number;
  shipping: number;
  total: number;
  /** Somme des parts producteurs — autant de virements Stripe à émettre. */
  producersTotal: number;
  /** Part plateforme avant frais d'encaissement. */
  platformTotal: number;
  /** Frais Stripe estimés sur l'encaissement unique. */
  fee: number;
  /** Part plateforme nette des frais. */
  platformNet: number;
};

const isBrowser = () => typeof window !== "undefined";
const round = (v: number) => Math.round(v * 100) / 100;

export function readCart(): CartLine[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    // Un produit retiré du catalogue ne doit pas bloquer tout le panier.
    return parsed.filter((l) => l && typeof l.productId === "string" && getProduct(l.productId));
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent("alarifa:cart"));
}

export function subscribeCart(listener: () => void): () => void {
  if (!isBrowser()) return () => {};
  const onStorage = (e: StorageEvent) => e.key === KEY && listener();
  window.addEventListener("alarifa:cart", listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("alarifa:cart", listener);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Regroupe le panier par producteur et calcule la répartition.
 * Chaque groupe donnera lieu à un virement Stripe distinct : c'est cette
 * structure qui sera envoyée au backend le jour où le paiement sera branché.
 */
export function summarize(lines: CartLine[]): CartSummary {
  const byProducer = new Map<string, CartGroup>();

  for (const line of lines) {
    const product = getProduct(line.productId);
    if (!product || line.quantity < 1) continue;
    const producer = getProducer(product.producerId);
    if (!producer) continue;

    let group = byProducer.get(producer.id);
    if (!group) {
      group = {
        producer,
        lines: [],
        goods: 0,
        shipping: 0,
        total: 0,
        split: { gross: 0, producer: 0, platform: 0, commissionRate: producer.commissionRate },
      };
      byProducer.set(producer.id, group);
    }

    const total = round(product.price * line.quantity);
    group.lines.push({ product, quantity: line.quantity, total });
    group.goods = round(group.goods + total);
  }

  const groups = [...byProducer.values()];
  for (const group of groups) {
    group.shipping =
      group.goods >= group.producer.freeShippingFrom ? 0 : group.producer.shippingCost;
    group.total = round(group.goods + group.shipping);
    group.split = splitAmount(group.goods, group.shipping, group.producer.commissionRate);
  }

  const goods = round(groups.reduce((s, g) => s + g.goods, 0));
  const shipping = round(groups.reduce((s, g) => s + g.shipping, 0));
  const total = round(goods + shipping);
  const producersTotal = round(groups.reduce((s, g) => s + g.split.producer, 0));
  const platformTotal = round(groups.reduce((s, g) => s + g.split.platform, 0));
  const fee = total > 0 ? stripeFee(total) : 0;

  return {
    groups,
    itemCount: lines.reduce((s, l) => s + l.quantity, 0),
    goods,
    shipping,
    total,
    producersTotal,
    platformTotal,
    fee,
    platformNet: round(platformTotal - fee),
  };
}

/* ------------------------------------------------------------------ */
/* Mutations                                                           */
/* ------------------------------------------------------------------ */

export function addLine(productId: string, quantity = 1): void {
  const lines = readCart();
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + quantity);
  } else {
    lines.push({ productId, quantity: Math.min(99, Math.max(1, quantity)) });
  }
  writeCart(lines);
}

export function setLineQuantity(productId: string, quantity: number): void {
  const lines = readCart();
  if (quantity < 1) {
    writeCart(lines.filter((l) => l.productId !== productId));
    return;
  }
  const existing = lines.find((l) => l.productId === productId);
  if (!existing) return;
  existing.quantity = Math.min(99, quantity);
  writeCart(lines);
}

export function removeLine(productId: string): void {
  writeCart(readCart().filter((l) => l.productId !== productId));
}

export function clearCart(): void {
  writeCart([]);
}

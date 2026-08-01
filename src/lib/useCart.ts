"use client";

import { useEffect, useMemo, useState } from "react";
import { readCart, subscribeCart, summarize, type CartLine, type CartSummary } from "./cart";

const EMPTY: CartSummary = {
  groups: [],
  itemCount: 0,
  goods: 0,
  shipping: 0,
  total: 0,
  producersTotal: 0,
  platformTotal: 0,
  fee: 0,
  platformNet: 0,
};

/**
 * Panier réactif. `ready` reste faux tant que localStorage n'a pas été lu :
 * le premier rendu doit être identique au HTML pré-généré, sinon l'hydratation
 * diverge et React se plaint.
 */
export function useCart(): { summary: CartSummary; lines: CartLine[]; ready: boolean } {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    setReady(true);
    return subscribeCart(sync);
  }, []);

  const summary = useMemo(() => (ready ? summarize(lines) : EMPTY), [lines, ready]);

  return { summary, lines, ready };
}

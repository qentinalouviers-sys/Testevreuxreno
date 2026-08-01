"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "../ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";
import { addLine } from "@/lib/cart";
import type { Product } from "@/lib/marketplace";

export function AddToCart({ product }: { product: Product }) {
  const { t, href } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const clamp = (v: number) => Math.min(99, Math.max(1, v));

  function add() {
    addLine(product.id, quantity);
    setAdded(true);
    // La confirmation s'efface d'elle-même : pas de pop-up à fermer.
    window.setTimeout(() => setAdded(false), 3200);
  }

  return (
    <div>
      <label
        htmlFor="qty"
        className="mb-3 block text-[0.6rem] uppercase tracking-[0.22em] text-cream-mute"
      >
        {t.product.quantity}
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center border border-gold-500/25">
          <button
            type="button"
            onClick={() => setQuantity((q) => clamp(q - 1))}
            disabled={quantity <= 1}
            aria-label="-"
            className="p-3.5 text-gold-300 transition-colors hover:bg-gold-500/10 disabled:opacity-30"
          >
            <Minus className="size-3.5" strokeWidth={1.5} />
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(clamp(Number(e.target.value) || 1))}
            className="w-14 border-x border-gold-500/25 bg-transparent py-3 text-center
                       font-display text-xl text-cream focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => clamp(q + 1))}
            aria-label="+"
            className="p-3.5 text-gold-300 transition-colors hover:bg-gold-500/10"
          >
            <Plus className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>

        <Button size="lg" onClick={add} className="flex-1 sm:flex-none">
          <ShoppingBag className="size-3.5" strokeWidth={1.5} />
          {t.product.addToCart}
        </Button>
      </div>

      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-wrap items-center gap-4"
          >
            <span className="inline-flex items-center gap-2.5 text-sm text-olive-300">
              <Check className="size-3.5" strokeWidth={2.5} />
              {t.product.added}
            </span>
            <Link
              href={href("/panier")}
              className="text-[0.68rem] uppercase tracking-[0.18em] text-gold-300
                         underline-offset-4 transition-colors hover:text-gold-100 hover:underline"
            >
              {t.product.viewCart}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCart } from "@/lib/useCart";

/** Accès au panier dans l'en-tête, avec le nombre d'articles. */
export function CartButton() {
  const { t, href } = useLocale();
  const { summary, ready } = useCart();
  const count = summary.itemCount;

  return (
    <Link
      href={href("/panier")}
      aria-label={`${t.a11y.openCart}${ready && count > 0 ? ` — ${count} ${t.a11y.itemsInCart}` : ""}`}
      className="group relative flex size-9 items-center justify-center rounded-[2px]
                 border border-ink/14 text-ink-soft transition-colors duration-400
                 hover:border-gold-600/60 hover:text-gold-700"
    >
      <ShoppingBag className="size-4" strokeWidth={1.25} />
      <AnimatePresence>
        {ready && count > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -end-1.5 -top-1.5 flex min-w-4 items-center justify-center
                       rounded-full bg-gradient-to-r from-gold-600 to-gold-400 px-1
                       text-[0.55rem] font-medium leading-4 text-ink"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

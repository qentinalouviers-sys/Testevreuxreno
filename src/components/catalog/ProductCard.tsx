"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Flag } from "../ui/Flag";
import { Rosette } from "../ui/Wordmark";
import { useLocale } from "@/i18n/LocaleProvider";
import { asset } from "@/lib/asset";
import { getProducer, type Product } from "@/lib/marketplace";
import { cn } from "@/lib/cn";

/**
 * Vignette produit. La marque du producteur est affichée aussi visiblement que
 * le produit : c'est lui qui vend, la plateforme n'est qu'une vitrine.
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { t, href, price } = useLocale();
  const producer = getProducer(product.producerId);
  const copy = t.catalogData.products[product.id as keyof typeof t.catalogData.products];

  return (
    <Link
      href={href(`/produits/${product.slug}`)}
      className={cn(
        "group flex h-full flex-col border border-ink/10 bg-white",
        "transition-all duration-600 hover:border-gold-600/50 hover:bg-paper-2",
        className,
      )}
    >
      {/* Visuel */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <div
          aria-hidden
          className="glow-gold absolute inset-0 opacity-25 blur-2xl transition-opacity duration-700 group-hover:opacity-45"
        />
        {product.image ? (
          <Image
            src={asset(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
            className="relative z-10 object-contain p-7 transition-transform duration-[1.1s] group-hover:scale-[1.04]"
          />
        ) : (
          // Faute de photo, on affiche la rosace : mieux qu'un carré gris.
          <span className="relative z-10 flex h-full items-center justify-center">
            <Rosette className="size-20 text-gold-400 transition-transform duration-[1.4s] group-hover:rotate-45" />
          </span>
        )}
      </div>

      {/* Texte */}
      <div className="flex flex-1 flex-col border-t border-ink/8 p-5">
        {producer && (
          <span className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-gold-600">
            <Flag code={producer.flag} className="h-2.5 w-[15px]" />
            {producer.name}
          </span>
        )}

        <h3 className="mt-2.5 font-display text-xl leading-tight text-ink">{product.name}</h3>
        <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-mute">{copy?.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <span>
            <span className="block font-display text-2xl text-gold-700">{price(product.price)}</span>
            <span className="mt-0.5 block text-[0.6rem] uppercase tracking-[0.16em] text-ink-mute">
              {product.format}
            </span>
          </span>
          <ArrowRight
            className="mb-1 size-4 shrink-0 text-gold-600 transition-all duration-500
                       group-hover:translate-x-1 group-hover:text-gold-600
                       rtl:rotate-180 rtl:group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </Link>
  );
}

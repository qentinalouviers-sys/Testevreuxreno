"use client";

import { ArrowRight, Info } from "lucide-react";
import { Flag } from "../ui/Flag";
import { useLocale } from "@/i18n/LocaleProvider";
import type { CartSummary } from "@/lib/cart";

/**
 * Rend visible la répartition du paiement : combien part chez chaque
 * producteur, combien reste à la plateforme. C'est l'argument de la maison,
 * autant l'afficher au client comme au producteur.
 */
export function SplitBreakdown({ summary }: { summary: CartSummary }) {
  const { t, price } = useLocale();
  if (summary.groups.length === 0) return null;

  return (
    <div className="border border-gold-500/20 bg-ink-900/50 p-6 sm:p-8">
      <p className="eyebrow">{t.split.title}</p>
      <p className="mt-3.5 text-sm leading-relaxed text-cream-mute">{t.split.subtitle}</p>

      <ul className="mt-7 space-y-px bg-gold-500/10">
        {summary.groups.map((group) => (
          <li
            key={group.producer.id}
            className="flex flex-wrap items-center justify-between gap-3 bg-ink-950 px-4 py-3.5"
          >
            <span className="flex items-center gap-2.5 text-sm text-cream">
              <Flag code={group.producer.flag} className="h-2.5 w-[15px]" />
              {group.producer.name}
            </span>
            <span className="flex items-center gap-3 text-sm">
              <span className="text-cream-mute">{price(group.total)}</span>
              <ArrowRight className="size-3 text-gold-600 rtl:rotate-180" strokeWidth={1.5} />
              <span className="text-olive-300">{price(group.split.producer)}</span>
              <span className="text-[0.58rem] uppercase tracking-[0.14em] text-cream-mute/70">
                −{group.split.commissionRate} % {t.split.commission}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-7 space-y-3 border-t border-gold-500/12 pt-6 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-cream-mute">
            {t.split.producerShare}
            <span className="ms-2 text-[0.6rem] uppercase tracking-[0.14em] text-cream-mute/60">
              {summary.groups.length} {t.split.transfers}
            </span>
          </dt>
          <dd className="font-display text-xl text-olive-300">{price(summary.producersTotal)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-cream-mute">{t.split.platformShare}</dt>
          <dd className="font-display text-xl text-gold-200">{price(summary.platformTotal)}</dd>
        </div>
      </dl>

      <p className="mt-6 flex items-start gap-3 text-[0.72rem] leading-relaxed text-cream-mute/80">
        <Info className="mt-0.5 size-3.5 shrink-0 text-gold-500/70" strokeWidth={1.5} />
        <span>
          {t.split.explain} {t.split.shippingNote}
        </span>
      </p>
    </div>
  );
}

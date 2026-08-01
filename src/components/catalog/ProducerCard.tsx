"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Flag } from "../ui/Flag";
import { Rosette } from "../ui/Wordmark";
import { useLocale } from "@/i18n/LocaleProvider";
import { productsByProducer, type Producer } from "@/lib/marketplace";

export function ProducerCard({ producer }: { producer: Producer }) {
  const { t, href } = useLocale();
  const copy = t.catalogData.producers[producer.id as keyof typeof t.catalogData.producers];
  const count = productsByProducer(producer.id).length;

  return (
    <Link
      href={href(`/producteurs/${producer.slug}`)}
      className="group flex h-full flex-col border border-gold-500/15 bg-ink-900/40 p-7
                 transition-all duration-600 hover:border-gold-400/45 hover:bg-ink-850 sm:p-8"
    >
      <span className="flex items-start justify-between gap-4">
        <Rosette className="size-9 text-gold-500/55 transition-transform duration-[1.4s] group-hover:rotate-45" />
        <Flag code={producer.flag} className="mt-1 h-3.5 w-[21px]" />
      </span>

      <h3 className="mt-6 font-display text-2xl text-cream">{producer.name}</h3>
      <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-gold-400/80">
        {producer.region} · {producer.country}
      </p>

      <div className="mt-5 h-px w-10 bg-gold-500/35 transition-all duration-600 group-hover:w-20 group-hover:bg-gold-400/70" />

      <p className="mt-5 text-sm leading-relaxed text-cream-mute">{copy?.bio}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-7">
        <span className="text-[0.62rem] uppercase tracking-[0.16em] text-cream-mute">
          {t.producers.since} {producer.founded} · {count} {t.producers.products}
        </span>
        <ArrowRight
          className="size-4 shrink-0 text-gold-500/60 transition-all duration-500
                     group-hover:translate-x-1 group-hover:text-gold-300
                     rtl:rotate-180 rtl:group-hover:-translate-x-1"
          strokeWidth={1.5}
        />
      </div>

      {producer.payouts === "active" && (
        <span className="mt-4 inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.14em] text-olive-300">
          <Check className="size-3" strokeWidth={2.5} />
          {t.producers.payoutsActive}
        </span>
      )}
    </Link>
  );
}

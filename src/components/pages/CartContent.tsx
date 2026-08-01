"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Package, Plus, Trash2, Truck } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { ButtonLink } from "../ui/Button";
import { Flag } from "../ui/Flag";
import { Rosette } from "../ui/Wordmark";
import { SplitBreakdown } from "../cart/SplitBreakdown";
import { useLocale } from "@/i18n/LocaleProvider";
import { asset } from "@/lib/asset";
import { removeLine, setLineQuantity } from "@/lib/cart";
import { useCart } from "@/lib/useCart";

export function CartContent() {
  const { t, href, price } = useLocale();
  const { summary, ready } = useCart();

  if (!ready) {
    return (
      <PageHero eyebrow={t.cart.eyebrow} title={t.cart.title}>
        <div className="mx-auto h-64 w-full max-w-3xl animate-pulse border border-ink/8 bg-white" />
      </PageHero>
    );
  }

  if (summary.groups.length === 0) {
    return (
      <>
        <PageHero eyebrow={t.cart.eyebrow} title={t.cart.title} />
        <section className="pb-24 sm:pb-32">
          <Container size="narrow">
            <div className="flex flex-col items-center border border-ink/10 bg-white px-6 py-20 text-center">
              <Rosette className="size-12 text-gold-500" />
              <p className="mt-7 text-ink-mute">{t.cart.empty}</p>
              <ButtonLink href={href("/produits")} size="lg" className="mt-8">
                {t.cart.emptyCta}
              </ButtonLink>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const multi = summary.groups.length > 1;

  return (
    <>
      <PageHero eyebrow={t.cart.eyebrow} title={t.cart.title} />

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          {multi && (
            <p className="mb-8 flex items-start gap-3.5 border border-ink/14 bg-gold-500/[0.08] px-5 py-4 text-sm leading-relaxed text-gold-700">
              <Package className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
              {t.cart.multiProducerNote}
            </p>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start lg:gap-10">
            {/* Lignes, groupées par maison */}
            <div className="space-y-6">
              {summary.groups.map((group) => (
                <div key={group.producer.id} className="border border-ink/10 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/8 px-5 py-4">
                    <Link
                      href={href(`/producteurs/${group.producer.slug}`)}
                      className="group flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-gold-700"
                    >
                      <Flag code={group.producer.flag} className="h-2.5 w-[15px]" />
                      <span className="text-[0.6rem] uppercase tracking-[0.18em] text-ink-mute">
                        {t.cart.shippedBy}
                      </span>
                      <span className="font-display text-lg">{group.producer.name}</span>
                    </Link>
                    <span className="text-[0.6rem] uppercase tracking-[0.16em] text-ink-mute">
                      {group.shipping === 0 ? (
                        <span className="text-olive-600">{t.cart.freeShipping}</span>
                      ) : (
                        <>
                          {t.cart.shipping} {price(group.shipping)}
                        </>
                      )}
                    </span>
                  </div>

                  <ul className="divide-y divide-ink/8">
                    {group.lines.map(({ product, quantity, total }) => (
                      <li key={product.id} className="flex gap-4 p-5">
                        <Link
                          href={href(`/produits/${product.slug}`)}
                          className="relative size-20 shrink-0 border border-ink/8 bg-paper"
                        >
                          {product.image ? (
                            <Image
                              src={asset(product.image)}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-contain p-2"
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center">
                              <Rosette className="size-8 text-gold-500/30" />
                            </span>
                          )}
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col gap-3">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                href={href(`/produits/${product.slug}`)}
                                className="block truncate font-display text-lg text-ink transition-colors hover:text-gold-700"
                              >
                                {product.name}
                              </Link>
                              <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.14em] text-ink-mute">
                                {product.format} · {price(product.price)}
                              </p>
                            </div>
                            <span className="font-display text-lg text-gold-700">
                              {price(total)}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-ink/14">
                              <button
                                type="button"
                                onClick={() => setLineQuantity(product.id, quantity - 1)}
                                aria-label="-"
                                className="p-2.5 text-gold-600 transition-colors hover:bg-ink/10"
                              >
                                <Minus className="size-3" strokeWidth={1.5} />
                              </button>
                              <span className="w-9 text-center text-sm text-ink">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => setLineQuantity(product.id, quantity + 1)}
                                aria-label="+"
                                className="p-2.5 text-gold-600 transition-colors hover:bg-ink/10"
                              >
                                <Plus className="size-3" strokeWidth={1.5} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLine(product.id)}
                              className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:text-ruby-500"
                            >
                              <Trash2 className="size-3" strokeWidth={1.5} />
                              {t.cart.remove}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Totaux */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="border border-ink/12 bg-white p-6 sm:p-7">
                <dl className="space-y-3.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-mute">{t.cart.goods}</dt>
                    <dd className="text-ink">{price(summary.goods)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-mute">{t.cart.shipping}</dt>
                    <dd className="text-ink">
                      {summary.shipping === 0 ? (
                        <span className="text-olive-600">{t.cart.freeShipping}</span>
                      ) : (
                        price(summary.shipping)
                      )}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-ink/14 pt-4">
                    <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-gold-600">
                      {t.cart.total}
                    </dt>
                    <dd className="font-display text-3xl text-gold-700">{price(summary.total)}</dd>
                  </div>
                </dl>

                <p className="mt-5 inline-flex items-center gap-2.5 text-xs text-ink-mute">
                  <Truck className="size-3.5 shrink-0" strokeWidth={1.5} />
                  {summary.groups.length} {t.cart.parcels} · {t.cart.parcelNote}
                </p>

                <ButtonLink href={href("/commande")} size="lg" className="mt-7 w-full">
                  {t.cart.checkout}
                  <ArrowRight
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    strokeWidth={1.5}
                  />
                </ButtonLink>

                <Link
                  href={href("/produits")}
                  className="mt-4 block text-center text-[0.64rem] uppercase tracking-[0.16em] text-ink-mute transition-colors hover:text-gold-700"
                >
                  {t.cart.continue}
                </Link>
              </div>

              <SplitBreakdown summary={summary} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Button, ButtonLink } from "../ui/Button";
import { Flag } from "../ui/Flag";
import { Rosette } from "../ui/Wordmark";
import { PaymentMethods, type PaymentMethodId } from "../PaymentMethods";
import { PaymentModal } from "../PaymentModal";
import { SplitBreakdown } from "../cart/SplitBreakdown";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCart } from "@/lib/useCart";

export function CheckoutContent() {
  const { t, href, price } = useLocale();
  const { summary, ready } = useCart();
  const [method, setMethod] = useState<PaymentMethodId | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (!ready) {
    return (
      <PageHero eyebrow={t.checkout.eyebrow} title={t.checkout.title}>
        <div className="mx-auto h-64 w-full max-w-3xl animate-pulse border border-ink/8 bg-white" />
      </PageHero>
    );
  }

  if (summary.groups.length === 0) {
    return (
      <>
        <PageHero eyebrow={t.checkout.eyebrow} title={t.checkout.title} />
        <section className="pb-24 sm:pb-32">
          <Container size="narrow">
            <div className="flex flex-col items-center border border-ink/10 bg-white px-6 py-20 text-center">
              <Rosette className="size-12 text-gold-500" />
              <p className="mt-7 text-ink-mute">{t.checkout.empty}</p>
              <ButtonLink href={href("/produits")} size="lg" className="mt-8">
                {t.checkout.emptyCta}
              </ButtonLink>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={t.checkout.eyebrow}
        title={t.checkout.title}
        subtitle={t.checkout.subtitle}
      />

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
            {/* Récapitulatif */}
            <div className="space-y-6">
              <div className="border border-ink/10 bg-white p-6 sm:p-8">
                <p className="eyebrow">{t.checkout.summary}</p>

                <div className="mt-7 space-y-6">
                  {summary.groups.map((group) => (
                    <div key={group.producer.id}>
                      <Link
                        href={href(`/producteurs/${group.producer.slug}`)}
                        className="flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-gold-700"
                      >
                        <Flag code={group.producer.flag} className="h-2.5 w-[15px]" />
                        <span className="font-display text-lg">{group.producer.name}</span>
                      </Link>
                      <ul className="mt-3 space-y-2 border-s border-ink/10 ps-4">
                        {group.lines.map(({ product, quantity, total }) => (
                          <li
                            key={product.id}
                            className="flex justify-between gap-4 text-[0.82rem] text-ink-mute"
                          >
                            <span className="min-w-0 truncate">
                              {quantity} × {product.name}{" "}
                              <span className="text-ink-mute/80">({product.format})</span>
                            </span>
                            <span className="shrink-0 text-ink-soft">{price(total)}</span>
                          </li>
                        ))}
                        <li className="flex justify-between gap-4 text-[0.78rem] text-ink-mute">
                          <span>{t.cart.shipping}</span>
                          <span>
                            {group.shipping === 0 ? t.cart.freeShipping : price(group.shipping)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>

                <dl className="mt-8 space-y-3 border-t border-ink/12 pt-6 text-sm">
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

                <p className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-ink-mute">
                  <Package className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
                  {t.checkout.deliveryNote} {t.cart.parcelNote}
                </p>
              </div>

              <SplitBreakdown summary={summary} />
            </div>

            {/* Paiement */}
            <div className="lg:sticky lg:top-28">
              <div className="border border-ink/10 bg-white p-6 sm:p-8">
                <p className="eyebrow">{t.checkout.payment.title}</p>
                <p className="mt-3.5 text-sm text-ink-mute">{t.checkout.payment.subtitle}</p>

                <div className="mt-7">
                  <PaymentMethods value={method} onChange={setMethod} />
                </div>

                <Button size="lg" className="mt-8 w-full" onClick={() => setModalOpen(true)}>
                  {t.checkout.payment.cta} — {price(summary.total)}
                  <ArrowRight
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    strokeWidth={1.5}
                  />
                </Button>

                <Link
                  href={href("/panier")}
                  className="mt-4 block text-center text-[0.64rem] uppercase tracking-[0.16em] text-ink-mute transition-colors hover:text-gold-700"
                >
                  {t.nav.cart}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

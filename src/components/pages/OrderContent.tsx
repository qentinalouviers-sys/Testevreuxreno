"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, Minus, Plus, Truck, Lock } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Reveal } from "../ui/Reveal";
import { Eyebrow, Lozenge } from "../ui/SectionHeading";
import { Button, ButtonLink } from "../ui/Button";
import { PaymentMethods, type PaymentMethodId } from "../PaymentMethods";
import { PaymentModal } from "../PaymentModal";
import { useLocale } from "@/i18n/LocaleProvider";
import { asset } from "@/lib/asset";
import { PRODUCT, tierPrice, discountPercent } from "@/lib/catalog";
import { cn } from "@/lib/cn";

type Audience = "b2c" | "b2b";

export function OrderContent() {
  const { t, href, price } = useLocale();
  const [audience, setAudience] = useState<Audience>("b2c");
  const [quantity, setQuantity] = useState(1);
  const [method, setMethod] = useState<PaymentMethodId | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const unit = PRODUCT.retailPrice;
  const subtotal = useMemo(() => unit * quantity, [unit, quantity]);

  const clamp = (value: number) => Math.min(999, Math.max(1, value));

  return (
    <>
      <PageHero eyebrow={t.order.eyebrow} title={t.order.title} subtitle={t.order.subtitle}>
        {/* Sélecteur particulier / professionnel */}
        <div
          role="tablist"
          aria-label={t.order.title}
          className="mx-auto flex w-full max-w-md border border-gold-500/25 p-1"
        >
          {(["b2c", "b2b"] as Audience[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={audience === key}
              onClick={() => setAudience(key)}
              className={cn(
                "relative flex-1 px-4 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-500",
                audience === key ? "text-ink-950" : "text-cream-dim hover:text-gold-200",
              )}
            >
              {audience === key && (
                <motion.span
                  layoutId="order-tab"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
                />
              )}
              <span className="relative z-10">{t.order.tabs[key]}</span>
            </button>
          ))}
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <AnimatePresence mode="wait">
            {audience === "b2c" ? (
              <motion.div
                key="b2c"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
              >
                {/* Visuel produit */}
                <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
                  <div aria-hidden className="glow-gold absolute inset-[-16%] opacity-45 blur-2xl" />
                  <div aria-hidden className="absolute inset-2 border border-gold-500/15" />
                  <Image
                    src={asset(PRODUCT.image)}
                    alt={t.meta.ogAlt}
                    width={PRODUCT.imageWidth}
                    height={PRODUCT.imageHeight}
                    sizes="(max-width: 1024px) 70vw, 32vw"
                    className="relative z-10 h-auto w-full p-6 drop-shadow-[0_30px_55px_rgba(0,0,0,0.85)]"
                  />
                </div>

                {/* Configurateur */}
                <div>
                  <Eyebrow>{t.order.b2c.title}</Eyebrow>
                  <h2 className="mt-5 text-3xl sm:text-4xl">{t.order.summary.product}</h2>
                  <p className="mt-5 max-w-xl text-pretty leading-relaxed text-cream-mute">
                    {t.order.b2c.text}
                  </p>

                  <div className="mt-9 flex items-end justify-between border-b border-gold-500/15 pb-5">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] text-cream-mute">
                      {t.order.b2c.priceLabel}
                    </span>
                    <span className="font-display text-3xl text-gold-200">{price(unit)}</span>
                  </div>

                  {/* Quantité */}
                  <div className="mt-8">
                    <label
                      htmlFor="quantity"
                      className="text-[0.6rem] uppercase tracking-[0.22em] text-cream-mute"
                    >
                      {t.order.b2c.quantityLabel}
                    </label>
                    <div className="mt-3 flex w-fit items-center border border-gold-500/25">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => clamp(q - 1))}
                        aria-label="-"
                        className="p-3.5 text-gold-300 transition-colors hover:bg-gold-500/10 disabled:opacity-30"
                        disabled={quantity <= 1}
                      >
                        <Minus className="size-3.5" strokeWidth={1.5} />
                      </button>
                      <input
                        id="quantity"
                        type="number"
                        min={1}
                        max={999}
                        value={quantity}
                        onChange={(e) => setQuantity(clamp(Number(e.target.value) || 1))}
                        className="w-16 border-x border-gold-500/25 bg-transparent py-3 text-center
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

                    <p className="mt-4 inline-flex items-center gap-2.5 text-xs text-olive-300">
                      <Truck className="size-3.5" strokeWidth={1.5} />
                      {t.order.b2c.shipping}
                    </p>
                  </div>

                  {/* Récapitulatif */}
                  <div className="mt-10 border border-gold-500/18 bg-ink-900/50 p-6 sm:p-8">
                    <p className="eyebrow">{t.order.summary.title}</p>
                    <dl className="mt-6 space-y-3.5 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-cream-mute">{t.order.summary.unit}</dt>
                        <dd className="text-cream">{price(unit)}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-cream-mute">{t.order.summary.quantity}</dt>
                        <dd className="text-cream">{quantity}</dd>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-gold-500/12 pt-3.5">
                        <dt className="text-cream-mute">{t.order.summary.subtotal}</dt>
                        <dd className="text-cream">{price(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between gap-4 text-xs">
                        <dt className="text-cream-mute/70">{t.order.summary.vat}</dt>
                        <dd className="text-cream-mute/70">—</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-t border-gold-500/25 pt-4">
                        <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-gold-400">
                          {t.order.summary.total}
                        </dt>
                        <dd className="font-display text-2xl text-gold-200">{price(subtotal)}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Paiement */}
                  <div className="mt-10">
                    <p className="eyebrow">{t.order.payment.title}</p>
                    <p className="mt-3 text-sm text-cream-mute">{t.order.payment.subtitle}</p>
                    <div className="mt-6">
                      <PaymentMethods value={method} onChange={setMethod} />
                    </div>

                    <Button
                      size="lg"
                      className="mt-7 w-full"
                      onClick={() => setModalOpen(true)}
                    >
                      {t.order.payment.cta}
                      <ArrowRight
                        className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        strokeWidth={1.5}
                      />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="b2b"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              >
                <div>
                  <Eyebrow>{t.order.b2b.title}</Eyebrow>
                  <h2 className="mt-5 text-3xl sm:text-4xl">{t.btob.title}</h2>
                  <p className="mt-5 max-w-xl text-pretty leading-relaxed text-cream-mute">
                    {t.order.b2b.text}
                  </p>

                  {/* Paliers */}
                  <div className="mt-10">
                    <p className="eyebrow mb-5">{t.order.b2b.tiersTitle}</p>
                    <div className="divide-y divide-gold-500/12 border border-gold-500/18">
                      {t.order.b2b.tiers.map((tier, i) => {
                        // Les trois premiers paliers ont un prix indicatif ;
                        // le conteneur est traité au cas par cas.
                        const indicative = [144, 48, 12][i];
                        const p = indicative ? tierPrice(indicative) : null;
                        return (
                          <div
                            key={tier.qty}
                            className="flex flex-wrap items-center justify-between gap-3 bg-ink-900/40 px-5 py-4 sm:px-7"
                          >
                            <div className="flex items-center gap-4">
                              <Lozenge className="opacity-70" />
                              <div>
                                <p className="text-sm text-cream">{tier.qty}</p>
                                {p && (
                                  <p className="mt-0.5 text-[0.68rem] text-cream-mute">{tier.note}</p>
                                )}
                              </div>
                            </div>
                            {p ? (
                              <div className="text-end">
                                <p className="font-display text-xl text-gold-200">{price(p)}</p>
                                <p className="text-[0.6rem] uppercase tracking-[0.16em] text-olive-300">
                                  −{discountPercent(p)} %
                                </p>
                              </div>
                            ) : (
                              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-gold-400">
                                {tier.note}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-5 text-xs leading-relaxed text-cream-mute">
                      {t.order.b2b.tiersFootnote}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <ButtonLink href={href("/pro")} size="lg">
                      <Lock className="size-3.5" strokeWidth={1.5} />
                      {t.order.b2b.cta}
                    </ButtonLink>
                    <ButtonLink href={href("/pro")} variant="outline" size="lg">
                      {t.order.b2b.ctaAlt}
                    </ButtonLink>
                  </div>
                </div>

                {/* Avantages pro */}
                <div className="flex flex-col gap-px self-start bg-gold-500/12">
                  {t.btob.bullets.map((bullet, i) => (
                    <Reveal key={bullet} delay={i * 0.06}>
                      <p className="flex items-start gap-4 bg-ink-950 px-6 py-5 text-sm leading-relaxed text-cream-dim">
                        <Lozenge className="mt-1.5 shrink-0" />
                        {bullet}
                      </p>
                    </Reveal>
                  ))}
                  <div className="bg-ink-950 px-6 py-7">
                    <p className="eyebrow">{t.order.payment.title}</p>
                    <div className="mt-5">
                      <PaymentMethods
                        value={method}
                        onChange={setMethod}
                        onPick={() => setModalOpen(true)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

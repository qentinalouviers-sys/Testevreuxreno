"use client";

import Link from "next/link";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/SectionHeading";
import { Flag } from "../ui/Flag";
import { Rosette } from "../ui/Wordmark";
import { ProducerCard } from "../catalog/ProducerCard";
import { ProductCard } from "../catalog/ProductCard";
import { useLocale } from "@/i18n/LocaleProvider";
import { PRODUCERS, getProducerBySlug, productsByProducer } from "@/lib/marketplace";

/** Liste des maisons référencées. */
export function ProducersContent() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.producers.eyebrow}
        title={t.producers.title}
        subtitle={t.producers.subtitle}
      />

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCERS.map((producer, i) => (
              <Reveal key={producer.id} delay={Math.min(i, 5) * 0.07} className="h-full">
                <ProducerCard producer={producer} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

/** Page de marque d'une maison : c'est sa vitrine, pas la nôtre. */
export function ProducerContent({ slug }: { slug: string }) {
  const { t, href, price } = useLocale();
  const producer = getProducerBySlug(slug);

  if (!producer) {
    return (
      <Container className="flex min-h-[60svh] flex-col items-center justify-center pt-32 text-center">
        <Rosette className="size-12 text-gold-500/50" />
        <h1 className="mt-8 text-3xl">{t.producers.notFound}</h1>
        <Link
          href={href("/producteurs")}
          className="mt-8 inline-flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.18em] text-gold-300 hover:text-gold-100"
        >
          <ArrowLeft className="size-3 rtl:rotate-180" strokeWidth={1.5} />
          {t.producers.backToProducers}
        </Link>
      </Container>
    );
  }

  const copy = t.catalogData.producers[producer.id as keyof typeof t.catalogData.producers];
  const products = productsByProducer(producer.id);
  const payoutsActive = producer.payouts === "active";

  return (
    <>
      <section className="grain relative overflow-hidden pt-[calc(68px+3.5rem)] pb-16 sm:pt-[calc(80px+5rem)] sm:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,#14120f_0%,#080807_55%,#040403_100%)]"
        />
        <div
          aria-hidden
          className="glow-gold pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-[38rem] opacity-30 blur-3xl"
        />

        <Container className="relative">
          <Link
            href={href("/producteurs")}
            className="inline-flex items-center gap-2.5 text-[0.62rem] uppercase tracking-[0.18em] text-cream-mute transition-colors hover:text-gold-200"
          >
            <ArrowLeft className="size-3 rtl:rotate-180" strokeWidth={1.5} />
            {t.producers.backToProducers}
          </Link>

          <div className="mt-10 flex flex-col items-center text-center">
            <Rosette className="size-12 text-gold-400" />

            <h1 className="mt-7 text-4xl text-gold-gradient sm:text-6xl">{producer.name}</h1>

            <p className="mt-4 inline-flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.22em] text-gold-400/85">
              <Flag code={producer.flag} className="h-3 w-[18px]" />
              {producer.region} · {producer.country}
            </p>

            <div className="mt-7 h-px w-24 rule-gold" />

            <p className="mt-7 max-w-xl text-pretty leading-relaxed text-cream-mute">
              {copy?.bio}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="border border-gold-500/25 px-4 py-2 text-[0.58rem] uppercase tracking-[0.16em] text-cream-dim">
                {t.producers.since} {producer.founded}
              </span>
              <span
                className={
                  payoutsActive
                    ? "inline-flex items-center gap-2 border border-olive-500/45 px-4 py-2 text-[0.58rem] uppercase tracking-[0.16em] text-olive-300"
                    : "inline-flex items-center gap-2 border border-gold-500/40 px-4 py-2 text-[0.58rem] uppercase tracking-[0.16em] text-gold-300"
                }
              >
                {payoutsActive ? (
                  <Check className="size-3" strokeWidth={2.5} />
                ) : (
                  <Clock className="size-3" strokeWidth={2} />
                )}
                {payoutsActive ? t.producers.payoutsActive : t.producers.payoutsPending}
              </span>
              <span className="border border-gold-500/25 px-4 py-2 text-[0.58rem] uppercase tracking-[0.16em] text-cream-dim">
                {t.product.freeShippingFrom} {price(producer.freeShippingFrom)}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <Eyebrow>{t.producers.theirProducts}</Eyebrow>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 5) * 0.07} className="h-full">
                <ProductCard product={product} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/SectionHeading";
import { Flag } from "../ui/Flag";
import { Rosette } from "../ui/Wordmark";
import { AddToCart } from "../catalog/AddToCart";
import { ProductCard } from "../catalog/ProductCard";
import { useLocale } from "@/i18n/LocaleProvider";
import { asset } from "@/lib/asset";
import { getProducer, getProductBySlug, productsByProducer } from "@/lib/marketplace";

export function ProductContent({ slug }: { slug: string }) {
  const { t, href, price } = useLocale();
  const product = getProductBySlug(slug);
  const producer = product ? getProducer(product.producerId) : undefined;

  if (!product || !producer) {
    return (
      <Container className="flex min-h-[60svh] flex-col items-center justify-center pt-32 text-center">
        <Rosette className="size-12 text-gold-500/50" />
        <h1 className="mt-8 text-3xl">{t.product.notFound}</h1>
        <Link
          href={href("/produits")}
          className="mt-8 inline-flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.18em] text-gold-300 hover:text-gold-100"
        >
          <ArrowLeft className="size-3 rtl:rotate-180" strokeWidth={1.5} />
          {t.product.backToCatalog}
        </Link>
      </Container>
    );
  }

  const copy = t.catalogData.products[product.id as keyof typeof t.catalogData.products];
  const producerCopy = t.catalogData.producers[producer.id as keyof typeof t.catalogData.producers];
  const siblings = productsByProducer(producer.id).filter((p) => p.id !== product.id);

  const specs = [
    { label: t.product.producer, value: producer.name },
    { label: t.product.origin, value: `${producer.region}, ${producer.country}` },
    { label: t.product.category, value: t.catalog.categories[product.category] },
    { label: t.product.format, value: product.format },
  ];

  return (
    <>
      <section className="grain relative overflow-hidden pt-[calc(68px+3rem)] pb-16 sm:pt-[calc(80px+4rem)] sm:pb-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,#14120f_0%,#080807_55%,#040403_100%)]"
        />

        <Container size="wide" className="relative">
          <Link
            href={href("/produits")}
            className="inline-flex items-center gap-2.5 text-[0.62rem] uppercase tracking-[0.18em] text-cream-mute transition-colors hover:text-gold-200"
          >
            <ArrowLeft className="size-3 rtl:rotate-180" strokeWidth={1.5} />
            {t.product.backToCatalog}
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            {/* Visuel */}
            <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] w-full">
                <div aria-hidden className="glow-gold absolute inset-[-12%] opacity-45 blur-2xl" />
                <div aria-hidden className="absolute inset-0 border border-gold-500/20" />
                <div aria-hidden className="absolute inset-2.5 border border-gold-500/10" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {product.image ? (
                    <Image
                      src={asset(product.image)}
                      alt={product.name}
                      width={1000}
                      height={1526}
                      priority
                      sizes="(max-width: 1024px) 80vw, 34vw"
                      className="relative z-10 h-full w-auto object-contain drop-shadow-[0_32px_60px_rgba(0,0,0,0.85)]"
                    />
                  ) : (
                    <Rosette className="relative z-10 size-32 text-gold-500/30" />
                  )}
                </div>
              </div>
            </div>

            {/* Détail */}
            <div>
              <Link
                href={href(`/producteurs/${producer.slug}`)}
                className="inline-flex items-center gap-2.5 text-[0.62rem] uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-200"
              >
                <Flag code={producer.flag} className="h-3 w-[18px]" />
                {producer.name}
              </Link>

              <h1 className="mt-5 text-4xl sm:text-5xl">{product.name}</h1>
              <p className="mt-4 font-display text-lg italic text-gold-300/85">{copy?.tagline}</p>

              <div className="my-8 h-px w-full rule-gold" />

              <p className="text-pretty leading-relaxed text-cream-mute">{copy?.description}</p>

              <dl className="mt-9 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-b border-gold-500/10 py-3"
                  >
                    <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-cream-mute">
                      {spec.label}
                    </dt>
                    <dd className="text-end text-sm text-cream">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex items-end justify-between gap-6 border-b border-gold-500/15 pb-6">
                <span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-cream-mute">
                    {t.product.price}
                  </span>
                  <span className="mt-1.5 block font-display text-4xl text-gold-200">
                    {price(product.price)}
                  </span>
                </span>
                <span className="text-end">
                  <span className="block text-[0.58rem] uppercase tracking-[0.16em] text-cream-mute">
                    {t.product.tradePrice}
                  </span>
                  <span className="mt-1 block font-display text-xl text-cream-dim">
                    {price(product.tradePrice)}
                  </span>
                </span>
              </div>
              <p className="mt-3 text-[0.7rem] leading-relaxed text-cream-mute/80">
                {t.product.tradeNote}
              </p>

              <div className="mt-9">
                <AddToCart product={product} />
              </div>

              <p className="mt-7 inline-flex items-center gap-2.5 text-xs text-olive-300">
                <Truck className="size-3.5" strokeWidth={1.5} />
                {t.product.shipping} · {t.product.freeShippingFrom}{" "}
                {price(producer.freeShippingFrom)}
              </p>

              {/* La maison, rappelée sous le produit */}
              <div className="mt-10 border border-gold-500/15 bg-ink-900/40 p-6">
                <span className="flex items-center gap-3">
                  <Rosette className="size-7 text-gold-500/60" />
                  <span className="font-display text-lg text-cream">{producer.name}</span>
                </span>
                <p className="mt-3.5 text-sm leading-relaxed text-cream-mute">{producerCopy?.bio}</p>
                <Link
                  href={href(`/producteurs/${producer.slug}`)}
                  className="mt-5 inline-block text-[0.62rem] uppercase tracking-[0.18em] text-gold-300 underline-offset-4 transition-colors hover:text-gold-100 hover:underline"
                >
                  {t.producers.discover}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {siblings.length > 0 && (
        <section className="border-t border-gold-500/12 py-20 sm:py-24">
          <Container size="wide">
            <Eyebrow>{t.product.otherProducts}</Eyebrow>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.07} className="h-full">
                  <ProductCard product={p} className="h-full" />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

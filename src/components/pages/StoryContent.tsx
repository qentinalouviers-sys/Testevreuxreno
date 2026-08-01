"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Reveal } from "../ui/Reveal";
import { Eyebrow, Lozenge } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { Rosette } from "../ui/Wordmark";
import { useLocale } from "@/i18n/LocaleProvider";
import { asset } from "@/lib/asset";
import { getProduct } from "@/lib/marketplace";

/** Le bidon de la maison fondatrice, en rappel visuel. */
const FOUNDING_PRODUCT = getProduct("arifa-5l");

export function StoryContent() {
  const { t, href } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.story.eyebrow}
        title={<span className="text-gold-gradient">{t.story.title}</span>}
        subtitle={t.story.lead}
      />

      {/* Chronologie */}
      <section className="relative py-8 sm:py-14">
        <Container size="narrow">
          <ol className="relative">
            {/* Filet vertical reliant les chapitres */}
            <span
              aria-hidden
              className="absolute inset-y-4 start-[7px] w-px bg-gradient-to-b
                         from-transparent via-gold-500/30 to-transparent sm:start-[9px]"
            />

            {t.story.chapters.map((chapter, i) => (
              <li key={chapter.year} className="relative ps-10 pb-14 last:pb-0 sm:ps-14">
                <Reveal delay={i * 0.05}>
                  <span
                    aria-hidden
                    className="absolute start-0 top-2 flex size-4 items-center justify-center sm:size-5"
                  >
                    <span className="size-2 rotate-45 bg-gold-400 shadow-[0_0_14px_var(--color-gold-500)]" />
                  </span>

                  <p className="font-display text-2xl text-gold-gradient sm:text-3xl">
                    {chapter.year}
                  </p>
                  <h2 className="mt-2 text-xl text-ink sm:text-2xl">{chapter.title}</h2>
                  <p className="mt-4 text-pretty leading-relaxed text-ink-mute">
                    {chapter.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Citation */}
      <section className="grain relative overflow-hidden border-y border-ink/10 py-24 sm:py-28">
        <div
          aria-hidden
          className="glow-gold pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-[40rem] -translate-y-1/2 opacity-30 blur-3xl"
        />
        <Container size="narrow" className="relative">
          <Reveal>
            <figure className="flex flex-col items-center text-center">
              <Rosette className="size-10 text-gold-600" />
              <blockquote className="mt-8 font-display text-2xl leading-snug text-balance text-ink italic sm:text-4xl">
                {t.story.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.26em] text-gold-600">
                <Lozenge />
                {t.story.quoteAuthor}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <Eyebrow>{t.story.valuesTitle}</Eyebrow>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-3">
            {t.story.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08} className="h-full">
                <article className="h-full bg-paper p-8 sm:p-9">
                  <h3 className="font-display text-2xl text-ink">{value.title}</h3>
                  <div className="mt-4 h-px w-10 bg-gold-500/40" />
                  <p className="mt-5 text-sm leading-relaxed text-ink-mute">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Rappel produit */}
      <section className="grain relative overflow-hidden border-t border-ink/10 py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 sm:grid-cols-[0.8fr_1.2fr] sm:gap-16">
            <div className="relative mx-auto w-full max-w-[16rem]">
              <div aria-hidden className="glow-gold absolute inset-[-20%] opacity-45 blur-2xl" />
              <Reveal>
                <Image
                  src={asset(FOUNDING_PRODUCT?.image ?? "/product/al-arifa-5l.webp")}
                  alt={t.meta.ogAlt}
                  width={1000}
                  height={1526}
                  sizes="(max-width: 640px) 60vw, 24vw"
                  className="relative z-10 h-auto w-full drop-shadow-[0_24px_44px_rgba(23,21,15,0.24)]"
                />
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h2 className="text-3xl sm:text-4xl">{t.catalogData.producers["al-arifa"].tagline}</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 max-w-lg text-pretty leading-relaxed text-ink-mute">
                  {t.catalogData.products["arifa-5l"].description}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-9">
                  <ButtonLink href={href("/produits")} size="lg">
                    {t.story.cta}
                    <ArrowRight
                      className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      strokeWidth={1.5}
                    />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

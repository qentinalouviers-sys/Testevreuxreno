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
import { PRODUCT } from "@/lib/catalog";

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
                  <h2 className="mt-2 text-xl text-cream sm:text-2xl">{chapter.title}</h2>
                  <p className="mt-4 text-pretty leading-relaxed text-cream-mute">
                    {chapter.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Citation */}
      <section className="grain relative overflow-hidden border-y border-gold-500/15 py-24 sm:py-28">
        <div
          aria-hidden
          className="glow-gold pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-[40rem] -translate-y-1/2 opacity-30 blur-3xl"
        />
        <Container size="narrow" className="relative">
          <Reveal>
            <figure className="flex flex-col items-center text-center">
              <Rosette className="size-10 text-gold-500/70" />
              <blockquote className="mt-8 font-display text-2xl leading-snug text-balance text-cream italic sm:text-4xl">
                {t.story.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.26em] text-gold-400">
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

          <div className="mt-12 grid gap-px bg-gold-500/12 sm:grid-cols-3">
            {t.story.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08} className="h-full">
                <article className="h-full bg-ink-950 p-8 sm:p-9">
                  <h3 className="font-display text-2xl text-cream">{value.title}</h3>
                  <div className="mt-4 h-px w-10 bg-gold-500/40" />
                  <p className="mt-5 text-sm leading-relaxed text-cream-mute">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Rappel produit */}
      <section className="grain relative overflow-hidden border-t border-gold-500/15 py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 sm:grid-cols-[0.8fr_1.2fr] sm:gap-16">
            <div className="relative mx-auto w-full max-w-[16rem]">
              <div aria-hidden className="glow-gold absolute inset-[-20%] opacity-45 blur-2xl" />
              <Reveal>
                <Image
                  src={asset(PRODUCT.image)}
                  alt={t.meta.ogAlt}
                  width={PRODUCT.imageWidth}
                  height={PRODUCT.imageHeight}
                  sizes="(max-width: 640px) 60vw, 24vw"
                  className="relative z-10 h-auto w-full drop-shadow-[0_28px_50px_rgba(0,0,0,0.85)]"
                />
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h2 className="text-3xl sm:text-4xl">{t.product.variant}</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 max-w-lg text-pretty leading-relaxed text-cream-mute">
                  {t.product.description}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-9">
                  <ButtonLink href={href("/commande")} size="lg">
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

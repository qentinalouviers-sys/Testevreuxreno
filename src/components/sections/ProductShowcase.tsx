"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow, Lozenge } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";
import { asset } from "@/lib/asset";
import { PRODUCT } from "@/lib/catalog";

export function ProductShowcase() {
  const { t, href, price } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} id="produit" className="grain relative overflow-hidden py-24 sm:py-32">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Visuel */}
          <motion.div
            style={reduced ? undefined : { y: imageY }}
            className="relative order-1 mx-auto w-full max-w-[19rem] sm:max-w-sm lg:order-none"
          >
            {/* Écrin à ratio fixe : les filets encadrent toujours le bidon,
                quelle que soit la largeur de la colonne. */}
            <div className="relative aspect-[3/4] w-full">
              <div aria-hidden className="glow-gold absolute inset-[-14%] opacity-45 blur-2xl" />
              {/* Double filet gravé, en écho au cadre du médaillon */}
              <div aria-hidden className="absolute inset-0 border border-gold-500/20" />
              <div aria-hidden className="absolute inset-2.5 border border-gold-500/10" />

              <Reveal y={30} className="absolute inset-0 flex items-center justify-center p-7 sm:p-9">
                <Image
                  src={asset(PRODUCT.image)}
                  alt={t.meta.ogAlt}
                  width={PRODUCT.imageWidth}
                  height={PRODUCT.imageHeight}
                  sizes="(max-width: 640px) 76vw, (max-width: 1024px) 40vw, 26vw"
                  className="relative z-10 h-full w-auto object-contain drop-shadow-[0_32px_60px_rgba(0,0,0,0.85)]"
                />
              </Reveal>
            </div>
          </motion.div>

          {/* Texte */}
          <div>
            <Reveal>
              <Eyebrow>{t.product.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 text-4xl sm:text-5xl">
                <span className="block text-gold-gradient">{t.product.name}</span>
                <span className="mt-2 block text-xl font-light text-cream sm:text-2xl">
                  {t.product.subtitle}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-4 font-display text-lg italic text-gold-300/85">
                {t.product.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="my-8 h-px w-full rule-gold" />
            </Reveal>

            <Reveal delay={0.24}>
              <p className="text-pretty leading-relaxed text-cream-mute">
                {t.product.description}
              </p>
            </Reveal>

            {/* Fiche technique */}
            <Reveal delay={0.3}>
              <dl className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {t.product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-b border-gold-500/10 py-3"
                  >
                    <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-cream-mute">
                      {spec.label}
                    </dt>
                    <dd className="text-end text-sm text-cream">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Profil aromatique */}
            <Reveal delay={0.36}>
              <div className="mt-10">
                <p className="eyebrow mb-5">{t.product.notesTitle}</p>
                <ul className="space-y-3.5">
                  {t.product.notes.map((note) => (
                    <li key={note.title} className="flex gap-3.5">
                      <Lozenge className="mt-2 shrink-0" />
                      <p className="text-sm leading-relaxed text-cream-mute">
                        <span className="text-cream">{note.title}</span>
                        <span className="mx-2 text-gold-600">—</span>
                        {note.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <div className="mt-11 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-cream-mute">
                    {t.order.b2c.priceLabel}
                  </p>
                  <p className="mt-1.5 font-display text-3xl text-gold-200">
                    {price(PRODUCT.retailPrice)}
                    <span className="ms-2 font-sans text-xs tracking-widest text-cream-mute">
                      / {PRODUCT.volumeLitres} L
                    </span>
                  </p>
                </div>
                <ButtonLink href={href("/commande")} size="lg" className="w-full sm:w-auto">
                  {t.product.cta}
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
  );
}

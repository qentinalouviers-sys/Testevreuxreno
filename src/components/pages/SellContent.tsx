"use client";

import { ArrowRight, Check, HandCoins, ShieldCheck, Store, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Reveal } from "../ui/Reveal";
import { Eyebrow, Lozenge, SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";
import { DEFAULT_COMMISSION_RATE } from "@/lib/marketplace";

const PILLAR_ICONS: LucideIcon[] = [HandCoins, Wallet, Store, ShieldCheck];

/**
 * Page d'acquisition producteurs. L'argument central — 70 % reversés
 * directement, sans refacturation ni avance — est traité comme un chiffre
 * de vitrine, pas comme une ligne de conditions générales.
 */
export function SellContent() {
  const { t, href } = useLocale();
  const producerShare = 100 - DEFAULT_COMMISSION_RATE;

  return (
    <>
      <PageHero eyebrow={t.sell.eyebrow} title={t.sell.title} subtitle={t.sell.subtitle}>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href={href("/pro")} size="lg">
            {t.sell.heroCta}
            <ArrowRight
              className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
          </ButtonLink>
          <ButtonLink href={href("/contact")} variant="outline" size="lg">
            {t.sell.heroCtaAlt}
          </ButtonLink>
        </div>
      </PageHero>

      {/* La règle 70 / 30, en grand */}
      <section className="grain relative overflow-hidden border-y border-gold-500/15 py-20 sm:py-28">
        <div
          aria-hidden
          className="glow-gold pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-80 w-[44rem] -translate-y-1/2 opacity-30 blur-3xl"
        />
        <Container size="narrow" className="relative">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <Eyebrow>{t.sell.splitTitle}</Eyebrow>
              <p className="mt-6 font-display text-xl text-cream-dim sm:text-2xl">
                {t.sell.splitLead}
              </p>

              <div className="mt-10 grid w-full grid-cols-2 gap-px bg-gold-500/15">
                <div className="flex flex-col items-center justify-center bg-ink-950 px-4 py-12">
                  <span className="font-display text-6xl text-gold-gradient sm:text-8xl">
                    {producerShare} %
                  </span>
                  <span className="mt-4 text-[0.62rem] uppercase tracking-[0.22em] text-olive-300">
                    {t.sell.splitProducer}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-ink-950 px-4 py-12">
                  <span className="font-display text-6xl text-cream-mute/70 sm:text-8xl">
                    {DEFAULT_COMMISSION_RATE} %
                  </span>
                  <span className="mt-4 text-[0.62rem] uppercase tracking-[0.22em] text-cream-mute">
                    {t.sell.splitPlatform}
                  </span>
                </div>
              </div>

              <p className="mt-8 max-w-xl text-pretty text-sm leading-relaxed text-cream-mute">
                {t.sell.splitNote}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Ce que ça change */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading title={t.sell.pillarsTitle} />

          <div className="mt-14 grid gap-px overflow-hidden border border-gold-500/12 bg-gold-500/12 sm:grid-cols-2">
            {t.sell.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? HandCoins;
              return (
                <Reveal key={pillar.title} delay={i * 0.07} className="h-full">
                  <article className="group h-full bg-ink-950 p-8 transition-colors duration-700 hover:bg-ink-850 sm:p-10">
                    <span className="flex size-11 items-center justify-center border border-gold-500/25 transition-colors duration-700 group-hover:border-gold-400/60">
                      <Icon className="size-5 text-gold-400" strokeWidth={1.25} />
                    </span>
                    <h3 className="mt-6 text-xl text-cream">{pillar.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-cream-mute">{pillar.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Le parcours */}
      <section className="border-y border-gold-500/12 bg-ink-900/40 py-24 sm:py-32">
        <Container size="narrow">
          <SectionHeading title={t.sell.howTitle} />

          <ol className="relative mt-14">
            <span
              aria-hidden
              className="absolute inset-y-4 start-[7px] w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent sm:start-[9px]"
            />
            {t.sell.steps.map((step, i) => (
              <li key={step.title} className="relative ps-10 pb-12 last:pb-0 sm:ps-14">
                <Reveal delay={i * 0.06}>
                  <span
                    aria-hidden
                    className="absolute start-0 top-2 flex size-4 items-center justify-center sm:size-5"
                  >
                    <span className="size-2 rotate-45 bg-gold-400 shadow-[0_0_14px_var(--color-gold-500)]" />
                  </span>
                  <p className="font-display text-2xl text-gold-gradient">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl text-cream">{step.title}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-cream-mute">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Questions fréquentes */}
      <section className="py-24 sm:py-32">
        <Container size="narrow">
          <SectionHeading title={t.sell.faqTitle} />

          <dl className="mt-14 divide-y divide-gold-500/12 border-y border-gold-500/12">
            {t.sell.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="py-7">
                  <dt className="flex items-start gap-3.5 text-lg text-cream">
                    <Lozenge className="mt-2.5 shrink-0" />
                    {item.q}
                  </dt>
                  <dd className="mt-3 ps-7 text-pretty leading-relaxed text-cream-mute">
                    {item.a}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Appel final */}
      <section className="grain relative overflow-hidden border-t border-gold-500/15 py-24 sm:py-28">
        <div
          aria-hidden
          className="glow-gold pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-[38rem] opacity-30 blur-3xl"
        />
        <Container size="narrow" className="relative">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-balance text-3xl sm:text-4xl">{t.sell.ctaTitle}</h2>
              <div className="mt-7 h-px w-24 rule-gold" />
              <p className="mt-7 max-w-lg text-pretty leading-relaxed text-cream-mute">
                {t.sell.ctaText}
              </p>

              <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                {t.sell.pillars.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-olive-300"
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                    {pillar.title}
                  </li>
                ))}
              </ul>

              <ButtonLink href={href("/pro")} size="lg" className="mt-10">
                {t.sell.ctaButton}
                <ArrowRight
                  className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

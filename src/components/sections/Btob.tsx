"use client";

import { ArrowRight, Check, Building2, Store, Ship } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { useLocale } from "@/i18n/LocaleProvider";

const CARD_ICONS: LucideIcon[] = [Building2, Store, Ship];

/**
 * Section professionnelle : c'est le cœur commercial du site,
 * elle est donc traitée comme un écrin — encadrement doré, fond plus dense
 * que le reste de la page, et deux CTA distincts (compte + devis).
 */
export function Btob() {
  const { t, href } = useLocale();

  return (
    <section
      id="professionnels"
      className="grain relative overflow-hidden border-y border-ink/10 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#ffffff_0%,#f7f4ec_55%,#f0eadd_100%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{t.btob.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl text-balance text-4xl sm:text-5xl">{t.btob.title}</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-7 h-px w-24 rule-gold" />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-xl text-pretty leading-relaxed text-ink-mute">
                {t.btob.text}
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4">
              {t.btob.bullets.map((bullet, i) => (
                <Reveal key={bullet} delay={0.26 + i * 0.06}>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold-500/50">
                      <Check className="size-2.5 text-gold-600" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{bullet}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.55}>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <ButtonLink href={href("/pro")} size="lg">
                  {t.btob.cta}
                  <ArrowRight
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    strokeWidth={1.5}
                  />
                </ButtonLink>
                <ButtonLink href={href("/contact")} variant="outline" size="lg">
                  {t.btob.ctaSecondary}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Trois métiers servis — `self-start` évite que le fond doré du
              séparateur ne s'étire sous la dernière carte. */}
          <div className="flex flex-col gap-px self-start bg-ink/10">
            {t.btob.cards.map((card, i) => {
              const Icon = CARD_ICONS[i] ?? Building2;
              return (
                <Reveal key={card.title} delay={0.15 + i * 0.1}>
                  <article className="group flex gap-6 bg-paper p-8 transition-colors duration-700 hover:bg-paper-2 sm:p-10">
                    <span
                      className="flex size-12 shrink-0 items-center justify-center border border-ink/14
                                 transition-colors duration-700 group-hover:border-gold-600/60"
                    >
                      <Icon className="size-5 text-gold-600" strokeWidth={1.25} />
                    </span>
                    <div>
                      <h3 className="text-lg text-ink">{card.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-mute">{card.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

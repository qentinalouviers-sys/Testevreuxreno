"use client";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/SectionHeading";
import { useLocale } from "@/i18n/LocaleProvider";

export function Origins() {
  const { t } = useLocale();

  return (
    <section className="grain relative overflow-hidden py-24 sm:py-32">
      {/* Deux halos très diffus : la scène reste noire mais cesse d'être plate. */}
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute -start-40 top-0 size-[34rem] opacity-25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-40 bottom-0 size-[30rem] rounded-full
                   bg-[radial-gradient(circle,rgba(109,143,75,0.16),transparent_70%)] blur-3xl"
      />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{t.origins.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 text-balance text-4xl sm:text-5xl">{t.origins.title}</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-7 h-px w-24 rule-gold" />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 text-pretty leading-relaxed text-cream-mute">{t.origins.text}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-px bg-gold-500/12">
            {t.origins.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.08} className="h-full">
                <div className="flex h-full flex-col items-center justify-center bg-ink-950 px-5 py-12 text-center">
                  <p className="font-display text-4xl text-gold-gradient sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.6rem] uppercase tracking-[0.22em] text-cream-mute">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

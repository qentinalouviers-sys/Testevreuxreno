"use client";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useLocale } from "@/i18n/LocaleProvider";

export function Pillars() {
  const { t } = useLocale();

  return (
    <section className="relative border-y border-gold-500/10 bg-ink-900/40 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.pillars.eyebrow} title={t.pillars.title} />

        <div className="mt-16 grid gap-px overflow-hidden border border-gold-500/12 bg-gold-500/12 sm:grid-cols-2 lg:grid-cols-4">
          {t.pillars.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <article className="group relative h-full bg-ink-950 p-8 transition-colors duration-700 hover:bg-ink-850 sm:p-9">
                {/* Numérotation gravée */}
                <span className="font-display text-4xl leading-none text-gold-700/45 transition-colors duration-700 group-hover:text-gold-500/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl text-cream">{item.title}</h3>
                <div className="mt-4 h-px w-10 bg-gold-500/35 transition-all duration-700 group-hover:w-20 group-hover:bg-gold-400/70" />
                <p className="mt-5 text-sm leading-relaxed text-cream-mute">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

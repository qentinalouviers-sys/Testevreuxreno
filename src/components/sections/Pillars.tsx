"use client";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useLocale } from "@/i18n/LocaleProvider";

export function Pillars() {
  const { t } = useLocale();

  return (
    <section className="relative border-y border-ink/8 bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.pillars.eyebrow} title={t.pillars.title} />

        <div className="mt-16 grid gap-px overflow-hidden border border-ink/8 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.pillars.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <article className="group relative h-full bg-paper p-8 transition-colors duration-700 hover:bg-paper-2 sm:p-9">
                {/* Numérotation gravée */}
                <span className="font-display text-4xl leading-none text-gold-500 transition-colors duration-700 group-hover:text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl text-ink">{item.title}</h3>
                <div className="mt-4 h-px w-10 bg-gold-500/35 transition-all duration-700 group-hover:w-20 group-hover:bg-gold-400/70" />
                <p className="mt-5 text-sm leading-relaxed text-ink-mute">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

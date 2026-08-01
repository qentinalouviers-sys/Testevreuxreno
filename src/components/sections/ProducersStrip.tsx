"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { ProducerCard } from "../catalog/ProducerCard";
import { useLocale } from "@/i18n/LocaleProvider";
import { PRODUCERS } from "@/lib/marketplace";

export function ProducersStrip() {
  const { t, href } = useLocale();

  return (
    <section className="relative border-y border-gold-500/12 bg-ink-900/40 py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.producers.eyebrow}
          title={t.producers.title}
          subtitle={t.producers.subtitle}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCERS.map((producer, i) => (
            <Reveal key={producer.id} delay={Math.min(i, 5) * 0.07} className="h-full">
              <ProducerCard producer={producer} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink href={href("/producteurs")} variant="outline" size="lg">
              {t.producers.title}
            </ButtonLink>
            <ButtonLink href={href("/vendre")} size="lg">
              {t.nav.sell}
              <ArrowRight
                className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

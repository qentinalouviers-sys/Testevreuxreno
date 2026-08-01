"use client";

import { ArrowRight, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useLocale } from "@/i18n/LocaleProvider";

export function CtaBand() {
  const { t, href } = useLocale();

  const paths = [
    { icon: User, label: t.cta.particulier, to: href("/produits") },
    { icon: Briefcase, label: t.cta.pro, to: href("/vendre") },
  ];

  return (
    <section className="grain relative overflow-hidden border-t border-ink/10 py-24 sm:py-32">
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 w-[42rem] opacity-35 blur-3xl"
      />
      <Container size="narrow" className="relative">
        <SectionHeading eyebrow={t.cta.eyebrow} title={t.cta.title} subtitle={t.cta.text} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {paths.map((path, i) => (
            <Reveal key={path.label} delay={0.1 + i * 0.1}>
              <Link
                href={path.to}
                className="group flex h-full items-center justify-between gap-6 border border-ink/12
                           bg-white p-7 transition-all duration-600
                           hover:border-gold-600/60 hover:bg-paper-2 sm:p-9"
              >
                <span className="flex items-center gap-5">
                  <path.icon
                    className="size-6 shrink-0 text-gold-600 transition-colors duration-500 group-hover:text-gold-600"
                    strokeWidth={1.25}
                  />
                  <span className="font-display text-xl text-ink sm:text-2xl">{path.label}</span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-gold-600 transition-all duration-500
                             group-hover:translate-x-1 group-hover:text-gold-600
                             rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

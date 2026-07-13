"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Nos prestations"
          title="Une expertise complète pour une maison performante"
          description="Chaque geste de rénovation ouvre droit à des aides. Nous réalisons les travaux et nous occupons du financement, de A à Z."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.slug}
                variants={staggerItem}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-energy/30 hover:shadow-xl hover:shadow-forest/10"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber/10 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative mb-5 grid h-14 w-14 place-items-center rounded-xl bg-energy/10 text-energy transition-all duration-300 group-hover:bg-energy group-hover:text-cream">
                  <Icon className="h-7 w-7 transition-transform duration-300 group-hover:-rotate-6" />
                </div>

                <h3 className="relative text-xl font-semibold text-forest">
                  {service.title}
                </h3>
                <p className="relative mt-2.5 flex-1 text-[15px] leading-relaxed text-ink/70">
                  {service.description}
                </p>

                <div className="relative mt-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber-600">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {service.aid}
                  </span>
                  <span className="text-xs font-medium text-energy">
                    {service.savings}
                  </span>
                </div>

                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-forest/20 transition-all duration-300 group-hover:text-energy group-hover:opacity-100" />
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}

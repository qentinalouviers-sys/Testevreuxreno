"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "center 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="processus" className="scroll-mt-24 bg-forest py-20 text-cream sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Comment ça marche"
          title={<span className="text-cream">Votre projet en 4 étapes, sans stress</span>}
          description={
            <span className="text-cream/75">
              De la première estimation à la fin des travaux, un interlocuteur unique
              et zéro paperasse à gérer.
            </span>
          }
        />

        <div ref={ref} className="relative mt-16">
          {/* Ligne horizontale animée (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-cream/15 lg:block">
            <motion.div
              style={{ scaleX: lineScale, transformOrigin: "left" }}
              className="h-full w-full bg-gradient-to-r from-amber to-amber-600"
            />
          </div>
          {/* Ligne verticale (mobile) */}
          <div className="absolute bottom-4 left-8 top-4 w-0.5 bg-cream/15 lg:hidden">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-amber to-amber-600"
            />
          </div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative grid gap-10 lg:grid-cols-4 lg:gap-6"
          >
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  variants={staggerItem}
                  className="relative flex gap-5 lg:flex-col lg:gap-0"
                >
                  {/* Pastille */}
                  <div className="relative z-10 flex-none">
                    <div
                      className={cn(
                        "grid h-16 w-16 place-items-center rounded-2xl ring-4 ring-forest transition-transform",
                        step.highlight
                          ? "bg-amber text-forest"
                          : "bg-energy text-cream"
                      )}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="absolute -right-1 -top-2 grid h-6 w-6 place-items-center rounded-full bg-cream text-[11px] font-bold text-forest">
                      {step.number}
                    </span>
                  </div>

                  <div className="lg:mt-6">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-cream">{step.title}</h3>
                      {step.highlight ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber">
                          <Star className="h-3 w-3 fill-amber" />
                          Notre +
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}

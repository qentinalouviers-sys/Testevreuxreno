"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wallet, Sparkles } from "lucide-react";
import { aidTiers, aidSchemes } from "@/data/aids";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Aides() {
  return (
    <section id="aides" className="scroll-mt-24 bg-cream-200/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Vos aides financières"
          title={
            <>
              Jusqu'à <span className="text-gradient-amber">90 % financés</span> par
              l'État
            </>
          }
          description="MaPrimeRénov', CEE, éco-PTZ : les dispositifs sont nombreux et cumulables. Nous les maîtrisons et nous nous chargeons de tout."
        />

        {/* Les 3 dispositifs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {aidSchemes.map((scheme) => (
            <motion.div
              key={scheme.name}
              variants={staggerItem}
              className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-forest text-amber">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-forest">{scheme.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
                {scheme.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Barème par profil de revenus */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-forest/10 bg-forest px-6 py-4 text-cream">
            <Wallet className="h-5 w-5 text-amber" />
            <h3 className="text-base font-semibold">
              Ce que vous pouvez toucher, selon vos revenus
            </h3>
          </div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="divide-y divide-forest/10"
          >
            {aidTiers.map((tier) => (
              <motion.li
                key={tier.profile}
                variants={staggerItem}
                className="grid gap-2 px-6 py-4 transition-colors hover:bg-cream-200/40 sm:grid-cols-[1.3fr_1fr_1.3fr] sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 flex-none rounded-full ${tier.color}`}
                    aria-hidden
                  />
                  <div>
                    <p className="font-semibold text-forest">{tier.profile}</p>
                    <p className="text-xs text-ink/55">{tier.incomeHint}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-energy">{tier.maPrimeRenov}</p>
                <p className="text-sm text-ink/70">{tier.example}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <p className="mt-4 text-center text-xs text-ink/50">
          Montants indicatifs 2025, susceptibles d'évoluer. Estimation précise après visite technique.
        </p>

        <div className="mt-8 flex justify-center">
          <Button href="#devis" size="lg">
            Calculer mes aides personnalisées
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Tout ce que vous vous demandez"
          description="Et si vous ne trouvez pas votre réponse, appelez-nous : on adore parler rénovation."
        />

        <ul className="mt-12 space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors",
                  isOpen
                    ? "border-energy/30 bg-white shadow-sm"
                    : "border-forest/10 bg-white/60"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-forest sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "grid h-8 w-8 flex-none place-items-center rounded-full transition-all duration-300",
                      isOpen ? "rotate-45 bg-energy text-cream" : "bg-cream-200 text-forest"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink/70">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl bg-forest px-6 py-8 text-center text-cream">
          <p className="text-lg font-semibold">Une question sur votre projet ?</p>
          <p className="text-sm text-cream/75">
            Nos conseillers vous répondent gratuitement, sans engagement.
          </p>
          <Button href="#devis" size="lg" className="mt-2">
            Estimer mes aides
          </Button>
        </div>
      </Container>
    </section>
  );
}

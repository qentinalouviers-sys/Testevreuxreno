"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Star, MapPin } from "lucide-react";
import { company } from "@/config/company";
import { Button } from "@/components/ui/Button";
import { staggerContainer, wordReveal, easeOut } from "@/lib/motion";

const line1 = "Divisez votre facture";
const line2 = "de chauffage par 2";

const badges = [
  { icon: ShieldCheck, label: "RGE Qualibat" },
  { icon: ShieldCheck, label: "Mandataire MaPrimeRénov'" },
  { icon: Star, label: `Google ${company.rating.value}/5` },
  { icon: MapPin, label: `Entreprise locale depuis ${company.foundedYear}` },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Image de fond + overlay dégradé */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10 h-[118%]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80"
          alt="Maison individuelle rénovée en Normandie"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-forest/95 via-forest/80 to-forest/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/90 via-transparent to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <div className="max-w-3xl">
          {/* Micro-eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-cream/90 ring-1 ring-white/20 backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
            Rénovation énergétique à Évreux et dans l'Eure
          </motion.p>

          {/* H1 reveal mot par mot */}
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream sm:text-6xl md:text-7xl">
            <RevealLine text={line1} />
            <span className="block text-gradient-amber">
              <RevealLine text={line2} delayOffset={line1.split(" ").length} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85"
          >
            Isolation, pompe à chaleur, menuiseries — réalisés par des artisans
            certifiés RGE. Et surtout, <strong className="font-semibold text-cream">nous gérons
            l'intégralité de votre dossier d'aides</strong> MaPrimeRénov'.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#devis" size="lg">
              Estimer mes aides en 30 secondes
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={`tel:${company.phone.href}`} variant="ghost" size="lg">
              <Phone className="h-5 w-5" />
              {company.phone.display}
            </Button>
          </motion.div>

          {/* Badges de confiance en cascade */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 1 }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {badges.map((b) => (
              <motion.li
                key={b.label}
                variants={wordReveal}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-cream ring-1 ring-white/20 backdrop-blur sm:text-sm"
              >
                <b.icon className="h-4 w-4 text-amber" />
                {b.label}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function RevealLine({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: 0.15 + delayOffset * 0.08, staggerChildren: 0.08 }}
      className="inline"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={wordReveal} className="inline-block">
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

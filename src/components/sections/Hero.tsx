"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { Lozenge } from "../ui/SectionHeading";
import { useLocale } from "@/i18n/LocaleProvider";
import { asset } from "@/lib/asset";

// La 3D ne doit jamais bloquer le premier rendu ni partir au SSR.
const OliveScene = dynamic(() => import("../three/OliveScene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Le site est clair, mais le hero reste un bloc sombre : la photo produit est
 * prise sur fond noir, elle s'y fond sans détourage, et le contraste avec le
 * papier de la suite de la page donne au produit toute sa présence.
 */
export function Hero() {
  const { t, href } = useLocale();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="section-dark relative flex min-h-[100svh] items-center overflow-hidden pt-[68px] sm:pt-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_60%_10%,#262117_0%,#16130e_45%,#100e0b_100%)]"
      />
      <OliveScene className="pointer-events-none absolute inset-0 opacity-45 md:opacity-70" />

      {/* Raccord vers le papier : le bloc sombre se ferme en dégradé. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-paper"
      />

      <Container size="wide" className="relative z-10 py-10 sm:py-16 lg:py-20">
        <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Colonne texte */}
          <motion.div
            style={reduced ? undefined : { y: contentY, opacity: fade }}
            className="order-2 lg:order-none"
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="flex items-center gap-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.32em] text-gold-300"
            >
              <Lozenge className="bg-gold-300" />
              {t.hero.eyebrow}
            </motion.p>

            <h1 className="mt-5 text-[2.35rem] leading-[0.98] sm:mt-7 sm:text-6xl lg:text-[4.4rem]">
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.25, ease: EASE }}
                className="block"
              >
                {t.hero.titleTop}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.38, ease: EASE }}
                className="mt-1 block text-gold-gradient-dark italic"
              >
                {t.hero.titleBottom}
              </motion.span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
              className="mt-7 h-px w-40 origin-left rule-gold sm:mt-9 rtl:origin-right"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
              className="mt-6 max-w-lg text-pretty text-[0.94rem] leading-relaxed text-paper-4 sm:mt-7 sm:text-base"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            >
              <ButtonLink href={href("/produits")} size="lg">
                {t.hero.ctaPrimary}
                <ArrowRight
                  className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
              </ButtonLink>
              <ButtonLink href={href("/vendre")} variant="outlineDark" size="lg">
                {t.hero.ctaSecondary}
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* Photo d'ambiance */}
          <motion.div
            style={reduced ? undefined : { y: photoY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
            className="relative order-1 mx-auto w-full max-w-[17rem] sm:max-w-sm lg:order-none lg:max-w-lg"
          >
            <div aria-hidden className="glow-gold absolute inset-[-10%] opacity-40 blur-3xl" />
            {/* Filet doré, comme un cadre de galerie */}
            <div aria-hidden className="absolute inset-0 z-20 border border-gold-500/25" />
            <Image
              src={asset("/product/al-arifa-scene.webp")}
              alt={t.meta.ogAlt}
              width={831}
              height={1296}
              priority
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 46vw, 38vw"
              className="relative z-10 h-auto max-h-[40svh] w-full object-cover
                         shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:max-h-[52svh] lg:max-h-[66svh]"
            />
          </motion.div>
        </div>
      </Container>

      {/* Indicateur de scroll — masqué en mobile, où la page se lit d'un trait */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={reduced ? undefined : { opacity: fade }}
        className="absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-2.5 sm:flex"
      >
        <span className="text-[0.58rem] uppercase tracking-[0.32em] text-paper-4/70">
          {t.hero.scroll}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-gold-500/25">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-gold-300"
          />
        </span>
      </motion.div>
    </section>
  );
}

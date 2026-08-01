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
import { getProduct } from "@/lib/marketplace";

// La 3D ne doit jamais bloquer le premier rendu ni partir au SSR.
const OliveScene = dynamic(() => import("../three/OliveScene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

/** Produit d'appel du hero : le bidon de la maison fondatrice. */
const HERO_PRODUCT = getProduct("arifa-5l");

export function Hero() {
  const { t, href } = useLocale();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Le bidon monte légèrement moins vite que la page : effet de profondeur.
  const productY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-[68px] sm:pt-20"
    >
      {/* Fond : dégradé profond + halo doré + scène 3D */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_0%,#14120f_0%,#080807_45%,#040403_100%)]"
      />
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute start-1/2 top-1/2 size-[42rem] -translate-x-1/2
                   -translate-y-1/2 opacity-40 blur-[2px] md:size-[56rem] md:opacity-55"
      />
      <OliveScene className="pointer-events-none absolute inset-0 opacity-70 md:opacity-100" />

      <Container size="wide" className="relative z-10 py-8 sm:py-16 lg:py-20">
        {/* En mobile, le bidon passe en tête : c'est lui l'accroche, et le
            texte se lit ensuite sans que la composition déborde de l'écran. */}
        <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Colonne texte */}
          <motion.div
            style={reduced ? undefined : { y: contentY, opacity: fade }}
            className="order-2 lg:order-none"
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="eyebrow flex items-center gap-3"
            >
              <Lozenge />
              {t.hero.eyebrow}
            </motion.p>

            <h1 className="mt-4 text-[2.35rem] leading-[0.98] sm:mt-6 sm:text-6xl lg:text-[4.6rem]">
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.25, ease: EASE }}
                className="block text-cream"
              >
                {t.hero.titleTop}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.38, ease: EASE }}
                className="mt-1 block text-gold-gradient italic"
              >
                {t.hero.titleBottom}
              </motion.span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
              className="mt-6 h-px w-40 origin-left rule-gold sm:mt-8 rtl:origin-right"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
              className="mt-5 max-w-lg text-pretty text-[0.94rem] leading-relaxed text-cream-mute sm:mt-7 sm:text-base"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
              className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            >
              <ButtonLink href={href("/produits")} size="lg">
                {t.hero.ctaPrimary}
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href={href("/vendre")} variant="outline" size="lg">
                {t.hero.ctaSecondary}
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* Colonne produit */}
          <motion.div
            style={reduced ? undefined : { y: productY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.35, ease: EASE }}
            className="relative order-1 mx-auto w-full max-w-[15.5rem] sm:max-w-xs lg:order-none lg:max-w-md"
          >
            {/* Halo rapproché : détache le bidon noir du fond noir */}
            <div
              aria-hidden
              className="glow-gold absolute inset-[-18%] opacity-70 blur-xl"
            />
            <motion.div
              animate={reduced ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src={asset(HERO_PRODUCT?.image ?? "/product/al-arifa-5l.webp")}
                alt={t.meta.ogAlt}
                width={1000}
                height={1526}
                priority
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 44vw, 30vw"
                // `max-h` en unités d'écran : le bidon ne pousse jamais
                // le texte hors du premier écran sur un mobile court.
                className="relative z-10 mx-auto h-auto max-h-[34svh] w-auto
                           drop-shadow-[0_38px_70px_rgba(0,0,0,0.9)] sm:max-h-[42svh] lg:max-h-none lg:w-full"
              />
              {/* Reflet au sol */}
              <div
                aria-hidden
                className="absolute inset-x-[12%] top-[97%] h-24 scale-y-[-1] bg-gradient-to-b
                           from-gold-500/10 to-transparent blur-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={reduced ? undefined : { opacity: fade }}
        // Masqué en mobile : la composition y remplit déjà l'écran et
        // l'indicateur viendrait chevaucher les boutons.
        className="absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-2.5 sm:flex"
      >
        <span className="text-[0.58rem] uppercase tracking-[0.32em] text-cream-mute">
          {t.hero.scroll}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-gold-500/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-gold-400"
          />
        </span>
      </motion.div>
    </section>
  );
}

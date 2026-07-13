"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { company } from "@/config/company";
import { heroMedia } from "@/config/hero";
import { withBasePath } from "@/lib/basePath";
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

  // Progression du scroll sur toute la hauteur de la section « épinglée ».
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Chorégraphie cinématique (ignorée si prefers-reduced-motion).
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.03]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const dimOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [0.1, 0.4, 0.96]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.82], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className={reduce ? "relative" : "relative h-[150vh]"}
    >
      <div
        className={`${
          reduce ? "relative min-h-[92vh]" : "sticky top-0 h-[100svh]"
        } flex items-center overflow-hidden`}
      >
        {/* ── Média (vidéo si disponible, sinon photo) ── */}
        <motion.div
          style={reduce ? undefined : { scale: mediaScale, y: mediaY }}
          className="absolute inset-0 -z-20 h-full w-full will-change-transform"
        >
          <HeroMedia reduce={!!reduce} />
        </motion.div>

        {/* ── Overlays de lisibilité + fondu vers la section suivante ── */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-forest/90 via-forest/70 to-forest/40" />
        <motion.div
          style={{ opacity: reduce ? 0.3 : dimOpacity }}
          className="absolute inset-0 -z-10 bg-forest"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/90 via-transparent to-transparent" />

        {/* ── Contenu ── */}
        <motion.div
          style={
            reduce
              ? undefined
              : { opacity: contentOpacity, y: contentY, scale: contentScale }
          }
          className="mx-auto w-full max-w-6xl px-5 pt-24 pb-16 sm:px-8 sm:pt-28"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-cream/90 ring-1 ring-white/20 backdrop-blur"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
              Rénovation énergétique à Évreux et dans l'Eure
            </motion.p>

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
              certifiés RGE. Et surtout,{" "}
              <strong className="font-semibold text-cream">
                nous gérons l'intégralité de votre dossier d'aides
              </strong>{" "}
              MaPrimeRénov'.
            </motion.p>

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
        </motion.div>

        {/* ── Indice de scroll ── */}
        {reduce ? null : (
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center sm:flex"
          >
            <motion.span
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 text-cream/70"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                Défilez
              </span>
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Fond du hero : photo optimisée + vidéo en boucle par-dessus si configurée. */
function HeroMedia({ reduce }: { reduce: boolean }) {
  const [ready, setReady] = useState(false);
  const hasVideo = heroMedia.videoSrc.length > 0 && !reduce;

  return (
    <>
      <Image
        src={heroMedia.poster}
        alt={heroMedia.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {hasVideo ? (
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroMedia.poster}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          {heroMedia.videoSrcWebm ? (
            <source src={withBasePath(heroMedia.videoSrcWebm)} type="video/webm" />
          ) : null}
          <source src={withBasePath(heroMedia.videoSrc)} type="video/mp4" />
        </video>
      ) : null}
    </>
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
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: i < words.length - 1 ? "0.26em" : undefined }}
        >
          <motion.span variants={wordReveal} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

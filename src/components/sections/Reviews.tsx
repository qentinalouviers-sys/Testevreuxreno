"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { reviews } from "@/data/reviews";
import { company } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { GoogleLogo } from "@/components/ui/GoogleLogo";

export function Reviews() {
  // On duplique la liste pour un défilement infini fluide.
  const loop = [...reviews, ...reviews];
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const halfWidth = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidth.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || halfWidth.current === 0) return;
    const speed = 0.03; // px par ms
    let next = x.get() - delta * speed;
    if (next <= -halfWidth.current) next += halfWidth.current;
    x.set(next);
  });

  return (
    <section id="avis" className="scroll-mt-24 overflow-hidden bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ils nous ont fait confiance"
          title="Ce que disent nos clients dans l'Eure"
          description={
            <span className="inline-flex flex-wrap items-center justify-center gap-2">
              <GoogleLogo className="h-5 w-5" />
              <strong className="font-semibold text-forest">
                {company.rating.value}/5
              </strong>
              sur Google · {company.rating.count} avis vérifiés
            </span>
          }
        />
      </Container>

      {/* Piste défilante */}
      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Masques dégradés sur les bords */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-28" />

        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -halfWidth.current, right: 0 }}
          onDragStart={() => setPaused(true)}
          dragElastic={0.05}
          className="flex w-max cursor-grab gap-5 px-5 active:cursor-grabbing sm:px-8"
        >
          {loop.map((review, i) => (
            <article
              key={`${review.id}-${i}`}
              className="flex w-[85vw] max-w-sm flex-none flex-col rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:w-96"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 flex-none place-items-center rounded-full text-sm font-bold text-cream ${review.avatarColor}`}
                >
                  {review.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-forest">{review.name}</p>
                  <p className="text-xs text-ink/55">
                    {review.city} · {review.date}
                  </p>
                </div>
                <GoogleLogo className="ml-auto h-5 w-5 flex-none" />
              </div>

              <Stars rating={review.rating} className="mt-4" />

              <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
                “{review.text}”
              </p>
            </article>
          ))}
        </motion.div>
      </div>

      <Container className="mt-12 text-center">
        <a
          href={company.rating.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-5 py-3 text-sm font-semibold text-forest shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <GoogleLogo className="h-4 w-4" />
          Voir tous nos avis sur Google
          <ExternalLink className="h-4 w-4 text-ink/40" />
        </a>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { Lozenge } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

/** En-tête commun aux pages intérieures : sobre, centré, sans image. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden pt-[calc(68px+4.5rem)] pb-16 sm:pt-[calc(80px+6rem)] sm:pb-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,#14120f_0%,#080807_55%,#040403_100%)]"
      />
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-[38rem] opacity-35 blur-3xl"
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="eyebrow flex items-center gap-3"
          >
            <Lozenge />
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.12, ease: EASE }}
            className="mt-6 text-balance text-4xl sm:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="mt-8 h-px w-28 rule-gold"
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
              className="mt-7 max-w-2xl text-pretty leading-relaxed text-cream-mute"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.46, ease: EASE }}
              className="mt-10 w-full"
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}

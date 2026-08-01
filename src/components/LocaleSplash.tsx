"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flag } from "./ui/Flag";
import { Rosette } from "./ui/Wordmark";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from "@/i18n/config";

/** Choisit la langue la plus proche de celles annoncées par le navigateur. */
function detectLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const candidate of candidates) {
    const base = candidate.toLowerCase().split("-")[0];
    const match = LOCALES.find((l) => l === base);
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function LocaleSplash() {
  const router = useRouter();
  const [target, setTarget] = useState<Locale | null>(null);

  useEffect(() => {
    const locale = detectLocale();
    setTarget(locale);
    // Court délai : le temps que la rosace apparaisse, pour éviter un flash blanc.
    const timer = window.setTimeout(() => router.replace(`/${locale}`), 550);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_35%,#14120f_0%,#080807_50%,#040403_100%)]"
      />
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute size-[36rem] opacity-40 blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center text-center"
      >
        <Rosette className="size-14 text-gold-400" />
        <h1 className="mt-7 font-display text-4xl tracking-[0.22em] text-gold-gradient sm:text-5xl">
          AL ARIFA
        </h1>
        <p className="mt-3 text-[0.6rem] uppercase tracking-[0.34em] text-cream-mute">
          Sélection Héritage
        </p>
        <div className="mx-auto mt-8 h-px w-24 rule-gold" />

        <nav aria-label="Langues" className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {LOCALES.map((code) => {
            const meta = LOCALE_META[code];
            return (
              <Link
                key={code}
                href={`/${code}`}
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                dir={meta.dir}
                className="flex items-center gap-2.5 border border-gold-500/25 px-4 py-2.5
                           text-[0.68rem] uppercase tracking-[0.16em] text-cream-dim
                           transition-all duration-500 hover:border-gold-400/60 hover:text-gold-200"
              >
                <Flag code={meta.flag} className="h-3 w-[18px]" />
                {meta.short}
              </Link>
            );
          })}
        </nav>

        <p className="mt-8 h-4 text-[0.6rem] uppercase tracking-[0.24em] text-cream-mute/60">
          {target && `→ ${LOCALE_META[target].label}`}
        </p>
      </motion.div>
    </div>
  );
}

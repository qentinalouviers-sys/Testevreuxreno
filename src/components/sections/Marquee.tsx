"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { Lozenge } from "../ui/SectionHeading";

/**
 * Bandeau défilant façon frise gravée sur le bidon.
 * Le contenu est dupliqué une fois : l'animation translate de -50 %,
 * ce qui rend la boucle invisible.
 */
export function Marquee() {
  const { t } = useLocale();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="relative overflow-hidden border-y border-gold-500/15 bg-ink-900/60 py-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent sm:w-28"
      />
      <div className="flex w-max animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-5 px-5 text-[0.65rem] uppercase
                       tracking-[0.28em] text-gold-300/75 sm:gap-7 sm:px-7 sm:text-[0.7rem]"
          >
            {item}
            <Lozenge className="opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { Rosette } from "@/components/ui/Wordmark";
import { LOCALES, LOCALE_META } from "@/i18n/config";

/** 404 global — volontairement sobre, et multilingue par les liens proposés. */
export default function NotFound() {
  return (
    <div className="section-dark grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_35%,#262117_0%,#16130e_50%,#100e0b_100%)]"
      />
      <div aria-hidden className="glow-gold pointer-events-none absolute size-[32rem] opacity-30 blur-2xl" />

      <div className="relative">
        <Rosette className="mx-auto size-12 text-gold-300" />
        <p className="mt-8 font-display text-7xl text-gold-gradient-dark sm:text-8xl">404</p>
        <div className="mx-auto mt-7 h-px w-24 rule-gold" />
        <p className="mt-7 text-sm text-paper-4/80">
          Cette page n&apos;existe pas — This page does not exist
        </p>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {LOCALES.map((code) => (
            <Link
              key={code}
              href={`/${code}`}
              className="border border-gold-500/30 px-4 py-2.5 text-[0.66rem] uppercase
                         tracking-[0.16em] text-paper-3 transition-all duration-500
                         hover:border-gold-400/70 hover:text-gold-200"
            >
              {LOCALE_META[code].short}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

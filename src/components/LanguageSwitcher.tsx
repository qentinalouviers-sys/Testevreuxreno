"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Flag } from "./ui/Flag";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALES, LOCALE_META, isLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Remplace le segment de langue de l'URL courante en conservant la page.
 * `/pt/historia` → `/fr/histoire` n'est pas géré : les slugs sont identiques
 * dans toutes les langues, seul le préfixe change.
 */
function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join("/")}`;
  }
  return `/${next}`;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useLocale();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALE_META[locale];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Referme le sélecteur dès que la navigation aboutit.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.a11y.changeLanguage}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "group flex items-center gap-2 rounded-[2px] border border-gold-500/25 px-2.5 py-1.5",
          "text-[0.68rem] uppercase tracking-[0.18em] text-cream-dim",
          "transition-colors duration-400 hover:border-gold-400/60 hover:text-gold-200",
          open && "border-gold-400/60 text-gold-200",
        )}
      >
        <Flag code={current.flag} className="h-3 w-[18px]" />
        {!compact && <span className="hidden sm:inline">{current.short}</span>}
        <ChevronDown
          className={cn("size-3 transition-transform duration-400", open && "rotate-180")}
          strokeWidth={1.5}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute end-0 z-50 mt-2 w-52 overflow-hidden rounded-[3px]
                       border border-gold-500/25 bg-ink-900/97 p-1 shadow-2xl shadow-black/70
                       backdrop-blur-xl"
          >
            {LOCALES.map((code) => {
              const meta = LOCALE_META[code];
              const active = code === locale;
              return (
                <li key={code} role="option" aria-selected={active}>
                  <Link
                    href={swapLocale(pathname, code)}
                    hrefLang={meta.htmlLang}
                    lang={meta.htmlLang}
                    dir={meta.dir}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-300",
                      active
                        ? "bg-gold-500/10 text-gold-200"
                        : "text-cream-dim hover:bg-gold-500/[0.06] hover:text-cream",
                    )}
                  >
                    <Flag code={meta.flag} className="h-3.5 w-[21px]" />
                    <span className="flex-1 text-start">{meta.label}</span>
                    {active && <Check className="size-3.5 text-gold-400" strokeWidth={2} />}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

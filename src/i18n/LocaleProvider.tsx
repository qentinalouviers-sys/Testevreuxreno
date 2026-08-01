"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "./index";
import { LOCALE_META, localePath, type Locale } from "./config";

type LocaleContextValue = {
  locale: Locale;
  t: Dictionary;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  /** Construit une URL interne préfixée par la locale courante. */
  href: (path?: string) => string;
  /** Formate un montant en euros selon la locale active. */
  price: (amount: number) => string;
  /** Formate une date ISO selon la locale active. */
  date: (iso: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const INTL_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  pt: "pt-PT",
  ar: "ar-MA",
  zh: "zh-CN",
};

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(() => {
    const dir = LOCALE_META[locale].dir;
    const money = new Intl.NumberFormat(INTL_LOCALE[locale], {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    });
    // Calendrier grégorien imposé en arabe : les dates de commande doivent
    // rester alignées sur celles des documents d'export.
    const day = new Intl.DateTimeFormat(
      locale === "ar" ? "ar-MA-u-ca-gregory-nu-latn" : INTL_LOCALE[locale],
      { day: "2-digit", month: "2-digit", year: "numeric" },
    );
    return {
      locale,
      t: getDictionary(locale),
      dir,
      isRtl: dir === "rtl",
      href: (path = "/") => localePath(locale, path),
      price: (amount: number) => money.format(amount),
      date: (iso: string) => day.format(new Date(iso)),
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale doit être utilisé dans un <LocaleProvider>.");
  return ctx;
}

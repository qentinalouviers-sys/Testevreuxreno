export const LOCALES = ["fr", "en", "pt", "ar", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export type LocaleMeta = {
  code: Locale;
  /** Nom de la langue dans la langue elle-même */
  label: string;
  /** Libellé court affiché dans le sélecteur */
  short: string;
  dir: "ltr" | "rtl";
  /** Code pays ISO utilisé pour le drapeau */
  flag: "fr" | "gb" | "pt" | "sa" | "cn";
  /** Attribut lang / hreflang */
  htmlLang: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  fr: { code: "fr", label: "Français", short: "FR", dir: "ltr", flag: "fr", htmlLang: "fr-FR" },
  en: { code: "en", label: "English", short: "EN", dir: "ltr", flag: "gb", htmlLang: "en" },
  pt: { code: "pt", label: "Português", short: "PT", dir: "ltr", flag: "pt", htmlLang: "pt-PT" },
  ar: { code: "ar", label: "العربية", short: "AR", dir: "rtl", flag: "sa", htmlLang: "ar" },
  zh: { code: "zh", label: "中文", short: "中文", dir: "ltr", flag: "cn", htmlLang: "zh-Hans" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localeDir(locale: Locale): "ltr" | "rtl" {
  return LOCALE_META[locale].dir;
}

/** Préfixe toutes les URLs internes par la locale courante. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

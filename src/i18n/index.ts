import fr, { type Dictionary } from "./dictionaries/fr";
import en from "./dictionaries/en";
import pt from "./dictionaries/pt";
import ar from "./dictionaries/ar";
import zh from "./dictionaries/zh";
import { DEFAULT_LOCALE, type Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en, pt, ar, zh };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export type { Dictionary };
export * from "./config";

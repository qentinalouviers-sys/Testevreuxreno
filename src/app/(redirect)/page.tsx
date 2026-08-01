import { LocaleSplash } from "@/components/LocaleSplash";

/**
 * `/` ne sert aucun contenu : il oriente vers `/fr`, `/en`, `/pt`, `/ar` ou `/zh`.
 * La redirection est faite côté client (compatible export statique) et l'écran
 * reste utilisable si JavaScript est indisponible.
 */
export default function RootPage() {
  return <LocaleSplash />;
}

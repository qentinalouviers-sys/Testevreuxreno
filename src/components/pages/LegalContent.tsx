"use client";

import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Reveal } from "../ui/Reveal";
import { useLocale } from "@/i18n/LocaleProvider";
import { SITE } from "@/lib/site";

export type LegalKind = "mentions" | "privacy" | "terms";

/**
 * Date de dernière révision, volontairement figée : `new Date()` serait
 * évalué au build côté serveur puis à l'hydratation côté client, ce qui
 * provoquerait une divergence. À mettre à jour à chaque révision du texte.
 */
const LAST_UPDATED = "2026-02-01T00:00:00.000Z";

/**
 * Pages légales. Le contenu est un gabarit structuré : les sections sont en
 * place et traduites, mais les informations propres à la société (SIREN,
 * hébergeur, tribunal compétent…) doivent être complétées avant exploitation
 * commerciale. Le bandeau en tête de page le dit explicitement.
 */
export function LegalContent({ kind }: { kind: LegalKind }) {
  const { t, href, date } = useLocale();

  const titles: Record<LegalKind, string> = {
    mentions: t.legal.mentionsTitle,
    privacy: t.legal.privacyTitle,
    terms: t.legal.termsTitle,
  };

  const sections: Record<LegalKind, { heading: string; body: string }[]> = {
    mentions: [
      {
        heading: "Éditeur",
        body: `${SITE.legalName} — ${SITE.email} — ${SITE.phoneDisplay}. Forme juridique, capital social, numéro d'immatriculation et adresse du siège à compléter.`,
      },
      {
        heading: "Directeur de la publication",
        body: "Nom du représentant légal à compléter.",
      },
      {
        heading: "Hébergement",
        body: "Nom, adresse et téléphone de l'hébergeur à compléter.",
      },
      {
        heading: "Propriété intellectuelle",
        body: `L'ensemble des contenus du site (textes, visuels, marque ${SITE.name}, identité graphique) est protégé. Toute reproduction sans autorisation écrite est interdite.`,
      },
    ],
    privacy: [
      {
        heading: "Données collectées",
        body: "Les formulaires de contact et d'ouverture de compte professionnel collectent : nom, société, e-mail, téléphone, pays, activité et volume estimé. Aucune donnée n'est collectée à l'insu de l'utilisateur.",
      },
      {
        heading: "Finalité",
        body: "Répondre aux demandes commerciales, établir des devis et gérer la relation client. Les données ne sont ni vendues ni cédées à des tiers.",
      },
      {
        heading: "Conservation",
        body: "Les données de prospection sont conservées trois ans à compter du dernier contact ; les données contractuelles selon les durées légales applicables.",
      },
      {
        heading: "Vos droits",
        body: `Accès, rectification, effacement, portabilité et opposition : écrivez à ${SITE.email}. Une réclamation peut être adressée à l'autorité de contrôle compétente.`,
      },
      {
        heading: "Cookies",
        body: "Le site ne dépose aucun cookie publicitaire ni traceur tiers. Les préférences de langue et la session de l'espace professionnel sont stockées localement dans le navigateur.",
      },
    ],
    terms: [
      {
        heading: "Objet",
        body: `Les présentes conditions régissent la vente de l'huile d'olive vierge extra ${SITE.name} auprès des particuliers et des professionnels.`,
      },
      {
        heading: "Prix",
        body: "Les prix particuliers sont indiqués toutes taxes comprises. Les prix professionnels sont indiqués hors taxes, départ entrepôt, et peuvent faire l'objet d'une grille négociée propre à chaque compte.",
      },
      {
        heading: "Commande et paiement",
        body: "Le module de paiement en ligne (carte bancaire, virement, cryptomonnaie) est en cours d'intégration. Les commandes sont pour l'instant confirmées manuellement par l'équipe commerciale.",
      },
      {
        heading: "Livraison",
        body: "Expédition sous 48 heures en Europe, 5 à 10 jours à l'international. Les délais sont indicatifs et ne sauraient engager la responsabilité du vendeur en cas de retard du transporteur.",
      },
      {
        heading: "Retours",
        body: "Denrée alimentaire : le droit de rétractation ne s'applique pas aux produits descellés. Tout lot non conforme est repris ou remplacé sur présentation de photographies et du numéro de lot.",
      },
    ],
  };

  return (
    <>
      <PageHero eyebrow={t.footer.legalTitle} title={titles[kind]} />

      <section className="pb-24 sm:pb-32">
        <Container size="narrow">
          <Reveal>
            <p className="flex items-start gap-3.5 border border-gold-500/25 bg-gold-500/[0.05] px-5 py-4 text-sm leading-relaxed text-gold-200/85">
              <Info className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
              {t.legal.placeholder}
            </p>
          </Reveal>

          <div className="mt-12 space-y-10">
            {sections[kind].map((section, i) => (
              <Reveal key={section.heading} delay={i * 0.06}>
                <article>
                  <h2 className="text-xl text-cream sm:text-2xl">{section.heading}</h2>
                  <div className="mt-3 h-px w-12 bg-gold-500/35" />
                  <p className="mt-4 text-pretty leading-relaxed text-cream-mute">
                    {section.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-gold-500/12 pt-8">
            <p className="text-xs text-cream-mute/70">
              {t.legal.updated} : {date(LAST_UPDATED)}
            </p>
            <Link
              href={href("/")}
              className="inline-flex items-center gap-2.5 text-[0.68rem] uppercase
                         tracking-[0.18em] text-gold-300 transition-colors hover:text-gold-100"
            >
              <ArrowLeft className="size-3 rtl:rotate-180" strokeWidth={1.5} />
              {t.legal.backHome}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

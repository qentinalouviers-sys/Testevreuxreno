import type { Metadata } from "next";
import { company } from "@/config/company";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${company.name}, entreprise de rénovation énergétique à Évreux.`,
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updated="Janvier 2025">
      <LegalSection title="Éditeur du site">
        <p>
          Le présent site est édité par <strong>{company.legalName}</strong>, société
          au capital de {company.legal.capital}, immatriculée au {company.legal.rcs},
          SIRET {company.legal.siret}, dont le siège social est situé{" "}
          {company.address.street}, {company.address.postalCode} {company.address.city}.
        </p>
        <p>
          Numéro de TVA intracommunautaire : {company.legal.tva}
          <br />
          Directeur de la publication : {company.legal.director}
          <br />
          Téléphone : {company.phone.display} — Email : {company.email}
        </p>
        <p className="text-sm text-ink/55">
          Les informations ci-dessus sont des données de démonstration à remplacer par
          les informations réelles de l'entreprise avant mise en ligne.
        </p>
      </LegalSection>

      <LegalSection title="Assurance professionnelle">
        <p>
          {company.legalName} est couverte par une assurance responsabilité civile
          professionnelle et une garantie décennale : {company.legal.insurance}.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par {company.legal.hostName}, {company.legal.hostAddress}.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L'ensemble des contenus (textes, images, logos, éléments graphiques) présents
          sur ce site est protégé par le droit d'auteur. Toute reproduction, même
          partielle, est interdite sans autorisation préalable écrite de {company.name}.
        </p>
      </LegalSection>

      <LegalSection title="Certifications">
        <p>
          {company.name} et ses artisans partenaires sont titulaires des qualifications
          RGE (Reconnu Garant de l'Environnement) requises pour l'éligibilité de ses
          clients aux aides publiques à la rénovation énergétique.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Le traitement des données personnelles collectées via ce site est détaillé
          dans notre{" "}
          <a
            href="/politique-confidentialite"
            className="font-semibold text-energy underline"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

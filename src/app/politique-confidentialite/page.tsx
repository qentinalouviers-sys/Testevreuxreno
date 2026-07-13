import type { Metadata } from "next";
import { company } from "@/config/company";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et traitement des données personnelles de ${company.name}.`,
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="Janvier 2025">
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement des données collectées sur ce site est{" "}
          <strong>{company.legalName}</strong>, {company.address.street},{" "}
          {company.address.postalCode} {company.address.city}. Pour toute question
          relative à vos données, contactez notre référent :{" "}
          <a href={`mailto:${company.legal.dpoEmail}`} className="font-semibold text-energy underline">
            {company.legal.dpoEmail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Données collectées et finalité">
        <p>
          Via notre formulaire de demande de devis, nous collectons les données
          suivantes : type de projet, type et période de construction du logement,
          statut d'occupation, code postal, nom, prénom, numéro de téléphone et adresse
          email.
        </p>
        <p>
          <strong>Finalité :</strong> ces données sont utilisées uniquement pour vous
          recontacter, étudier votre projet de rénovation énergétique, estimer vos aides
          et établir un devis. Elles constituent la base de la relation commerciale que
          vous initiez volontairement.
        </p>
      </LegalSection>

      <LegalSection title="Base légale">
        <p>
          Le traitement repose sur votre <strong>consentement</strong> (case à cocher du
          formulaire) et sur l'exécution de mesures précontractuelles prises à votre
          demande (article 6.1.a et 6.1.b du RGPD).
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Vos données sont conservées <strong>3 ans</strong> à compter du dernier contact
          en l'absence de relation contractuelle. En cas de contrat, elles sont
          conservées pendant la durée de la relation commerciale, puis archivées
          conformément aux obligations légales et comptables (jusqu'à 10 ans).
        </p>
      </LegalSection>

      <LegalSection title="Destinataires des données">
        <p>
          Vos données sont destinées exclusivement aux équipes internes de{" "}
          {company.name} en charge du traitement de votre demande. Elles peuvent être
          transmises à nos sous-traitants techniques (hébergeur, service d'envoi
          d'emails) dans la stricte mesure nécessaire au fonctionnement du service.
        </p>
        <p>
          <strong>Nous ne revendons jamais vos données à des tiers</strong> à des fins
          commerciales ou publicitaires.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
          d'effacement, de limitation, d'opposition et de portabilité de vos données.
          Vous pouvez exercer ces droits en écrivant à{" "}
          <a href={`mailto:${company.legal.dpoEmail}`} className="font-semibold text-energy underline">
            {company.legal.dpoEmail}
          </a>
          .
        </p>
        <p>
          Vous disposez également du droit d'introduire une réclamation auprès de la CNIL
          (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="font-semibold text-energy underline">www.cnil.fr</a>).
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Ce site n'utilise pas de cookies publicitaires ni de traceurs tiers. Seuls des
          éléments strictement nécessaires à son bon fonctionnement peuvent être déposés.
          Aucune carte tierce (type Google Maps) n'est chargée sans votre action.
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          {company.name} met en œuvre les mesures techniques et organisationnelles
          appropriées pour protéger vos données contre tout accès, altération ou
          divulgation non autorisés. Les échanges avec le site sont chiffrés (HTTPS).
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

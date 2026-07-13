import type { LucideIcon } from "lucide-react";
import { FileText, Ruler, FolderCheck, Hammer } from "lucide-react";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Devis gratuit",
    description:
      "Vous estimez vos aides en ligne en 30 secondes. Nous vous rappelons sous 24h pour affiner votre projet.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Visite technique",
    description:
      "Un expert se déplace chez vous, mesure les déperditions et vous remet un devis chiffré, aides déduites.",
    icon: Ruler,
  },
  {
    number: "03",
    title: "On gère votre dossier d'aides",
    description:
      "Mandataire agréé, nous montons et déposons l'intégralité de votre dossier MaPrimeRénov' et CEE. Zéro paperasse pour vous.",
    icon: FolderCheck,
    highlight: true,
  },
  {
    number: "04",
    title: "Travaux par artisans RGE",
    description:
      "Nos équipes certifiées réalisent le chantier, propre et dans les délais. Suivi et garantie décennale inclus.",
    icon: Hammer,
  },
];

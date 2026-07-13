import type { LucideIcon } from "lucide-react";
import {
  Home,
  Thermometer,
  Droplets,
  DoorOpen,
  Wind,
  ClipboardCheck,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  aid: string;
  savings: string;
};

export const services: Service[] = [
  {
    slug: "isolation",
    title: "Isolation thermique",
    description:
      "Combles, murs et isolation par l'extérieur (ITE). Le poste n°1 pour supprimer les déperditions et gagner en confort été comme hiver.",
    icon: Home,
    aid: "Éligible MaPrimeRénov' + CEE",
    savings: "Jusqu'à 30 % d'économies",
  },
  {
    slug: "pompe-a-chaleur",
    title: "Pompe à chaleur",
    description:
      "PAC air/eau et air/air haute performance. Remplacez votre chaudière fioul ou gaz et divisez votre facture de chauffage.",
    icon: Thermometer,
    aid: "Jusqu'à 5 000 € d'aides",
    savings: "Jusqu'à 60 % d'économies",
  },
  {
    slug: "chauffe-eau-thermodynamique",
    title: "Chauffe-eau thermodynamique",
    description:
      "L'eau chaude sanitaire produite à partir des calories de l'air. Trois fois moins gourmand qu'un cumulus électrique classique.",
    icon: Droplets,
    aid: "Éligible MaPrimeRénov'",
    savings: "Jusqu'à 70 % sur l'eau chaude",
  },
  {
    slug: "menuiseries",
    title: "Menuiseries & fenêtres",
    description:
      "Fenêtres et portes en double ou triple vitrage. Fini les courants d'air et les ponts thermiques autour des ouvertures.",
    icon: DoorOpen,
    aid: "Éligible CEE + éco-PTZ",
    savings: "Confort et isolation phonique",
  },
  {
    slug: "vmc",
    title: "Ventilation VMC",
    description:
      "VMC simple et double flux pour un air sain sans pertes de chaleur. Indispensable après des travaux d'isolation performants.",
    icon: Wind,
    aid: "Éligible MaPrimeRénov'",
    savings: "Air sain, zéro humidité",
  },
  {
    slug: "audit-energetique",
    title: "Audit énergétique",
    description:
      "Le point de départ de toute rénovation d'ampleur : nous identifions les travaux prioritaires et le meilleur retour sur investissement.",
    icon: ClipboardCheck,
    aid: "Aide à l'audit disponible",
    savings: "Votre feuille de route sur mesure",
  },
];

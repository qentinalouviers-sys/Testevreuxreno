# NormaRénov — Site vitrine lead-gen

Site vitrine one-page haute conversion pour une entreprise de **rénovation
énergétique** basée à **Évreux (Eure, Normandie)**. Objectif unique : générer
des **demandes de devis qualifiées** (leads).

> Le nom, les coordonnées et l'identité sont des **placeholders** centralisés,
> conçus pour être remplacés en quelques minutes.

---

## ✨ Fonctionnalités

- **One-page funnel** : hero orienté bénéfice → réassurance → services → aides →
  méthode → avis → **formulaire multi-étapes** → FAQ → zone d'intervention.
- **Formulaire de devis multi-étapes** (type quiz) avec barre de progression,
  validation `zod` par étape, transitions Framer Motion, écran de succès animé.
- **API route** `/api/lead` : envoi email via **Resend**, **webhook** optionnel
  (CRM / Make / n8n), **honeypot** anti-spam et **rate limiting** en mémoire.
- **Animations maîtrisées** : scroll-reveal, compteurs animés, timeline dessinée,
  carousel d'avis auto-scroll + drag. Respect de `prefers-reduced-motion`.
- **SEO** : metadata complète, Open Graph (image générée), `sitemap.xml`,
  `robots.txt`, JSON-LD `LocalBusiness` + `FAQPage`.
- **Accessibilité** : sémantique HTML, focus visibles, navigation clavier,
  contrastes AA.
- **Contenu 100 % éditable** sans toucher aux composants (`src/config`,
  `src/data`).

---

## 🧱 Stack technique

| Outil | Usage |
| --- | --- |
| **Next.js 15** (App Router) | Framework React, rendu serveur |
| **TypeScript** (strict) | Typage statique, zéro `any` |
| **Tailwind CSS v4** | Styles utilitaires + design tokens |
| **Framer Motion** | Toutes les animations |
| **react-hook-form** + **zod** | Formulaire & validation |
| **lucide-react** | Icônes |
| **Resend** | Envoi des emails de leads |

---

## 🚀 Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env.local
# puis renseignez vos variables (voir ci-dessous)

# 3. Lancer en développement
npm run dev
# → http://localhost:3000

# 4. Build de production
npm run build && npm run start
```

> En développement sans `RESEND_API_KEY`, les leads sont **loggués dans la
> console** — aucun email n'est envoyé, le formulaire reste pleinement testable.

---

## 🔐 Variables d'environnement

Toutes les variables sont documentées dans [`.env.example`](./.env.example).

| Variable | Requis | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Recommandé | Clé API [Resend](https://resend.com). Absente → log console. |
| `LEAD_FROM_EMAIL` | Recommandé | Expéditeur vérifié (ex. `NormaRénov <devis@mail.domaine.fr>`). |
| `LEAD_TO_EMAIL` | Recommandé | Destinataire(s) des leads (séparés par des virgules). |
| `LEAD_WEBHOOK_URL` | Optionnel | URL POST JSON pour brancher un CRM / Make / n8n. |
| `NEXT_PUBLIC_SITE_URL` | Recommandé | URL publique (sitemap, OG). Sans slash final. |

---

## ✏️ Personnaliser le contenu

Aucune modification de composant nécessaire :

| Fichier | Contenu |
| --- | --- |
| `src/config/company.ts` | **Nom, téléphone, adresse, email, horaires, certifications, note.** |
| `src/config/hero.ts` | Média du hero — photo et **vidéo cinématique optionnelle** (voir `public/hero/`). |
| `src/data/services.ts` | Cartes de services |
| `src/data/aids.ts` | Dispositifs d'aides & barème par revenus |
| `src/data/process.ts` | Les 4 étapes de la méthode |
| `src/data/reviews.ts` | Avis clients (structure calquée sur l'API Google Places) |
| `src/data/faq.ts` | Questions / réponses (alimente aussi le JSON-LD) |
| `src/data/stats.ts` | Compteurs de la barre de réassurance |

Les couleurs et typographies sont des **design tokens** dans
`src/app/globals.css` (bloc `@theme`).

---

## 🗂️ Structure

```
src/
├── app/
│   ├── layout.tsx                 # Fonts, metadata, JSON-LD LocalBusiness
│   ├── page.tsx                   # Assemblage des sections (funnel)
│   ├── globals.css                # Design tokens Tailwind v4
│   ├── opengraph-image.tsx        # Image OG générée
│   ├── sitemap.ts / robots.ts     # SEO
│   ├── api/lead/route.ts          # Réception des leads (Resend + webhook)
│   ├── mentions-legales/
│   └── politique-confidentialite/
├── components/
│   ├── sections/                  # Une section = un composant
│   └── ui/                        # Button, Badge, SectionHeading, CountUp…
├── config/company.ts              # Configuration centrale
├── data/                          # Contenu éditable
└── lib/                           # schema (zod), motion, rateLimit, utils
```

---

## ☁️ Déploiement Vercel

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com) → **New Project** → importez le repo.
3. Framework détecté automatiquement (**Next.js**). Aucune configuration requise.
4. Ajoutez les **variables d'environnement** (onglet _Settings → Environment
   Variables_) à partir de `.env.example`.
5. **Deploy**. C'est en ligne.

> Pensez à définir `NEXT_PUBLIC_SITE_URL` sur votre domaine de production pour
> des URLs correctes dans le sitemap et l'Open Graph.

---

## 🔗 Maquette partageable — GitHub Pages

Un workflow ([`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml))
publie automatiquement une **maquette statique** sur GitHub Pages à chaque push
sur la branche du projet.

- **Export statique** (`output: 'export'`) activé via `STATIC_EXPORT=true`.
- Le **formulaire est en mode démo** (`NEXT_PUBLIC_FORM_MODE=demo`) : il affiche
  l'écran de succès **sans envoyer de lead** — idéal pour présenter le rendu.
- La route API `/api/lead` (incompatible avec l'hébergement statique) est
  retirée du build Pages uniquement ; elle reste intacte dans le dépôt pour un
  déploiement Vercel complet.

> URL de la maquette : `https://<owner>.github.io/<repo>/`
> GitHub Pages sur un dépôt **privé** nécessite un plan payant (Pro/Team) ou de
> rendre le dépôt public.

## 📈 Brancher un vrai flux de leads

- **Email** : créez un compte Resend, vérifiez votre domaine, renseignez
  `RESEND_API_KEY`, `LEAD_FROM_EMAIL` et `LEAD_TO_EMAIL`.
- **CRM / automatisation** : renseignez `LEAD_WEBHOOK_URL` avec un webhook
  Make / n8n / Zapier — chaque lead y est POSTé en JSON.
- **Avis Google** : remplacez le contenu de `src/data/reviews.ts` par un appel à
  l'API Google Places (la structure des données est déjà compatible).

---

## 📝 Licence

Projet privé. Contenu et identité à des fins de démonstration.

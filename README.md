# Al Arifa

Site e-commerce international de la maison **Al Arifa** — huile d'olive vierge extra,
Sélection Héritage, première pression à froid, origine Portugal.

Thème sombre, codes de la maison de parfum : noir laqué, or gravé, filets fins,
mouvement discret. Mobile first, cinq langues, mise en avant du BtoB.

---

## Sommaire

- [Démarrage](#démarrage)
- [Ce que contient le site](#ce-que-contient-le-site)
- [Internationalisation](#internationalisation)
- [Espace professionnel et administration](#espace-professionnel-et-administration)
- [Paiement](#paiement)
- [Formulaire de contact](#formulaire-de-contact)
- [Direction artistique](#direction-artistique)
- [Visuel produit](#visuel-produit)
- [Déploiement](#déploiement)
- [Variables d'environnement](#variables-denvironnement)
- [Structure](#structure)
- [Avant la mise en production](#avant-la-mise-en-production)

---

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000 → redirige vers /fr
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build Node |
| `npm run typecheck` | Contrôle TypeScript strict |
| `npm run product:cutout` | Régénère le visuel produit détouré |

Stack : **Next.js 15** (App Router) · **React 19** · **TypeScript strict** ·
**Tailwind CSS 4** · **framer-motion** · **three.js / react-three-fiber**.
Aucune dépendance de composants tierce : toute l'interface est écrite pour ce projet.

---

## Ce que contient le site

| Page | Route | Contenu |
| --- | --- | --- |
| Accueil | `/[lang]` | Hero 3D, produit, piliers, terroir, section BtoB, moyens de paiement |
| L'Histoire Al Arifa | `/[lang]/histoire` | Chronologie 1898 → aujourd'hui, valeurs, citation |
| Commander | `/[lang]/commande` | Parcours particulier **et** professionnel, paliers dégressifs, paiement |
| Contact | `/[lang]/contact` | Formulaire rapide + bouton WhatsApp + coordonnées |
| Accès Pro | `/[lang]/pro` | Connexion, demande d'ouverture de compte, tableau de bord client |
| Administration | `/[lang]/admin` | Validation des comptes, tarifs par client, suivi des commandes |
| Légal | `/[lang]/mentions-legales`, `/confidentialite`, `/cgv` | Gabarits à compléter |

La racine `/` affiche un écran de choix de langue qui redirige automatiquement
vers la langue du navigateur (repli : français).

Un bouton WhatsApp flottant apparaît sur toutes les pages après quelques
centaines de pixels de défilement.

---

## Internationalisation

Cinq langues, préfixe d'URL par langue, sélecteur en haut à droite avec le
drapeau de chaque pays (SVG inline — identiques sur tous les systèmes,
contrairement aux emojis).

| Langue | Route | Sens de lecture |
| --- | --- | --- |
| Français (défaut) | `/fr` | LTR |
| English | `/en` | LTR |
| Português | `/pt` | LTR |
| العربية | `/ar` | **RTL** |
| 中文 | `/zh` | LTR |

- Le dictionnaire **français fait foi** : `src/i18n/dictionaries/fr.ts` exporte le
  type `Dictionary`, et les quatre autres langues sont typées dessus. Ajouter une
  clé en français fait échouer la compilation tant que les quatre traductions
  manquent — aucune langue ne peut dériver silencieusement.
- L'arabe bascule la page entière en RTL (`dir="rtl"`) ; toute la mise en page
  utilise des propriétés logiques (`start`/`end`, `ms-`/`me-`), y compris les
  flèches des boutons.
- Prix et dates sont formatés via `Intl` selon la langue active
  (`price()` et `date()` de `useLocale()`).
- Les fontes latines de la marque ne couvrant ni l'arabe ni le chinois, ces deux
  langues s'appuient sur les piles de fontes système : rendu natif et zéro
  téléchargement de plusieurs mégaoctets.

Le sélecteur conserve la page courante en changeant de langue : les slugs sont
identiques dans toutes les langues, seul le préfixe change.

---

## Espace professionnel et administration

Parcours complet et fonctionnel :

1. **Inscription** d'un professionnel (`/[lang]/pro`, onglet « Créer un compte »).
2. Le compte est créé **en attente** — la connexion est refusée avec un message
   explicite tant qu'il n'est pas validé.
3. **En administration**, le compte apparaît dans l'onglet « Comptes pro » et peut
   être validé ou refusé.
4. Toujours en administration, onglet « Tarifs » : saisie d'un **prix d'achat
   unitaire spécifique à ce client** (laisser vide = grille dégressive standard).
   La remise par rapport au prix public s'affiche en direct.
5. Le client voit alors **sa** grille tarifaire dans son espace, simule un volume
   et passe commande.
6. La commande remonte dans l'onglet « Commandes » de l'administration, où son
   statut se change (en attente / confirmée / expédiée / annulée).

Comptes de démonstration :

| Rôle | Identifiants |
| --- | --- |
| Administrateur | `admin@al-arifa.com` / `arifa2024` |
| Client pro validé | `achats@maison-verdier.fr` / `demo1234` |

> ⚠️ **Persistance de démonstration.** `src/lib/store.ts` stocke comptes, tarifs et
> commandes dans le `localStorage` du navigateur, et hache les mots de passe avec
> une fonction non cryptographique. Ce choix permet de faire tourner l'intégralité
> du parcours sans backend, y compris sur un hébergement statique — mais il n'est
> **pas** utilisable en production : les données ne sont pas partagées entre
> appareils et rien n'est vérifié côté serveur. L'interface publique du module a
> été conçue pour être réimplémentée telle quelle au-dessus d'une vraie API
> (base de données + sessions signées côté serveur).

---

## Paiement

Trois moyens de paiement sont présentés et **pleinement cliquables** :
carte bancaire (Stripe), virement bancaire (SEPA & SWIFT) et cryptomonnaie
(BTC, ETH, USDT).

Aucun tunnel n'est branché derrière : la validation ouvre une pop-up
« paiement en cours de développement » qui renvoie vers le formulaire de contact
ou WhatsApp. Chaque moyen porte un badge « Bientôt ». C'est volontaire et
assumé côté texte — rien ne laisse croire à un paiement effectif.

---

## Formulaire de contact

- Si `NEXT_PUBLIC_FORM_ENDPOINT` est défini (Formspree, Web3Forms, Basin…), la
  demande y est envoyée en `POST`.
- Sinon — cas d'un déploiement statique sans backend — le formulaire compose la
  demande dans **WhatsApp** avec un message pré-rempli, plutôt que d'afficher une
  confirmation d'envoi qui n'a pas eu lieu.

---

## Direction artistique

La palette est relevée directement sur le bidon : noir laqué, or gravé, vert
olive du médaillon, rouge rubis du cœur floral. Elle est déclarée en jetons
Tailwind dans `src/app/globals.css` (`--color-ink-*`, `--color-gold-*`,
`--color-olive-*`, `--color-ruby-*`).

Typographie : **Cormorant Garamond** pour le titrage (écho au lettrage gravé) et
**Jost** pour les petites capitales espacées.

Motifs récurrents : le losange doré et la rosace à huit pétales du médaillon,
repris dans le logo, les puces, la favicon et les écrans de confirmation.

**Scène 3D** (`src/components/three/OliveScene.tsx`) : branches d'olivier,
olives en lévitation et poussière d'or, entièrement procédurales — aucune texture
ni modèle externe. Elle est chargée en `dynamic(..., { ssr: false })`, réduite en
densité et en DPR sur petit écran, et **totalement désactivée** si l'utilisateur a
demandé moins de mouvement (`prefers-reduced-motion`). Le site reste complet sans
elle.

L'ensemble des animations respecte `prefers-reduced-motion`.

---

## Visuel produit

Le fond du visuel fourni est noir pur : posé sur le dégradé de la page, il
dessinait un rectangle visible. `scripts/cutout-product.mjs` détoure le bidon.

Le corps du bidon étant lui-même quasi noir, un remplissage par diffusion fuit à
travers les zones sombres du filet doré. Le script s'appuie donc sur la géométrie :
balayage ligne par ligne pour trouver la silhouette, puis enveloppe rectangulaire
imposée sur la plage du corps (l'anse et les arrondis gardent leur découpe fine).
Sortie en WebP avec alpha — **113 Ko au lieu de 1,6 Mo** en PNG.

```bash
npm run product:cutout   # assets/al-arifa-5l-source.jpeg → public/product/al-arifa-5l.webp
```

Le fichier source d'origine est conservé hors de `public/`, dans `assets/`.

---

## Déploiement

**Vercel / Node** — rien à configurer, `npm run build` puis `npm run start`.

**GitHub Pages** — le workflow `.github/workflows/deploy-pages.yml` construit un
export statique à chaque push sur `main`. Activer une fois *Settings → Pages →
Source: GitHub Actions*.

L'export statique est activé par `STATIC_EXPORT=true` et le `basePath` par
`PAGES_BASE_PATH`. Attention : Next préfixe automatiquement les `<Link>` et les
bundles par le `basePath`, mais **pas** le `src` d'une `<Image>` non optimisée ni
les icônes déclarées dans `metadata` — d'où le helper `src/lib/asset.ts`, à
utiliser pour toute nouvelle ressource servie depuis `public/`.

---

## Variables d'environnement

Toutes optionnelles — le site fonctionne sans aucune d'entre elles.
Voir `.env.example`.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (métadonnées, sitemap, données structurées) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Endpoint du formulaire de contact |
| `STATIC_EXPORT` | `true` pour produire un export statique |
| `PAGES_BASE_PATH` | Sous-chemin de déploiement (GitHub Pages) |

Les coordonnées de la maison (e-mail, téléphone, **numéro WhatsApp**) sont
centralisées dans `src/lib/site.ts` ; le catalogue et la grille tarifaire dans
`src/lib/catalog.ts`.

---

## Structure

```
src/
├── app/
│   ├── (redirect)/          # `/` — écran de choix de langue (layout racine dédié)
│   ├── (site)/[locale]/     # toutes les pages localisées (layout racine <html lang dir>)
│   ├── globals.css          # jetons de design et utilitaires maison
│   ├── fonts.ts
│   ├── robots.ts · sitemap.ts
├── components/
│   ├── sections/            # sections de la page d'accueil
│   ├── pages/               # contenus des pages intérieures
│   ├── three/OliveScene.tsx # scène react-three-fiber
│   └── ui/                  # primitives (bouton, champ, drapeaux, révélations…)
├── i18n/                    # config, provider et cinq dictionnaires
└── lib/                     # catalogue, store pro/admin, helpers
scripts/cutout-product.mjs   # détourage du visuel produit
assets/                      # visuel source (non servi)
```

---

## Avant la mise en production

1. **Remplacer le store de démonstration** par un vrai backend (voir l'avertissement
   plus haut) : base de données, sessions signées côté serveur, hachage bcrypt/argon2.
2. **Brancher le paiement** : Stripe pour la carte, coordonnées bancaires pour le
   virement, prestataire pour la cryptomonnaie. Retirer la pop-up « en cours de
   développement ».
3. **Compléter les pages légales** — les gabarits sont en place et signalent
   eux-mêmes qu'ils doivent être complétés (éditeur, hébergeur, SIREN, tribunal).
4. **Renseigner les vraies coordonnées** dans `src/lib/site.ts` — l'e-mail, le
   téléphone et le numéro WhatsApp actuels sont des valeurs d'exemple.
5. **Vérifier les prix** de `src/lib/catalog.ts` (prix public, paliers dégressifs).
6. Ajouter une **image Open Graph** dédiée si un partage social soigné est attendu.

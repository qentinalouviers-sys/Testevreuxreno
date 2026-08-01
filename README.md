# Al Arifa

**Place de marché** de producteurs indépendants du bassin méditerranéen —
huiles d'olive, miels, safran, sels, olives et fruits secs.

Chaque maison vend **sous sa propre marque**, un panier peut contenir plusieurs
producteurs, et le paiement est **scindé à la source** : 70 % au producteur,
30 % à la plateforme, sans refacturation ni avance de trésorerie.

Direction artistique claire : fonds papier, encres sombres, or gravé en accent.
Les produits sont photographiés sur fond noir — les poser sur du papier crée
le contraste qui les met en valeur. Seuls le hero et l'écran de choix de langue
restent des blocs sombres. Mobile first, cinq langues, BtoB assumé.

---

## Sommaire

- [Démarrage](#démarrage)
- [Modèle de reversement](#modèle-de-reversement)
- [Ce que contient le site](#ce-que-contient-le-site)
- [Internationalisation](#internationalisation)
- [Espace producteur et administration](#espace-producteur-et-administration)
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

## Modèle de reversement

Le panier est regroupé par producteur et la répartition est calculée ligne par
ligne (`src/lib/cart.ts`, `src/lib/marketplace.ts`) :

- la commission ne porte **que sur la marchandise** — les frais de port sont
  reversés en totalité au producteur qui expédie ;
- le taux est réglable **par maison** depuis l'administration (30 % par défaut) ;
- la répartition est affichée au client dans le panier et au tunnel de commande,
  et au producteur dans son espace.

Le jour où le paiement sera branché, la cible est **Stripe Connect en
« separate charges and transfers »** : un seul `PaymentIntent` encaissé par la
plateforme, puis un `transfer` par producteur reliés par un `transfer_group`.
C'est le seul modèle Connect qui accepte un panier multi-vendeurs. La structure
`CartSummary.groups` est déjà exactement la charge utile à envoyer au backend :
un groupe = un virement.

Sur une commande de 100 € de marchandise, le producteur reçoit 70 € nets et la
plateforme 30 € bruts, dont il faut déduire les frais d'encaissement (~1,5 % +
0,25 €) qu'elle porte sur sa part.

## Ce que contient le site

| Page | Route | Contenu |
| --- | --- | --- |
| Accueil | `/[lang]` | Hero 3D, sélection, piliers, maisons, origines, section BtoB, paiements |
| La sélection | `/[lang]/produits` | Catalogue filtrable par famille et par producteur |
| Fiche produit | `/[lang]/produits/[slug]` | Détail, tarif public et pro, ajout au panier, rappel de la maison |
| Nos producteurs | `/[lang]/producteurs` | Les six maisons référencées |
| Page de marque | `/[lang]/producteurs/[slug]` | Vitrine d'une maison et ses produits |
| Panier | `/[lang]/panier` | Groupé par producteur, avec la répartition du paiement |
| Commande | `/[lang]/commande` | Récapitulatif, répartition, trois moyens de paiement |
| Devenir producteur | `/[lang]/vendre` | Page d'acquisition : la règle 70/30, le parcours, la FAQ |
| L'Histoire Al Arifa | `/[lang]/histoire` | Chronologie 1898 → aujourd'hui, valeurs, citation |
| Contact | `/[lang]/contact` | Formulaire rapide + bouton WhatsApp + coordonnées |
| Espace producteur | `/[lang]/pro` | Candidature, reversements, produits, commandes, revenus |
| Administration | `/[lang]/admin` | Validation des maisons, taux de commission, commandes |
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

## Espace producteur et administration

Parcours complet et fonctionnel :

1. **Candidature** d'un producteur (`/[lang]/pro`, onglet « Candidater »).
2. La maison est créée **en attente** — la connexion est refusée avec un message
   explicite tant qu'elle n'est pas référencée.
3. **En administration**, onglet « Producteurs » : la candidature peut être
   référencée ou refusée.
4. Onglet « Commissions » : réglage du **taux propre à cette maison**
   (laisser vide = 30 % standard). La part producteur s'affiche en direct.
5. La maison voit alors dans son espace ses revenus (encaissé, sa part, la
   commission), ses produits publiés et l'état de son compte de reversement.
6. Les commandes remontent dans l'onglet « Commandes » de l'administration, avec
   le détail encaissé / commission / part producteur, et un statut modifiable.

Comptes de démonstration :

| Rôle | Identifiants |
| --- | --- |
| Administrateur | `admin@al-arifa.com` / `arifa2024` |
| Producteur référencé | `contact@mieldescedres.ma` / `demo1234` |
| Acheteur professionnel | `achats@tabledumarche.fr` / `demo1234` |
| Candidature en attente | `hola@almendrasderonda.es` / `demo1234` |

**Trois natures de compte** (`src/lib/store.ts`, type `Role`) :

- **Producteur** — vend sous sa marque, perçoit sa part de chaque commande.
  Son contrat est un *taux de commission*.
- **Acheteur professionnel** — restaurant, épicerie, importateur. Son contrat
  est une *remise catalogue* négociée.
- **Administrateur** — règle les contrats et suit les commandes.

En administration, l'onglet « Commissions » présente une carte par contrat avec
une **jauge** (curseur natif, donc accessible au clavier et au tactile) et la
simulation en direct de l'effet sur une commande de 100 €.

> ⚠️ **Persistance de démonstration.** `src/lib/store.ts` stocke maisons, taux et
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

Seule la carte permettra une répartition automatique. Le virement et la
cryptomonnaie arrivent sur un compte unique : redistribuer aux producteurs y
sera un geste manuel, donc une intermédiation. À trancher avant l'ouverture
commerciale.

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
2. **Brancher Stripe Connect** : onboarding Express des producteurs, `PaymentIntent`
   unique puis un `transfer` par groupe du panier. Retirer la pop-up « en cours de
   développement ».
3. **Traiter les obligations de place de marché** : auto-facturation des commissions
   (la commission est une prestation soumise à TVA, même sans refacturation de
   marchandise) et déclaration DAC7 des revenus versés aux vendeurs. À valider avec
   un conseil fiscal.
3. **Compléter les pages légales** — les gabarits sont en place et signalent
   eux-mêmes qu'ils doivent être complétés (éditeur, hébergeur, SIREN, tribunal).
4. **Renseigner les vraies coordonnées** dans `src/lib/site.ts` — l'e-mail, le
   téléphone et le numéro WhatsApp actuels sont des valeurs d'exemple.
5. **Vérifier les prix** de `src/lib/catalog.ts` (prix public, paliers dégressifs).
6. Ajouter une **image Open Graph** dédiée si un partage social soigné est attendu.

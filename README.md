# 🐀 Le Rat — l'art de négocier

Assistant de **négociation d'annonces d'occasion** (Leboncoin, Facebook
Marketplace). Tu composes ton équipe d'**opérateurs** — des personas façon
cartes de foot (Le Fouineur, Le Casseur, Le Parrain…) — et ils rédigent tes
messages au vendeur, analysent l'avancement du deal via une **jauge**, et
notent chaque négociateur en fin de match. Le tout propulsé par l'IA (API
Anthropic).

> Application **100 % front** (React + Vite). Aucune donnée n'est stockée côté
> serveur : les appels à l'IA passent par **ton propre proxy** Cloudflare
> Worker (voir plus bas), qui garde la clé API secrète.

---

## ✨ Fonctionnement

1. **Compose ton équipe** — choisis tes opérateurs et le marché (Leboncoin /
   Facebook).
2. **Décris l'annonce** — colle le texte ou une **capture d'écran** ; l'IA
   extrait l'objet et le prix affiché. Fixe ton **objectif** et ton **max
   absolu**.
3. **Le match démarre** — un opérateur rédige un message prêt à copier-coller.
   Tu l'envoies au vendeur.
4. **Colle la réponse du vendeur** (texte ou capture) — l'IA met à jour la
   jauge, estime le prix auquel le vendeur est prêt, et détecte l'accord.
5. **Fin de partie** — à la conclusion (ou l'échec), chaque négociateur reçoit
   une note et un titre ; le **MVP** est désigné.

---

## 🧱 Stack

| Outil | Usage |
| --- | --- |
| **React 18** | UI (une seule vue, dans `src/App.tsx`) |
| **Vite 6** | Dev server + build statique |
| **TypeScript** | Outillage (typage volontairement souple) |
| **API Anthropic** | Rédaction des messages, analyse, extraction d'annonce |
| **Cloudflare Workers** | Proxy pour l'API (clé secrète + CORS) — dans `worker/` |

---

## 🚀 Démarrage

```bash
npm install
npm run dev        # → http://localhost:5173
```

Autres scripts :

```bash
npm run build      # build statique dans dist/
npm run preview    # sert le build de production
npm run typecheck  # vérification TypeScript (sans émettre)
```

L'app fonctionne dès le lancement, mais **la négociation nécessite un
endpoint IA** : renseigne l'URL de ton Worker dans le champ en haut de l'app
(voir ci-dessous).

---

## 🛰️ Le proxy IA (obligatoire pour les appels)

Le navigateur ne peut pas appeler directement l'API Anthropic (la clé serait
exposée et l'API bloque le CORS). Le dossier [`worker/`](./worker) contient un
**Cloudflare Worker** minimal qui fait l'intermédiaire.

### Option A — déploiement automatique (GitHub Actions)

Le workflow [`deploy-worker.yml`](./.github/workflows/deploy-worker.yml) déploie
le Worker sans aucune commande à taper. Ajoute deux secrets dans le dépôt
(**Settings → Secrets and variables → Actions → New repository secret**) :

| Secret | Valeur |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare avec la permission **Edit Cloudflare Workers** ([créer un token](https://dash.cloudflare.com/profile/api-tokens)). |
| `ANTHROPIC_API_KEY` | Ta clé API Anthropic. |

Puis lance le workflow (onglet **Actions → Deploy Worker → Run workflow**), ou
pousse un changement dans `worker/`. L'URL du Worker apparaît dans les logs du
job (`https://lerat-worker.<sous-domaine>.workers.dev`).

### Option B — déploiement local

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY   # colle ta clé API Anthropic
npm run deploy
```

Dans les deux cas, Wrangler affiche l'URL du Worker
(`https://lerat-worker.<sous-domaine>.workers.dev`). **Colle cette URL dans le
champ « ENDPOINT IA » de l'app.**

### Configuration

Dans [`worker/wrangler.toml`](./worker/wrangler.toml) :

- **`MODEL`** — modèle forcé côté serveur. Par défaut `claude-sonnet-4-5`.
  Le front envoie son propre identifiant de modèle, mais celui du Worker prime
  (pratique pour corriger un id obsolète sans toucher au build). Mets ici le
  modèle auquel **ton compte Anthropic** a accès.
- **`ALLOW_ORIGIN`** — restreins l'origine autorisée (ex.
  `https://<owner>.github.io`) au lieu de `*` en production.

`ANTHROPIC_API_KEY` est un **secret** : ne le mets jamais dans `wrangler.toml`
ni dans le dépôt — utilise `wrangler secret put`.

---

## 🗂️ Structure

```
├── index.html               # point d'entrée HTML (fonts, meta)
├── src/
│   ├── App.tsx              # toute l'app (composants + prompts + styles inline)
│   ├── main.tsx            # montage React
│   └── index.css          # reset global léger
├── worker/                 # proxy Anthropic (Cloudflare Workers)
│   ├── src/index.ts
│   └── wrangler.toml
├── vite.config.ts          # base "./" (compatible sous-chemin GitHub Pages)
└── .github/workflows/deploy-pages.yml
```

---

## ☁️ Déploiement du front

### GitHub Pages (automatique)

Le workflow [`deploy-pages.yml`](./.github/workflows/deploy-pages.yml) build et
publie l'app sur GitHub Pages à chaque push sur la branche du projet.

> Active Pages une fois : **Settings → Pages → Source : GitHub Actions**.
> URL : `https://<owner>.github.io/<repo>/`
> (Pages sur dépôt **privé** nécessite un plan payant.)

### Vercel / Netlify

Framework détecté : **Vite**. Build : `npm run build`, dossier de sortie :
`dist`. Aucune variable d'environnement côté front (l'endpoint IA se saisit
dans l'app).

---

## 📝 Licence

Projet privé. Contenu et identité à des fins de démonstration.

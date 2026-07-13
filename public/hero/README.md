# Vidéo du hero (optionnelle)

Déposez ici votre clip pour transformer le hero en vidéo cinématique :

- `hero.mp4` — **recommandé** (H.264, muet, 8–15 s, boucle fluide, < 6 Mo, 1080p)
- `hero.webm` — optionnel (poids réduit, servi en priorité)

Puis renseignez le chemin dans [`src/config/hero.ts`](../../src/config/hero.ts) :

```ts
export const heroMedia = {
  videoSrc: "/hero/hero.mp4",
  videoSrcWebm: "/hero/hero.webm", // si présent
  ...
};
```

Idées de plans : vue drone d'une maison normande, pose d'isolation,
installation d'une pompe à chaleur, artisan au travail.

Tant qu'aucune vidéo n'est renseignée, le hero utilise la photo (poster)
avec exactement la même chorégraphie au scroll.

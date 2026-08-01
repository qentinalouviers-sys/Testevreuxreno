/**
 * Préfixe une ressource de `public/` par le basePath éventuel.
 *
 * Next applique automatiquement le basePath aux `<Link>` et aux bundles, mais
 * pas au `src` d'une `<Image>` non optimisée ni aux chemins déclarés dans
 * `metadata` — or c'est exactement la configuration d'un export statique
 * déployé sous `/<dépôt>` sur GitHub Pages.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!BASE_PATH) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

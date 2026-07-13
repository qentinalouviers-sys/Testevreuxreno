/**
 * Préfixe un chemin d'asset local avec le basePath éventuel (GitHub Pages).
 * Les URL absolues (http/https) sont renvoyées telles quelles.
 *
 * next/image gère déjà le basePath automatiquement ; ce helper sert aux
 * assets référencés « à la main » (ex. l'attribut src d'une balise <video>).
 */
export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

/**
 * Concatène des classes conditionnelles sans dépendance externe.
 * Accepte strings, false/undefined/null (ignorés), tableaux et objets.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (val: ClassValue) => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      out.push(String(val));
    } else if (Array.isArray(val)) {
      val.forEach(walk);
    } else if (typeof val === "object") {
      for (const [key, cond] of Object.entries(val)) {
        if (cond) out.push(key);
      }
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}

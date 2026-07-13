/**
 * Rate limiting simple en mémoire (fenêtre glissante).
 * Suffisant pour un formulaire de lead ; non partagé entre instances
 * serverless — pour un usage intensif, brancher un store type Upstash.
 */
const hits = new Map<string, number[]>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0] ?? now;
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Nettoyage opportuniste pour éviter la fuite mémoire.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return { ok: true, retryAfter: 0 };
}

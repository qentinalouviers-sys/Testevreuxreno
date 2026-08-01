"use client";

import { useCallback, useEffect, useState } from "react";
import { getSession, subscribe, type Session } from "./store";

/**
 * Force un nouveau rendu à chaque mutation du store.
 * `version` sert de dépendance aux useMemo qui relisent les données.
 */
export function useStoreVersion(): number {
  const [version, setVersion] = useState(0);
  useEffect(() => subscribe(() => setVersion((v) => v + 1)), []);
  return version;
}

/**
 * Session courante. `ready` distingue « pas encore lu » (rendu serveur ou
 * première frame) de « aucune session » — sans quoi l'écran de connexion
 * clignoterait à chaque rechargement.
 */
export function useSession(): { session: Session | null; ready: boolean; refresh: () => void } {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => setSession(getSession()), []);

  useEffect(() => {
    refresh();
    setReady(true);
    return subscribe(refresh);
  }, [refresh]);

  return { session, ready, refresh };
}

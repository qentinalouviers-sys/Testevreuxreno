/**
 * Le Rat — proxy Anthropic sur Cloudflare Workers.
 *
 * Le front (SPA) ne peut pas appeler directement l'API Anthropic :
 *  - la clé API ne doit jamais être exposée dans le navigateur ;
 *  - l'API n'autorise pas les requêtes cross-origin (CORS) du navigateur.
 *
 * Ce Worker sert d'intermédiaire : il reçoit le corps de requête envoyé par
 * l'app, injecte l'en-tête d'authentification, appelle Anthropic, puis renvoie
 * la réponse avec les en-têtes CORS. Colle l'URL du Worker déployé dans le
 * champ « endpoint » de l'app.
 *
 * Secrets / variables (voir wrangler.toml + `wrangler secret`) :
 *  - ANTHROPIC_API_KEY  (secret, requis)
 *  - MODEL              (var, optionnel) : force le modèle, sinon celui du front.
 *  - ALLOW_ORIGIN       (var, optionnel) : origine autorisée (défaut "*").
 */

export interface Env {
  ANTHROPIC_API_KEY: string;
  MODEL?: string;
  ALLOW_ORIGIN?: string;
}

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

function corsHeaders(env: Env): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(body: unknown, status: number, env: Env): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(env) },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }
    if (request.method !== "POST") {
      return json({ error: { message: "Méthode non autorisée." } }, 405, env);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json(
        { error: { message: "ANTHROPIC_API_KEY non configurée sur le Worker." } },
        500,
        env
      );
    }

    let payload: Record<string, unknown>;
    try {
      payload = await request.json();
    } catch {
      return json({ error: { message: "Corps JSON invalide." } }, 400, env);
    }

    // Le modèle du Worker (s'il est défini) prime sur celui envoyé par le front.
    if (env.MODEL) payload.model = env.MODEL;

    let upstream: Response;
    try {
      upstream = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": ANTHROPIC_VERSION,
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      return json(
        { error: { message: "Appel Anthropic impossible : " + (e as Error).message } },
        502,
        env
      );
    }

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/json",
        ...corsHeaders(env),
      },
    });
  },
};

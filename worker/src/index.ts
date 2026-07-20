/**
 * Le Rat — proxy Google Gemini sur Cloudflare Workers.
 *
 * Le front (SPA) envoie ses requêtes au format "messages" (héritage Anthropic) :
 *   { model, max_tokens, messages: [{ role, content }] }
 * où `content` est une chaîne OU un tableau de blocs { type:"text" | "image" }.
 *
 * Ce Worker :
 *   1. reçoit cette requête (la clé API n'est jamais dans le navigateur) ;
 *   2. la traduit vers l'API Gemini (generateContent) ;
 *   3. retraduit la réponse au format attendu par le front :
 *        { content: [{ type: "text", text: "..." }] }
 *      (ou { error: { message } } en cas d'échec) ;
 *   4. ajoute les en-têtes CORS.
 *
 * Colle l'URL du Worker déployé dans le champ « ENDPOINT IA » de l'app.
 *
 * Secrets / variables (voir wrangler.toml + `wrangler secret`) :
 *   - GEMINI_API_KEY  (secret, requis)
 *   - MODEL           (var, optionnel) : modèle Gemini (défaut gemini-2.0-flash).
 *   - ALLOW_ORIGIN    (var, optionnel) : origine autorisée (défaut "*").
 */

export interface Env {
  GEMINI_API_KEY: string;
  MODEL?: string;
  ALLOW_ORIGIN?: string;
}

const DEFAULT_MODEL = "gemini-2.0-flash";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

type Block =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: string; media_type: string; data: string } };

interface InMessage {
  role?: string;
  content: string | Block[];
}

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

// Un bloc de contenu "messages" -> une part Gemini.
function toParts(content: string | Block[]): unknown[] {
  if (typeof content === "string") return [{ text: content }];
  return content.map((b) => {
    if (b.type === "image") {
      return { inline_data: { mime_type: b.source.media_type, data: b.source.data } };
    }
    return { text: b.text };
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
    if (!env.GEMINI_API_KEY) {
      return json(
        { error: { message: "GEMINI_API_KEY non configurée sur le Worker." } },
        500,
        env
      );
    }

    let payload: { messages?: InMessage[]; max_tokens?: number };
    try {
      payload = await request.json();
    } catch {
      return json({ error: { message: "Corps JSON invalide." } }, 400, env);
    }

    const messages = payload.messages || [];
    if (!messages.length) {
      return json({ error: { message: "Aucun message fourni." } }, 400, env);
    }

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: toParts(m.content),
    }));

    const model = env.MODEL || DEFAULT_MODEL;
    const body = {
      contents,
      generationConfig: { maxOutputTokens: payload.max_tokens ?? 1024 },
    };

    let upstream: Response;
    try {
      upstream = await fetch(`${GEMINI_BASE}/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY,
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      return json(
        { error: { message: "Appel Gemini impossible : " + (e as Error).message } },
        502,
        env
      );
    }

    const raw = await upstream.text();
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      return json({ error: { message: "Réponse Gemini illisible." } }, 502, env);
    }

    if (!upstream.ok || data.error) {
      const msg = data.error?.message || "Erreur Gemini (HTTP " + upstream.status + ").";
      return json({ error: { message: msg } }, upstream.status || 502, env);
    }

    const cand = data.candidates?.[0];
    const parts: Array<{ text?: string }> = cand?.content?.parts || [];
    const text = parts.map((p) => p.text || "").join("");

    if (!text.trim()) {
      const reason = cand?.finishReason || data.promptFeedback?.blockReason || "réponse vide";
      return json(
        { error: { message: "Gemini n'a rien renvoyé (" + reason + ")." } },
        502,
        env
      );
    }

    // Format attendu par le front.
    return json({ content: [{ type: "text", text }] }, 200, env);
  },
};

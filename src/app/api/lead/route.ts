import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/schema";
import { rateLimit } from "@/lib/rateLimit";
import { renderLeadEmail, renderLeadText } from "@/lib/leadEmail";
import { company } from "@/config/company";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // ── Identifiant client pour le rate limiting ──────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans un instant." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  // ── Parsing + validation ──────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : si le champ piège est rempli, on simule un succès (bot).
  if (
    body &&
    typeof body === "object" &&
    "company" in body &&
    typeof (body as { company?: unknown }).company === "string" &&
    (body as { company: string }).company.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données du formulaire invalides.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;
  const receivedAt = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
  });

  // ── Envoi email (Resend) ──────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = (process.env.LEAD_TO_EMAIL || company.email)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const fromEmail =
    process.env.LEAD_FROM_EMAIL || `${company.name} <onboarding@resend.dev>`;

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: lead.email,
        subject: `🏠 Nouveau lead — ${lead.projectType} (${lead.postalCode})`,
        html: renderLeadEmail(lead, receivedAt),
        text: renderLeadText(lead, receivedAt),
      });
    } catch (err) {
      console.error("[lead] Échec de l'envoi Resend:", err);
      return NextResponse.json(
        { error: "L'envoi a échoué. Merci de réessayer." },
        { status: 502 }
      );
    }
  } else {
    // Fallback développement : log console (aucun email envoyé).
    console.info("[lead] RESEND_API_KEY absente — lead loggué en console :");
    console.info(renderLeadText(lead, receivedAt));
  }

  // ── Webhook optionnel (CRM / Make / n8n) ──────────────────
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, receivedAt, source: "site-web" }),
      });
    } catch (err) {
      // Non bloquant : le lead est déjà notifié par email.
      console.error("[lead] Échec du webhook:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

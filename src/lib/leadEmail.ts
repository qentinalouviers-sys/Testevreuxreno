import type { LeadFormData } from "@/lib/schema";
import { company } from "@/config/company";

/** Génère le corps HTML de l'email de notification de lead. */
export function renderLeadEmail(lead: LeadFormData, receivedAt: string): string {
  const rows: [string, string][] = [
    ["Projet", lead.projectType],
    ["Logement", `${lead.housingType} · ${lead.constructionPeriod}`],
    ["Statut", lead.ownerStatus],
    ["Code postal", lead.postalCode],
    ["Nom", `${lead.firstName} ${lead.lastName}`],
    ["Téléphone", lead.phone],
    ["Email", lead.email],
    ["Reçu le", receivedAt],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #eee;color:#6b7280;font-size:14px;">${label}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #eee;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(
            value
          )}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#1B4332;padding:20px 24px;">
        <h1 style="margin:0;color:#F4A261;font-size:18px;">Nouvelle demande de devis</h1>
        <p style="margin:4px 0 0;color:#d1fae5;font-size:13px;">${company.name} — ${company.tagline}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
      <div style="padding:16px 24px;background:#FEFAE0;">
        <a href="tel:${lead.phone}" style="display:inline-block;background:#F4A261;color:#1B4332;text-decoration:none;font-weight:700;padding:10px 18px;border-radius:999px;font-size:14px;">Rappeler ce prospect</a>
      </div>
    </div>
  </div>`;
}

/** Version texte brut (fallback). */
export function renderLeadText(lead: LeadFormData, receivedAt: string): string {
  return [
    "Nouvelle demande de devis",
    `Projet : ${lead.projectType}`,
    `Logement : ${lead.housingType} (${lead.constructionPeriod})`,
    `Statut : ${lead.ownerStatus}`,
    `Code postal : ${lead.postalCode}`,
    `Nom : ${lead.firstName} ${lead.lastName}`,
    `Téléphone : ${lead.phone}`,
    `Email : ${lead.email}`,
    `Reçu le : ${receivedAt}`,
  ].join("\n");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

import { ImageResponse } from "next/og";
import { company } from "@/config/company";

export const runtime = "edge";
export const alt = `${company.name} — rénovation énergétique à Évreux`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#2D6A4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            🌿
          </div>
          <div style={{ color: "#FEFAE0", fontSize: 34, fontWeight: 700 }}>
            {company.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#FEFAE0",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Divisez votre facture de chauffage par 2
          </div>
          <div style={{ color: "#F4A261", fontSize: 34, fontWeight: 600 }}>
            Rénovation énergétique à Évreux et dans l'Eure
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["RGE Qualibat", "MaPrimeRénov'", "★ 4,9/5 Google"].map((b) => (
            <div
              key={b}
              style={{
                color: "#FEFAE0",
                fontSize: 24,
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

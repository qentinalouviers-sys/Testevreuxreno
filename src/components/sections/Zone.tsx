"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { company } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Zone() {
  return (
    <section className="bg-cream-200/60 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Zone d'intervention"
              title="Au service des habitants de l'Eure"
              description="Basés à Évreux, nous intervenons dans tout le département (27). Visite technique et devis à domicile toujours gratuits."
            />

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {company.serviceAreas.map((area) => (
                <motion.li
                  key={area}
                  variants={staggerItem}
                  className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-white px-4 py-2 text-sm font-semibold text-forest shadow-sm"
                >
                  <MapPin className="h-4 w-4 text-energy" />
                  {area}
                </motion.li>
              ))}
              <motion.li
                variants={staggerItem}
                className="inline-flex items-center rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream"
              >
                …et tout l'Eure (27)
              </motion.li>
            </motion.ul>
          </div>

          {/* Carte stylisée SVG (pas de Google Maps embed : léger + RGPD) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-forest/10 bg-gradient-to-br from-energy/10 via-cream to-amber/10 shadow-lg"
          >
            <StylizedMap />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/** Carte simplifiée et stylisée de l'Eure avec un point sur Évreux. */
function StylizedMap() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="Carte de la zone d'intervention dans l'Eure"
    >
      {/* Contour stylisé du département */}
      <path
        d="M70 90 L130 55 L200 60 L260 45 L320 80 L340 140 L310 210 L250 250 L170 245 L100 215 L55 160 Z"
        fill="var(--color-energy)"
        fillOpacity="0.12"
        stroke="var(--color-energy)"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Réseau routier suggéré */}
      <g stroke="var(--color-forest)" strokeOpacity="0.12" strokeWidth="1.5">
        <line x1="200" y1="150" x2="130" y2="70" />
        <line x1="200" y1="150" x2="300" y2="90" />
        <line x1="200" y1="150" x2="250" y2="240" />
        <line x1="200" y1="150" x2="90" y2="200" />
      </g>

      {/* Villes secondaires */}
      {[
        { x: 130, y: 70, label: "Vernon" },
        { x: 295, y: 95, label: "Bernay" },
        { x: 250, y: 235, label: "Verneuil" },
        { x: 100, y: 195, label: "Louviers" },
      ].map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r="4" fill="var(--color-forest)" fillOpacity="0.5" />
          <text
            x={c.x}
            y={c.y - 9}
            textAnchor="middle"
            className="fill-forest/60"
            style={{ fontSize: 11, fontWeight: 500 }}
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* Évreux — point principal animé */}
      <g>
        <circle cx="200" cy="150" r="16" fill="var(--color-amber)" fillOpacity="0.25">
          <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite" />
          <animate
            attributeName="fill-opacity"
            values="0.3;0;0.3"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="150" r="8" fill="var(--color-amber)" />
        <circle cx="200" cy="150" r="3.5" fill="var(--color-forest)" />
        <text
          x="200"
          y="132"
          textAnchor="middle"
          className="fill-forest"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          Évreux
        </text>
      </g>
    </svg>
  );
}

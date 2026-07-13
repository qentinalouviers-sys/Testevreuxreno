import Link from "next/link";
import { Leaf, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { company } from "@/config/company";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = 2025;

  return (
    <footer className="bg-forest-700 text-cream">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marque */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-energy text-cream">
                <Leaf className="h-5 w-5 text-amber" />
              </span>
              <span className="font-display text-xl font-semibold">{company.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
              {company.tagline}. Artisans certifiés RGE, spécialistes des aides
              MaPrimeRénov' depuis {company.foundedYear}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {company.certifications.map((c) => (
                <span
                  key={c.label}
                  title={c.detail}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/15"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-amber" />
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Plan du site">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-amber">
              Le site
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {[
                ["Nos services", "#services"],
                ["Vos aides", "#aides"],
                ["Notre méthode", "#processus"],
                ["Avis clients", "#avis"],
                ["FAQ", "#faq"],
                ["Devis gratuit", "#devis"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-cream">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Horaires */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-amber">
              Horaires
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {company.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 flex-none text-cream/40" />
                  <span>
                    <span className="block font-medium text-cream/90">{h.days}</span>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-amber">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>
                <a
                  href={`tel:${company.phone.href}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-cream"
                >
                  <Phone className="h-4 w-4 flex-none text-amber" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-cream"
                >
                  <Mail className="h-4 w-4 flex-none text-amber" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-amber" />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-cream/55 sm:flex-row">
          <p>
            © {year} {company.legalName}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/mentions-legales" className="transition-colors hover:text-cream">
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="transition-colors hover:text-cream"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

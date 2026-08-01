"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { Container } from "./ui/Container";
import { Wordmark } from "./ui/Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocale } from "@/i18n/LocaleProvider";
import { SITE } from "@/lib/site";

export function Footer() {
  const { t, href } = useLocale();
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  // La newsletter n'est pas encore reliée à un fournisseur d'envoi :
  // on confirme visuellement sans prétendre avoir enregistré côté serveur.
  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const columns = [
    {
      title: t.footer.navTitle,
      links: [
        { label: t.nav.catalog, href: href("/produits") },
        { label: t.nav.producers, href: href("/producteurs") },
        { label: t.nav.story, href: href("/histoire") },
        { label: t.nav.contact, href: href("/contact") },
      ],
    },
    {
      title: t.footer.proTitle,
      links: [
        { label: t.nav.sell, href: href("/vendre") },
        { label: t.nav.pro, href: href("/pro") },
        { label: t.btob.ctaSecondary, href: href("/contact") },
        { label: t.nav.admin, href: href("/admin") },
      ],
    },
    {
      title: t.footer.legalTitle,
      links: [
        { label: t.footer.legal, href: href("/mentions-legales") },
        { label: t.footer.privacy, href: href("/confidentialite") },
        { label: t.footer.terms, href: href("/cgv") },
      ],
    },
  ];

  return (
    <footer className="grain relative overflow-hidden border-t border-ink/10 bg-paper-2">
      <Container size="wide" className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          {/* Identité + newsletter */}
          <div>
            <Wordmark showTagline />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-mute">
              {t.footer.madeIn}
            </p>

            <form onSubmit={onSubscribe} className="mt-8 max-w-xs">
              <label
                htmlFor="newsletter"
                className="text-[0.6rem] uppercase tracking-[0.22em] text-ink-mute"
              >
                {t.footer.newsletter}
              </label>
              <div className="mt-3 flex">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder={t.footer.newsletterPlaceholder}
                  className="min-w-0 flex-1 border border-ink/14 bg-white px-3.5 py-2.5
                             text-sm text-ink placeholder:text-ink-mute/55
                             focus:border-gold-600/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 border border-s-0 border-ink/14 bg-ink/10 px-4
                             text-[0.6rem] uppercase tracking-[0.16em] text-gold-700
                             transition-colors duration-400 hover:bg-gold-500/20"
                >
                  {t.footer.newsletterCta}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2.5 text-xs text-olive-600">{t.footer.newsletterOk}</p>
              )}
            </form>
          </div>

          {/* Colonnes de liens */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[0.6rem] font-normal uppercase tracking-[0.24em] text-gold-600">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-mute transition-colors duration-400 hover:text-gold-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact direct */}
        <div className="mt-14 flex flex-col gap-4 border-t border-ink/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2.5 text-sm text-ink-mute transition-colors hover:text-gold-700"
            >
              <Mail className="size-3.5" strokeWidth={1.5} />
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-2.5 text-sm text-ink-mute transition-colors hover:text-gold-700"
              dir="ltr"
            >
              <Phone className="size-3.5" strokeWidth={1.5} />
              {SITE.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={t.a11y.scrollTop}
              className="flex size-9 items-center justify-center border border-ink/14
                         text-gold-600 transition-colors duration-400 hover:border-gold-600/60 hover:text-gold-700"
            >
              <ArrowUp className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-[0.68rem] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. {t.footer.rights}
          </p>
          <p className="tracking-[0.14em] uppercase">{t.footer.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}

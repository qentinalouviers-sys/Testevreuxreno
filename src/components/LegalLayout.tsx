import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { company } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/sections/Footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-forest/10 bg-cream">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-cream">
              <Leaf className="h-5 w-5 text-amber" />
            </span>
            <span className="font-display text-xl font-semibold text-forest">
              {company.name}
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </Container>
      </header>

      <main className="bg-cream py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-energy">
            Informations légales
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-forest sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-ink/55">Dernière mise à jour : {updated}</p>

          <div className="legal-content mt-10 space-y-8 text-[15px] leading-relaxed text-ink/75">
            {children}
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-forest">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

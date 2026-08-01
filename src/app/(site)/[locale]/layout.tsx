import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import { cormorant, jost } from "../../fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getDictionary } from "@/i18n";
import { LOCALES, LOCALE_META, isLocale, type Locale } from "@/i18n/config";
import { asset } from "@/lib/asset";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.meta.title, template: `%s — ${SITE.name}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [LOCALE_META[l].htmlLang, `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: LOCALE_META[locale].htmlLang,
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: asset("/favicon.svg") },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const meta = LOCALE_META[locale as Locale];
  const t = getDictionary(locale);

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]
                     focus:border focus:border-gold-400 focus:bg-ink-900 focus:px-4 focus:py-2
                     focus:text-sm focus:text-gold-200"
        >
          {t.a11y.skipToContent}
        </a>

        <LocaleProvider locale={locale}>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <WhatsAppFab />
        </LocaleProvider>
      </body>
    </html>
  );
}

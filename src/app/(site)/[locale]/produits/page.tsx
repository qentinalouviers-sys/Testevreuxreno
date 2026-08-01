import type { Metadata } from "next";
import { CatalogContent } from "@/components/pages/CatalogContent";
import { getDictionary } from "@/i18n";
import { LOCALES, isLocale } from "@/i18n/config";

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
    title: t.catalog.metaTitle,
    description: t.catalog.metaDescription,
    alternates: { canonical: `/${locale}/produits` },
  };
}

export default function CatalogPage() {
  return <CatalogContent />;
}

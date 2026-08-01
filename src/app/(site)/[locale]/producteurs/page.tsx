import type { Metadata } from "next";
import { ProducersContent } from "@/components/pages/ProducersContent";
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
    title: t.producers.metaTitle,
    description: t.producers.metaDescription,
    alternates: { canonical: `/${locale}/producteurs` },
  };
}

export default function ProducersPage() {
  return <ProducersContent />;
}

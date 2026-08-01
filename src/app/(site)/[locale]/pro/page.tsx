import type { Metadata } from "next";
import { ProContent } from "@/components/pages/ProContent";
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
    title: t.pro.metaTitle,
    description: t.pro.metaDescription,
    // L'espace pro n'a pas vocation à être indexé.
    robots: { index: false, follow: false },
  };
}

export default function ProPage() {
  return <ProContent />;
}

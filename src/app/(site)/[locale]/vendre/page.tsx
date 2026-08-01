import type { Metadata } from "next";
import { SellContent } from "@/components/pages/SellContent";
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
    title: t.sell.metaTitle,
    description: t.sell.metaDescription,
    alternates: { canonical: `/${locale}/vendre` },
  };
}

export default function SellPage() {
  return <SellContent />;
}

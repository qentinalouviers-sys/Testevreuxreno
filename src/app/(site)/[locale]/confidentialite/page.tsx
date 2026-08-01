import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
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
  return { title: getDictionary(locale).legal.privacyTitle };
}

export default function PrivacyPage() {
  return <LegalContent kind="privacy" />;
}

import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";
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
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}

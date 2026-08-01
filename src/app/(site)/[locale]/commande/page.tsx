import type { Metadata } from "next";
import { OrderContent } from "@/components/pages/OrderContent";
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
    title: t.order.metaTitle,
    description: t.order.metaDescription,
    alternates: { canonical: `/${locale}/commande` },
  };
}

export default function OrderPage() {
  return <OrderContent />;
}

import type { Metadata } from "next";
import { CartContent } from "@/components/pages/CartContent";
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
  return { title: getDictionary(locale).cart.metaTitle, robots: { index: false, follow: true } };
}

export default function CartPage() {
  return <CartContent />;
}

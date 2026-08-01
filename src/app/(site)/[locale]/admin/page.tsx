import type { Metadata } from "next";
import { AdminContent } from "@/components/pages/AdminContent";
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
    title: t.admin.metaTitle,
    robots: { index: false, follow: false },
  };
}

export default function AdminPage() {
  return <AdminContent />;
}

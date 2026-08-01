import type { Metadata } from "next";
import { StoryContent } from "@/components/pages/StoryContent";
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
    title: t.story.metaTitle,
    description: t.story.metaDescription,
    alternates: { canonical: `/${locale}/histoire` },
  };
}

export default function StoryPage() {
  return <StoryContent />;
}

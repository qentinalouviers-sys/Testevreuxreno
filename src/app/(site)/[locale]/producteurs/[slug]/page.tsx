import type { Metadata } from "next";
import { ProducerContent } from "@/components/pages/ProducersContent";
import { getDictionary } from "@/i18n";
import { LOCALES, isLocale } from "@/i18n/config";
import { PRODUCERS, getProducerBySlug } from "@/lib/marketplace";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => PRODUCERS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const producer = getProducerBySlug(slug);
  if (!producer) return { title: t.producers.notFound };

  const copy = t.catalogData.producers[producer.id as keyof typeof t.catalogData.producers];
  return {
    title: producer.name,
    description: copy?.bio,
    alternates: { canonical: `/${locale}/producteurs/${slug}` },
  };
}

export default async function ProducerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProducerContent slug={slug} />;
}

import type { Metadata } from "next";
import { ProductContent } from "@/components/pages/ProductContent";
import { ProductJsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n";
import { LOCALES, isLocale } from "@/i18n/config";
import { PRODUCTS, getProductBySlug, getProducer } from "@/lib/marketplace";

/** Une page par produit et par langue — tout est pré-généré. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => PRODUCTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) return { title: t.product.notFound };

  const producer = getProducer(product.producerId);
  const copy = t.catalogData.products[product.id as keyof typeof t.catalogData.products];

  return {
    title: `${product.name} — ${producer?.name ?? ""}`.trim(),
    description: copy?.description,
    alternates: { canonical: `/${locale}/produits/${slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <ProductJsonLd slug={slug} />
      <ProductContent slug={slug} />
    </>
  );
}

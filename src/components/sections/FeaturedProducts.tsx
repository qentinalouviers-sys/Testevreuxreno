"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { ProductCard } from "../catalog/ProductCard";
import { useLocale } from "@/i18n/LocaleProvider";
import { featuredProducts } from "@/lib/marketplace";

export function FeaturedProducts() {
  const { t, href } = useLocale();
  const products = featuredProducts();

  return (
    <section className="grain relative overflow-hidden py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.catalog.eyebrow}
          title={t.catalog.title}
          subtitle={t.catalog.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 4) * 0.07} className="h-full">
              <ProductCard product={product} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <ButtonLink href={href("/produits")} variant="outline" size="lg">
              {t.catalog.title}
              <ArrowRight
                className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

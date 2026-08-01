"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Reveal } from "../ui/Reveal";
import { ProductCard } from "../catalog/ProductCard";
import { useLocale } from "@/i18n/LocaleProvider";
import { CATEGORIES, PRODUCERS, PRODUCTS, type Category } from "@/lib/marketplace";
import { cn } from "@/lib/cn";

export function CatalogContent() {
  const { t } = useLocale();
  const [category, setCategory] = useState<Category | null>(null);
  const [producerId, setProducerId] = useState<string | null>(null);

  const products = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (!category || p.category === category) && (!producerId || p.producerId === producerId),
      ),
    [category, producerId],
  );

  const filtered = category !== null || producerId !== null;

  return (
    <>
      <PageHero eyebrow={t.catalog.eyebrow} title={t.catalog.title} subtitle={t.catalog.subtitle} />

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          {/* Filtres */}
          <div className="flex flex-col gap-5 border-y border-ink/8 py-6">
            <FilterRow
              label={t.catalog.filterCategory}
              options={[
                { value: null, label: t.catalog.allCategories },
                ...CATEGORIES.map((c) => ({ value: c as string, label: t.catalog.categories[c] })),
              ]}
              value={category}
              onChange={(v) => setCategory(v as Category | null)}
            />
            <FilterRow
              label={t.catalog.filterProducer}
              options={[
                { value: null, label: t.catalog.allProducers },
                ...PRODUCERS.map((p) => ({ value: p.id, label: p.name })),
              ]}
              value={producerId}
              onChange={setProducerId}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-ink-mute">
              {products.length} {t.catalog.results}
            </p>
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setCategory(null);
                  setProducerId(null);
                }}
                className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em]
                           text-gold-600 transition-colors hover:text-gold-700"
              >
                <X className="size-3" strokeWidth={2} />
                {t.catalog.reset}
              </button>
            )}
          </div>

          {products.length === 0 ? (
            <p className="mt-16 border border-ink/10 bg-white px-6 py-20 text-center text-sm text-ink-mute">
              {t.catalog.empty}
            </p>
          ) : (
            <motion.div
              layout
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 7) * 0.05} className="h-full">
                  <ProductCard product={product} className="h-full" />
                </Reveal>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string | null; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
      <span className="shrink-0 text-[0.58rem] uppercase tracking-[0.22em] text-gold-600">
        {label}
      </span>
      {/* Défilement horizontal en mobile plutôt qu'un retour à la ligne anarchique. */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "shrink-0 border px-3.5 py-2 text-[0.64rem] uppercase tracking-[0.14em]",
                "transition-all duration-400",
                active
                  ? "border-gold-600/70 bg-ink/10 text-gold-700"
                  : "border-ink/10 text-ink-mute hover:border-gold-500/60 hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

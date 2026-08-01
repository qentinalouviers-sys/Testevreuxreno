import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Pillars } from "@/components/sections/Pillars";
import { ProducersStrip } from "@/components/sections/ProducersStrip";
import { Origins } from "@/components/sections/Origins";
import { Btob } from "@/components/sections/Btob";
import { PaymentSection } from "@/components/sections/PaymentSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LOCALES } from "@/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <Pillars />
      <ProducersStrip />
      <Origins />
      <Btob />
      <PaymentSection />
      <CtaBand />
    </>
  );
}

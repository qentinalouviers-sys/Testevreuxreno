import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Pillars } from "@/components/sections/Pillars";
import { Terroir } from "@/components/sections/Terroir";
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
      <ProductShowcase />
      <Pillars />
      <Terroir />
      <Btob />
      <PaymentSection />
      <CtaBand />
    </>
  );
}

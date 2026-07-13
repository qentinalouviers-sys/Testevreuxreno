import { Header } from "@/components/sections/Header";
import { MobileCTA } from "@/components/sections/MobileCTA";
import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { Services } from "@/components/sections/Services";
import { Aides } from "@/components/sections/Aides";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { LeadForm } from "@/components/sections/LeadForm";
import { Faq } from "@/components/sections/Faq";
import { Zone } from "@/components/sections/Zone";
import { Footer } from "@/components/sections/Footer";
import { FaqJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProofBar />
        <Services />
        <Aides />
        <Process />
        <Reviews />
        <LeadForm />
        <Faq />
        <Zone />
      </main>
      <Footer />
      <MobileCTA />
      <FaqJsonLd />
    </>
  );
}

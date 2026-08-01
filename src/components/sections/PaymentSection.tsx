"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { PaymentMethodsShowcase } from "../PaymentMethods";
import { PaymentModal } from "../PaymentModal";
import { useLocale } from "@/i18n/LocaleProvider";

export function PaymentSection() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 sm:py-28">
      <Container size="narrow">
        <SectionHeading
          eyebrow={t.payment.eyebrow}
          title={t.payment.title}
          subtitle={t.payment.subtitle}
        />
        <Reveal delay={0.2} className="mt-12">
          <PaymentMethodsShowcase onPick={() => setOpen(true)} />
        </Reveal>
      </Container>
      <PaymentModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

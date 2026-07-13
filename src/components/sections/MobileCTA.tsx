"use client";

import { Phone, ArrowRight } from "lucide-react";
import { company } from "@/config/company";

/**
 * Barre CTA sticky en bas de viewport (mobile uniquement).
 * Le pattern de conversion le plus efficace sur smartphone.
 */
export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="border-t border-forest/10 bg-cream/90 px-3 pb-[env(safe-area-inset-bottom)] pt-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${company.phone.href}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-forest/20 bg-white py-3 text-sm font-semibold text-forest"
          >
            <Phone className="h-4 w-4 text-energy" />
            Appeler
          </a>
          <a
            href="#devis"
            className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-full bg-amber py-3 text-sm font-bold text-forest shadow-lg shadow-amber/30"
          >
            Devis gratuit
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

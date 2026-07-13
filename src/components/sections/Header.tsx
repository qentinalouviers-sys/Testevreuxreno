"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Leaf } from "lucide-react";
import { company } from "@/config/company";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/80 shadow-[0_1px_0_rgba(27,67,50,0.08)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <div
          className={cn(
            "flex items-center transition-all duration-300",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label={`${company.name} — accueil`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-cream transition-transform group-hover:scale-105">
              <Leaf className="h-5 w-5 text-amber" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-forest">
              {company.name}
            </span>
          </a>
        </div>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {[
            ["Services", "#services"],
            ["Vos aides", "#aides"],
            ["Déroulé", "#processus"],
            ["Avis", "#avis"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-forest"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${company.phone.href}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-forest transition-colors hover:text-energy sm:inline-flex"
          >
            <Phone className="h-4 w-4 text-energy" />
            {company.phone.display}
          </a>
          <Button href="#devis" size="md" className="hidden sm:inline-flex">
            Devis gratuit
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {scrolled ? (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "left" }}
            className="h-0.5 w-full bg-gradient-to-r from-energy via-amber to-energy"
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}

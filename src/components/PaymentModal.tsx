"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X, Hammer, MessageCircle } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { Rosette } from "./ui/Wordmark";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Pop-up « paiement en cours de développement ».
 * Le tunnel de paiement (Stripe / virement / crypto) n'est pas encore branché :
 * on assume l'état du chantier et on redirige vers un canal humain.
 */
export function PaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, href } = useLocale();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 p-4 backdrop-blur-md sm:items-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="grain relative w-full max-w-lg overflow-hidden border border-gold-500/45 bg-paper-2 p-8 shadow-2xl shadow-ink/15 sm:p-11"
          >
            {/* Filets d'encadrement, comme sur l'étiquette */}
            <div aria-hidden className="pointer-events-none absolute inset-3 border border-ink/8" />
            <div
              aria-hidden
              className="glow-gold pointer-events-none absolute -top-24 start-1/2 size-72 -translate-x-1/2 opacity-40 blur-2xl"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label={t.checkout.modal.close}
              className="absolute end-4 top-4 z-10 p-2 text-ink-mute transition-colors hover:text-gold-600"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>

            <div className="relative flex flex-col items-center text-center">
              <Rosette className="size-14 text-gold-500" />

              <p className="eyebrow mt-6 inline-flex items-center gap-2.5">
                <Hammer className="size-3" strokeWidth={1.5} />
                {t.payment.soon}
              </p>

              <h3 id="payment-modal-title" className="mt-4 text-2xl sm:text-3xl">
                {t.checkout.modal.title}
              </h3>

              <div className="mx-auto mt-6 h-px w-20 rule-gold" />

              <p className="mt-6 text-pretty text-sm leading-relaxed text-ink-mute">
                {t.checkout.modal.text}
              </p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-gold-600">
                {t.checkout.modal.hint}
              </p>

              <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <ButtonLink href={href("/contact")} size="md" onClick={onClose}>
                  <MessageCircle className="size-3.5" strokeWidth={1.5} />
                  {t.checkout.modal.contact}
                </ButtonLink>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-ink-mute
                             transition-colors duration-400 hover:text-gold-700"
                >
                  {t.checkout.modal.close}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

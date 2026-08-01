"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { whatsappLink } from "@/lib/site";

/** Glyphe WhatsApp officiel (tracé simplifié, monochrome). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.24 8.24 0 0 1 0 16.47z" />
    </svg>
  );
}

/**
 * Bouton WhatsApp flottant : le canal de réponse le plus rapide,
 * volontairement présent sur toutes les pages, mais discret tant que
 * l'utilisateur n'a pas commencé à lire.
 */
export function WhatsAppFab() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink(t.contact.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.a11y.whatsapp}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 end-5 z-[70] flex items-center gap-3 rounded-full
                     border border-olive-500/40 bg-ink-900/92 py-3 ps-3 pe-3 shadow-2xl shadow-black/70
                     backdrop-blur-md transition-all duration-500
                     hover:border-olive-300/70 hover:pe-5 sm:bottom-7 sm:end-7"
        >
          <span className="relative flex size-9 items-center justify-center rounded-full bg-olive-700/80">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-olive-500/25 [animation-duration:3s]"
            />
            <WhatsAppGlyph className="relative size-5 text-cream" />
          </span>
          <span
            className="max-w-0 overflow-hidden whitespace-nowrap text-[0.66rem] uppercase
                       tracking-[0.18em] text-cream-dim opacity-0 transition-all duration-500
                       group-hover:max-w-[14rem] group-hover:opacity-100"
          >
            {t.contact.whatsapp}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Lock } from "lucide-react";
import { Container } from "./ui/Container";
import { Wordmark } from "./ui/Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartButton } from "./CartButton";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

export function Header() {
  const { t, href } = useLocale();
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => setOpen(false), [pathname]);

  // Verrouille le scroll de la page tant que le panneau mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: href("/produits"), label: t.nav.catalog },
    { href: href("/producteurs"), label: t.nav.producers },
    { href: href("/histoire"), label: t.nav.story },
    { href: href("/vendre"), label: t.nav.sell },
    { href: href("/contact"), label: t.nav.contact },
  ];

  const isActive = (target: string) =>
    target === href("/") ? pathname === target || pathname === `${target}/` : pathname.startsWith(target);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled
            ? "border-b border-gold-500/15 bg-ink-950/88 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container size="wide">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-700",
              scrolled ? "h-16" : "h-[68px] sm:h-20",
            )}
          >
            <Link href={href("/")} className="group shrink-0" aria-label="Al Arifa">
              <Wordmark />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label={t.nav.menu}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-1 text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-500",
                    isActive(link.href) ? "text-gold-200" : "text-cream-dim hover:text-gold-200",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-gold-400/70",
                      "transition-transform duration-500",
                      isActive(link.href) && "scale-x-100",
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href={href("/pro")}
                className="hidden items-center gap-2 rounded-[2px] border border-gold-500/30 px-4 py-2
                           text-[0.66rem] uppercase tracking-[0.2em] text-gold-200 transition-all
                           duration-500 hover:border-gold-400/70 hover:bg-gold-500/[0.07] xl:inline-flex"
              >
                <Lock className="size-3" strokeWidth={1.5} />
                {t.nav.pro}
              </Link>

              <CartButton />
              <LanguageSwitcher />

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.a11y.openMenu}
                className="p-2 text-cream-dim transition-colors hover:text-gold-200 lg:hidden"
              >
                <Menu className="size-5" strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink-950/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="grain flex h-full flex-col">
              <Container size="wide">
                <div className="flex h-[68px] items-center justify-between">
                  <Wordmark />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t.a11y.closeMenu}
                    className="p-2 text-cream-dim transition-colors hover:text-gold-200"
                  >
                    <X className="size-5" strokeWidth={1.25} />
                  </button>
                </div>
              </Container>

              <nav
                className="flex flex-1 flex-col justify-center gap-2 px-8"
                aria-label={t.nav.menu}
              >
                {[...links, { href: href("/pro"), label: t.nav.pro }].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="block border-b border-gold-500/10 py-4 font-display text-2xl
                                 text-cream transition-colors duration-400 hover:text-gold-300
                                 sm:py-5 sm:text-3xl"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-8 pb-10">
                <div className="mb-5 h-px rule-gold" />
                <p className="eyebrow">{t.footer.tagline}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

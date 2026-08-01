"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Check, Send, ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Reveal } from "../ui/Reveal";
import { Eyebrow, Lozenge } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Input, Textarea, Select, Label, FieldError } from "../ui/Field";
import { Rosette } from "../ui/Wordmark";
import { useLocale } from "@/i18n/LocaleProvider";
import { SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

/**
 * Formulaire de contact rapide.
 *
 * Envoi : si `NEXT_PUBLIC_FORM_ENDPOINT` est défini (Formspree, Web3Forms,
 * Basin…), la demande y est postée. Sinon — cas du site déployé en statique
 * sans backend — on bascule sur WhatsApp avec un message pré-rempli, plutôt
 * que de faire croire à un envoi qui n'a pas lieu.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function ContactContent() {
  const { t } = useLocale();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const profileOptions = [
    { value: "particulier", label: t.contact.form.profileOptions.particulier },
    { value: "restaurant", label: t.contact.form.profileOptions.restaurant },
    { value: "retail", label: t.contact.form.profileOptions.retail },
    { value: "importer", label: t.contact.form.profileOptions.importer },
    { value: "other", label: t.contact.form.profileOptions.other },
  ];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = t.contact.form.errorRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(get("email"))) {
      next.email = t.contact.form.errorEmail;
    }
    if (!get("message")) next.message = t.contact.form.errorRequired;
    if (!data.get("consent")) next.consent = t.contact.form.errorConsent;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");

    if (ENDPOINT) {
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!response.ok) throw new Error(String(response.status));
        setState("sent");
        form.reset();
      } catch {
        setState("error");
      }
      return;
    }

    // Repli sans backend : on compose la demande dans WhatsApp.
    const summary = [
      `${t.contact.form.name}: ${get("name")}`,
      get("company") && `${t.contact.form.company}: ${get("company")}`,
      `${t.contact.form.email}: ${get("email")}`,
      get("phone") && `${t.contact.form.phone}: ${get("phone")}`,
      get("country") && `${t.contact.form.country}: ${get("country")}`,
      `${t.contact.form.profile}: ${get("profile")}`,
      get("volume") && `${t.contact.form.volume}: ${get("volume")}`,
      "",
      get("message"),
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(summary), "_blank", "noopener,noreferrer");
    setState("sent");
    form.reset();
  }

  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Formulaire */}
            <div className="border border-gold-500/18 bg-ink-900/45 p-6 sm:p-10">
              <Eyebrow>{t.contact.quickTitle}</Eyebrow>

              <AnimatePresence mode="wait">
                {state === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center py-16 text-center"
                  >
                    <span className="relative flex size-16 items-center justify-center">
                      <Rosette className="size-16 text-gold-500/35" />
                      <Check className="absolute size-6 text-olive-300" strokeWidth={2} />
                    </span>
                    <h2 className="mt-7 text-2xl">{t.contact.form.successTitle}</h2>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-mute">
                      {t.contact.form.successText}
                    </p>
                    <button
                      type="button"
                      onClick={() => setState("idle")}
                      className="mt-8 inline-flex items-center gap-2 text-[0.68rem] uppercase
                                 tracking-[0.18em] text-gold-300 transition-colors hover:text-gold-100"
                    >
                      {t.contact.form.another}
                      <ArrowRight className="size-3 rtl:rotate-180" strokeWidth={1.5} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 grid gap-5 sm:grid-cols-2"
                  >
                    <Input id="name" name="name" label={t.contact.form.name} required error={errors.name} autoComplete="name" />
                    <Input id="company" name="company" label={t.contact.form.company} autoComplete="organization" />
                    <Input id="email" name="email" type="email" label={t.contact.form.email} required error={errors.email} autoComplete="email" dir="ltr" />
                    <Input id="phone" name="phone" type="tel" label={t.contact.form.phone} autoComplete="tel" dir="ltr" />
                    <Input id="country" name="country" label={t.contact.form.country} autoComplete="country-name" />

                    <Select id="profile" name="profile" label={t.contact.form.profile} defaultValue="particulier">
                      {profileOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </Select>

                    <Input
                      id="volume"
                      name="volume"
                      label={t.contact.form.volume}
                      placeholder={t.contact.form.volumePlaceholder}
                      className="sm:col-span-2"
                    />

                    <Textarea
                      id="message"
                      name="message"
                      label={t.contact.form.message}
                      placeholder={t.contact.form.messagePlaceholder}
                      required
                      error={errors.message}
                      className="sm:col-span-2"
                    />

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="consent"
                        className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-cream-mute"
                      >
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          className="mt-0.5 size-4 shrink-0 appearance-none border border-gold-500/40 bg-ink-900
                                     transition-colors checked:border-gold-400 checked:bg-gold-500
                                     focus:outline-none focus-visible:outline focus-visible:outline-gold-400"
                        />
                        {t.contact.form.consent}
                      </label>
                      <FieldError>{errors.consent}</FieldError>
                    </div>

                    {state === "error" && (
                      <p className="text-sm text-ruby-500 sm:col-span-2">
                        {t.contact.form.errorGeneric}
                      </p>
                    )}

                    <div className="sm:col-span-2">
                      <Button type="submit" size="lg" disabled={state === "sending"} className="w-full sm:w-auto">
                        <Send className="size-3.5" strokeWidth={1.5} />
                        {state === "sending" ? t.contact.form.submitting : t.contact.form.submit}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Colonne latérale : WhatsApp + coordonnées */}
            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="relative overflow-hidden border border-olive-500/35 bg-ink-900/55 p-7 sm:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -end-16 -top-16 size-48 rounded-full
                               bg-[radial-gradient(circle,rgba(109,143,75,0.22),transparent_70%)] blur-2xl"
                  />
                  <p className="eyebrow relative text-olive-300">{t.contact.whatsappTitle}</p>
                  <p className="relative mt-4 text-sm leading-relaxed text-cream-mute">
                    {t.contact.whatsappText}
                  </p>
                  <a
                    href={whatsappLink(t.contact.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative mt-7 inline-flex w-full items-center justify-center gap-2.5",
                      "border border-olive-500/50 bg-olive-700/25 px-6 py-3.5",
                      "text-[0.68rem] uppercase tracking-[0.18em] text-cream",
                      "transition-all duration-500 hover:border-olive-300/70 hover:bg-olive-700/45",
                    )}
                  >
                    {t.contact.whatsapp}
                    <ArrowRight className="size-3.5 rtl:rotate-180" strokeWidth={1.5} />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="border border-gold-500/18 bg-ink-900/45 p-7 sm:p-8">
                  <p className="eyebrow">{t.contact.infoTitle}</p>
                  <dl className="mt-6 space-y-4">
                    {t.contact.info.map((item) => (
                      <div key={item.label} className="flex flex-col gap-1">
                        <dt className="text-[0.58rem] uppercase tracking-[0.2em] text-cream-mute/70">
                          {item.label}
                        </dt>
                        {/* `bdi` isole la direction : un numéro ou un e-mail
                            reste lisible dans une page arabe. */}
                        <dd className="text-sm text-cream">
                          <bdi>{item.value}</bdi>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-7 flex items-center gap-3 border-t border-gold-500/12 pt-5">
                    <Lozenge />
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-sm text-gold-300 transition-colors hover:text-gold-100"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

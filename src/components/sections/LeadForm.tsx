"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Thermometer,
  Droplets,
  DoorOpen,
  Wind,
  Building2,
  Building,
  Loader2,
  ShieldCheck,
  Clock,
  Lock,
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
} from "lucide-react";
import {
  leadSchema,
  defaultLeadValues,
  projectTypes,
  housingTypes,
  constructionPeriods,
  ownerStatuses,
  type LeadFormData,
} from "@/lib/schema";
import { company } from "@/config/company";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

const STEP_COUNT = 4;

// Champs concernés par chaque étape (pour la validation ciblée).
const stepFields: (keyof LeadFormData)[][] = [
  ["projectType"],
  ["housingType", "constructionPeriod"],
  ["ownerStatus", "postalCode"],
  ["firstName", "lastName", "phone", "email", "consent"],
];

const projectIcons: Record<(typeof projectTypes)[number], typeof Home> = {
  Isolation: Home,
  "Pompe à chaleur": Thermometer,
  "Chauffe-eau thermodynamique": Droplets,
  "Fenêtres / menuiseries": DoorOpen,
  "Ventilation (VMC)": Wind,
  "Rénovation globale": Building2,
};

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: defaultLeadValues,
  });

  const projectType = watch("projectType");
  const housingType = watch("housingType");
  const constructionPeriod = watch("constructionPeriod");
  const ownerStatus = watch("ownerStatus");

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setStep((s) => Math.min(Math.max(s + dir, 0), STEP_COUNT - 1));
  };

  const next = async () => {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) go(1);
  };

  // Auto-avance à la sélection (étape 1).
  const selectProject = (value: (typeof projectTypes)[number]) => {
    setValue("projectType", value, { shouldValidate: true });
    setDirection(1);
    setTimeout(() => setStep(1), 180);
  };

  const onSubmit = async (data: LeadFormData) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const progress = ((step + 1) / STEP_COUNT) * 100;

  return (
    <section id="devis" className="scroll-mt-24 bg-cream-200/60 py-20 sm:py-28">
      <Container className="max-w-3xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-energy">
            <span className="h-px w-8 bg-amber" aria-hidden />
            Estimation gratuite
            <span className="h-px w-8 bg-amber" aria-hidden />
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-forest sm:text-4xl">
            Estimez vos aides en 30 secondes
          </h2>
          <p className="mt-3 text-ink/70">
            4 questions rapides, une réponse d'expert sous 24h. Sans engagement.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-xl shadow-forest/5">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessScreen key="success" />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Barre de progression */}
                <div className="border-b border-forest/10 px-6 pt-6 sm:px-9">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink/60">
                    <span>
                      Étape {step + 1} / {STEP_COUNT}
                    </span>
                    <span className="text-energy">
                      {step === STEP_COUNT - 1 ? "Plus qu'une étape !" : `${Math.round(progress)} %`}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-energy to-amber"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: easeOut }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 sm:px-9">
                  {/* Honeypot anti-spam (invisible) */}
                  <div className="absolute -left-[9999px]" aria-hidden>
                    <label>
                      Ne pas remplir
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("company")}
                      />
                    </label>
                  </div>

                  <div className="relative min-h-[280px]">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: easeOut }}
                      >
                        {/* ── Étape 1 : Type de projet ── */}
                        {step === 0 && (
                          <Fieldset legend="Quel est votre projet ?">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                              {projectTypes.map((type) => {
                                const Icon = projectIcons[type];
                                const active = projectType === type;
                                return (
                                  <button
                                    type="button"
                                    key={type}
                                    onClick={() => selectProject(type)}
                                    className={cn(
                                      "group flex flex-col items-center gap-2.5 rounded-2xl border-2 p-4 text-center transition-all",
                                      active
                                        ? "border-energy bg-energy/5 shadow-md"
                                        : "border-forest/10 bg-white hover:border-energy/40 hover:bg-cream-200/40"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "grid h-11 w-11 place-items-center rounded-xl transition-colors",
                                        active
                                          ? "bg-energy text-cream"
                                          : "bg-energy/10 text-energy group-hover:bg-energy/20"
                                      )}
                                    >
                                      <Icon className="h-5 w-5" />
                                    </span>
                                    <span className="text-sm font-semibold leading-tight text-forest">
                                      {type}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                            <FieldError message={errors.projectType?.message} />
                          </Fieldset>
                        )}

                        {/* ── Étape 2 : Logement ── */}
                        {step === 1 && (
                          <div className="space-y-7">
                            <Fieldset legend="Type de logement">
                              <OptionRow>
                                {housingTypes.map((type) => (
                                  <ChoiceChip
                                    key={type}
                                    label={type}
                                    icon={type === "Maison individuelle" ? Home : Building}
                                    active={housingType === type}
                                    onClick={() =>
                                      setValue("housingType", type, { shouldValidate: true })
                                    }
                                  />
                                ))}
                              </OptionRow>
                              <FieldError message={errors.housingType?.message} />
                            </Fieldset>

                            <Fieldset legend="Année de construction">
                              <OptionRow>
                                {constructionPeriods.map((period) => (
                                  <ChoiceChip
                                    key={period}
                                    label={period}
                                    active={constructionPeriod === period}
                                    onClick={() =>
                                      setValue("constructionPeriod", period, {
                                        shouldValidate: true,
                                      })
                                    }
                                  />
                                ))}
                              </OptionRow>
                              <FieldError message={errors.constructionPeriod?.message} />
                            </Fieldset>
                          </div>
                        )}

                        {/* ── Étape 3 : Statut + code postal ── */}
                        {step === 2 && (
                          <div className="space-y-7">
                            <Fieldset legend="Vous êtes...">
                              <OptionRow>
                                {ownerStatuses.map((s) => (
                                  <ChoiceChip
                                    key={s}
                                    label={s}
                                    active={ownerStatus === s}
                                    onClick={() =>
                                      setValue("ownerStatus", s, { shouldValidate: true })
                                    }
                                  />
                                ))}
                              </OptionRow>
                              <FieldError message={errors.ownerStatus?.message} />
                            </Fieldset>

                            <Fieldset legend="Code postal du logement">
                              <input
                                type="text"
                                inputMode="numeric"
                                maxLength={5}
                                placeholder="27000"
                                className={inputClass(!!errors.postalCode)}
                                {...register("postalCode")}
                              />
                              <FieldError message={errors.postalCode?.message} />
                            </Fieldset>
                          </div>
                        )}

                        {/* ── Étape 4 : Coordonnées ── */}
                        {step === 3 && (
                          <Fieldset legend="Vos coordonnées">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field label="Prénom" error={errors.firstName?.message}>
                                <input
                                  type="text"
                                  autoComplete="given-name"
                                  className={inputClass(!!errors.firstName)}
                                  {...register("firstName")}
                                />
                              </Field>
                              <Field label="Nom" error={errors.lastName?.message}>
                                <input
                                  type="text"
                                  autoComplete="family-name"
                                  className={inputClass(!!errors.lastName)}
                                  {...register("lastName")}
                                />
                              </Field>
                              <Field label="Téléphone" error={errors.phone?.message}>
                                <input
                                  type="tel"
                                  autoComplete="tel"
                                  placeholder="06 12 34 56 78"
                                  className={inputClass(!!errors.phone)}
                                  {...register("phone")}
                                />
                              </Field>
                              <Field label="Email" error={errors.email?.message}>
                                <input
                                  type="email"
                                  autoComplete="email"
                                  placeholder="vous@email.fr"
                                  className={inputClass(!!errors.email)}
                                  {...register("email")}
                                />
                              </Field>
                            </div>

                            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink/75">
                              <input
                                type="checkbox"
                                className="mt-0.5 h-5 w-5 flex-none rounded border-forest/30 text-energy focus:ring-energy"
                                {...register("consent")}
                              />
                              <span>
                                J'accepte d'être recontacté(e) au sujet de ma demande et
                                que mes données soient traitées conformément à la{" "}
                                <a
                                  href="/politique-confidentialite"
                                  target="_blank"
                                  className="font-semibold text-energy underline"
                                >
                                  politique de confidentialité
                                </a>
                                .
                              </span>
                            </label>
                            <FieldError message={errors.consent?.message} />

                            {status === "error" ? (
                              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                Une erreur est survenue. Vous pouvez réessayer ou nous
                                appeler au{" "}
                                <a href={`tel:${company.phone.href}`} className="font-semibold underline">
                                  {company.phone.display}
                                </a>
                                .
                              </p>
                            ) : null}
                          </Fieldset>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink/60 transition-colors hover:text-forest"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Retour
                      </button>
                    ) : (
                      <span />
                    )}

                    {step < STEP_COUNT - 1 ? (
                      step === 0 ? (
                        <span className="text-xs text-ink/45">
                          Cliquez sur un projet pour continuer
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={next}
                          className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-energy hover:-translate-y-0.5"
                        >
                          Continuer
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      )
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-bold text-forest shadow-lg shadow-amber/30 transition-all hover:bg-amber-600 hover:-translate-y-0.5 disabled:opacity-70"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            Recevoir mon estimation
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Micro-copy de réassurance */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink/60">
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-energy" />
            Gratuit et sans engagement
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-energy" />
            Réponse sous 24h
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-energy" />
            Vos données ne sont jamais revendues
          </li>
        </ul>
      </Container>
    </section>
  );
}

/* ─────────────────── Sous-composants ─────────────────── */

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border-2 bg-white px-4 py-3 text-forest placeholder:text-ink/35 transition-colors focus:outline-none",
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-forest/15 focus:border-energy"
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-4 text-lg font-semibold text-forest">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/70">{label}</span>
      {children}
      <FieldError message={error} />
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-sm font-medium text-red-600"
    >
      {message}
    </motion.p>
  );
}

function OptionRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function ChoiceChip({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon?: typeof Home;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-semibold transition-all",
        active
          ? "border-energy bg-energy/5 text-forest shadow-sm"
          : "border-forest/10 text-ink/75 hover:border-energy/40 hover:bg-cream-200/40"
      )}
    >
      {Icon ? (
        <Icon className={cn("h-5 w-5 flex-none", active ? "text-energy" : "text-ink/40")} />
      ) : null}
      <span className="flex-1">{label}</span>
      <span
        className={cn(
          "grid h-5 w-5 flex-none place-items-center rounded-full border-2 transition-colors",
          active ? "border-energy bg-energy text-cream" : "border-forest/20"
        )}
      >
        {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
      </span>
    </button>
  );
}

function SuccessScreen() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="px-6 py-16 text-center sm:px-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-energy/10"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 14, delay: 0.3 }}
          className="grid h-14 w-14 place-items-center rounded-full bg-energy text-cream"
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M4 12.5l5 5 11-11"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.span>
      </motion.div>

      <h3 className="mt-6 text-2xl font-semibold text-forest">
        Demande bien reçue, merci !
      </h3>
      <p className="mx-auto mt-3 max-w-md text-ink/70">
        Un conseiller {company.name} étudie votre projet et vous recontacte{" "}
        <strong className="font-semibold text-forest">sous 24h ouvrées</strong> pour
        estimer précisément vos aides. À très vite !
      </p>
      <a
        href={`tel:${company.phone.href}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest/15 px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-cream-200/50"
      >
        <Phone className="h-4 w-4 text-energy" />
        Une question ? {company.phone.display}
      </a>
    </motion.div>
  );
}

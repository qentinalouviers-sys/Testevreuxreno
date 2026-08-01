"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { LogOut, Lock, UserPlus, FileText, Check, Package } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Eyebrow } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Input, Select } from "../ui/Field";
import { Rosette } from "../ui/Wordmark";
import { useLocale } from "@/i18n/LocaleProvider";
import { useSession, useStoreVersion } from "@/lib/useStore";
import {
  clearSession,
  createOrder,
  getAccount,
  listOrders,
  login,
  register,
  type Account,
} from "@/lib/store";
import { PRODUCT, unitPriceFor, discountPercent } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function ProContent() {
  const { session, ready } = useSession();
  const version = useStoreVersion();

  // Seul un compte de rôle « pro » ouvre le tableau de bord client :
  // une session administrateur ne doit pas se faire passer pour un client.
  const account = useMemo(
    () => (session?.role === "pro" ? getAccount(session.accountId) : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, version],
  );

  // Tant que localStorage n'a pas été lu, on n'affiche ni le formulaire
  // ni le tableau de bord : cela évite un flash de l'écran de connexion.
  if (!ready) return <ProSkeleton />;
  if (account) return <Dashboard account={account} />;
  return <AuthPanel isAdmin={session?.role === "admin"} />;
}

function ProSkeleton() {
  const { t } = useLocale();
  return (
    <PageHero eyebrow={t.pro.eyebrow} title={t.pro.title} subtitle={t.pro.subtitle}>
      <div className="mx-auto h-64 w-full max-w-md animate-pulse border border-gold-500/10 bg-ink-900/40" />
    </PageHero>
  );
}

/* ------------------------------------------------------------------ */
/* Connexion / inscription                                             */
/* ------------------------------------------------------------------ */

function AuthPanel({ isAdmin = false }: { isAdmin?: boolean }) {
  const { t, href } = useLocale();
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <>
      <PageHero eyebrow={t.pro.eyebrow} title={t.pro.title} subtitle={t.pro.subtitle}>
        <div
          role="tablist"
          className="mx-auto flex w-full max-w-md border border-gold-500/25 p-1"
        >
          {(["login", "register"] as const).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "relative flex-1 px-4 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-500",
                tab === key ? "text-ink-950" : "text-cream-dim hover:text-gold-200",
              )}
            >
              {tab === key && (
                <motion.span
                  layoutId="pro-tab"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
                />
              )}
              <span className="relative z-10">{t.pro.tabs[key]}</span>
            </button>
          ))}
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-32">
        <Container size="narrow">
          {/* Une session administrateur est signalée explicitement :
              elle n'ouvre pas l'espace client mais reste active. */}
          {isAdmin && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border border-gold-500/30 bg-gold-500/[0.06] px-5 py-4">
              <p className="text-sm text-gold-200/90">{t.admin.title}</p>
              <div className="flex items-center gap-3">
                <Link
                  href={href("/admin")}
                  className="border border-gold-500/40 px-4 py-2 text-[0.62rem] uppercase
                             tracking-[0.16em] text-gold-200 transition-colors duration-400
                             hover:border-gold-400/70 hover:bg-gold-500/10"
                >
                  {t.nav.admin}
                </Link>
                <button
                  type="button"
                  onClick={clearSession}
                  className="inline-flex items-center gap-2 text-[0.62rem] uppercase
                             tracking-[0.16em] text-cream-mute transition-colors hover:text-gold-200"
                >
                  <LogOut className="size-3" strokeWidth={1.5} />
                  {t.pro.dashboard.logout}
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {tab === "login" ? <LoginForm key="login" /> : <RegisterForm key="register" />}
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}

const PANEL = "border border-gold-500/18 bg-ink-900/45 p-6 sm:p-10";
const MOTION = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

function LoginForm() {
  const { t } = useLocale();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = login(String(data.get("email")), String(data.get("password")));
    if (result.ok) {
      setError(null);
      return;
    }
    setError(
      result.error === "pending"
        ? t.pro.login.pendingError
        : result.error === "rejected"
          ? t.pro.login.rejectedError
          : t.pro.login.error,
    );
  }

  return (
    <motion.div {...MOTION} className={PANEL}>
      <Eyebrow>{t.pro.login.title}</Eyebrow>
      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <Input id="login-email" name="email" type="email" label={t.pro.login.email} required autoComplete="email" dir="ltr" />
        <Input id="login-password" name="password" type="password" label={t.pro.login.password} required autoComplete="current-password" dir="ltr" />

        {error && (
          <p className="border border-ruby-500/40 bg-ruby-600/10 px-4 py-3 text-sm text-ruby-500">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="mt-1 w-full">
          <Lock className="size-3.5" strokeWidth={1.5} />
          {t.pro.login.submit}
        </Button>

        <p className="mt-2 text-center text-[0.66rem] tracking-wide text-cream-mute/60">
          {t.pro.login.demoHint}
        </p>
      </form>
    </motion.div>
  );
}

function RegisterForm() {
  const { t } = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const activities = [
    t.contact.form.profileOptions.restaurant,
    t.contact.form.profileOptions.retail,
    t.contact.form.profileOptions.importer,
    t.contact.form.profileOptions.other,
  ];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const password = get("password");

    if (password.length < 8) {
      setError(t.pro.register.errorPassword);
      return;
    }
    if (password !== get("passwordConfirm")) {
      setError(t.pro.register.errorMatch);
      return;
    }

    const result = register({
      company: get("company"),
      vat: get("vat"),
      contactName: get("contactName"),
      email: get("email"),
      phone: get("phone"),
      country: get("country"),
      activity: get("activity"),
      volume: get("volume"),
      password,
    });

    if (!result.ok) {
      setError(t.pro.register.errorExists);
      return;
    }
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <motion.div {...MOTION} className={cn(PANEL, "flex flex-col items-center py-16 text-center")}>
        <span className="relative flex size-16 items-center justify-center">
          <Rosette className="size-16 text-gold-500/35" />
          <Check className="absolute size-6 text-olive-300" strokeWidth={2} />
        </span>
        <h2 className="mt-7 text-2xl">{t.pro.register.success}</h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-mute">
          {t.pro.register.successText}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div {...MOTION} className={PANEL}>
      <Eyebrow>{t.pro.register.title}</Eyebrow>
      <p className="mt-5 text-sm leading-relaxed text-cream-mute">{t.pro.register.intro}</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <Input id="reg-company" name="company" label={t.pro.register.company} required autoComplete="organization" />
        <Input id="reg-vat" name="vat" label={t.pro.register.vat} required />
        <Input id="reg-contact" name="contactName" label={t.pro.register.contactName} required autoComplete="name" />
        <Input id="reg-email" name="email" type="email" label={t.pro.register.email} required autoComplete="email" dir="ltr" />
        <Input id="reg-phone" name="phone" type="tel" label={t.pro.register.phone} required autoComplete="tel" dir="ltr" />
        <Input id="reg-country" name="country" label={t.pro.register.country} required autoComplete="country-name" />

        <Select id="reg-activity" name="activity" label={t.pro.register.activity} defaultValue={activities[0]}>
          {activities.map((activity) => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
        </Select>

        <Input
          id="reg-volume"
          name="volume"
          label={t.pro.register.volume}
          placeholder={t.contact.form.volumePlaceholder}
        />

        <Input id="reg-password" name="password" type="password" label={t.pro.register.password} required autoComplete="new-password" dir="ltr" />
        <Input id="reg-password2" name="passwordConfirm" type="password" label={t.pro.register.passwordConfirm} required autoComplete="new-password" dir="ltr" />

        {error && (
          <p className="border border-ruby-500/40 bg-ruby-600/10 px-4 py-3 text-sm text-ruby-500 sm:col-span-2">
            {error}
          </p>
        )}

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" className="w-full">
            <UserPlus className="size-3.5" strokeWidth={1.5} />
            {t.pro.register.submit}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Tableau de bord professionnel                                       */
/* ------------------------------------------------------------------ */

const STATUS_STYLE: Record<string, string> = {
  pending: "border-gold-500/40 text-gold-300",
  confirmed: "border-olive-500/50 text-olive-300",
  shipped: "border-olive-300/50 text-olive-300",
  cancelled: "border-ruby-500/40 text-ruby-500",
};

function Dashboard({ account }: { account: Account }) {
  const { t, price, date } = useLocale();
  const version = useStoreVersion();
  const [quantity, setQuantity] = useState(48);
  const [placed, setPlaced] = useState<string | null>(null);

  const orders = useMemo(
    () => listOrders(account.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account.id, version],
  );

  const unit = unitPriceFor(quantity, account.customPrice);
  const total = unit * quantity;

  function placeOrder() {
    const order = createOrder({
      accountId: account.id,
      company: account.company,
      quantity,
      unitPrice: unit,
    });
    setPlaced(order.ref);
  }

  return (
    <>
      <PageHero
        eyebrow={t.pro.eyebrow}
        title={
          <>
            {t.pro.dashboard.welcome},{" "}
            <span className="text-gold-gradient">{account.company}</span>
          </>
        }
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2.5 border border-olive-500/45 px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-olive-300">
            <Check className="size-3" strokeWidth={2} />
            {t.pro.status.approved}
          </span>
          <button
            type="button"
            onClick={clearSession}
            className="inline-flex items-center gap-2.5 border border-gold-500/25 px-4 py-2
                       text-[0.62rem] uppercase tracking-[0.18em] text-cream-dim
                       transition-colors duration-400 hover:border-gold-400/60 hover:text-gold-200"
          >
            <LogOut className="size-3" strokeWidth={1.5} />
            {t.pro.dashboard.logout}
          </button>
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Grille tarifaire */}
            <div className={PANEL}>
              <Eyebrow>{t.pro.dashboard.pricingTitle}</Eyebrow>
              <p className="mt-4 text-sm leading-relaxed text-cream-mute">
                {t.pro.dashboard.pricingNote}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-px bg-gold-500/12">
                <Metric label={t.pro.dashboard.publicPrice} value={price(PRODUCT.retailPrice)} />
                <Metric label={t.pro.dashboard.yourPrice} value={price(unit)} accent />
                <Metric label={t.pro.dashboard.discount} value={`−${discountPercent(unit)} %`} />
              </div>

              {/* Nouvelle commande */}
              <div className="mt-9 border-t border-gold-500/12 pt-8">
                <p className="eyebrow">{t.pro.dashboard.newOrderTitle}</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Input
                    id="pro-qty"
                    label={t.pro.dashboard.quantity}
                    type="number"
                    min={1}
                    max={5000}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Math.min(5000, Number(e.target.value) || 1)))
                    }
                  />
                  <div>
                    <p className="mb-2 text-[0.6rem] uppercase tracking-[0.2em] text-cream-mute">
                      {t.pro.dashboard.estimate}
                    </p>
                    <p className="font-display text-3xl text-gold-200">{price(total)}</p>
                  </div>
                </div>

                <Button size="lg" className="mt-7 w-full" onClick={placeOrder}>
                  <Package className="size-3.5" strokeWidth={1.5} />
                  {t.pro.dashboard.placeOrder}
                </Button>

                {placed && (
                  <p className="mt-4 inline-flex items-center gap-2.5 text-sm text-olive-300">
                    <Check className="size-3.5" strokeWidth={2} />
                    {t.pro.dashboard.orderPlaced} — {placed}
                  </p>
                )}
              </div>
            </div>

            {/* Commandes + documents */}
            <div className="flex flex-col gap-6">
              <div className={PANEL}>
                <Eyebrow>{t.pro.dashboard.ordersTitle}</Eyebrow>

                {orders.length === 0 ? (
                  <p className="mt-8 text-sm text-cream-mute">{t.pro.dashboard.ordersEmpty}</p>
                ) : (
                  <ul className="mt-8 divide-y divide-gold-500/12">
                    {orders.map((order) => (
                      <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                        <div>
                          <p className="font-display text-lg text-cream" dir="ltr">
                            {order.ref}
                          </p>
                          <p className="mt-0.5 text-[0.68rem] text-cream-mute">
                            {date(order.createdAt)} · {order.quantity} ×{" "}
                            {price(order.unitPrice)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-display text-lg text-gold-200">
                            {price(order.total)}
                          </span>
                          <span
                            className={cn(
                              "border px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.16em]",
                              STATUS_STYLE[order.status],
                            )}
                          >
                            {t.admin.orders.statuses[order.status]}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={PANEL}>
                <Eyebrow>{t.pro.dashboard.docsTitle}</Eyebrow>
                <ul className="mt-7 space-y-3">
                  {t.pro.dashboard.docs.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center justify-between gap-4 border border-gold-500/12 px-4 py-3.5"
                    >
                      <span className="flex items-center gap-3 text-sm text-cream-dim">
                        <FileText className="size-4 shrink-0 text-gold-500/70" strokeWidth={1.25} />
                        {doc}
                      </span>
                      <span className="shrink-0 text-[0.55rem] uppercase tracking-[0.16em] text-cream-mute/60">
                        {t.pro.dashboard.docsSoon}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-ink-950 px-3 py-6 text-center">
      <span className="text-[0.55rem] uppercase tracking-[0.16em] text-cream-mute">{label}</span>
      <span
        className={cn(
          "font-display text-xl sm:text-2xl",
          accent ? "text-gold-gradient" : "text-cream",
        )}
      >
        {value}
      </span>
    </div>
  );
}

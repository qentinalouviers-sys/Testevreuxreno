"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { LogOut, Lock, UserPlus, FileText, Check, Clock, Wallet, Percent, ShoppingBag } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Eyebrow } from "../ui/SectionHeading";
import { Button, ButtonLink } from "../ui/Button";
import { Input, Select } from "../ui/Field";
import { Rosette } from "../ui/Wordmark";
import { useLocale } from "@/i18n/LocaleProvider";
import { useSession, useStoreVersion } from "@/lib/useStore";
import {
  clearSession,
  getAccount,
  listOrders,
  login,
  register,
  type Account,
} from "@/lib/store";
import { DEFAULT_COMMISSION_RATE, PRODUCERS, productsByProducer } from "@/lib/marketplace";
import { cn } from "@/lib/cn";

export function ProContent() {
  const { session, ready } = useSession();
  const version = useStoreVersion();

  // Une session administrateur ne doit pas se faire passer pour une maison
  // ou un acheteur : seuls les deux rôles métier ouvrent un tableau de bord.
  const account = useMemo(
    () =>
      session && session.role !== "admin" ? getAccount(session.accountId) : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, version],
  );

  // Tant que localStorage n'a pas été lu, on n'affiche ni le formulaire
  // ni le tableau de bord : cela évite un flash de l'écran de connexion.
  if (!ready) return <ProSkeleton />;
  if (account?.role === "buyer") return <BuyerDashboard account={account} />;
  if (account) return <Dashboard account={account} />;
  return <AuthPanel isAdmin={session?.role === "admin"} />;
}

function ProSkeleton() {
  const { t } = useLocale();
  return (
    <PageHero eyebrow={t.pro.eyebrow} title={t.pro.title} subtitle={t.pro.subtitle}>
      <div className="mx-auto h-64 w-full max-w-md animate-pulse border border-ink/8 bg-white" />
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
          className="mx-auto flex w-full max-w-md border border-ink/14 p-1"
        >
          {(["login", "register"] as const).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "relative flex-1 px-4 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-500",
                tab === key ? "text-ink" : "text-ink-soft hover:text-gold-700",
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
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border border-gold-500/45 bg-gold-500/[0.09] px-5 py-4">
              <p className="text-sm text-gold-700">{t.admin.title}</p>
              <div className="flex items-center gap-3">
                <Link
                  href={href("/admin")}
                  className="border border-gold-500/50 px-4 py-2 text-[0.62rem] uppercase
                             tracking-[0.16em] text-gold-700 transition-colors duration-400
                             hover:border-gold-600/70 hover:bg-ink/10"
                >
                  {t.nav.admin}
                </Link>
                <button
                  type="button"
                  onClick={clearSession}
                  className="inline-flex items-center gap-2 text-[0.62rem] uppercase
                             tracking-[0.16em] text-ink-mute transition-colors hover:text-gold-700"
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

const PANEL = "border border-ink/10 bg-white p-6 sm:p-10";
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
          <p className="border border-ruby-500/35 bg-ruby-500/08 px-4 py-3 text-sm text-ruby-500">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="mt-1 w-full">
          <Lock className="size-3.5" strokeWidth={1.5} />
          {t.pro.login.submit}
        </Button>

        <p className="mt-2 text-center text-[0.66rem] tracking-wide text-ink-mute/80">
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
  const [role, setRole] = useState<"producer" | "buyer">("producer");

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
      role,
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
          <Rosette className="size-16 text-gold-500" />
          <Check className="absolute size-6 text-olive-600" strokeWidth={2} />
        </span>
        <h2 className="mt-7 text-2xl">{t.pro.register.success}</h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-mute">
          {t.pro.register.successText}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div {...MOTION} className={PANEL}>
      <Eyebrow>{t.pro.register.title}</Eyebrow>
      <p className="mt-5 text-sm leading-relaxed text-ink-mute">{t.pro.register.intro}</p>

      {/* Nature du compte : elle change le parcours et les conditions. */}
      <fieldset className="mt-8">
        <legend className="mb-3 text-[0.6rem] uppercase tracking-[0.2em] text-ink-mute">
          {t.pro.register.accountType.label}
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["producer", "buyer"] as const).map((key) => {
            const active = role === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setRole(key)}
                className={cn(
                  "border p-4 text-start transition-all duration-400",
                  active
                    ? "border-gold-600/70 bg-gold-500/[0.10]"
                    : "border-ink/14 bg-white hover:border-gold-500/50",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-full border",
                      active ? "border-gold-600 bg-gold-500" : "border-ink/25",
                    )}
                  >
                    {active && <Check className="size-2.5 text-white" strokeWidth={3} />}
                  </span>
                  <span className="text-sm text-ink">
                    {t.pro.register.accountType[key]}
                  </span>
                </span>
                <span className="mt-2 block ps-6.5 text-[0.72rem] leading-relaxed text-ink-mute">
                  {key === "producer"
                    ? t.pro.register.accountType.producerNote
                    : t.pro.register.accountType.buyerNote}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
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
          <p className="border border-ruby-500/35 bg-ruby-500/08 px-4 py-3 text-sm text-ruby-500 sm:col-span-2">
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
  pending: "border-gold-500/50 text-gold-600",
  confirmed: "border-olive-600/45 text-olive-600",
  shipped: "border-olive-600/45 text-olive-600",
  cancelled: "border-ruby-500/35 text-ruby-500",
};

function Dashboard({ account }: { account: Account }) {
  const { t, price, date } = useLocale();
  const version = useStoreVersion();

  const orders = useMemo(
    () => listOrders(account.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account.id, version],
  );

  const rate = account.commissionRate ?? DEFAULT_COMMISSION_RATE;

  // Les maisons de démonstration sont adossées au catalogue par leur nom.
  const producer = PRODUCERS.find((p) => p.name === account.company);
  const products = producer ? productsByProducer(producer.id) : [];
  const payoutsActive = producer?.payouts === "active";

  const revenue = useMemo(() => {
    const billable = orders.filter((o) => o.status !== "cancelled");
    return {
      gross: billable.reduce((s, o) => s + o.gross, 0),
      yours: billable.reduce((s, o) => s + o.producerShare, 0),
      commission: billable.reduce((s, o) => s + o.commission, 0),
    };
  }, [orders]);

  return (
    <>
      <PageHero
        eyebrow={t.pro.eyebrow}
        title={<span className="text-gold-gradient">{account.company}</span>}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2.5 border border-olive-600/40 px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-olive-600">
            <Check className="size-3" strokeWidth={2} />
            {t.pro.status.approved}
          </span>
          <button
            type="button"
            onClick={clearSession}
            className="inline-flex items-center gap-2.5 border border-ink/14 px-4 py-2
                       text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft
                       transition-colors duration-400 hover:border-gold-600/60 hover:text-gold-700"
          >
            <LogOut className="size-3" strokeWidth={1.5} />
            {t.pro.dashboard.logout}
          </button>
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          {/* Compte de reversement — la promesse centrale de la plateforme. */}
          <div
            className={cn(
              "mb-6 flex flex-wrap items-center justify-between gap-5 border p-6 sm:p-7",
              payoutsActive
                ? "border-olive-600/40 bg-olive-600/08"
                : "border-gold-500/45 bg-gold-500/[0.09]",
            )}
          >
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center border",
                  payoutsActive ? "border-olive-600/45" : "border-gold-500/50",
                )}
              >
                {payoutsActive ? (
                  <Wallet className="size-5 text-olive-600" strokeWidth={1.25} />
                ) : (
                  <Clock className="size-5 text-gold-600" strokeWidth={1.25} />
                )}
              </span>
              <div>
                <p className="eyebrow">{t.pro.dashboard.payoutsTitle}</p>
                <p className="mt-2 text-sm text-ink-soft">
                  {payoutsActive
                    ? t.pro.dashboard.payoutsActive
                    : t.pro.dashboard.payoutsPending}
                </p>
              </div>
            </div>
            {!payoutsActive && (
              <span className="border border-gold-500/45 px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.16em] text-gold-600">
                {t.pro.dashboard.payoutsSoon}
              </span>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenus */}
            <div className={PANEL}>
              <Eyebrow>{t.pro.dashboard.revenueTitle}</Eyebrow>

              <div className="mt-8 grid grid-cols-3 gap-px bg-ink/10">
                <Metric label={t.pro.dashboard.revenueGross} value={price(revenue.gross)} />
                <Metric label={t.pro.dashboard.revenueYours} value={price(revenue.yours)} accent />
                <Metric
                  label={t.pro.dashboard.revenueCommission}
                  value={price(revenue.commission)}
                />
              </div>

              <p className="mt-6 flex items-baseline justify-between gap-4 border-t border-ink/8 pt-6 text-sm">
                <span className="text-ink-mute">{t.pro.dashboard.yourRate}</span>
                <span className="font-display text-2xl text-gold-700">
                  {100 - rate} % / {rate} %
                </span>
              </p>

              {/* Produits publiés */}
              <div className="mt-8 border-t border-ink/8 pt-8">
                <p className="eyebrow">{t.pro.dashboard.productsTitle}</p>
                {products.length === 0 ? (
                  <p className="mt-5 text-sm text-ink-mute">{t.pro.dashboard.productsEmpty}</p>
                ) : (
                  <ul className="mt-5 divide-y divide-ink/8">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-ink">{product.name}</span>
                          <span className="mt-0.5 block text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
                            {product.format}
                          </span>
                        </span>
                        <span className="shrink-0 text-end">
                          <span className="block font-display text-lg text-gold-700">
                            {price(product.price)}
                          </span>
                          <span className="block text-[0.6rem] text-olive-600">
                            {price((product.price * (100 - rate)) / 100)}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Commandes + documents */}
            <div className="flex flex-col gap-6">
              <div className={PANEL}>
                <Eyebrow>{t.pro.dashboard.ordersTitle}</Eyebrow>

                {orders.length === 0 ? (
                  <p className="mt-8 text-sm text-ink-mute">{t.pro.dashboard.ordersEmpty}</p>
                ) : (
                  <ul className="mt-8 divide-y divide-ink/8">
                    {orders.map((order) => (
                      <li
                        key={order.id}
                        className="flex flex-wrap items-center justify-between gap-3 py-4"
                      >
                        <div>
                          <p className="font-display text-lg text-ink" dir="ltr">
                            {order.ref}
                          </p>
                          <p className="mt-0.5 text-[0.68rem] text-ink-mute">
                            {date(order.createdAt)} · {order.quantity} {t.pro.dashboard.orderQty}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-end">
                            <span className="block font-display text-lg text-olive-600">
                              {price(order.producerShare)}
                            </span>
                            <span className="block text-[0.6rem] text-ink-mute">
                              / {price(order.gross)}
                            </span>
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
                      className="flex items-center justify-between gap-4 border border-ink/8 px-4 py-3.5"
                    >
                      <span className="flex items-center gap-3 text-sm text-ink-soft">
                        <FileText className="size-4 shrink-0 text-gold-600" strokeWidth={1.25} />
                        {doc}
                      </span>
                      <span className="shrink-0 text-[0.55rem] uppercase tracking-[0.16em] text-ink-mute/80">
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


/* ------------------------------------------------------------------ */
/* Tableau de bord acheteur professionnel                              */
/* ------------------------------------------------------------------ */

/**
 * Un acheteur pro ne vend rien : il achète. Son espace montre donc sa remise
 * négociée et ses commandes, pas des reversements.
 */
function BuyerDashboard({ account }: { account: Account }) {
  const { t, href, price, date } = useLocale();
  const version = useStoreVersion();

  const orders = useMemo(
    () => listOrders(account.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account.id, version],
  );

  const discount = account.discountRate;

  return (
    <>
      <PageHero
        eyebrow={t.pro.eyebrow}
        title={<span className="text-gold-gradient">{account.company}</span>}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2.5 border border-olive-600/40 px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-olive-600">
            <Check className="size-3" strokeWidth={2} />
            {t.pro.buyer.approved}
          </span>
          <button
            type="button"
            onClick={clearSession}
            className="inline-flex items-center gap-2.5 border border-ink/14 px-4 py-2
                       text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft
                       transition-colors duration-400 hover:border-gold-600/60 hover:text-gold-700"
          >
            <LogOut className="size-3" strokeWidth={1.5} />
            {t.pro.dashboard.logout}
          </button>
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={PANEL}>
              <Eyebrow>{t.pro.buyer.title}</Eyebrow>

              <div className="mt-8 flex items-center gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center border border-gold-500/45">
                  <Percent className="size-6 text-gold-600" strokeWidth={1.25} />
                </span>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-ink-mute">
                    {t.pro.buyer.discount}
                  </p>
                  <p className="mt-1 font-display text-4xl text-gold-gradient">
                    {discount !== null ? `−${discount} %` : "—"}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ink-mute">
                {discount !== null ? t.pro.buyer.discountNote : t.pro.buyer.none}
              </p>

              <ButtonLink href={href("/produits")} size="lg" className="mt-8 w-full">
                <ShoppingBag className="size-3.5" strokeWidth={1.5} />
                {t.pro.buyer.catalogCta}
              </ButtonLink>
            </div>

            <div className={PANEL}>
              <Eyebrow>{t.pro.dashboard.ordersTitle}</Eyebrow>
              {orders.length === 0 ? (
                <p className="mt-8 text-sm text-ink-mute">{t.pro.dashboard.ordersEmpty}</p>
              ) : (
                <ul className="mt-8 divide-y divide-ink/8">
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-4"
                    >
                      <div>
                        <p className="font-display text-lg text-ink" dir="ltr">
                          {order.ref}
                        </p>
                        <p className="mt-0.5 text-[0.68rem] text-ink-mute">
                          {date(order.createdAt)} · {order.quantity} {t.pro.dashboard.orderQty}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-lg text-gold-700">
                          {price(order.gross)}
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
          </div>
        </Container>
      </section>
    </>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-paper px-3 py-6 text-center">
      <span className="text-[0.55rem] uppercase tracking-[0.16em] text-ink-mute">{label}</span>
      <span
        className={cn(
          "font-display text-xl sm:text-2xl",
          accent ? "text-gold-gradient" : "text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useMemo, useState, type FormEvent } from "react";
import { Check, LogOut, Lock, X, Save } from "lucide-react";
import { Container } from "../ui/Container";
import { PageHero } from "../ui/PageHero";
import { Eyebrow } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Input } from "../ui/Field";
import { useLocale } from "@/i18n/LocaleProvider";
import { useSession, useStoreVersion } from "@/lib/useStore";
import {
  clearSession,
  getAccount,
  listAccounts,
  listOrders,
  login,
  setAccountStatus,
  setCustomPrice,
  setOrderStatus,
  type Account,
  type OrderStatus,
} from "@/lib/store";
import { PRODUCT, discountPercent } from "@/lib/catalog";
import { cn } from "@/lib/cn";

type Tab = "accounts" | "orders" | "pricing";

export function AdminContent() {
  const { session, ready } = useSession();
  const version = useStoreVersion();

  const account = useMemo(
    () => (session?.role === "admin" ? getAccount(session.accountId) : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, version],
  );

  if (!ready) return <AdminSkeleton />;
  if (!account) return <AdminLogin />;
  return <AdminPanel />;
}

function AdminSkeleton() {
  const { t } = useLocale();
  return (
    <PageHero eyebrow={t.nav.admin} title={t.admin.title}>
      <div className="mx-auto h-56 w-full max-w-md animate-pulse border border-gold-500/10 bg-ink-900/40" />
    </PageHero>
  );
}

function AdminLogin() {
  const { t } = useLocale();
  const [error, setError] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = login(String(data.get("email")), String(data.get("password")));
    // Un compte pro validé ne doit pas ouvrir l'administration.
    if (!result.ok || result.account.role !== "admin") {
      if (result.ok) clearSession();
      setError(true);
      return;
    }
    setError(false);
  }

  return (
    <>
      <PageHero eyebrow={t.nav.admin} title={t.admin.title} subtitle={t.admin.subtitle} />
      <section className="pb-24 sm:pb-32">
        <Container size="narrow">
          <div className="mx-auto max-w-md border border-gold-500/18 bg-ink-900/45 p-8 sm:p-10">
            <Eyebrow>{t.admin.login.title}</Eyebrow>
            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <Input id="admin-email" name="email" type="email" label={t.admin.login.email} required autoComplete="email" dir="ltr" />
              <Input id="admin-password" name="password" type="password" label={t.admin.login.password} required autoComplete="current-password" dir="ltr" />

              {error && (
                <p className="border border-ruby-500/40 bg-ruby-600/10 px-4 py-3 text-sm text-ruby-500">
                  {t.admin.login.error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full">
                <Lock className="size-3.5" strokeWidth={1.5} />
                {t.admin.login.submit}
              </Button>

              <p className="mt-2 text-center text-[0.66rem] tracking-wide text-cream-mute/60">
                {t.pro.login.demoHint}
              </p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Panneau d'administration                                            */
/* ------------------------------------------------------------------ */

const STATUS_STYLE: Record<string, string> = {
  pending: "border-gold-500/40 text-gold-300",
  approved: "border-olive-500/50 text-olive-300",
  confirmed: "border-olive-500/50 text-olive-300",
  shipped: "border-olive-300/50 text-olive-300",
  rejected: "border-ruby-500/40 text-ruby-500",
  cancelled: "border-ruby-500/40 text-ruby-500",
};

function AdminPanel() {
  const { t } = useLocale();
  const version = useStoreVersion();
  const [tab, setTab] = useState<Tab>("accounts");

  const accounts = useMemo(
    () => listAccounts(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version],
  );
  const orders = useMemo(
    () => listOrders(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version],
  );
  const pending = accounts.filter((a) => a.status === "pending").length;

  return (
    <>
      <PageHero eyebrow={t.nav.admin} title={t.admin.title} subtitle={t.admin.subtitle}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div role="tablist" className="flex flex-wrap justify-center border border-gold-500/25 p-1">
            {(["accounts", "orders", "pricing"] as Tab[]).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  "relative px-5 py-2.5 text-[0.64rem] uppercase tracking-[0.16em] transition-colors duration-500",
                  tab === key ? "text-ink-950" : "text-cream-dim hover:text-gold-200",
                )}
              >
                {tab === key && (
                  <motion.span
                    layoutId="admin-tab"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
                  />
                )}
                <span className="relative z-10">
                  {t.admin.tabs[key]}
                  {key === "accounts" && pending > 0 && (
                    <span className="ms-2 text-[0.55rem]">
                      ({pending} {t.admin.accounts.pendingCount})
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={clearSession}
            className="inline-flex items-center gap-2.5 border border-gold-500/25 px-4 py-2.5
                       text-[0.62rem] uppercase tracking-[0.16em] text-cream-dim
                       transition-colors duration-400 hover:border-gold-400/60 hover:text-gold-200"
          >
            <LogOut className="size-3" strokeWidth={1.5} />
            {t.admin.logout}
          </button>
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          {tab === "accounts" && <AccountsTable accounts={accounts} />}
          {tab === "orders" && <OrdersTable orders={orders} />}
          {tab === "pricing" && <PricingTable accounts={accounts} />}
        </Container>
      </section>
    </>
  );
}

/* --------------------------- Comptes ------------------------------ */

function AccountsTable({ accounts }: { accounts: Account[] }) {
  const { t, date } = useLocale();

  if (accounts.length === 0) {
    return <Empty>{t.admin.accounts.empty}</Empty>;
  }

  return (
    <div className="overflow-x-auto border border-gold-500/18">
      <table className="w-full min-w-[52rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-gold-500/18 bg-ink-900/60">
            <Th>{t.admin.accounts.company}</Th>
            <Th>{t.admin.accounts.contact}</Th>
            <Th>{t.admin.accounts.country}</Th>
            <Th>{t.admin.accounts.activity}</Th>
            <Th>{t.admin.accounts.registered}</Th>
            <Th>{t.admin.accounts.status}</Th>
            <Th className="text-end">{t.admin.accounts.actions}</Th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr
              key={account.id}
              className="border-b border-gold-500/10 transition-colors duration-400 last:border-0 hover:bg-ink-900/40"
            >
              <Td>
                <span className="text-cream">{account.company}</span>
                <span className="mt-0.5 block text-[0.68rem] text-cream-mute" dir="ltr">
                  {account.vat}
                </span>
              </Td>
              <Td>
                <span className="text-cream-dim">{account.contactName}</span>
                <span className="mt-0.5 block text-[0.68rem] text-cream-mute" dir="ltr">
                  {account.email}
                </span>
              </Td>
              <Td>{account.country}</Td>
              <Td>{account.activity}</Td>
              <Td>{date(account.createdAt)}</Td>
              <Td>
                <span
                  className={cn(
                    "inline-block border px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.14em]",
                    STATUS_STYLE[account.status],
                  )}
                >
                  {t.pro.status[account.status]}
                </span>
              </Td>
              <Td className="text-end">
                <div className="inline-flex gap-2">
                  <IconAction
                    label={t.admin.accounts.approve}
                    active={account.status === "approved"}
                    tone="olive"
                    onClick={() => setAccountStatus(account.id, "approved")}
                  >
                    <Check className="size-3.5" strokeWidth={2} />
                  </IconAction>
                  <IconAction
                    label={t.admin.accounts.reject}
                    active={account.status === "rejected"}
                    tone="ruby"
                    onClick={() => setAccountStatus(account.id, "rejected")}
                  >
                    <X className="size-3.5" strokeWidth={2} />
                  </IconAction>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------- Commandes ----------------------------- */

function OrdersTable({ orders }: { orders: ReturnType<typeof listOrders> }) {
  const { t, price, date } = useLocale();

  if (orders.length === 0) return <Empty>{t.admin.orders.empty}</Empty>;

  const statuses: OrderStatus[] = ["pending", "confirmed", "shipped", "cancelled"];

  return (
    <div className="overflow-x-auto border border-gold-500/18">
      <table className="w-full min-w-[48rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-gold-500/18 bg-ink-900/60">
            <Th>{t.admin.orders.ref}</Th>
            <Th>{t.admin.orders.client}</Th>
            <Th>{t.admin.orders.date}</Th>
            <Th className="text-end">{t.admin.orders.qty}</Th>
            <Th className="text-end">{t.admin.orders.unit}</Th>
            <Th className="text-end">{t.admin.orders.total}</Th>
            <Th className="text-end">{t.admin.orders.status}</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gold-500/10 transition-colors duration-400 last:border-0 hover:bg-ink-900/40"
            >
              <Td>
                <span className="font-display text-base text-gold-200" dir="ltr">
                  {order.ref}
                </span>
              </Td>
              <Td>{order.company}</Td>
              <Td>{date(order.createdAt)}</Td>
              <Td className="text-end">{order.quantity}</Td>
              <Td className="text-end">{price(order.unitPrice)}</Td>
              <Td className="text-end text-cream">{price(order.total)}</Td>
              <Td className="text-end">
                <select
                  value={order.status}
                  onChange={(e) => setOrderStatus(order.id, e.target.value as OrderStatus)}
                  aria-label={t.admin.orders.status}
                  className={cn(
                    "border bg-ink-900 px-2.5 py-1.5 text-[0.6rem] uppercase tracking-[0.12em]",
                    "focus:outline-none focus-visible:outline focus-visible:outline-gold-400",
                    STATUS_STYLE[order.status],
                  )}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status} className="bg-ink-900 text-cream">
                      {t.admin.orders.statuses[status]}
                    </option>
                  ))}
                </select>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------- Tarifs ------------------------------ */

function PricingTable({ accounts }: { accounts: Account[] }) {
  const { t, price } = useLocale();
  const approved = accounts.filter((a) => a.status === "approved");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  if (approved.length === 0) return <Empty>{t.admin.accounts.empty}</Empty>;

  const valueFor = (account: Account) =>
    drafts[account.id] ?? (account.customPrice !== null ? String(account.customPrice) : "");

  function save() {
    for (const account of approved) {
      const raw = drafts[account.id];
      if (raw === undefined) continue;
      const parsed = raw.trim() === "" ? null : Number(raw);
      setCustomPrice(account.id, parsed !== null && Number.isFinite(parsed) ? parsed : null);
    }
    setDrafts({});
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  }

  return (
    <div>
      <div className="border border-gold-500/18 bg-ink-900/45 p-6 sm:p-8">
        <Eyebrow>{t.admin.pricing.title}</Eyebrow>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream-mute">
          {t.admin.pricing.note}
        </p>
      </div>

      <div className="mt-6 overflow-x-auto border border-gold-500/18">
        <table className="w-full min-w-[44rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gold-500/18 bg-ink-900/60">
              <Th>{t.admin.pricing.client}</Th>
              <Th className="text-end">{t.admin.pricing.publicPrice}</Th>
              <Th className="text-end">{t.admin.pricing.customPrice}</Th>
              <Th className="text-end">{t.admin.pricing.discount}</Th>
            </tr>
          </thead>
          <tbody>
            {approved.map((account) => {
              const raw = valueFor(account);
              const parsed = Number(raw);
              const effective = raw.trim() !== "" && Number.isFinite(parsed) && parsed > 0 ? parsed : null;
              return (
                <tr
                  key={account.id}
                  className="border-b border-gold-500/10 last:border-0 hover:bg-ink-900/40"
                >
                  <Td>
                    <span className="text-cream">{account.company}</span>
                    <span className="mt-0.5 block text-[0.68rem] text-cream-mute" dir="ltr">
                      {account.email}
                    </span>
                  </Td>
                  <Td className="text-end text-cream-mute">{price(PRODUCT.retailPrice)}</Td>
                  <Td className="text-end">
                    <div className="inline-flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        inputMode="decimal"
                        value={raw}
                        placeholder={t.admin.pricing.placeholder}
                        aria-label={`${t.admin.pricing.customPrice} — ${account.company}`}
                        onChange={(e) =>
                          setDrafts((d) => ({ ...d, [account.id]: e.target.value }))
                        }
                        className="w-28 border border-gold-500/25 bg-ink-950/70 px-3 py-2 text-end
                                   text-cream placeholder:text-cream-mute/50
                                   focus:border-gold-400/70 focus:outline-none"
                        dir="ltr"
                      />
                      <span className="text-cream-mute">€</span>
                    </div>
                  </Td>
                  <Td className="text-end">
                    {effective ? (
                      <span className="text-olive-300">−{discountPercent(effective)} %</span>
                    ) : (
                      <span className="text-cream-mute/60">—</span>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <Button onClick={save} size="lg">
          <Save className="size-3.5" strokeWidth={1.5} />
          {t.admin.pricing.save}
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-2 text-sm text-olive-300">
            <Check className="size-3.5" strokeWidth={2} />
            {t.admin.pricing.saved}
          </span>
        )}
      </div>
    </div>
  );
}

/* --------------------------- Primitives --------------------------- */

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={cn(
        "px-4 py-3.5 text-start text-[0.58rem] font-normal uppercase tracking-[0.16em] text-gold-400 sm:px-5",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cn("px-4 py-4 align-top text-cream-dim sm:px-5", className)}>{children}</td>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-gold-500/18 bg-ink-900/45 px-6 py-16 text-center text-sm text-cream-mute">
      {children}
    </p>
  );
}

function IconAction({
  children,
  label,
  onClick,
  active,
  tone,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
  tone: "olive" | "ruby";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex size-8 items-center justify-center border transition-all duration-400",
        tone === "olive"
          ? active
            ? "border-olive-500/70 bg-olive-700/35 text-olive-300"
            : "border-gold-500/20 text-cream-mute hover:border-olive-500/60 hover:text-olive-300"
          : active
            ? "border-ruby-500/70 bg-ruby-600/25 text-ruby-500"
            : "border-gold-500/20 text-cream-mute hover:border-ruby-500/60 hover:text-ruby-500",
      )}
    >
      {children}
    </button>
  );
}

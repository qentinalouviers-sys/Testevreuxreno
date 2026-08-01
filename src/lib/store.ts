"use client";

/**
 * Couche de persistance de l'espace pro et de l'administration.
 *
 * ⚠️ Implémentation volontairement locale (localStorage) : elle permet de faire
 * tourner l'intégralité du parcours pro/admin sans backend, y compris sur un
 * export statique (GitHub Pages). Avant une mise en production commerciale il
 * faut remplacer ce module par un vrai backend (base de données + sessions
 * signées côté serveur) — l'interface publique ci-dessous est conçue pour être
 * réimplémentée à l'identique au-dessus d'une API REST.
 */

const KEY = "alarifa.store.v1";
const SESSION_KEY = "alarifa.session.v1";

export type AccountStatus = "pending" | "approved" | "rejected";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "cancelled";

export type Account = {
  id: string;
  company: string;
  vat: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  activity: string;
  volume: string;
  /** Empreinte du mot de passe — jamais le mot de passe en clair. */
  passwordHash: string;
  status: AccountStatus;
  /** Taux de commission de la plateforme, en %. null = taux standard. */
  commissionRate: number | null;
  createdAt: string;
  role: "pro" | "admin";
};

export type Order = {
  id: string;
  ref: string;
  accountId: string;
  company: string;
  /** Nombre d'articles de cette maison dans la commande. */
  quantity: number;
  /** Montant encaissé auprès du client pour cette maison, port compris. */
  gross: number;
  /** Commission retenue par la plateforme. */
  commission: number;
  /** Part virée au producteur — c'est le montant du transfert Stripe. */
  producerShare: number;
  status: OrderStatus;
  createdAt: string;
};

type StoreData = {
  accounts: Account[];
  orders: Order[];
};

export type Session = { accountId: string; role: "pro" | "admin" };

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

const isBrowser = () => typeof window !== "undefined";

function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

/**
 * Hachage démo (FNV-1a + sel fixe). Suffisant pour ne pas stocker le mot de
 * passe en clair dans le navigateur, mais à remplacer par bcrypt/argon2 côté
 * serveur en production.
 */
export function hashPassword(password: string): string {
  const salted = `al-arifa::${password}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < salted.length; i++) {
    h ^= salted.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  let h2 = 0x9e3779b9;
  for (let i = salted.length - 1; i >= 0; i--) {
    h2 ^= salted.charCodeAt(i);
    h2 = Math.imul(h2, 0x85ebca6b) >>> 0;
  }
  return `${h.toString(16).padStart(8, "0")}${h2.toString(16).padStart(8, "0")}`;
}

const ADMIN_SEED: Account = {
  id: "acc_admin",
  company: "Al Arifa",
  vat: "—",
  contactName: "Administration",
  email: "admin@al-arifa.com",
  phone: "",
  country: "PT",
  activity: "admin",
  volume: "",
  passwordHash: hashPassword("arifa2024"),
  status: "approved",
  commissionRate: null,
  createdAt: "2024-01-01T00:00:00.000Z",
  role: "admin",
};

/** Deux comptes de démonstration pour que l'admin ne soit pas vide au premier lancement. */
const DEMO_ACCOUNTS: Account[] = [
  {
    id: "acc_demo_1",
    company: "Miel des Cèdres",
    vat: "MA-4471902",
    contactName: "H. Benali",
    email: "contact@mieldescedres.ma",
    phone: "+212 5 35 00 00 00",
    country: "Maroc",
    activity: "Miels",
    volume: "4 t / an",
    passwordHash: hashPassword("demo1234"),
    status: "approved",
    commissionRate: 26,
    createdAt: "2025-11-04T09:12:00.000Z",
    role: "pro",
  },
  {
    id: "acc_demo_2",
    company: "Almendras de Ronda",
    vat: "ES-B92847110",
    contactName: "I. Delgado",
    email: "hola@almendrasderonda.es",
    phone: "+34 952 00 00 00",
    country: "Espagne",
    activity: "Fruits secs",
    volume: "18 t / an",
    passwordHash: hashPassword("demo1234"),
    status: "pending",
    commissionRate: null,
    createdAt: "2026-01-19T15:40:00.000Z",
    role: "pro",
  },
];

function seed(): StoreData {
  return {
    accounts: [ADMIN_SEED, ...DEMO_ACCOUNTS],
    orders: [
      {
        id: "ord_demo_1",
        ref: "AA-2601-0148",
        accountId: "acc_demo_1",
        company: "Miel des Cèdres",
        quantity: 12,
        gross: 408,
        commission: 106.08,
        producerShare: 301.92,
        status: "shipped",
        createdAt: "2026-01-08T10:05:00.000Z",
      },
      {
        id: "ord_demo_2",
        ref: "AA-2602-0163",
        accountId: "acc_demo_1",
        company: "Miel des Cèdres",
        quantity: 30,
        gross: 1020,
        commission: 265.2,
        producerShare: 754.8,
        status: "confirmed",
        createdAt: "2026-02-02T08:30:00.000Z",
      },
    ],
  };
}

function read(): StoreData {
  if (!isBrowser()) return { accounts: [], orders: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      const initial = seed();
      window.localStorage.setItem(KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw) as StoreData;
    if (!Array.isArray(parsed.accounts) || !Array.isArray(parsed.orders)) return seed();
    // Garantit la présence du compte administrateur même si le stockage a été altéré.
    if (!parsed.accounts.some((a) => a.role === "admin")) parsed.accounts.unshift(ADMIN_SEED);
    return parsed;
  } catch {
    return seed();
  }
}

function write(data: StoreData): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("alarifa:store"));
}

/** S'abonne aux mutations du store (même onglet et onglets voisins). */
export function subscribe(listener: () => void): () => void {
  if (!isBrowser()) return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === SESSION_KEY) listener();
  };
  window.addEventListener("alarifa:store", listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("alarifa:store", listener);
    window.removeEventListener("storage", onStorage);
  };
}

/* ------------------------------------------------------------------ */
/* Comptes                                                             */
/* ------------------------------------------------------------------ */

export function listAccounts(): Account[] {
  return read()
    .accounts.filter((a) => a.role === "pro")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getAccount(id: string): Account | undefined {
  return read().accounts.find((a) => a.id === id);
}

export type RegisterInput = Omit<
  Account,
  "id" | "passwordHash" | "status" | "commissionRate" | "createdAt" | "role"
> & { password: string };

export function register(input: RegisterInput): { ok: true; account: Account } | { ok: false; error: "exists" } {
  const data = read();
  const email = input.email.trim().toLowerCase();
  if (data.accounts.some((a) => a.email.toLowerCase() === email)) {
    return { ok: false, error: "exists" };
  }
  const account: Account = {
    id: uid("acc"),
    company: input.company.trim(),
    vat: input.vat.trim(),
    contactName: input.contactName.trim(),
    email,
    phone: input.phone.trim(),
    country: input.country.trim(),
    activity: input.activity,
    volume: input.volume.trim(),
    passwordHash: hashPassword(input.password),
    status: "pending",
    commissionRate: null,
    createdAt: new Date().toISOString(),
    role: "pro",
  };
  data.accounts.push(account);
  write(data);
  return { ok: true, account };
}

export type LoginResult =
  | { ok: true; account: Account }
  | { ok: false; error: "credentials" | "pending" | "rejected" };

export function login(email: string, password: string): LoginResult {
  const data = read();
  const account = data.accounts.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (!account || account.passwordHash !== hashPassword(password)) {
    return { ok: false, error: "credentials" };
  }
  if (account.status === "pending") return { ok: false, error: "pending" };
  if (account.status === "rejected") return { ok: false, error: "rejected" };
  setSession({ accountId: account.id, role: account.role });
  return { ok: true, account };
}

export function setAccountStatus(id: string, status: AccountStatus): void {
  const data = read();
  const account = data.accounts.find((a) => a.id === id);
  if (!account || account.role === "admin") return;
  account.status = status;
  write(data);
}

/** Fixe le taux de commission d'une maison. null rétablit le taux standard. */
export function setCommissionRate(id: string, rate: number | null): void {
  const data = read();
  const account = data.accounts.find((a) => a.id === id);
  if (!account) return;
  account.commissionRate = rate !== null && rate > 0 && rate < 100 ? rate : null;
  write(data);
}

/* ------------------------------------------------------------------ */
/* Commandes                                                           */
/* ------------------------------------------------------------------ */

function nextRef(count: number): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `AA-${yy}${mm}-${String(200 + count).padStart(4, "0")}`;
}

export function listOrders(accountId?: string): Order[] {
  const orders = read().orders;
  return (accountId ? orders.filter((o) => o.accountId === accountId) : orders).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function createOrder(input: {
  accountId: string;
  company: string;
  quantity: number;
  gross: number;
  commissionRate: number;
}): Order {
  const data = read();
  const commission = Math.round(((input.gross * input.commissionRate) / 100) * 100) / 100;
  const order: Order = {
    id: uid("ord"),
    ref: nextRef(data.orders.length + 1),
    accountId: input.accountId,
    company: input.company,
    quantity: input.quantity,
    gross: Math.round(input.gross * 100) / 100,
    commission,
    producerShare: Math.round((input.gross - commission) * 100) / 100,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  data.orders.push(order);
  write(data);
  return order;
}

export function setOrderStatus(id: string, status: OrderStatus): void {
  const data = read();
  const order = data.orders.find((o) => o.id === id);
  if (!order) return;
  order.status = status;
  write(data);
}

/* ------------------------------------------------------------------ */
/* Session                                                             */
/* ------------------------------------------------------------------ */

export function getSession(): Session | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    // Une session dont le compte a disparu ou été révoqué n'est plus valable.
    const account = getAccount(session.accountId);
    if (!account || account.status !== "approved") return null;
    return session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent("alarifa:store"));
}

export function clearSession(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent("alarifa:store"));
}

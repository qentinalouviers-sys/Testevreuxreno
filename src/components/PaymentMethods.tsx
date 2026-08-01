"use client";

import { useState } from "react";
import { CreditCard, Landmark, Bitcoin, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

export type PaymentMethodId = "card" | "transfer" | "crypto";

const ICONS: Record<PaymentMethodId, LucideIcon> = {
  card: CreditCard,
  transfer: Landmark,
  crypto: Bitcoin,
};

/**
 * Sélecteur de moyen de paiement.
 * Les trois modes sont pleinement cliquables et sélectionnables, mais aucun
 * tunnel n'est branché derrière : la validation ouvre la pop-up « en cours de
 * développement » gérée par le parent.
 */
export function PaymentMethods({
  value,
  onChange,
  onPick,
}: {
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
  /** Appelé en plus de onChange — utilisé pour ouvrir la pop-up au clic. */
  onPick?: (id: PaymentMethodId) => void;
}) {
  const { t } = useLocale();

  const methods: { id: PaymentMethodId; name: string; note: string }[] = [
    { id: "card", ...t.checkout.payment.card },
    { id: "transfer", ...t.checkout.payment.transfer },
    { id: "crypto", ...t.checkout.payment.crypto },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {methods.map((method) => {
        const Icon = ICONS[method.id];
        const active = value === method.id;
        return (
          <button
            key={method.id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              onChange(method.id);
              onPick?.(method.id);
            }}
            className={cn(
              "group relative flex h-full flex-col items-start gap-3 border p-5 text-start",
              "transition-all duration-500",
              active
                ? "border-gold-400/70 bg-gold-500/[0.08]"
                : "border-gold-500/18 bg-ink-900/50 hover:border-gold-500/45 hover:bg-ink-850",
            )}
          >
            <span className="flex w-full items-start justify-between gap-3">
              <Icon
                className={cn(
                  "size-6 transition-colors duration-500",
                  active ? "text-gold-200" : "text-gold-500/80 group-hover:text-gold-300",
                )}
                strokeWidth={1.25}
              />
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                  active ? "border-gold-300 bg-gold-400" : "border-gold-500/35",
                )}
              >
                {active && <Check className="size-2.5 text-ink-950" strokeWidth={3} />}
              </span>
            </span>

            <span className="block">
              <span className="block text-sm text-cream">{method.name}</span>
              <span className="mt-1 block text-[0.7rem] leading-relaxed text-cream-mute">
                {method.note}
              </span>
            </span>

            {/* `mt-auto` aligne les badges en pied de carte même quand
                une note passe sur deux lignes. */}
            <span className="mt-auto inline-block border border-gold-500/25 px-2 py-0.5 pt-1 text-[0.55rem] uppercase tracking-[0.2em] text-gold-400/80">
              {t.payment.soon}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Variante vitrine, sans état, pour la page d'accueil. */
export function PaymentMethodsShowcase({ onPick }: { onPick: () => void }) {
  const [value, setValue] = useState<PaymentMethodId | null>(null);
  return (
    <PaymentMethods
      value={value}
      onChange={setValue}
      onPick={() => onPick()}
    />
  );
}

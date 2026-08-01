import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** `outlineDark` est réservé aux blocs sombres (hero, bandeaux inversés). */
type Variant = "gold" | "outline" | "outlineDark" | "ghost" | "ink";
type Size = "md" | "lg";

const BASE =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden " +
  "font-sans uppercase tracking-[0.18em] transition-all duration-500 " +
  "disabled:pointer-events-none disabled:opacity-40 rounded-[2px] text-center";

const SIZES: Record<Size, string> = {
  md: "px-6 py-3 text-[0.68rem]",
  lg: "px-8 py-4 text-[0.72rem]",
};

const VARIANTS: Record<Variant, string> = {
  // Or plein, texte encre : lisible aussi bien sur papier que sur fond sombre.
  gold:
    "bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 bg-[length:200%_100%] " +
    "text-ink font-medium shadow-[0_10px_28px_-14px_rgba(166,127,47,0.85)] " +
    "hover:bg-[position:100%_0] hover:shadow-[0_14px_34px_-12px_rgba(166,127,47,0.95)]",
  ink:
    "bg-ink text-paper font-medium hover:bg-noir-3",
  outline:
    "border border-ink/25 text-ink hover:border-gold-600/70 hover:text-gold-700 " +
    "hover:bg-gold-500/[0.08]",
  outlineDark:
    "border border-gold-500/45 text-gold-200 hover:border-gold-300/80 hover:text-gold-100 " +
    "hover:bg-gold-500/[0.12]",
  ghost: "text-ink-soft hover:text-gold-700",
};

/** Reflet balayant, comme la lumière sur un filet doré gravé. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
                 from-transparent via-white/25 to-transparent transition-transform
                 duration-[900ms] ease-out group-hover:translate-x-full"
    />
  );
}

export function Button({
  children,
  variant = "gold",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <button className={cn(BASE, SIZES[size], VARIANTS[variant], className)} {...props}>
      {(variant === "gold" || variant === "ink") && <Sheen />}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "gold",
  size = "md",
  className,
  external = false,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  external?: boolean;
}) {
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);
  const inner = (
    <>
      {(variant === "gold" || variant === "ink") && <Sheen />}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {inner}
    </Link>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/** Losange doré : le motif repris du bandeau gravé sur le bidon. */
export function Lozenge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-1.5 rotate-45 bg-gold-400/80", className)}
    />
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-3", className)}>
      <Lozenge />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="text-balance text-3xl leading-[1.08] sm:text-4xl md:text-[3.1rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <div className={cn("h-px w-24 rule-gold", centered && "mx-auto")} />
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "text-pretty text-[0.95rem] leading-relaxed text-ink-mute",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

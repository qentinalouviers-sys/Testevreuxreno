import { cn } from "@/lib/cn";

/** Rosace inspirée du médaillon central du bidon (8 pétales, cœur rubis). */
export function Rosette({ className }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 48 48" className={cn("size-6", className)} aria-hidden focusable="false">
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="24" cy="24" r="18.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <g opacity="0.95">
        {petals.map((deg) => (
          <ellipse
            key={deg}
            cx="24"
            cy="12.5"
            rx="3.1"
            ry="7.4"
            fill="currentColor"
            opacity="0.62"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="3.4" fill="var(--color-ruby-500)" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Rosette className="size-7 shrink-0 text-gold-600 transition-transform duration-[1.2s] group-hover:rotate-45" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-normal tracking-[0.2em] text-gold-gradient">
          AL ARIFA
        </span>
        {showTagline && (
          <span className="mt-1 font-sans text-[0.52rem] uppercase tracking-[0.32em] text-ink-mute">
            Sélection Héritage
          </span>
        )}
      </span>
    </span>
  );
}

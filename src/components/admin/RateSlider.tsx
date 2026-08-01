"use client";

import { cn } from "@/lib/cn";

/**
 * Jauge de réglage d'un taux, en pourcentage.
 *
 * Le curseur natif est stylé plutôt que réimplémenté : on conserve
 * gratuitement le clavier, le tactile et les lecteurs d'écran, là où un
 * curseur maison les casse presque toujours.
 */
export function RateSlider({
  value,
  onChange,
  min = 0,
  max = 60,
  label,
  hint,
  tone = "gold",
  id,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  hint?: string;
  tone?: "gold" | "olive";
  id: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  const accent = tone === "olive" ? "var(--color-olive-600)" : "var(--color-gold-500)";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="text-[0.6rem] uppercase tracking-[0.2em] text-ink-mute"
        >
          {label}
        </label>
        <span
          className={cn(
            "font-display text-2xl tabular-nums",
            tone === "olive" ? "text-olive-600" : "text-gold-700",
          )}
        >
          {value} %
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none
                   focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2
                   [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-grab
                   [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2
                   [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--accent)]
                   [&::-moz-range-thumb]:shadow-md
                   [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-grab
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                   [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow-md"
        style={
          {
            "--accent": accent,
            background: `linear-gradient(to right, ${accent} 0%, ${accent} ${percent}%, color-mix(in oklab, var(--color-ink) 12%, transparent) ${percent}%, color-mix(in oklab, var(--color-ink) 12%, transparent) 100%)`,
          } as React.CSSProperties
        }
      />

      {hint && <p className="mt-2 text-[0.66rem] text-ink-mute">{hint}</p>}
    </div>
  );
}

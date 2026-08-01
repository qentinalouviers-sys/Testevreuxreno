"use client";

import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full border border-gold-500/22 bg-ink-900/55 px-4 py-3 text-sm text-cream " +
  "placeholder:text-cream-mute/55 transition-colors duration-400 " +
  "focus:border-gold-400/70 focus:bg-ink-900 focus:outline-none";

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.6rem] uppercase tracking-[0.2em] text-cream-mute"
    >
      {children}
      {required && <span className="ms-1 text-gold-500">*</span>}
    </label>
  );
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-ruby-500">{children}</p>;
}

export function Input({
  label,
  error,
  className,
  id,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; id: string }) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        className={cn(CONTROL, error && "border-ruby-500/60")}
        {...props}
      />
      <FieldError>{error}</FieldError>
    </div>
  );
}

export function Textarea({
  label,
  error,
  className,
  id,
  required,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; id: string }) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        required={required}
        aria-invalid={!!error}
        className={cn(CONTROL, "min-h-32 resize-y", error && "border-ruby-500/60")}
        {...props}
      />
      <FieldError>{error}</FieldError>
    </div>
  );
}

export function Select({
  label,
  error,
  className,
  id,
  required,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {/* Chevron positionné en logique start/end pour rester correct en RTL. */}
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={!!error}
          className={cn(
            CONTROL,
            "appearance-none pe-11 [&>option]:bg-ink-900",
            error && "border-ruby-500/60",
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute end-4 top-1/2 size-3.5 -translate-y-1/2 text-gold-500"
          strokeWidth={1.5}
        />
      </div>
      <FieldError>{error}</FieldError>
    </div>
  );
}

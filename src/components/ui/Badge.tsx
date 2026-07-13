import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-forest shadow-sm ring-1 ring-forest/10 backdrop-blur",
        className
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 text-energy" /> : null}
      {children}
    </span>
  );
}

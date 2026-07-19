import { cn } from "@/lib/utils";

export function Kicker({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-graphite", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      {children}
    </span>
  );
}

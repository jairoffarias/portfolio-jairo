import { Service } from "@/lib/content/types";
import { Reveal } from "@/components/animations/reveal";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Reveal delay={index * 0.06} className="border-t border-stone py-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-2xl text-ink">{service.title}</p>
        <span className="text-sm text-graphite">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="mt-3 max-w-lg text-graphite">{service.description}</p>
    </Reveal>
  );
}

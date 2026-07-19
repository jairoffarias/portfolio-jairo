import { Reveal } from "@/components/animations/reveal";

export function ServiceListBlockView({ block }: { block: { items: { id: string; title: string; description?: string }[] } }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {block.items.map((service, i) => (
        <Reveal key={service.id} delay={i * 0.06} className="border-t border-stone pt-4">
          <p className="font-medium text-ink">{service.title}</p>
          {service.description && <p className="mt-1 text-sm text-graphite">{service.description}</p>}
        </Reveal>
      ))}
    </div>
  );
}

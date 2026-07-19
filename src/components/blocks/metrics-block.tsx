import { Reveal } from "@/components/animations/reveal";

export function MetricsBlockView({ block }: { block: { items: { label: string; value: string }[] } }) {
  return (
    <div className="grid grid-cols-2 gap-8 border-y border-stone py-10 sm:grid-cols-4">
      {block.items.map((item, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <p className="font-display text-4xl text-ink">{item.value}</p>
          <p className="mt-1 text-sm text-graphite">{item.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

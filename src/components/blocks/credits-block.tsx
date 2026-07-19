import { Reveal } from "@/components/animations/reveal";

export function CreditsBlockView({ block }: { block: { items: { role: string; name: string }[] } }) {
  return (
    <Reveal>
      <dl className="grid gap-4 sm:grid-cols-2">
        {block.items.map((item, i) => (
          <div key={i} className="flex items-baseline justify-between border-b border-stone pb-2">
            <dt className="text-sm text-graphite">{item.role}</dt>
            <dd className="text-sm font-medium text-ink">{item.name}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

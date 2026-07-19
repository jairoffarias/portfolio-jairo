import { ClientRef } from "@/lib/content/types";

export function ClientMarquee({ clients }: { clients: ClientRef[] }) {
  const loop = [...clients, ...clients];
  return (
    <div className="scrollbar-none overflow-hidden border-y border-stone py-8">
      <div className="flex w-max animate-marquee gap-16">
        {loop.map((client, i) => (
          <span key={`${client.id}-${i}`} className="shrink-0 whitespace-nowrap font-display text-2xl text-graphite/60">
            {client.name}
          </span>
        ))}
      </div>
    </div>
  );
}

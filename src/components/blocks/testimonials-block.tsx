import { Reveal } from "@/components/animations/reveal";

export function TestimonialsBlockView({ block }: { block: { items: { id: string; quote: string; author: string; role?: string }[] } }) {
  if (!block.items?.length) return null;
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {block.items.map((t) => (
        <Reveal key={t.id} className="rounded-2xl border border-stone p-6">
          <p className="font-display text-xl italic text-ink text-balance">&ldquo;{t.quote}&rdquo;</p>
          <p className="mt-4 text-sm text-graphite">{t.author}{t.role ? ` — ${t.role}` : ""}</p>
        </Reveal>
      ))}
    </div>
  );
}

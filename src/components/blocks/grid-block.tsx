import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

export function GridBlockView({ block }: { block: { items: { image: { url: string; alt?: string }; title?: string }[]; columns?: 2 | 3 | 4 } }) {
  const cols = block.columns || 3;
  return (
    <div className={cn("grid gap-4", cols === 2 && "sm:grid-cols-2", cols === 3 && "sm:grid-cols-3", cols === 4 && "sm:grid-cols-2 lg:grid-cols-4")}>
      {block.items.map((item, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-stone">
            <Image src={item.image.url} alt={item.image.alt || item.title || ""} fill sizes="33vw" className="object-cover" />
          </div>
          {item.title && <p className="mt-2 text-sm text-graphite">{item.title}</p>}
        </Reveal>
      ))}
    </div>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";

export function HeroBlock({ block }: { block: { title: string; subtitle?: string; media?: { url: string; alt?: string } } }) {
  return (
    <div className="mb-4">
      <Reveal>
        <h2 className="font-display text-display-3 text-ink text-balance">{block.title}</h2>
        {block.subtitle && <p className="mt-4 max-w-2xl text-lg text-graphite">{block.subtitle}</p>}
      </Reveal>
      {block.media && (
        <Reveal delay={0.15} className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone">
          <Image src={block.media.url} alt={block.media.alt || block.title} fill sizes="100vw" className="object-cover" priority />
        </Reveal>
      )}
    </div>
  );
}

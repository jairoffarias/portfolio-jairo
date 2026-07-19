import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

export function ImageBlockView({ block }: { block: { image: { url: string; alt?: string }; caption?: string; fullBleed?: boolean } }) {
  return (
    <Reveal>
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone", block.fullBleed && "rounded-none")}>
        <Image src={block.image.url} alt={block.image.alt || block.caption || ""} fill sizes="100vw" className="object-cover" />
      </div>
      {block.caption && <p className="mt-3 text-sm text-graphite">{block.caption}</p>}
    </Reveal>
  );
}

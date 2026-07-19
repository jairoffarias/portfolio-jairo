import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";

export function GalleryBlockView({ block }: { block: { images: { url: string; alt?: string }[] } }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {block.images.map((img, i) => (
        <Reveal key={i} delay={i * 0.08} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone">
          <Image src={img.url} alt={img.alt || ""} fill sizes="50vw" className="object-cover" />
        </Reveal>
      ))}
    </div>
  );
}

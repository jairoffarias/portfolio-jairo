import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";

export function MockupsBlockView({ block }: { block: { images: { url: string; alt?: string }[] } }) {
  return (
    <Reveal className="grid gap-6 sm:grid-cols-2">
      {block.images.map((img, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-stone bg-white p-3 shadow-sm">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-stone">
            <Image src={img.url} alt={img.alt || ""} fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      ))}
    </Reveal>
  );
}

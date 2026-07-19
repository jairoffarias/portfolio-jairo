"use client";
import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";

export function CarouselBlockView({ block }: { block: { images: { url: string; alt?: string }[] } }) {
  return (
    <Reveal>
      <div className="scrollbar-none -mx-6 flex gap-4 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        {block.images.map((img, i) => (
          <div key={i} className="relative h-80 w-[70vw] shrink-0 overflow-hidden rounded-2xl bg-stone sm:w-[420px]">
            <Image src={img.url} alt={img.alt || ""} fill sizes="420px" className="object-cover" />
          </div>
        ))}
      </div>
    </Reveal>
  );
}

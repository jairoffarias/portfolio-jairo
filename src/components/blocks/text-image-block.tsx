import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { RichText } from "./rich-text";
import { cn } from "@/lib/utils";

export function TextImageBlockView({ block }: { block: { content: unknown; image: { url: string; alt?: string }; imagePosition: "left" | "right" } }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <Reveal className={cn(block.imagePosition === "left" && "lg:order-2")}>
        <RichText value={block.content} />
      </Reveal>
      <Reveal delay={0.1} className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone", block.imagePosition === "left" && "lg:order-1")}>
        <Image src={block.image.url} alt={block.image.alt || ""} fill sizes="50vw" className="object-cover" />
      </Reveal>
    </div>
  );
}

import { Reveal } from "@/components/animations/reveal";
import { RichText } from "./rich-text";
import { cn } from "@/lib/utils";

export function TextBlock({ block }: { block: { content: unknown; width?: "narrow" | "wide" } }) {
  return (
    <Reveal className={cn("mx-auto", block.width === "wide" ? "max-w-3xl" : "max-w-prose")}>
      <RichText value={block.content} />
    </Reveal>
  );
}

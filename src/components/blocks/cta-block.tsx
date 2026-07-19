import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

export function CtaBlockView({ block }: { block: { title: string; buttonLabel: string; buttonHref: string } }) {
  return (
    <Reveal className="flex flex-col items-start gap-6 rounded-2xl bg-ink px-8 py-12 text-paper sm:flex-row sm:items-center sm:justify-between">
      <h3 className="font-display text-3xl text-balance">{block.title}</h3>
      <Button href={block.buttonHref} variant="outline" className="shrink-0 !border-paper !text-paper hover:!bg-paper hover:!text-ink">
        {block.buttonLabel}
      </Button>
    </Reveal>
  );
}

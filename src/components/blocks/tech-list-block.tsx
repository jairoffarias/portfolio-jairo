import { Reveal } from "@/components/animations/reveal";

export function TechListBlockView({ block }: { block: { items: { id: string; name: string }[] } }) {
  return (
    <Reveal className="flex flex-wrap gap-2">
      {block.items.map((tech) => (
        <span key={tech.id} className="rounded-full border border-stone px-4 py-2 text-sm text-ink">
          {tech.name}
        </span>
      ))}
    </Reveal>
  );
}

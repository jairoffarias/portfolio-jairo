import { Reveal } from "@/components/animations/reveal";

export function VideoBlockView({ block }: { block: { url: string; caption?: string } }) {
  const isEmbed = /youtube|vimeo/.test(block.url);
  return (
    <Reveal>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
        {isEmbed ? (
          <iframe src={block.url} className="h-full w-full" allow="autoplay; fullscreen" title="Vídeo do projeto" />
        ) : (
          <video src={block.url} controls className="h-full w-full object-cover" />
        )}
      </div>
      {block.caption && <p className="mt-3 text-sm text-graphite">{block.caption}</p>}
    </Reveal>
  );
}

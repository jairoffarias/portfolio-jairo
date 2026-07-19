import { Block } from "@/lib/content/types";
import { HeroBlock } from "./hero-block";
import { TextBlock } from "./text-block";
import { ImageBlockView } from "./image-block";
import { VideoBlockView } from "./video-block";
import { GalleryBlockView } from "./gallery-block";
import { GridBlockView } from "./grid-block";
import { CarouselBlockView } from "./carousel-block";
import { TextImageBlockView } from "./text-image-block";
import { MetricsBlockView } from "./metrics-block";
import { CreditsBlockView } from "./credits-block";
import { CtaBlockView } from "./cta-block";
import { TechListBlockView } from "./tech-list-block";
import { ServiceListBlockView } from "./service-list-block";
import { TestimonialsBlockView } from "./testimonials-block";
import { MockupsBlockView } from "./mockups-block";
import { SpacerBlockView } from "./spacer-block";
import { DividerBlockView } from "./divider-block";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {blocks.map((block) => {
        switch (block._type) {
          case "hero":
            return <HeroBlock key={block._key} block={block} />;
          case "text":
            return <TextBlock key={block._key} block={block} />;
          case "image":
            return <ImageBlockView key={block._key} block={block} />;
          case "video":
            return <VideoBlockView key={block._key} block={block} />;
          case "gallery":
            return <GalleryBlockView key={block._key} block={block} />;
          case "grid":
            return <GridBlockView key={block._key} block={block} />;
          case "carousel":
            return <CarouselBlockView key={block._key} block={block} />;
          case "textImage":
            return <TextImageBlockView key={block._key} block={block} />;
          case "metrics":
            return <MetricsBlockView key={block._key} block={block} />;
          case "credits":
            return <CreditsBlockView key={block._key} block={block} />;
          case "cta":
            return <CtaBlockView key={block._key} block={block} />;
          case "techList":
            return <TechListBlockView key={block._key} block={block} />;
          case "serviceList":
            return <ServiceListBlockView key={block._key} block={block} />;
          case "testimonials":
            return <TestimonialsBlockView key={block._key} block={block} />;
          case "mockups":
            return <MockupsBlockView key={block._key} block={block} />;
          case "spacer":
            return <SpacerBlockView key={block._key} block={block} />;
          case "divider":
            return <DividerBlockView key={block._key} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

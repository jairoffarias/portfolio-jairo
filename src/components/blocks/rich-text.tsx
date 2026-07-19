import { PortableText, PortableTextComponents } from "@portabletext/react";
import { RichText as RichTextType } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    h3: ({ children }) => <h3 className="mb-3 mt-6 font-display text-2xl text-ink">{children}</h3>,
  },
};

export function RichText({ value, className }: { value: RichTextType | unknown; className?: string }) {
  if (!value) return null;

  if (Array.isArray(value) && typeof value[0] === "string") {
    return (
      <div className={cn("space-y-4 text-base leading-relaxed text-graphite", className)}>
        {(value as string[]).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className={cn("text-base leading-relaxed text-graphite", className)}>
        <PortableText value={value as any} components={ptComponents} />
      </div>
    );
  }

  return null;
}

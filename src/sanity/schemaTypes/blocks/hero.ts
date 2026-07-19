import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  icon: () => "🎬",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({ name: "media", title: "Imagem/Vídeo de capa", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Hero — ${title || "sem título"}` }) },
});

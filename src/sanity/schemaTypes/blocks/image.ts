import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageBlock",
  title: "Imagem",
  type: "object",
  icon: () => "🖼️",
  fields: [
    defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true } }),
    defineField({ name: "caption", title: "Legenda", type: "string" }),
    defineField({ name: "fullBleed", title: "Tela cheia", type: "boolean", initialValue: false }),
  ],
  preview: { select: { media: "image", subtitle: "caption" }, prepare: ({ media, subtitle }) => ({ title: "Imagem", media, subtitle }) },
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "textImageBlock",
  title: "Texto + Imagem",
  type: "object",
  icon: () => "🗞️",
  fields: [
    defineField({ name: "content", title: "Conteúdo", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true } }),
    defineField({ name: "imagePosition", title: "Posição da imagem", type: "string", options: { list: ["left", "right"] }, initialValue: "right" }),
  ],
  preview: { prepare: () => ({ title: "Texto + Imagem" }) },
});

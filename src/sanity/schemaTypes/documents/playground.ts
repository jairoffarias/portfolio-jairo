import { defineField, defineType } from "sanity";

export default defineType({
  name: "playground",
  title: "Playground",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Categoria", type: "string" }),
    defineField({ name: "year", title: "Ano", type: "number" }),
    defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true } }),
    defineField({ name: "link", title: "Link externo", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

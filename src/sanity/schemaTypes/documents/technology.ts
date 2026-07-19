import { defineField, defineType } from "sanity";

export default defineType({
  name: "technology",
  title: "Tecnologia",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Categoria", type: "string" }),
    defineField({ name: "orderRank", title: "Ordem", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "category" } },
});

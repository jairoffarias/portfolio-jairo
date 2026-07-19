import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Serviço",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Ícone (nome lucide)", type: "string" }),
    defineField({ name: "orderRank", title: "Ordem", type: "number" }),
  ],
  preview: { select: { title: "title" } },
});

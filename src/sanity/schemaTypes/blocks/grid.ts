import { defineField, defineType } from "sanity";

export default defineType({
  name: "gridBlock",
  title: "Grid",
  type: "object",
  icon: () => "▦",
  fields: [
    defineField({
      name: "items",
      title: "Itens",
      type: "array",
      of: [{ type: "object", fields: [{ name: "image", type: "image", title: "Imagem" }, { name: "title", type: "string", title: "Título" }] }],
    }),
    defineField({ name: "columns", title: "Colunas", type: "number", options: { list: [2, 3, 4] }, initialValue: 3 }),
  ],
  preview: { prepare: () => ({ title: "Grid" }) },
});

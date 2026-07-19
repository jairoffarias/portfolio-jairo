import { defineField, defineType } from "sanity";

export default defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nome do menu", type: "string" }),
    defineField({
      name: "items",
      title: "Itens",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string", title: "Rótulo" }, { name: "href", type: "string", title: "Link" }] }],
    }),
  ],
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Cliente",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "url", title: "Site", type: "url" }),
    defineField({ name: "orderRank", title: "Ordem", type: "number" }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

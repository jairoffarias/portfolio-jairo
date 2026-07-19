import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Depoimento", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "author", title: "Autor", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "company", title: "Empresa", type: "string" }),
    defineField({ name: "avatar", title: "Foto", type: "image" }),
  ],
  preview: { select: { title: "author", subtitle: "company" } },
});

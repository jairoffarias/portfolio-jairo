import { defineField, defineType } from "sanity";

export default defineType({
  name: "creditItem",
  title: "Crédito",
  type: "object",
  fields: [
    defineField({ name: "role", title: "Função", type: "string" }),
    defineField({ name: "name", title: "Nome", type: "string" }),
  ],
});

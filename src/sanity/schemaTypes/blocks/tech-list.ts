import { defineField, defineType } from "sanity";

export default defineType({
  name: "techListBlock",
  title: "Lista de tecnologias",
  type: "object",
  icon: () => "🧩",
  fields: [defineField({ name: "items", title: "Tecnologias", type: "array", of: [{ type: "reference", to: [{ type: "technology" }] }] })],
  preview: { prepare: () => ({ title: "Lista de tecnologias" }) },
});

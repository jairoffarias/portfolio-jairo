import { defineField, defineType } from "sanity";

export default defineType({
  name: "textBlock",
  title: "Texto",
  type: "object",
  icon: () => "📝",
  fields: [
    defineField({ name: "content", title: "Conteúdo", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "width", title: "Largura", type: "string", options: { list: ["narrow", "wide"] }, initialValue: "narrow" }),
  ],
  preview: { prepare: () => ({ title: "Bloco de texto" }) },
});

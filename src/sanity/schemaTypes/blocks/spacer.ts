import { defineField, defineType } from "sanity";

export default defineType({
  name: "spacerBlock",
  title: "Espaçador",
  type: "object",
  icon: () => "↕️",
  fields: [defineField({ name: "size", title: "Tamanho", type: "string", options: { list: ["sm", "md", "lg"] }, initialValue: "md" })],
  preview: { prepare: () => ({ title: "Espaçador" }) },
});

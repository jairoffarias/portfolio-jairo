import { defineField, defineType } from "sanity";

export default defineType({
  name: "metricsBlock",
  title: "Métricas",
  type: "object",
  icon: () => "📊",
  fields: [
    defineField({
      name: "items",
      title: "Métricas",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string", title: "Rótulo" }, { name: "value", type: "string", title: "Valor" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Métricas" }) },
});

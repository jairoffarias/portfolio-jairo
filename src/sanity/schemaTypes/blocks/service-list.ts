import { defineField, defineType } from "sanity";

export default defineType({
  name: "serviceListBlock",
  title: "Lista de serviços",
  type: "object",
  icon: () => "🧭",
  fields: [defineField({ name: "items", title: "Serviços", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] })],
  preview: { prepare: () => ({ title: "Lista de serviços" }) },
});

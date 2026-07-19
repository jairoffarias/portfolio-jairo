import { defineField, defineType } from "sanity";

export default defineType({
  name: "creditsBlock",
  title: "Créditos",
  type: "object",
  icon: () => "🎞️",
  fields: [defineField({ name: "items", title: "Créditos", type: "array", of: [{ type: "creditItem" }] })],
  preview: { prepare: () => ({ title: "Créditos" }) },
});

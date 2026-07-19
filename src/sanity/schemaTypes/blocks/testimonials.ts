import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialsBlock",
  title: "Depoimentos",
  type: "object",
  icon: () => "💬",
  fields: [defineField({ name: "items", title: "Depoimentos", type: "array", of: [{ type: "reference", to: [{ type: "testimonial" }] }] })],
  preview: { prepare: () => ({ title: "Depoimentos" }) },
});

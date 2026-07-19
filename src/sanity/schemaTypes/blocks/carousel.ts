import { defineField, defineType } from "sanity";

export default defineType({
  name: "carouselBlock",
  title: "Carrossel",
  type: "object",
  icon: () => "🎠",
  fields: [defineField({ name: "images", title: "Imagens", type: "array", of: [{ type: "image" }] })],
  preview: { prepare: () => ({ title: "Carrossel" }) },
});

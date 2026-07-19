import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryBlock",
  title: "Galeria",
  type: "object",
  icon: () => "🖼️",
  fields: [defineField({ name: "images", title: "Imagens", type: "array", of: [{ type: "image", options: { hotspot: true } }] })],
  preview: { select: { images: "images" }, prepare: ({ images }) => ({ title: `Galeria (${images?.length || 0} imagens)` }) },
});

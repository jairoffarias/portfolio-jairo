import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Meta título", type: "string" }),
    defineField({ name: "description", title: "Meta descrição", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "Imagem Open Graph", type: "image" }),
    defineField({ name: "noIndex", title: "Ocultar de buscadores", type: "boolean", initialValue: false }),
  ],
});

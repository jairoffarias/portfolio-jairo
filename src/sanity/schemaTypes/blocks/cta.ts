import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaBlock",
  title: "CTA",
  type: "object",
  icon: () => "📣",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "buttonLabel", title: "Texto do botão", type: "string" }),
    defineField({ name: "buttonHref", title: "Link do botão", type: "string" }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `CTA — ${title || ""}` }) },
});

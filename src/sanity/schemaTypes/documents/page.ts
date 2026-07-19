import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Página",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "blocks",
      title: "Blocos",
      type: "array",
      of: [
        { type: "heroBlock" }, { type: "textBlock" }, { type: "imageBlock" }, { type: "videoBlock" },
        { type: "galleryBlock" }, { type: "gridBlock" }, { type: "carouselBlock" }, { type: "textImageBlock" },
        { type: "metricsBlock" }, { type: "creditsBlock" }, { type: "ctaBlock" }, { type: "techListBlock" },
        { type: "serviceListBlock" }, { type: "testimonialsBlock" }, { type: "mockupsBlock" },
        { type: "spacerBlock" }, { type: "dividerBlock" },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo" },
    { name: "builder", title: "Blocos" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required(), group: "content" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required(), group: "content" }),
    defineField({ name: "category", title: "Categoria", type: "string", group: "content" }),
    defineField({ name: "year", title: "Ano", type: "number", group: "content" }),
    defineField({ name: "client", title: "Cliente", type: "reference", to: [{ type: "client" }], group: "content" }),
    defineField({ name: "cover", title: "Capa", type: "image", options: { hotspot: true }, group: "content" }),
    defineField({ name: "excerpt", title: "Resumo curto", type: "text", rows: 3, group: "content" }),
    defineField({ name: "featured", title: "Destaque na Home", type: "boolean", initialValue: false, group: "content" }),
    defineField({ name: "orderRank", title: "Ordem", type: "number", group: "content" }),
    defineField({ name: "services", title: "Serviços", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }], group: "content" }),
    defineField({ name: "technologies", title: "Tecnologias", type: "array", of: [{ type: "reference", to: [{ type: "technology" }] }], group: "content" }),
    defineField({
      name: "relatedProjects",
      title: "Projetos relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      group: "content",
    }),
    defineField({
      name: "blocks",
      title: "Blocos do case",
      type: "array",
      group: "builder",
      of: [
        { type: "heroBlock" }, { type: "textBlock" }, { type: "imageBlock" }, { type: "videoBlock" },
        { type: "galleryBlock" }, { type: "gridBlock" }, { type: "carouselBlock" }, { type: "textImageBlock" },
        { type: "metricsBlock" }, { type: "creditsBlock" }, { type: "ctaBlock" }, { type: "techListBlock" },
        { type: "serviceListBlock" }, { type: "testimonialsBlock" }, { type: "mockupsBlock" },
        { type: "spacerBlock" }, { type: "dividerBlock" },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
  },
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configurações Globais",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string" }),
    defineField({ name: "role", title: "Função / Posicionamento", type: "string" }),
    defineField({ name: "logoText", title: "Texto do logo", type: "string" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "phone", title: "Telefone", type: "string" }),
    defineField({ name: "location", title: "Localização", type: "string" }),
    defineField({ name: "availableForWork", title: "Disponível para novos projetos", type: "boolean", initialValue: true }),
    defineField({
      name: "socials",
      title: "Redes sociais",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string", title: "Rede" }, { name: "url", type: "url", title: "URL" }] }],
    }),
    defineField({ name: "seo", title: "SEO padrão", type: "seo" }),
  ],
});

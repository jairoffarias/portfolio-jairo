import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoBlock",
  title: "Vídeo",
  type: "object",
  icon: () => "🎥",
  fields: [
    defineField({ name: "url", title: "URL do vídeo (YouTube/Vimeo/mp4)", type: "url" }),
    defineField({ name: "poster", title: "Imagem de capa (poster)", type: "image" }),
    defineField({ name: "caption", title: "Legenda", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Vídeo" }) },
});

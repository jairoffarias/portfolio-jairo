import { defineField, defineType } from "sanity";

export default defineType({
  name: "mockupsBlock",
  title: "Mockups",
  type: "object",
  icon: () => "💻",
  fields: [
    defineField({ name: "images", title: "Imagens", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "device", title: "Dispositivo", type: "string", options: { list: ["desktop", "mobile", "browser"] }, initialValue: "browser" },
    ),
  ],
  preview: { prepare: () => ({ title: "Mockups" }) },
});

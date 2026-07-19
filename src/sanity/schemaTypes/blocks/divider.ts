import { defineType } from "sanity";

export default defineType({
  name: "dividerBlock",
  title: "Divisor",
  type: "object",
  icon: () => "➖",
  fields: [{ name: "note", title: "Nota interna (opcional)", type: "string", hidden: true }],
  preview: { prepare: () => ({ title: "Divisor" }) },
});

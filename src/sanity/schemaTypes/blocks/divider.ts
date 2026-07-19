import { defineType } from "sanity";

export default defineType({
  name: "dividerBlock",
  title: "Divisor",
  type: "object",
  icon: () => "➖",
  fields: [{ name: "_placeholder", type: "boolean", hidden: true }],
  preview: { prepare: () => ({ title: "Divisor" }) },
});

import { createClient } from "next-sanity";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01",
};

export const sanityClient = createClient({
  ...sanityConfig,
  projectId: sanityConfig.projectId || "placeholder",
  useCdn: true,
  perspective: "published",
});

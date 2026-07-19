/**
 * Seed script — pushes the local placeholder content (src/data/seed/*)
 * into your real Sanity dataset once NEXT_PUBLIC_SANITY_PROJECT_ID and
 * SANITY_API_WRITE_TOKEN are set in .env.local.
 *
 * Run with: npm run seed
 */
import "dotenv/config";
import { createClient } from "@sanity/client";
import { services } from "../src/data/seed/services";
import { technologies } from "../src/data/seed/technologies";
import { clients } from "../src/data/seed/clients";
import { projects } from "../src/data/seed/projects";
import { playgroundItems } from "../src/data/seed/playground";
import { siteSettings } from "../src/data/seed/settings";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token || projectId === "your-project-id") {
  console.error(
    "\n[seed] Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n" +
      "Create a Sanity project (https://www.sanity.io/manage), generate a write token,\n" +
      "and set both values in .env.local before running `npm run seed`.\n"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-06-01", token, useCdn: false });

const uploadedImages = new Map<string, string>();

async function uploadImage(url: string) {
  if (uploadedImages.has(url)) return uploadedImages.get(url)!;
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: url.split("/").pop() });
  uploadedImages.set(url, asset._id);
  return asset._id;
}

async function imageField(url?: string) {
  if (!url) return undefined;
  const assetId = await uploadImage(url);
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

async function run() {
  console.log(`[seed] Seeding dataset "${dataset}" on project ${projectId}...`);

  console.log("[seed] Site settings...");
  await client.createOrReplace({ _id: "siteSettings", _type: "siteSettings", ...siteSettings });

  console.log(`[seed] ${services.length} services...`);
  for (const s of services) {
    await client.createOrReplace({ _id: `service-${s.id}`, _type: "service", title: s.title, description: s.description });
  }

  console.log(`[seed] ${technologies.length} technologies...`);
  for (const t of technologies) {
    await client.createOrReplace({ _id: `technology-${t.id}`, _type: "technology", name: t.name, category: t.category });
  }

  console.log(`[seed] ${clients.length} clients...`);
  for (const c of clients) {
    await client.createOrReplace({ _id: `client-${c.id}`, _type: "client", name: c.name });
  }

  console.log(`[seed] ${playgroundItems.length} playground items...`);
  for (const p of playgroundItems) {
    const image = await imageField(p.image.url);
    await client.createOrReplace({ _id: `playground-${p.id}`, _type: "playground", title: p.title, category: p.category, year: p.year, image });
  }

  console.log(`[seed] ${projects.length} projects (this uploads images, may take a while)...`);
  for (const project of projects) {
    const cover = await imageField(project.cover.url);
    console.log(`  - ${project.title}`);
    await client.createOrReplace({
      _id: `project-${project.id}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      category: project.category,
      year: project.year,
      cover,
      excerpt: project.excerpt,
      featured: project.featured || false,
      blocks: [], // Add blocks manually in Studio, or extend this script to map block images too.
    });
  }

  console.log("\n[seed] Done! Open /studio to review and finish editing the imported content.");
}

run().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});

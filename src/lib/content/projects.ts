import { sanityClient } from "@/lib/sanity/client";
import { projectsQuery, projectBySlugQuery } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/lib/utils";
import { projects as seedProjects } from "@/data/seed/projects";
import { Project } from "./types";

export async function getProjects(_locale: string): Promise<Project[]> {
  if (!isSanityConfigured) return seedProjects;
  try {
    const data = await sanityClient.fetch<Project[]>(projectsQuery);
    return data?.length ? data : seedProjects;
  } catch {
    return seedProjects;
  }
}

export async function getFeaturedProjects(locale: string): Promise<Project[]> {
  const all = await getProjects(locale);
  return all.filter((p) => p.featured).slice(0, 6);
}

export async function getProjectBySlug(slug: string, _locale: string): Promise<Project | null> {
  if (!isSanityConfigured) return seedProjects.find((p) => p.slug === slug) || null;
  try {
    const data = await sanityClient.fetch<Project | null>(projectBySlugQuery, { slug });
    return data || seedProjects.find((p) => p.slug === slug) || null;
  } catch {
    return seedProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getProjectCategories(locale: string): Promise<string[]> {
  const all = await getProjects(locale);
  return Array.from(new Set(all.map((p) => p.category)));
}

export async function getAdjacentProject(currentSlug: string, locale: string): Promise<Project | null> {
  const all = await getProjects(locale);
  const idx = all.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return null;
  return all[(idx + 1) % all.length];
}

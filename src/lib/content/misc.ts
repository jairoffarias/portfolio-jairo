import { sanityClient } from "@/lib/sanity/client";
import { servicesQuery, technologiesQuery, clientsQuery, testimonialsQuery, playgroundQuery } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/lib/utils";
import { services as seedServices } from "@/data/seed/services";
import { technologies as seedTechnologies } from "@/data/seed/technologies";
import { clients as seedClients } from "@/data/seed/clients";
import { playgroundItems as seedPlayground } from "@/data/seed/playground";
import { Service, Technology, ClientRef, Testimonial, PlaygroundItem } from "./types";

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) return seedServices;
  try {
    const data = await sanityClient.fetch<Service[]>(servicesQuery);
    return data?.length ? data : seedServices;
  } catch {
    return seedServices;
  }
}

export async function getTechnologies(): Promise<Technology[]> {
  if (!isSanityConfigured) return seedTechnologies;
  try {
    const data = await sanityClient.fetch<Technology[]>(technologiesQuery);
    return data?.length ? data : seedTechnologies;
  } catch {
    return seedTechnologies;
  }
}

export async function getClients(): Promise<ClientRef[]> {
  if (!isSanityConfigured) return seedClients;
  try {
    const data = await sanityClient.fetch<ClientRef[]>(clientsQuery);
    return data?.length ? data : seedClients;
  } catch {
    return seedClients;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return [];
  try {
    const data = await sanityClient.fetch<Testimonial[]>(testimonialsQuery);
    return data || [];
  } catch {
    return [];
  }
}

export async function getPlaygroundItems(): Promise<PlaygroundItem[]> {
  if (!isSanityConfigured) return seedPlayground;
  try {
    const data = await sanityClient.fetch<PlaygroundItem[]>(playgroundQuery);
    return data?.length ? data : seedPlayground;
  } catch {
    return seedPlayground;
  }
}

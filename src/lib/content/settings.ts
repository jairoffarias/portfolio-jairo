import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/lib/utils";
import { siteSettings as seedSettings } from "@/data/seed/settings";
import { SiteSettings } from "./types";

export async function getSiteSettings(_locale: string): Promise<SiteSettings> {
  if (!isSanityConfigured) return seedSettings;
  try {
    const data = await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
    return data || seedSettings;
  } catch {
    return seedSettings;
  }
}

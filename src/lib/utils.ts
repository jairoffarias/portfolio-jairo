import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale = "pt") {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale === "pt" ? "pt-BR" : locale, { day: "2-digit", month: "long", year: "numeric" });
}

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id" &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.length > 0
);

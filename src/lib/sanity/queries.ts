import groq from "groq";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, role, email, phone, location, logoText, availableForWork,
  socials[]{ label, url }
}`;

export const projectsQuery = groq`*[_type == "project"] | order(year desc, orderRank asc){
  "id": _id, "slug": slug.current, title, category, year, client,
  "cover": cover.asset->url, excerpt, featured, services, technologies
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  "id": _id, "slug": slug.current, title, category, year, client,
  "cover": cover.asset->url, excerpt, featured, services, technologies, blocks, seo
}`;

export const servicesQuery = groq`*[_type == "service"] | order(orderRank asc){ "id": _id, title, description }`;
export const technologiesQuery = groq`*[_type == "technology"] | order(orderRank asc){ "id": _id, name, category }`;
export const clientsQuery = groq`*[_type == "client"] | order(orderRank asc){ "id": _id, name, "logo": logo.asset->url }`;
export const testimonialsQuery = groq`*[_type == "testimonial"]{ "id": _id, quote, author, role, company, "avatar": avatar.asset->url }`;
export const playgroundQuery = groq`*[_type == "playground"] | order(year desc){ "id": _id, title, category, "image": image.asset->url, year, link }`;

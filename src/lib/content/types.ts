export interface ImageAsset {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface SEOData {
  title?: string;
  description?: string;
  ogImage?: ImageAsset;
}

export interface Technology {
  id: string;
  name: string;
  category?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface ClientRef {
  id: string;
  name: string;
  logo?: ImageAsset;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: ImageAsset;
}

export interface Metric {
  label: string;
  value: string;
}

export type RichText = string[];

export type Block =
  | { _key: string; _type: "hero"; title: string; subtitle?: string; media?: ImageAsset }
  | { _key: string; _type: "text"; content: RichText; width?: "narrow" | "wide" }
  | { _key: string; _type: "image"; image: ImageAsset; caption?: string; fullBleed?: boolean }
  | { _key: string; _type: "video"; url: string; poster?: ImageAsset; caption?: string }
  | { _key: string; _type: "gallery"; images: ImageAsset[] }
  | { _key: string; _type: "grid"; items: { image: ImageAsset; title?: string }[]; columns?: 2 | 3 | 4 }
  | { _key: string; _type: "carousel"; images: ImageAsset[] }
  | { _key: string; _type: "textImage"; content: RichText; image: ImageAsset; imagePosition: "left" | "right" }
  | { _key: string; _type: "metrics"; items: Metric[] }
  | { _key: string; _type: "credits"; items: Credit[] }
  | { _key: string; _type: "cta"; title: string; buttonLabel: string; buttonHref: string }
  | { _key: string; _type: "techList"; items: Technology[] }
  | { _key: string; _type: "serviceList"; items: Service[] }
  | { _key: string; _type: "testimonials"; items: Testimonial[] }
  | { _key: string; _type: "mockups"; images: ImageAsset[]; device?: "desktop" | "mobile" | "browser" }
  | { _key: string; _type: "spacer"; size: "sm" | "md" | "lg" }
  | { _key: string; _type: "divider" };

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: number;
  client?: string;
  cover: ImageAsset;
  excerpt: string;
  featured?: boolean;
  services: string[];
  technologies: string[];
  blocks: Block[];
  seo?: SEOData;
  isPlaceholder?: boolean;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  category: string;
  image: ImageAsset;
  year: number;
  link?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  role: string;
  email: string;
  phone?: string;
  location: string;
  socials: { label: string; url: string }[];
  logoText: string;
  availableForWork: boolean;
}

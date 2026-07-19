import { routing } from "@/i18n/routing";

export function getAlternates(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}${clean === "/" ? "" : clean}`]));
  return {
    canonical: languages[routing.defaultLocale],
    languages: { ...languages, "x-default": languages[routing.defaultLocale] },
  };
}

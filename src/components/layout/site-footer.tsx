import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteSettings } from "@/lib/content/types";
import { ArrowUp } from "lucide-react";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: tNav("home") },
    { href: "/work", label: tNav("work") },
    { href: "/web-development", label: tNav("webDevelopment") },
    { href: "/playground", label: tNav("playground") },
    { href: "/about", label: tNav("about") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <footer className="border-t border-stone/70 bg-paper">
      <div className="container py-16 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-medium text-ink">{settings.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-graphite">{t("description")}</p>
            {settings.availableForWork && (
              <p className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest2 text-graphite">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                Available for work
              </p>
            )}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest2 text-graphite">{t("sitemap")}</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink transition-opacity hover:opacity-60">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest2 text-graphite">{t("social")}</p>
            <ul className="mt-4 space-y-2.5">
              {settings.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.url} target="_blank" rel="noreferrer" className="text-sm text-ink transition-opacity hover:opacity-60">
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${settings.email}`} className="text-sm text-ink transition-opacity hover:opacity-60">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-stone/70 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-graphite">
            © {year} {settings.name}. {t("rights")}{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
              {t("privacy")}
            </Link>
          </p>
          <a href="#top" className="flex items-center gap-1.5 text-xs font-medium text-graphite hover:text-ink">
            {t("backToTop")} <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

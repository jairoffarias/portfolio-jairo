import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/animations/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { getSiteSettings } from "@/lib/content/settings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const settings = await getSiteSettings(locale);

  return (
    <div className="container py-16 sm:py-24">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Reveal>
            <Kicker>{t("kicker")}</Kicker>
            <h1 className="mt-4 font-display text-display-2 text-ink text-balance">{t("title")}</h1>
            <p className="mt-6 max-w-sm text-lg text-graphite">{t("subtitle")}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12">
            <p className="text-xs font-medium uppercase tracking-widest2 text-graphite">{t("directTitle")}</p>
            <a href={`mailto:${settings.email}`} className="mt-2 block font-display text-2xl text-ink hover:opacity-70">
              {settings.email}
            </a>
            {settings.phone && <p className="mt-1 text-graphite">{settings.phone}</p>}
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <p className="text-xs font-medium uppercase tracking-widest2 text-graphite">{t("socialTitle")}</p>
            <ul className="mt-3 space-y-1.5">
              {settings.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.url} target="_blank" rel="noreferrer" className="text-ink hover:opacity-70">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </Reveal>
      </div>
    </div>
  );
}

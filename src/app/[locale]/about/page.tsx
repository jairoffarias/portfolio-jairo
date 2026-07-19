import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { getServices, getTechnologies } from "@/lib/content/misc";
import { getSiteSettings } from "@/lib/content/settings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const [settings, services, technologies] = await Promise.all([getSiteSettings(locale), getServices(), getTechnologies()]);

  return (
    <div>
      <div className="container py-16 sm:py-24">
        <Reveal>
          <Kicker>{t("kicker")}</Kicker>
          <h1 className="mt-4 font-display text-display-1 text-ink text-balance">{t("title")}</h1>
          <p className="mt-4 max-w-xl text-lg text-graphite">{tCommon("role")}</p>
          <p className="mt-2 text-sm text-graphite">{tCommon("basedIn")}</p>
        </Reveal>
      </div>

      <div className="border-t border-stone bg-white py-20 sm:py-28">
        <div className="container">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-display-3 text-ink text-balance">{t("introTitle")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-graphite">
              Este é um texto placeholder sobre a trajetória profissional, valores e forma de trabalhar — editável
              via Sanity Studio. Substitua por uma narrativa real sobre experiência, formação e visão de trabalho.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-graphite">
              Um segundo parágrafo placeholder pode detalhar a combinação entre pensamento estratégico, direção
              criativa e domínio técnico que caracteriza a atuação profissional.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container py-20 sm:py-28">
        <Reveal>
          <h2 className="font-display text-display-3 text-ink">{t("servicesTitle")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05} className="border-t border-stone py-5">
              <p className="font-medium text-ink">{service.title}</p>
              <p className="mt-1 text-sm text-graphite">{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-t border-stone bg-white py-20 sm:py-28">
        <div className="container">
          <Reveal>
            <h2 className="font-display text-display-3 text-ink">{t("technologiesTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech.id} className="rounded-full border border-stone px-4 py-2 text-sm text-ink">
                {tech.name}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="container py-20 text-center sm:py-28">
        <Reveal>
          <Button href="/contact">{tNav("startProject")}</Button>
        </Reveal>
      </div>
    </div>
  );
}

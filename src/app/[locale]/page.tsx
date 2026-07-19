import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Button } from "@/components/ui/button";
import { HeroTitle } from "@/components/animations/hero-title";
import { Reveal } from "@/components/animations/reveal";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ServiceCard } from "@/components/sections/service-card";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getServices, getClients, getTestimonials } from "@/lib/content/misc";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const [featuredProjects, services, clients, testimonials] = await Promise.all([
    getFeaturedProjects(locale),
    getServices(),
    getClients(),
    getTestimonials(),
  ]);

  return (
    <div>
      <section className="container pb-20 pt-16 sm:pb-28 sm:pt-24">
        <Kicker>{t("heroKicker")}</Kicker>
        <HeroTitle text={t("heroTitle")} className="mt-6 max-w-5xl font-display text-display-1 text-ink text-balance" />
        <Reveal delay={0.5} className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-lg text-graphite">{t("heroSubtitle")}</p>
          <div className="flex shrink-0 gap-3">
            <Button href="/work">{t("heroCta")}</Button>
            <Button href="/contact" variant="outline">{t("heroCtaSecondary")}</Button>
          </div>
        </Reveal>
      </section>

      <ClientMarquee clients={clients} />

      <section className="container py-20 sm:py-28">
        <Reveal>
          <Kicker>{t("servicesKicker")}</Kicker>
          <h2 className="mt-4 font-display text-display-3 text-ink">{t("servicesTitle")}</h2>
        </Reveal>
        <div className="mt-10">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-stone bg-white py-20 sm:py-28">
        <div className="container">
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Kicker>{t("workKicker")}</Kicker>
              <h2 className="mt-4 font-display text-display-3 text-ink">{t("workTitle")}</h2>
            </div>
            <Button href="/work" variant="link">{t("workCta")}</Button>
          </Reveal>
          <div className="mt-12">
            <ProjectGrid projects={featuredProjects} />
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="container py-20 sm:py-28">
          <Reveal>
            <Kicker>{t("testimonialsKicker")}</Kicker>
            <h2 className="mt-4 font-display text-display-3 text-ink">{t("testimonialsTitle")}</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {testimonials.map((item) => (
              <Reveal key={item.id} className="rounded-2xl border border-stone p-8">
                <p className="font-display text-xl italic text-ink text-balance">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-4 text-sm text-graphite">{item.author}{item.role ? ` — ${item.role}` : ""}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-stone bg-ink py-24 text-paper sm:py-32">
        <div className="container text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-2 text-balance">{t("ctaTitle")}</h2>
            <p className="mx-auto mt-6 max-w-lg text-white/70">{t("ctaSubtitle")}</p>
            <Button href="/contact" className="mt-10 !bg-paper !text-ink hover:!bg-white/90">{t("ctaButton")}</Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

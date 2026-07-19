import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { getTechnologies } from "@/lib/content/misc";
import { getFeaturedProjects } from "@/lib/content/projects";
import { ProjectGrid } from "@/components/sections/project-grid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "webDevelopment" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function WebDevelopmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("webDevelopment");
  const [technologies, projects] = await Promise.all([getTechnologies(), getFeaturedProjects(locale)]);
  const process = t.raw("process") as { title: string; description: string }[];

  return (
    <div>
      <div className="container py-16 sm:py-24">
        <Reveal>
          <Kicker>{t("kicker")}</Kicker>
          <h1 className="mt-4 max-w-3xl font-display text-display-2 text-ink text-balance">{t("title")}</h1>
          <p className="mt-6 max-w-xl text-lg text-graphite">{t("subtitle")}</p>
          <Button href="/contact" className="mt-8">Start a project</Button>
        </Reveal>
      </div>

      <div className="border-t border-stone bg-white py-20 sm:py-28">
        <div className="container">
          <Reveal>
            <h2 className="font-display text-display-3 text-ink">{t("processTitle")}</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <span className="text-sm text-graphite">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-2xl text-ink">{step.title}</p>
                <p className="mt-2 text-graphite">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-20 sm:py-28">
        <Reveal>
          <h2 className="font-display text-display-3 text-ink">{t("stackTitle")}</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech.id} className="rounded-full border border-stone px-4 py-2 text-sm text-ink">
              {tech.name}
            </span>
          ))}
        </Reveal>
      </div>

      <div className="border-t border-stone bg-white py-20 sm:py-28">
        <div className="container">
          <ProjectGrid projects={projects.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
}

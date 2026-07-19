import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/animations/reveal";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { ProjectCard } from "@/components/sections/project-card";
import { getProjects, getProjectBySlug, getAdjacentProject } from "@/lib/content/projects";
import { routing } from "@/i18n/routing";
import { getAlternates } from "@/lib/seo/alternates";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateStaticParams() {
  const projects = await getProjects(routing.defaultLocale);
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);
  if (!project) return {};
  return {
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.excerpt,
    alternates: getAlternates(`/work/${slug}`),
    openGraph: project.seo?.ogImage ? { images: [project.seo.ogImage.url] } : project.cover ? { images: [project.cover.url] } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();

  const t = await getTranslations("common");
  const next = await getAdjacentProject(slug, locale);

  return (
    <article className="pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.excerpt,
          image: project.cover.url,
          creator: { "@type": "Person", name: "Jairo Farias" },
          dateCreated: String(project.year),
        }}
      />
      <div className="container pb-10 pt-16 sm:pt-24">
        <Reveal>
          <Kicker>{project.category}</Kicker>
          <h1 className="mt-4 max-w-4xl font-display text-display-2 text-ink text-balance">{project.title}</h1>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-stone pt-6 text-sm">
            {project.client && (
              <div>
                <p className="text-graphite">{t("client")}</p>
                <p className="mt-1 font-medium text-ink">{project.client}</p>
              </div>
            )}
            <div>
              <p className="text-graphite">{t("year")}</p>
              <p className="mt-1 font-medium text-ink">{project.year}</p>
            </div>
            {project.services.length > 0 && (
              <div>
                <p className="text-graphite">{t("services")}</p>
                <p className="mt-1 font-medium text-ink">{project.services.length} serviços</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <div className="container">
        <BlockRenderer blocks={project.blocks} />
      </div>

      {next && (
        <div className="container mt-24 border-t border-stone pt-16">
          <p className="text-sm font-medium uppercase tracking-widest2 text-graphite">{t("nextProject")}</p>
          <div className="mt-6 max-w-md">
            <ProjectCard project={next} />
          </div>
        </div>
      )}
    </article>
  );
}

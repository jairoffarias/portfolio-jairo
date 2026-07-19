import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/animations/reveal";
import { WorkExplorer } from "@/components/sections/work-explorer";
import { getProjects, getProjectCategories } from "@/lib/content/projects";
import { getAlternates } from "@/lib/seo/alternates";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("title"), description: t("subtitle"), alternates: getAlternates("/work") };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("work");
  const [projects, categories] = await Promise.all([getProjects(locale), getProjectCategories(locale)]);

  return (
    <div className="container py-16 sm:py-24">
      <Reveal>
        <Kicker>{t("kicker")}</Kicker>
        <h1 className="mt-4 max-w-3xl font-display text-display-2 text-ink text-balance">{t("title")}</h1>
        <p className="mt-6 max-w-xl text-lg text-graphite">{t("subtitle")}</p>
      </Reveal>
      <div className="mt-14">
        <WorkExplorer projects={projects} categories={categories} />
      </div>
    </div>
  );
}

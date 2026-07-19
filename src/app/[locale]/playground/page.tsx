import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/animations/reveal";
import { getPlaygroundItems } from "@/lib/content/misc";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "playground" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PlaygroundPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const t = await getTranslations("playground");
  const items = await getPlaygroundItems();

  return (
    <div className="container py-16 sm:py-24">
      <Reveal>
        <Kicker>{t("kicker")}</Kicker>
        <h1 className="mt-4 max-w-3xl font-display text-display-2 text-ink text-balance">{t("title")}</h1>
        <p className="mt-6 max-w-xl text-lg text-graphite">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={(i % 4) * 0.08}>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone">
              <Image src={item.image.url} alt={item.image.alt || item.title} fill sizes="25vw" className="object-cover transition-transform duration-700 ease-editorial hover:scale-105" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="font-medium text-ink">{item.title}</p>
              <span className="text-sm text-graphite">{item.year}</span>
            </div>
            <p className="text-sm text-graphite">{item.category}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

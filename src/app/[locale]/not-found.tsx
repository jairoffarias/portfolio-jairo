import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Kicker>{t("kicker")}</Kicker>
      <h1 className="mt-6 font-display text-display-3 text-ink">{t("title")}</h1>
      <p className="mt-4 max-w-md text-graphite">{t("subtitle")}</p>
      <Button href="/" className="mt-8">{t("cta")}</Button>
    </div>
  );
}

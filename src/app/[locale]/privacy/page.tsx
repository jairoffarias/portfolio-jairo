import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/animations/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <Reveal>
        <Kicker>{t("kicker")}</Kicker>
        <h1 className="mt-4 font-display text-display-3 text-ink">{t("title")}</h1>
        <p className="mt-2 text-sm text-graphite">{t("lastUpdated")}: 19/07/2026</p>

        <div className="mt-10 space-y-6 text-graphite">
          <p>
            Este site coleta apenas os dados enviados voluntariamente através do formulário de contato: nome,
            e-mail, empresa, orçamento estimado e mensagem, além de parâmetros de UTM para entender a origem do
            contato.
          </p>
          <p>
            Esses dados são utilizados exclusivamente para responder à sua solicitação e não são compartilhados
            com terceiros para fins de marketing.
          </p>
          <p>
            Este site pode utilizar cookies estritamente necessários para funcionamento e proteção contra spam
            (Cloudflare Turnstile). Nenhum cookie de rastreamento publicitário é utilizado.
          </p>
          <p>
            Para solicitar a remoção dos seus dados, entre em contato através do e-mail informado na página de
            contato.
          </p>
          <p className="text-sm italic">
            Este é um texto placeholder de política de privacidade. Substitua pelo conteúdo jurídico definitivo
            antes da publicação em produção.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

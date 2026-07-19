"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { pt: "PT", en: "EN", es: "ES" };

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={className}>
      {routing.locales.map((l, i) => (
        <span key={l}>
          <button
            onClick={() => router.replace(pathname as never, { locale: l })}
            className={`text-xs font-medium tracking-wide transition-colors ${l === locale ? "text-ink" : "text-graphite hover:text-ink"}`}
            aria-current={l === locale}
          >
            {labels[l]}
          </button>
          {i < routing.locales.length - 1 && <span className="mx-1.5 text-stone">/</span>}
        </span>
      ))}
    </div>
  );
}

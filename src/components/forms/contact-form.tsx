"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";
import { submitContactForm } from "@/app/[locale]/contact/actions";
import { Label } from "@/components/ui/label";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputClass =
  "w-full border-b border-stone bg-transparent py-3 text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none transition-colors";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isDemo, setIsDemo] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", company: "", budget: "", message: "", website: "", locale },
  });

  useEffect(() => {
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
    utmKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) setValue(key, value);
    });
  }, [searchParams, setValue]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const w = window as any;
    if (!w.turnstile || !turnstileRef.current) return;
    const widgetId = w.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
    });
    return () => w.turnstile?.remove?.(widgetId);
  }, [status]);

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const result = await submitContactForm({ ...values, turnstileToken, locale });
      if (result.success) {
        setStatus("success");
        setIsDemo(Boolean(result.demo));
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-stone bg-white p-8">
        <CheckCircle2 className="h-8 w-8 text-ink" />
        <p className="mt-4 text-lg text-ink">{t("success")}</p>
        {isDemo && <p className="mt-3 text-sm text-graphite">{t("demoNotice")}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Honeypot field — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <input id="name" className={inputClass} placeholder={t("namePlaceholder")} {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <input id="email" type="email" className={inputClass} placeholder={t("emailPlaceholder")} {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="company">{t("company")}</Label>
          <input id="company" className={inputClass} placeholder={t("companyPlaceholder")} {...register("company")} />
        </div>
        <div>
          <Label htmlFor="budget">{t("budget")}</Label>
          <select id="budget" className={inputClass} defaultValue="" {...register("budget")}>
            <option value="" disabled>
              {t("budgetPlaceholder")}
            </option>
            {(t.raw("budgetOptions") as string[]).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <textarea id="message" rows={5} className={`${inputClass} resize-none`} placeholder={t("messagePlaceholder")} {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div ref={turnstileRef} />
        </>
      )}

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-graphite disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

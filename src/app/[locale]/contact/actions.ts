"use server";

import { headers } from "next/headers";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getResendClient, isResendConfigured } from "@/lib/resend/client";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";

export interface ContactFormResult {
  success: boolean;
  error?: "validation" | "spam" | "turnstile" | "unknown";
  demo?: boolean;
}

export async function submitContactForm(values: ContactFormValues): Promise<ContactFormResult> {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "validation" };
  }
  const data = parsed.data;

  // Honeypot: real users never fill this hidden field.
  if (data.website) {
    return { success: true, demo: true };
  }

  const headersList = await headers();
  const remoteIp = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();

  const turnstileResult = await verifyTurnstileToken(data.turnstileToken, remoteIp);
  if (!turnstileResult.success) {
    return { success: false, error: "turnstile" };
  }

  const isDemoMode = !isSupabaseConfigured && !isResendConfigured;

  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        budget: data.budget || null,
        message: data.message,
        locale: data.locale || null,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        utm_term: data.utm_term || null,
        utm_content: data.utm_content || null,
      });
    } else {
      console.warn("[contact form] Supabase not configured — skipping persistence (demo mode).");
    }

    const resend = getResendClient();
    const notifyTo = process.env.CONTACT_NOTIFY_EMAIL;
    if (resend && notifyTo) {
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: notifyTo,
        reply_to: data.email,
        subject: `Novo contato pelo portfólio: ${data.name}`,
        text: [
          `Nome: ${data.name}`,
          `E-mail: ${data.email}`,
          data.company ? `Empresa: ${data.company}` : null,
          data.budget ? `Orçamento: ${data.budget}` : null,
          "",
          data.message,
          "",
          `UTM source: ${data.utm_source || "-"}`,
          `UTM medium: ${data.utm_medium || "-"}`,
          `UTM campaign: ${data.utm_campaign || "-"}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } else {
      console.warn("[contact form] Resend not configured — skipping email notification (demo mode).");
    }

    return { success: true, demo: isDemoMode };
  } catch (error) {
    console.error("[contact form] submission failed", error);
    return { success: false, error: "unknown" };
  }
}

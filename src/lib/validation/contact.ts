import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(120),
  email: z.string().email("E-mail inválido"),
  company: z.string().max(120).optional().or(z.literal("")),
  budget: z.string().max(60).optional().or(z.literal("")),
  message: z.string().min(10, "Conte um pouco mais sobre o projeto").max(4000),
  // Honeypot field — bots tend to fill every input; humans never see this one.
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
  utm_source: z.string().max(200).optional().or(z.literal("")),
  utm_medium: z.string().max(200).optional().or(z.literal("")),
  utm_campaign: z.string().max(200).optional().or(z.literal("")),
  utm_term: z.string().max(200).optional().or(z.literal("")),
  utm_content: z.string().max(200).optional().or(z.literal("")),
  locale: z.string().max(5).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

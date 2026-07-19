import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const isResendConfigured = Boolean(apiKey);

export function getResendClient() {
  if (!isResendConfigured) return null;
  return new Resend(apiKey);
}

const secretKey = process.env.TURNSTILE_SECRET_KEY;

export const isTurnstileConfigured = Boolean(secretKey && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export async function verifyTurnstileToken(token: string | undefined, remoteIp?: string): Promise<{ success: boolean; reason?: string }> {
  if (!isTurnstileConfigured) {
    // Not configured yet in this environment — allow through in demo mode.
    return { success: true, reason: "not-configured" };
  }
  if (!token) return { success: false, reason: "missing-token" };

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey as string,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
    });
    const data = await res.json();
    return { success: Boolean(data.success), reason: data["error-codes"]?.join(",") };
  } catch {
    return { success: false, reason: "verify-request-failed" };
  }
}

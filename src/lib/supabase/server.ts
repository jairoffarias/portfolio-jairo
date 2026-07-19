import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && serviceRoleKey);

// Server-only client using the service role key. Never import this from a client component.
export function getSupabaseServerClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(supabaseUrl as string, serviceRoleKey as string, {
    auth: { persistSession: false },
  });
}

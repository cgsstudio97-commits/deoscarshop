import { createClient } from "@supabase/supabase-js";

/**
 * ADMIN / SERVICE ROLE CLIENT
 * -----------------------------------------------------------------
 * Uses SUPABASE_SERVICE_ROLE_KEY which bypasses Row Level Security.
 * This file must ONLY be imported from server-side code:
 *   - app/api/** route handlers
 *   - server actions
 * NEVER import this in a "use client" component or any file that
 * ships to the browser bundle.
 * -----------------------------------------------------------------
 */
export function createAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

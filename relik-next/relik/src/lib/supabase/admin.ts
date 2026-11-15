import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente con service role: SALTA RLS. Úsalo solo en rutas de servidor, siempre validando y limitando los datos.
export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

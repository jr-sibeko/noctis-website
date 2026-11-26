import { createClient } from "@supabase/supabase-js";

export type Review = {
  id: string;
  created_at: string;
  name: string;
  vehicle: string | null;
  service: string | null;
  rating: number;
  comment: string;
};

// Creates a connection to the database (returns null if the keys are missing)
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

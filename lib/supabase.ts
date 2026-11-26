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

// Loads approved reviews, newest first
export async function getApprovedReviews(limit = 50): Promise<Review[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("id, created_at, name, vehicle, service, rating, comment")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Could not load reviews:", error);
    return [];
  }
  return data ?? [];
}

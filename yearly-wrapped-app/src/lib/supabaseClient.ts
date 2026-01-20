import { createClient } from "@supabase/supabase-js";

const baseURL = import.meta.env.VITE_SUPABASE_URL!;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const client = createClient(
  baseURL,
  anonKey,
);
import { createClient } from "@supabase/supabase-js"

/**
 * Cliente Supabase para el proyecto de nutrición
 * Usa variables de entorno separadas
 */
export function createNutritionClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_NUTRITION_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_NUTRITION_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase Nutrition credentials. Check your .env.local file."
    )
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

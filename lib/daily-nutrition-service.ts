import { createNutritionClient } from "@/lib/supabase/nutrition-client"

export interface DailyNutrition {
  id?: string
  user_id: string
  date: string // YYYY-MM-DD
  calories: number
  protein: number
  carbs: number
  fat: number
  created_at?: string
  updated_at?: string
}

/**
 * Obtener nutrición de hoy para el usuario actual
 */
export async function getTodayNutrition(): Promise<DailyNutrition | null> {
  try {
    const supabase = createNutritionClient()

    // Obtener usuario actual del proyecto de autenticación original
    const authClient = await import("@/lib/supabase/client").then((m) =>
      m.createClient()
    )
    const { data: { user }, error: authError } = await authClient.auth.getUser()
    if (authError || !user) {
      console.error("❌ No hay usuario autenticado")
      return null
    }

    // Obtener fecha de hoy en formato YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Obtener nutrición de hoy
    const { data, error } = await supabase
      .from("daily_nutrition")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle()

    if (error) {
      if (error.code === "PGRST116") {
        // No existe registro para hoy, retornar null (se creará al guardar)
        console.log("ℹ️ Sin datos de nutrición para hoy")
        return null
      }
      console.error("❌ Error al obtener nutrición:", error.message)
      return null
    }

    console.log("✅ Nutrición de hoy obtenida:", data)
    return data
  } catch (err: any) {
    console.error("❌ Error inesperado:", err.message)
    return null
  }
}

/**
 * Guardar o actualizar nutrición de hoy
 */
export async function saveTodayNutrition(
  nutrition: Omit<DailyNutrition, "id" | "user_id" | "date" | "created_at" | "updated_at">
): Promise<DailyNutrition | null> {
  try {
    const supabase = createNutritionClient()

    // Obtener usuario actual del proyecto de autenticación original
    const authClient = await import("@/lib/supabase/client").then((m) =>
      m.createClient()
    )
    const { data: { user }, error: authError } = await authClient.auth.getUser()
    if (authError || !user) {
      console.error("❌ No hay usuario autenticado")
      return null
    }

    // Obtener fecha de hoy
    const today = new Date().toISOString().split("T")[0]

    // Intentar obtener registro existente
    const { data: existingData, error: existingError } = await supabase
      .from("daily_nutrition")
      .select("id")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle()

    let result
    if (existingData) {
      // Actualizar
      const { data, error } = await supabase
        .from("daily_nutrition")
        .update({
          ...nutrition,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)
        .eq("date", today)
        .select()
        .single()

      if (error) {
        console.error("❌ Error al actualizar nutrición:", error.message)
        return null
      }
      result = data
      console.log("✅ Nutrición actualizada:", result)
    } else {
      // Crear nuevo registro
      const { data, error } = await supabase
        .from("daily_nutrition")
        .insert({
          user_id: user.id,
          date: today,
          ...nutrition,
        })
        .select()
        .single()

      if (error) {
        console.error("❌ Error al guardar nutrición:", error.message)
        return null
      }
      result = data
      console.log("✅ Nutrición guardada:", result)
    }

    return result
  } catch (err: any) {
    console.error("❌ Error inesperado:", err.message)
    return null
  }
}

/**
 * Sumar nutrición a los valores de hoy
 * Útil para agregar comidas
 */
export async function addNutritionToday(
  nutrition: Omit<DailyNutrition, "id" | "user_id" | "date" | "created_at" | "updated_at">
): Promise<DailyNutrition | null> {
  try {
    // Obtener nutrición actual de hoy
    const today = await getTodayNutrition()

    if (today) {
      // Si existe, sumar
      return saveTodayNutrition({
        calories: today.calories + nutrition.calories,
        protein: today.protein + nutrition.protein,
        carbs: today.carbs + nutrition.carbs,
        fat: today.fat + nutrition.fat,
      })
    } else {
      // Si no existe, crear nuevo registro
      return saveTodayNutrition(nutrition)
    }
  } catch (err: any) {
    console.error("❌ Error al agregar nutrición:", err.message)
    return null
  }
}

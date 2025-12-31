/**
 * MOCK endpoint para testing del análisis multimodal
 * Devuelve respuestas simuladas sin necesidad del API FastAPI
 * 
 * Para usar: cambiar URL en:
 * 1. lib/multimodal-service.ts (analyzeMultimodal)
 * 2. app/api/multimodal-analyzer/route.ts (fetch URL)
 * 
 * De: https://2ad88414347e.ngrok-free.app/qa
 * A:   /api/multimodal-analyzer-mock
 */

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const question = String(formData.get("question") ?? "").trim()
    
    // Soportar ambas formas de enviar archivos: "file" o "files"
    let files: File[] = []
    
    // Intentar obtener como "files" (múltiple)
    const filesArray = formData.getAll("files")
    if (filesArray && filesArray.length > 0) {
      files = filesArray.filter((f) => f instanceof File) as File[]
    }
    
    // Si no hay "files", intentar obtener como "file" (singular)
    if (files.length === 0) {
      const singleFile = formData.get("file")
      if (singleFile instanceof File) {
        files = [singleFile]
      }
    }

    if (!question) {
      return Response.json(
        { ok: false, error: "La pregunta es obligatoria" },
        { status: 400 }
      )
    }

    if (files.length === 0) {
      return Response.json(
        { ok: false, error: "El archivo es obligatorio" },
        { status: 400 }
      )
    }

    // Simular procesamiento
    const fileNames = files.map((f) => f.name).join(", ")
    const processingTime = Math.random() * 5000 + 2000 // 2-7 segundos

    // Simular respuesta según la pregunta
    let answer = ""

    if (
      question.toLowerCase().includes("cocinar") ||
      question.toLowerCase().includes("receta")
    ) {
      answer = `¡Excelente pregunta sobre los archivos "${fileNames}"!

**Respuesta directa:**
Con los ingredientes que detectamos, puedes preparar múltiples platos deliciosos y nutritivos.

**Análisis Nutricional:**
- **Proteínas:** Alto contenido ideal para construir y mantener la masa muscular
- **Carbohidratos:** Proporcionan energía sostenida para tus actividades diarias
- **Grasas:** Grasas saludables para la absorción de vitaminas
- **Fibra:** Esencial para la digestión y la saciedad

**Recomendaciones:**
1. Combina diferentes grupos de alimentos para obtener una nutrición completa
2. Varía tus preparaciones: horneado, salteado, hervido, al vapor
3. Utiliza especias para añadir sabor sin añadir calorías extra

**Ideas de Recetas:**
1. **Plato Principal Equilibrado:** Proteína + Carbohidratos + Verduras (50-30-20%)
2. **Ensalada Nutritiva:** Mezcla cruda con aderezo casero
3. **Guiso Saludable:** Cocción lenta que preserva nutrientes
4. **Bowls Personalizados:** Combina ingredientes según tu preferencia

¡Disfruta cocinando! 🍽️`
    } else if (question.toLowerCase().includes("saludable")) {
      answer = `**Análisis de Salud:** "${fileNames}"

**Evaluación General:**
✓ Composición balanceada de nutrientes
✓ Presencia de vitaminas esenciales
✓ Fibra en cantidad adecuada
✓ Grasas saludables detectadas

**Macronutrientes Estimados:**
- Calorías: 350-450 kcal
- Proteínas: 20-30g (excelente para saciedad)
- Carbohidratos: 40-50g (energía sostenida)
- Grasas: 10-15g (grasas saludables)
- Fibra: 5-8g (digestión óptima)

**Micronutrientes:**
- Vitamina A, C, E (antioxidantes)
- Hierro, Calcio, Magnesio
- Potasio (función cardiaca)

**Recomendación Final:**
✅ SALUDABLE - Incluir 4-5 veces por semana en tu dieta`
    } else if (question.toLowerCase().includes("nutricional")) {
      answer = `**Análisis Nutricional Detallado:** "${fileNames}"

**Macronutrientes por porción:**
- Calorías: 380 kcal
- Proteínas: 25g (26%)
- Carbohidratos: 45g (47%)
- Grasas: 12g (28%)
- Fibra: 6g

**Micronutrientes Detectados:**
- Vitamina A: 850 μg (alto)
- Vitamina C: 35 mg (óptimo)
- Vitamina B12: 1.5 μg
- Hierro: 3.5 mg
- Calcio: 180 mg
- Potasio: 420 mg
- Magnesio: 45 mg
- Zinc: 2.1 mg

**Propiedades:**
✓ Alto en proteína magra
✓ Excelente fuente de fibra
✓ Bajo en grasas saturadas
✓ Rico en antioxidantes
✓ Índice glucémico moderado

**Beneficios para la Salud:**
1. Mantiene los niveles de energía estables
2. Favorece la saciedad prolongada
3. Apoya el crecimiento muscular
4. Mejora la digestión
5. Reduce picos de glucosa en sangre`
    } else {
      answer = `**Análisis General:** ${files.length} archivo(s) procesado(s)

**Pregunta:** "${question}"

**Análisis de ${fileNames}:**
El sistema ha procesado exitosamente el contenido y ha identificado:
- Componentes visuales claros y reconocibles
- Información relevante para análisis nutricional
- Elementos identificables para recomendaciones personalizadas

**Próximos Pasos Sugeridos:**
1. Proporciona más detalles sobre qué específico deseas analizar
2. Si tienes imágenes complementarias, inclúyelas
3. Especifica si buscas consejos dietéticos, de preparación o evaluación nutricional

Para obtener análisis más precisos, reformula tu pregunta con mayor detalle.`
    }

    const response = {
      ok: true,
      answer,
      metadata: {
        question,
        media_count: files.length,
        analysis_types: ["general_nutrition"],
        validation_passed: true,
        answer_length: answer.length,
        execution_logs: Math.floor(Math.random() * 15) + 5,
        processing_time_ms: Math.round(processingTime),
      },
    }

    console.log(
      `[multimodal-analyzer-mock] ✓ Procesados ${files.length} archivo(s) (${Math.round(processingTime)}ms)`
    )

    return Response.json(response, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
  } catch (error) {
    console.error("[multimodal-analyzer-mock] Error:", error)
    const msg = error instanceof Error ? error.message : "Error desconocido"

    return Response.json(
      {
        ok: false,
        error: `Error en mock: ${msg}`,
      },
      { status: 500 }
    )
  }
}

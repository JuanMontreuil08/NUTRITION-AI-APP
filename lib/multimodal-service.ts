/**
 * Servicio para interactuar con el API multimodal
 * Maneja análisis de imágenes, videos y PDFs
 */

export interface MultimodalAnalysisResponse {
  ok: boolean
  answer?: string
  metadata?: {
    question: string
    media_count: number
    analysis_types: string[]
    validation_passed: boolean
    answer_length: number
    execution_logs: number
    processing_time_ms: number
  }
  error?: string
  detail?: any
  processingTime?: number
}

/**
 * Envía archivo(s) + pregunta al API multimodal
 * @param files - Archivo(s) a analizar (imagen, video, PDF)
 * @param question - Pregunta sobre el contenido
 * @returns Respuesta del API con análisis
 */
export async function analyzeMultimodal(
  files: File | File[],
  question: string
): Promise<MultimodalAnalysisResponse> {
  // Convertir a array si es un solo archivo
  const fileArray = Array.isArray(files) ? files : [files]

  if (!fileArray || fileArray.length === 0) {
    throw new Error("El archivo es obligatorio")
  }

  if (!question.trim()) {
    throw new Error("La pregunta es obligatoria")
  }

  const formData = new FormData()
  formData.append("question", question)
  formData.append("use_files_api", "false")

  // Agregar todos los archivos
  for (const file of fileArray) {
    if (!file) continue
    formData.append("files", file, file.name)
    console.log(`📤 Agregando archivo: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`)
  }

  console.log(`📊 Total archivos: ${fileArray.length}`)
  console.log(`❓ Pregunta: ${question.slice(0, 50)}...`)

  const response = await fetch("/api/multimodal-analyzer", {
    method: "POST",
    body: formData,
  })

  // Validar que la respuesta sea JSON
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    const text = await response.text()
    throw new Error(
      `Respuesta no JSON del servidor: ${text.slice(0, 200)}`
    )
  }

  const data: MultimodalAnalysisResponse = await response.json()

  // Manejo de errores
  if (!response.ok || data?.ok === false) {
    throw new Error(
      data?.error || "Error al procesar el contenido multimodal"
    )
  }

  return data
}

/**
 * Formatea la respuesta del API para mostrar al usuario
 */
export function formatMultimodalAnswer(
  response: MultimodalAnalysisResponse
): {
  answer: string
  metadata: string
} {
  const answer = response.answer || "Sin respuesta"

  const metadata = response.metadata
    ? `
📊 Análisis completado
├─ Tiempo: ${response.metadata.processing_time_ms}ms
├─ Tipo: ${response.metadata.analysis_types.join(", ")}
├─ Archivos: ${response.metadata.media_count}
└─ Validación: ${response.metadata.validation_passed ? "✓" : "✗"}
    `.trim()
    : ""

  return { answer, metadata }
}

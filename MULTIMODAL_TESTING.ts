/**
 * TESTING - API Multimodal
 * 
 * Este archivo contiene ejemplos de cómo usar el API multimodal
 * Puedes usar estos ejemplos en la consola del navegador o en tests
 */

// ==========================================
// EJEMPLO 1: Test básico en la consola
// ==========================================

/*
// En la consola del navegador (F12), ejecuta:

const testMultimodal = async () => {
  const question = "¿Cuáles son los alimentos y su valor nutricional?";
  const fileInput = document.querySelector('input[type="file"]');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("❌ Selecciona un archivo primero");
    return;
  }
  
  const formData = new FormData();
  formData.append("question", question);
  formData.append("file", file);
  
  try {
    console.log("📤 Enviando análisis...");
    const res = await fetch("/api/multimodal-analyzer", {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    
    if (data.ok) {
      console.log("✅ Análisis exitoso");
      console.log("📝 Respuesta:", data.answer);
      console.log("📊 Metadata:", data.metadata);
    } else {
      console.log("❌ Error:", data.error);
    }
  } catch (error) {
    console.log("💥 Error en la solicitud:", error.message);
  }
};

testMultimodal();
*/

// ==========================================
// EJEMPLO 2: Usando el servicio importado
// ==========================================

/*
import { analyzeMultimodal, formatMultimodalAnswer } from "@/lib/multimodal-service";

const testWithService = async () => {
  const fileInput = document.querySelector('input[type="file"]');
  const file = fileInput.files[0];
  
  if (!file) {
    console.log("❌ Selecciona un archivo primero");
    return;
  }
  
  try {
    console.log("📤 Analizando con servicio...");
    const response = await analyzeMultimodal(
      file,
      "¿Qué recetas puedo hacer con esto?"
    );
    
    const { answer, metadata } = formatMultimodalAnswer(response);
    
    console.log("✅ Análisis completado");
    console.log("📝 Respuesta:");
    console.log(answer);
    console.log("\n📊 Metadata:");
    console.log(metadata);
    
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
};

testWithService();
*/

// ==========================================
// EJEMPLO 3: Casos de uso según tipo de archivo
// ==========================================

export const MULTIMODAL_TEST_CASES = {
  // Análisis de imagen con alimentos
  imageAnalysis: {
    question: "¿Cuáles son los alimentos en la imagen y sus propiedades nutricionales?",
    acceptedFormats: ["jpg", "jpeg", "png", "webp"],
    expectedFields: ["answer", "metadata"],
  },

  // Análisis de video (receta)
  videoAnalysis: {
    question: "Resumir los pasos de esta receta y proporcionar análisis nutricional",
    acceptedFormats: ["mp4", "mov", "avi", "webm"],
    expectedFields: ["answer", "metadata"],
  },

  // Análisis de PDF (menú)
  pdfAnalysis: {
    question: "Extraer los platos del menú y analizar opciones saludables",
    acceptedFormats: ["pdf"],
    expectedFields: ["answer", "metadata"],
  },

  // Análisis personalizado
  customAnalysis: {
    question: "Tu pregunta aquí sobre el contenido del archivo",
    acceptedFormats: ["jpg", "png", "mp4", "pdf"],
    expectedFields: ["answer", "metadata"],
  },
};

// ==========================================
// EJEMPLO 4: Validación de respuesta
// ==========================================

export const validateMultimodalResponse = (data: any): boolean => {
  console.log("🔍 Validando respuesta...");

  // Verificar estructura básica
  if (typeof data.ok !== "boolean") {
    console.log("❌ Falta campo 'ok'");
    return false;
  }

  if (data.ok === false) {
    console.log("❌ Error del API:", data.error);
    return false;
  }

  // Verificar respuesta exitosa
  if (!data.answer || typeof data.answer !== "string") {
    console.log("❌ Falta o invalida la respuesta (answer)");
    return false;
  }

  // Verificar metadata
  if (!data.metadata) {
    console.log("⚠️ Metadata no disponible");
  } else {
    console.log("✅ Metadata presente:");
    console.log(`   - Tiempo: ${data.metadata.processing_time_ms}ms`);
    console.log(`   - Archivos: ${data.metadata.media_count}`);
    console.log(`   - Validación: ${data.metadata.validation_passed ? "✓" : "✗"}`);
  }

  console.log("✅ Respuesta válida");
  return true;
};

// ==========================================
// EJEMPLO 5: Plantilla de componente
// ==========================================

/*
// En tu componente React:

import { useState } from "react"
import { analyzeMultimodal } from "@/lib/multimodal-service"

export function MultimodalTester() {
  const [file, setFile] = useState<File | null>(null)
  const [question, setQuestion] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResult(null)

    try {
      setLoading(true)
      const response = await analyzeMultimodal(file!, question)
      setResult(response)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*,video/*,.pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Escribe tu pregunta..."
      />

      <button
        onClick={handleAnalyze}
        disabled={!file || !question || loading}
      >
        {loading ? "Analizando..." : "Analizar"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div>
          <h3>Respuesta:</h3>
          <p>{result.answer}</p>
          {result.metadata && (
            <pre>{JSON.stringify(result.metadata, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  )
}
*/

// ==========================================
// EJEMPLO 6: Prueba en PowerShell/Terminal
// ==========================================

/*
# Linux/Mac/PowerShell:

curl -X POST http://localhost:3000/api/multimodal-analyzer \
  -F "question=¿Qué alimentos hay aquí?" \
  -F "file=@/path/to/image.jpg" \
  | jq .

# O con PowerShell específicamente:

$params = @{
    Uri = 'http://localhost:3000/api/multimodal-analyzer'
    Method = 'POST'
    Form = @{
        question = '¿Qué alimentos hay aquí?'
        file = Get-Item '/path/to/image.jpg'
    }
}

Invoke-RestMethod @params | ConvertTo-Json
*/

// ==========================================
// EJEMPLO 7: Manejo de errores completo
// ==========================================

export const handleMultimodalError = (error: any): string => {
  if (error.message.includes("abort") || error.message.includes("timeout")) {
    return "⏱️ El procesamiento tardó demasiado. Intenta con un archivo más pequeño.";
  }

  if (error.message.includes("JSON")) {
    return "📧 El servidor devolvió una respuesta inesperada. Verifica que el API esté activo.";
  }

  if (error.message.includes("obligatorio")) {
    return "📝 " + error.message;
  }

  if (error.message.includes("network")) {
    return "🌐 Error de conexión. Verifica tu conexión a internet.";
  }

  return `❌ Error: ${error.message}`;
};

// ==========================================
// EJEMPLO 8: Mock para testing
// ==========================================

export const mockMultimodalResponse = {
  ok: true,
  answer:
    "Esta es una respuesta de prueba del análisis multimodal. Con los alimentos mostrados puedes preparar...",
  metadata: {
    question: "Test question",
    media_count: 1,
    analysis_types: ["general_nutrition"],
    validation_passed: true,
    answer_length: 150,
    execution_logs: 5,
    processing_time_ms: 2500,
  },
};

// ==========================================
// RESUMEN
// ==========================================

/*
📋 PASOS PARA TESTEAR:

1. Abre el navegador en http://localhost:3000
2. Abre la consola (F12)
3. Selecciona un archivo en el input
4. Copia y ejecuta uno de los ejemplos anteriores

✅ Deberías ver:
   - Respuesta con "ok": true
   - Campo "answer" con el análisis
   - "metadata" con detalles del procesamiento

❌ Si hay error:
   - Verifica que el API FastAPI esté activo
   - Revisa que el archivo tenga formato válido
   - Comprueba que la pregunta no esté vacía
   - Abre la consola del navegador para más detalles
*/

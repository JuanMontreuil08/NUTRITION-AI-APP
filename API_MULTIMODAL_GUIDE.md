# Guía: API Multimodal de Análisis Nutricional

## 📋 Resumen

Este proyecto integra un API de análisis multimodal que procesa imágenes, videos y PDFs para brindar análisis nutricionales detallados con recomendaciones personalizadas.

---

## 🔌 Endpoints

### POST `/api/multimodal-analyzer`

Procesa un archivo (imagen, video o PDF) junto con una pregunta sobre su contenido.

**Headers:**
```
Content-Type: multipart/form-data
```

**Body (FormData):**
- `question` (string, requerido): Pregunta sobre el contenido del archivo
- `file` (File, requerido): Archivo a analizar

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "answer": "¡Claro que sí! Con pollo, arroz y una variedad de verduras frescas...",
  "metadata": {
    "question": "Que podria cocinar con esto sugiereme platos por favor",
    "media_count": 3,
    "analysis_types": ["general_nutrition"],
    "validation_passed": true,
    "answer_length": 2603,
    "execution_logs": 12,
    "processing_time_ms": 9752.652406692505
  }
}
```

**Respuesta de error (4xx/5xx):**
```json
{
  "ok": false,
  "error": "Descripción del error",
  "detail": { ... }
}
```

---

## 🎯 Casos de Uso

### 1. Análisis de Alimentos (Imagen)
```
pregunta: "¿Cuáles son los valores nutricionales de estos alimentos?"
archivo: [imagen JPG/PNG con alimentos]
```

**Respuesta esperada:**
- Identificación de alimentos
- Valores nutricionales por porción
- Recomendaciones de preparación
- Combinaciones saludables

### 2. Análisis de Recetas (Video/Tutorial)
```
pregunta: "Resumir esta receta y dar valores nutricionales"
archivo: [video de una preparación culinaria]
```

**Respuesta esperada:**
- Pasos sintetizados
- Ingredientes identificados
- Análisis nutricional estimado
- Tips de salud

### 3. Análisis de Documentos (PDF)
```
pregunta: "Extractar información nutricional de este menú"
archivo: [PDF con menú de restaurante]
```

**Respuesta esperada:**
- Menú estructurado
- Análisis por plato
- Recomendaciones según dieta

---

## 🛠️ Integración en el Frontend

### Opción 1: Usar el servicio centralizado (Recomendado)

```typescript
import { analyzeMultimodal, formatMultimodalAnswer } from "@/lib/multimodal-service"

// En tu componente:
const handleAnalyze = async () => {
  try {
    const response = await analyzeMultimodal(file, question)
    const { answer, metadata } = formatMultimodalAnswer(response)
    
    console.log("Análisis:", answer)
    console.log("Metadata:", metadata)
  } catch (error) {
    console.error("Error:", error.message)
  }
}
```

### Opción 2: Llamada directa (Sin servicio)

```typescript
const formData = new FormData()
formData.append("question", question)
formData.append("file", file)

const res = await fetch("/api/multimodal-analyzer", {
  method: "POST",
  body: formData,
})

const data = await res.json()
if (data.ok) {
  console.log(data.answer)
}
```

---

## ⚙️ Configuración del Servidor

### Variables de Entorno

Crear archivo `.env.local`:
```env
# URL del API multimodal (FastAPI)
MULTIMODAL_API_URL=https://tu-api-fastapi.app/qa
```

Si no está configurado, se usa: `https://2ad88414347e.ngrok-free.app/qa`

### Límites de Request

En `next.config.mjs` está configurado:
```javascript
experimental: {
  serverActions: {
    bodySizeLimit: "80mb",
  },
}
```

Para videos grandes, incrementar a 100-150mb:
```javascript
bodySizeLimit: "150mb"
```

---

## 🔍 Estructura de Respuesta Detallada

### `ok` (boolean)
- `true`: Análisis completado exitosamente
- `false`: Error en el procesamiento

### `answer` (string)
Respuesta principal con:
- **Respuesta directa:** Resultado conciso de la pregunta
- **Análisis/Explicación:** Detalles nutricionales
- **Recomendaciones:** Sugerencias de acción
- **Ideas de recetas:** Ejemplos prácticos

### `metadata` (object)
```json
{
  "question": "Pregunta original",
  "media_count": 3,           // Número de archivos procesados
  "analysis_types": ["general_nutrition"],
  "validation_passed": true,  // Validación de entrada
  "answer_length": 2603,      // Caracteres en respuesta
  "execution_logs": 12,       // Logs internos
  "processing_time_ms": 9752.65
}
```

---

## 🧪 Testing del API

### Con cURL (Linux/Mac/PowerShell)

```bash
curl -X POST http://localhost:3000/api/multimodal-analyzer \
  -F "question=¿Cuáles son los alimentos en esta imagen?" \
  -F "file=@/path/to/image.jpg"
```

### Con Postman

1. POST: `http://localhost:3000/api/multimodal-analyzer`
2. Body → form-data:
   - `question`: "Tu pregunta aquí"
   - `file`: [Seleccionar archivo]
3. Send

### Con el Frontend

```typescript
const fileInput = document.querySelector('input[type="file"]')
const questionInput = document.querySelector('textarea')

const response = await analyzeMultimodal(
  fileInput.files[0],
  questionInput.value
)
```

---

## 📊 Salida Completa: Ejemplo Real

**Entrada:**
- Pregunta: "¿Qué puedo cocinar con esto? Sugiereme platos por favor"
- Archivos: 3 imágenes (pollo, arroz, verduras)

**Salida:**
```json
{
  "ok": true,
  "answer": "¡Claro que sí! Con pollo, arroz y una variedad de verduras frescas, tienes una excelente base para preparar comidas nutritivas y deliciosas.\n\n**Respuesta directa:** Con los ingredientes que nos muestras (pollo, arroz y diversas verduras como zanahorias, maíz, cebolla y hojas verdes), puedes crear platos muy completos y equilibrados. Te sugiero varias ideas sencillas para aprovechar al máximo estos alimentos.\n\n**Análisis / Explicación nutricional:**\n*   **Pollo:** Es una fuente de proteína magra de alta calidad, fundamental para la construcción y reparación de tejidos, así como para la saciedad.\n*   **Arroz:** Principalmente aporta carbohidratos, que son la principal fuente de energía para tu cuerpo. El arroz blanco es de fácil digestión y proporciona energía rápida.\n*   **Verduras (zanahorias, maíz, cebolla, hojas verdes):** Son ricas en vitaminas (como la vitamina A de las zanahorias), minerales, fibra dietética y antioxidantes. La fibra es clave para una buena digestión y ayuda a mantener estables los niveles de azúcar en sangre.\n\n**Recomendaciones o siguientes pasos:**\nPara una comida más completa, te recomiendo incluir una buena porción de las verduras en cada plato. Considera métodos de cocción saludables para el pollo, como asar, hornear, cocinar a la plancha o al vapor, para mantenerlo magro. Puedes experimentar con diferentes especias y hierbas para variar los sabores.\n\n**Ideas de recetas:**\n1.  **Pollo Salteado con Verduras y Arroz:** Corta el pollo en tiras o cubos y saltea con cebolla, zanahorias en rodajas finas, granos de maíz y las hojas verdes picadas. Sazona con tus especias favoritas (como ajo en polvo, pimentón o un toque de salsa de soja baja en sodio). Sirve sobre una cama de arroz blanco.\n2.  **Arroz con Pollo Casero:** Cocina el arroz junto con trozos de pollo (previamente sellados), cebolla picada, zanahoria en cubitos y maíz. Puedes usar caldo de pollo para darle más sabor. Al final, añade las hojas verdes frescas.\n3.  **Pechugas de Pollo al Horno con Guarnición de Arroz y Verduras Asadas:** Marina las pechugas de pollo con hierbas, ajo y un poco de limón, luego hornéalas. Aparte, asa las zanahorias en bastones y el maíz (si es en mazorca, córtalo en trozos) con un chorrito de aceite de oliva y especias. Sirve el pollo con el arroz y las verduras asadas.\n4.  **Ensalada Fresca de Pollo y Arroz:** Cocina el pollo y desmenúzalo o córtalo en cubos. Mezcla con arroz frío, zanahoria rallada, maíz, cebolla morada finamente picada y las hojas verdes. Adereza con una vinagreta ligera casera (aceite de oliva, vinagre, mostaza, sal y pimienta).",
  "metadata": {
    "question": "Que podria cocinar con esto sugiereme platos por favor",
    "media_count": 3,
    "analysis_types": ["general_nutrition"],
    "validation_passed": true,
    "answer_length": 2603,
    "execution_logs": 12,
    "processing_time_ms": 9752.652406692505
  }
}
```

---

## 🐛 Troubleshooting

### Error: "El archivo es obligatorio"
**Causa:** No se envió archivo  
**Solución:** Verificar que el input type="file" tenga un archivo seleccionado

### Error: "La pregunta es obligatoria"
**Causa:** Campo vacío o solo espacios en blanco  
**Solución:** Escribir una pregunta clara

### Error: "Respuesta no JSON"
**Causa:** El API devolvió HTML (probablemente error 500)  
**Solución:** Verificar que el servidor FastAPI esté ejecutándose

### Error: "Timeout de 30s"
**Causa:** El procesamiento tarda más de 30 segundos  
**Solución:** Incrementar timeout en `route.ts` o reducir tamaño de archivo

### Error CORS
**Causa:** Origen no permitido  
**Solución:** El endpoint tiene `Access-Control-Allow-Origin: *` configurado

---

## 📱 Tipos TypeScript

```typescript
// lib/multimodal-service.ts

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

export async function analyzeMultimodal(
  file: File,
  question: string
): Promise<MultimodalAnalysisResponse>

export function formatMultimodalAnswer(
  response: MultimodalAnalysisResponse
): { answer: string; metadata: string }
```

---

## ✅ Checklist de Implementación

- [x] API endpoint creado (`/api/multimodal-analyzer`)
- [x] Manejo de errores y timeouts
- [x] CORS configurado
- [x] Servicio centralizado (`lib/multimodal-service.ts`)
- [x] Tipos TypeScript
- [x] Integración en `NutritionTracker`
- [x] Documentación completa
- [ ] Tests unitarios
- [ ] Variables de entorno configuradas
- [ ] Deploy a producción


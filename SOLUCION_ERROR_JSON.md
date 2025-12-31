# Solución: Error "El API devolvió una respuesta no JSON"

## 🔴 Problema
```
Error: "El API devolvió una respuesta no JSON"
Status: 502 o 500
```

Esto significa que la URL del API no está disponible o devuelve HTML en lugar de JSON.

---

## ✅ Soluciones Rápidas

### Opción 1: Usar el MOCK (Testing sin API)

**En desarrollo, usa el endpoint mock:**

#### Paso 1: Actualizar la URL
En `lib/multimodal-service.ts`, cambia:

```typescript
const response = await fetch("/api/multimodal-analyzer", {
```

A:

```typescript
const response = await fetch("/api/multimodal-analyzer-mock", {
```

#### Paso 2: Reinicia el servidor
```bash
# Cancela el servidor (Ctrl+C)
npm run dev
```

#### Paso 3: Ahora funciona con datos simulados ✓

---

### Opción 2: Activar el API FastAPI Real

El proyecto usa una URL de ngrok que **probablemente expiró**.

**Pasos:**

1. **Encuentra el proyecto FastAPI**
   ```bash
   # Probablemente está en:
   # D:\UNI\Integration IA\[algo con FastAPI]
   # D:\UNI\[proyecto IA Food]
   ```

2. **Inicia el servidor FastAPI**
   ```bash
   cd [directorio-fastapi]
   python main.py
   # O:
   uvicorn main:app --reload
   ```

3. **Obtén la URL local**
   ```
   http://localhost:8000
   # O la que aparezca en la consola
   ```

4. **Configura en .env.local**
   ```env
   MULTIMODAL_API_URL=http://localhost:8000/qa
   ```

5. **Reinicia el servidor Next.js**
   ```bash
   npm run dev
   ```

---

### Opción 3: Obtener una nueva URL ngrok

Si el API FastAPI está corriendo pero necesitas una URL pública:

```bash
# En el directorio FastAPI:
ngrok http 8000
```

Copia la URL que aparece y configúrala en `.env.local`:

```env
MULTIMODAL_API_URL=https://[ID].ngrok-free.app/qa
```

---

## 📊 Debugging: Qué está devolviendo el API

Cuando recibas el error, verás en los logs de Next.js:

```
[multimodal-analyzer] Status HTTP: 502
[multimodal-analyzer] Content-Type: text/html
[multimodal-analyzer] Response preview: <html><body>Bad Gateway...
```

Esto te dice:
- **502 Bad Gateway:** El API está caído
- **404 Not Found:** El endpoint no existe
- **500 Internal Server Error:** Error en el API
- **text/html:** Devuelve HTML en lugar de JSON

---

## 🧪 Testear si el API funciona

### Opción A: Con cURL

```bash
curl -X POST http://localhost:8000/qa \
  -F "question=¿Qué alimentos hay aquí?" \
  -F "files=@image.jpg" \
  -F "use_files_api=false"
```

### Opción B: Con Postman

1. POST: `http://localhost:8000/qa`
2. Body → form-data:
   - `question`: Tu pregunta
   - `files`: Archivo
   - `use_files_api`: false
3. Send

---

## 📁 Archivos Involucrados

```
app/
├── api/
│   ├── multimodal-analyzer/
│   │   └── route.ts           ← Endpoint real (calls FastAPI)
│   └── multimodal-analyzer-mock/
│       └── route.ts           ← Endpoint mock (para testing)

lib/
└── multimodal-service.ts      ← Cambiar URL aquí

.env.local                       ← Configurar MULTIMODAL_API_URL
```

---

## 🔄 Flujo Recomendado

### Durante Desarrollo (Ahora)
```
Frontend → Next.js (/api/multimodal-analyzer-mock) → Respuesta Mock
```

### Cuando FastAPI esté Listo
```
Frontend → Next.js (/api/multimodal-analyzer) → FastAPI → Respuesta Real
```

---

## ✓ Checklist de Solución

- [ ] ¿Está activo el servidor FastAPI?
- [ ] ¿La URL en `.env.local` es correcta?
- [ ] ¿Probaste con cURL/Postman?
- [ ] ¿Reinicias Next.js después de cambios?
- [ ] ¿Estás usando el mock para testing?

---

## 📞 Siguientes Pasos

1. **Confirma dónde está el API FastAPI**
   - ¿Misma carpeta que MVP-UI?
   - ¿Otra carpeta del proyecto IA Food?

2. **Verifica que esté corriendo**
   ```bash
   # Debería responder sin errores
   curl http://localhost:8000/qa
   ```

3. **Usa el mock mientras tanto**
   ```bash
   # En lib/multimodal-service.ts:
   # Cambia "/api/multimodal-analyzer" 
   # Por   "/api/multimodal-analyzer-mock"
   ```

---

## 💡 Tip Final

Si todo falla, **usa el mock indefinidamente para development**. Es perfecto para testear la UI sin dependencias externas.

Para producción, activa el API FastAPI real.

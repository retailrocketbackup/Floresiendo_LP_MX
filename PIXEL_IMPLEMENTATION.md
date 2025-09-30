# Meta Pixel - Fase 1 Implementación

## Resumen

Se ha implementado el Meta Pixel básico con la estrategia de eventos estándar para el primer embudo de conversión.

## Eventos Implementados

### 1. PageView (Automático)
- **Cuándo:** Al cargar cualquier página
- **Implementación:** Automático en `MetaPixel` component
- **Ubicación:** `app/layout.tsx`
- **Parámetros:** Ninguno

### 2. ViewContent (Manual)
- **Cuándo:** Usuario reproduce el video
- **Implementación:** `VideoSection` component
- **Trigger:** Click en botón Play
- **Parámetros:**
  - `content_name`: "Retiros Video Llamada" o "Retiros Video Formulario"
  - `content_type`: "video"
  - `content_ids`: [videoId]
  - `value`: 25.00
  - `currency`: "USD"

### 3. Lead (Manual)
- **Cuándo:** Usuario envía formulario HubSpot
- **Implementación:** `HubSpotForm` component
- **Trigger:** HubSpot `onFormSubmitted` event
- **Parámetros:**
  - `content_name`: "Retiros Video Formulario"
  - `value`: 50.00
  - `currency`: "USD"
  - `eventID`: UUID v4 (para deduplicación con CAPI)

### 4. Schedule (Manual)
- **Cuándo:** Usuario agenda llamada en Calendly
- **Implementación:** `CalendlyWidget` component
- **Trigger:** Calendly `event_scheduled` event
- **Parámetros:**
  - `content_name`: "Retiros Video Llamada"
  - `value`: 100.00
  - `currency`: "USD"
  - `eventID`: UUID v4 (para deduplicación con CAPI)

## Estructura de Archivos

\`\`\`
lib/
  meta-pixel.ts          # Funciones de tracking y tipos
components/
  meta-pixel.tsx         # Componente de inicialización del Pixel
  video-section.tsx      # Tracking de ViewContent
  hubspot-form.tsx       # Tracking de Lead
  calendly-widget.tsx    # Tracking de Schedule
app/
  layout.tsx             # Integración del Pixel en el layout
\`\`\`

## Variables de Entorno Requeridas

\`\`\`env
NEXT_PUBLIC_META_PIXEL_ID=tu_pixel_id_aqui
\`\`\`

## Flujos de Conversión

### Flujo 1: /retiros-video-llamada
1. **PageView** (automático) → Usuario entra a la página
2. **ViewContent** (manual) → Usuario reproduce el video
3. **Schedule** (manual) → Usuario agenda llamada

### Flujo 2: /retiros-video-formulario
1. **PageView** (automático) → Usuario entra a la página
2. **ViewContent** (manual) → Usuario reproduce el video
3. **Lead** (manual) → Usuario envía formulario

## Verificación

### Herramientas de Testing:
1. **Meta Pixel Helper** (Chrome Extension)
   - Verifica que el Pixel esté instalado correctamente
   - Muestra eventos en tiempo real
   - Detecta errores de implementación

2. **Events Manager → Test Events**
   - Envía eventos de prueba
   - Verifica parámetros
   - Monitorea Event Match Quality

3. **Console Logs**
   - Los eventos Lead y Schedule incluyen logs de debug
   - Busca `[v0] Meta Pixel` en la consola del navegador

## Próximos Pasos (Fase 2)

1. Activar **Automatic Advanced Matching** en Events Manager
2. Crear **Custom Audiences** basadas en eventos
3. Configurar **Custom Conversions** para optimización
4. Monitorear **Event Match Quality** (objetivo: > 6.0)

## Próximos Pasos (Fase 3 - CAPI)

1. Crear endpoint `/api/meta-capi` para server-side tracking
2. Enviar eventos duplicados con mismo `eventID`
3. Maximizar parámetros de usuario (email, phone, etc.)
4. Verificar deduplicación en Events Manager

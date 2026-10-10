# MASTER PROMPT ONE-SHOT: Landing Page de Alta Conversión — Sky Home (Disrupción Urbana)

> **Instrucciones para la IA:** Actúa como un diseñador y desarrollador frontend senior especializado en páginas de aterrizaje de alto valor y conversión directa. Vas a construir una alternativa completa de landing page para **Sky Home**, lista para producción, modular, funcional y 100% fiel al flujo comercial, técnico y visual del proyecto. No entregues explicaciones teóricas ni wireframes: entrega el código final completo y listo para producción.

---

## 1. Contexto de Negocio y Audiencia

- **Cliente / Marca:** Disrupción Urbana
- **Producto:** Sky Home (Ampliación habitacional modular sobre azoteas y espacios subutilizados de casas existentes).
- **Mercado:** México (CDMX, Guadalajara y zonas metropolitanas).
- **Objetivo Principal:** Captura de leads calificados mediante un flujo interactivo de 4 pasos, integración con webhook de n8n y redirección a página de agendamiento (`/gracias`).
- **Audiencia:** Propietarios de viviendas residenciales con azotea o terreno no aprovechado. Buscan rentar un departamento independiente o construir una recámara/estudio sin soportar una obra tradicional interminable ni riesgos estructurales.
- **Competencia Real:** La autoconstrucción informal con maestros de obra (lenta, sin cálculo estructural, sucia e incierta).

---

## 2. Sistema de Diseño (Valores Estrictos)

Respeta fielmente este sistema cromático y tipográfico sin introducir colores secundarios ni sombras genéricas:

```css
:root {
  --azul:        #1414E6;   /* Color primario: botones, acentos, badges */
  --azul-hover:  #0F0FC2;   /* Estados interactivos hover */
  --azul-tinte:  #EEF0FF;   /* Fondos suaves de secciones y tarjetas destacadas */
  --tinta:       #0A0A18;   /* Texto principal y fondos oscuros de contraste */
  --gris:        #5A5E72;   /* Texto secundario y subtítulos */
  --linea:       #DCDFF2;   /* Bordes y divisores estructurales */
  --blanco:      #FFFFFF;
  --radius:      14px;      /* Bordes redondeados sutiles */
}
```

- **Tipografías:**
  - **Títulos y Encabezados:** `Space Grotesk` (peso 700). Contraste marcado e imponente.
  - **Cuerpo y Formularios:** `Inter` (pesos 400, 500 y 600).
- **Estética Visual:** Arquitectónica, minimalista, industrial y limpia. Mucho aire entre secciones (espaciado generoso). Geometría modular sutil (líneas delgadas, bordes definidos, overlays sobrios). Cero gradientes multicolor, emojis ni estética genérica de plantillas.
- **Logotipo:** Usar el isotipo oficial transparente ubicado en `/logo_du.png` tanto en el Hero (con dimensiones nítidas `h-16`), Footer (`h-12 brightness-0 invert opacity-50`) y en la página `/gracias` (`h-24`).

---

## 3. Stack Técnico y Arquitectura de Archivos

- **Framework:** Next.js (App Router, versión 15/16) + React 19 + TypeScript + Tailwind CSS v4.
- **Estructura de Rutas requerida:**
  - `src/app/layout.tsx`: Layout global con fuentes Google (`Space_Grotesk` e `Inter`), suite completa de analítica (GTM, Clarity, Meta Pixel, Vercel Analytics).
  - `src/app/page.tsx`: Landing page principal interactiva con formulario wizard y animaciones de scroll.
  - `src/app/gracias/page.tsx`: Thank You Page post-conversión con redirección de seguridad.
  - `public/`: Contiene `/logo_du.png`, `/videos/skyhome_video.mp4` y renders en `/renders/` (`rooftop01.jpeg`, `room02.jpeg`, `room07.jpeg`, `rooftop02.jpeg`, etc.).
- **Regla estricta de estado:** **PROHIBIDO el uso de `localStorage` y `sessionStorage`**. Toda la captura de atribución y estado de formulario vive exclusivamente en memoria de React.
- **Docker Ready:** Listo para levantar con `docker-compose up --build`.

---

## 4. Estructura de Secciones de la Landing Page (`/`)

Construye la página principal manteniendo este orden y narrativa:

### 1. Hero con Video de Fondo
- Video de fondo en loop (`/videos/skyhome_video.mp4`) optimizado con overlay oscuro sutil (`bg-ink/20` y degradados transparentes para no opacar el video).
- Logotipo oficial `/logo_du.png` junto a la etiqueta badge `Sky Home`.
- Headline: *"Tu azotea puede ser un departamento que genera ingresos."*
- Subheadline: *"La mayoría de las azoteas en México solo sirven para tender ropa. La tuya puede convertirse en un activo rentable en aproximadamente 4 meses."*
- CTA Principal visible: *"Agenda tu llamada"* con ancla directa a `#contacto`.

### 2. Tecnología Estructural Probada
- Mensaje técnico contundente: el **80% de las propiedades califican** gracias a la sobredimensión estructural típica en México.
- Énfasis en el **sistema estructural ligero** desarrollado y validado por equipo propio de ingeniería y arquitectura.

### 3. Pilares de Valor y Galería Fotográfica
- Dos columnas: Pilares clave (*Velocidad*, *Respaldo profesional*, *Estética y diseño*, *Sustentabilidad*) acompañados de render arquitectónico (`/renders/room02.jpeg`).
- Galería horizontal responsive con scroll snap en móvil mostrando renders de calidad (`/renders/rooftop01.jpeg`, `/renders/room07.jpeg`, `/renders/rooftop02.jpeg`).

### 4. Problema / Situación Actual (Comparativa)
- Planteamiento del espacio muerto vs. la incertidumbre de contratar maestros de obra tradicionales.
- Tarjeta comparativa: Obra tradicional (tiempos indefinidos, sin planos, escombro) vs. Alternativa Sky Home (4 meses, cálculo estructural, obra limpia).
- **CTA Intermedio Estratégico:** Botón *"Evaluar mi azotea"* direccionando a `#contacto`.

### 5. Cómo Funciona (Proceso en 4 Pasos)
- Fases enumeradas claramente: `01 Diseño y Proyecto`, `02 Ingeniería`, `03 Fabricación`, `04 Montaje en sitio`.

### 6. Ejercicio Financiero, ROI y Esquemas de Pago
- Indicador transparente de costos: **DESDE $15,500 MXN / m²**, mínimo de construcción: **20 m²**.
- Esquemas de financiamiento: Capital propio (anticipo y pagos por avance) y Crédito de autofinanciamiento (asesoría con 33% inicial).
- **CTA Financiero Estratégico:** Botón *"Agenda tu llamada"* direccionando a `#contacto`.

### 7. Alcance del Proyecto: Qué Incluye y Qué NO Incluye
- Columna verde/azul (Incluye): Diseño arquitectónico, instalaciones, cálculo estructural, planos ejecutivos, asesoría financiera.
- Columna gris (No incluye): Gestoría de permisos ante el municipio, estudios ambientales o de tránsito (se entrega memoria técnica lista para el trámite).

### 8. Preguntas Frecuentes (FAQ)
- Respuestas a objeciones: Resistencia estructural, gestión de permisos y disponibilidad de proyectos en fase de producción.

### 9. Sección de Conversión Final con Wizard Interactivo (#contacto)
- Contenedor dividido en dos columnas: panel lateral informativo con barra de pasos interactiva y wizard de cualificación.
- Flujo en 4 pasos (ver sección 5 para lógica de atribución y validación).

### 10. Footer Corporativo
- Logotipo de la marca en monocromático, ciudades operativas (CDMX, Guadalajara), derechos reservados y enlace al Aviso de Privacidad.

---

## 5. Formulario Wizard, Atribución de Tráfico y Webhook

### A. Captura de Atribución (Al montar el componente)
En un `useEffect` único al montar la página, captura en memoria:
- Parámetros UTM de la URL: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
- Identificadores de clic: `fbclid`, `gclid`.
- Origen y contexto: `document.referrer`, `landing_url` (`window.location.href`).
- Dispositivo: `"movil"` (si `innerWidth < 768px`) o `"escritorio"`.
- Viewport: Formato `"anchoxalto"` (ej. `390x844`).
- Timestamp de inicio: `ts_inicio` (ISO string).

### B. Pasos del Wizard (Validación en Vivo)
- **Paso 1 (Zona):** ¿Dónde construirías tu extensión? (*Azotea*, *Patio o jardín*, *Terreno anexo*, *Aún no lo defino*).
- **Paso 2 (Uso):** ¿Qué uso tendría ese espacio? (*Recámara*, *Oficina o estudio*, *Departamento independiente*, *Roof garden o terraza*, *Otro*).
- **Paso 3 (Propiedad):** ¿Construida? (*Sí*, *En construcción*, *No*), Metros aprox (*<30*, *30-60*, *60-100*, *>100*), Inicio ideal (*1 mes*, *1-3 meses*, *3-6 meses*, *explorando*) y Ubicación (texto libre).
- **Paso 4 (Contacto y Consentimiento):** Nombre completo, WhatsApp (mínimo 10 dígitos numéricos), Correo (validación regex) y Checkbox obligatorio:
  > *"Acepto el aviso de privacidad y el tratamiento de mis datos para ser contactado."* (con enlace a `/aviso-de-privacidad`).
- El botón de envío se mantiene deshabilitado hasta que el paso esté validado. Al avanzar cada paso, disparar evento personalizado de Meta Pixel: `fbq('trackCustom', 'form_step_X')`.

### C. Envío al Webhook de n8n
Al dar click en "Enviar proyecto" en el Paso 4:
- Deshabilitar el botón y mostrar `"Enviando..."`.
- Calcular `ts_envio` (ISO string) y `duracion_seg` (diferencia en segundos entre `ts_inicio` y `ts_envio`).
- Realizar `POST` con `Content-Type: application/json` al webhook productivo:
  ```ts
  const WEBHOOK_URL = "https://go.alex-ai.dev/webhook/skyhome-lead";
  ```
- **Payload completo:**
  ```json
  {
    "campana": "sky-home",
    "zona": "Azotea",
    "uso": "Departamento independiente",
    "construida": "Sí",
    "metros": "30-60",
    "cuando": "1 mes",
    "ubicacion": "CDMX, Benito Juárez",
    "nombre": "Juan Pérez",
    "whatsapp": "5512345678",
    "correo": "juan@gmail.com",
    "consentimiento": true,
    "utm_source": "meta",
    "utm_medium": "cpc",
    "utm_campaign": "rooftop-leads",
    "utm_content": "video-hook",
    "utm_term": "",
    "fbclid": "IwAR...",
    "gclid": "",
    "referrer": "https://m.facebook.com/",
    "landing_url": "https://skyhome.disrupcionurbana.com/?utm_source=meta...",
    "dispositivo": "movil",
    "viewport": "390x844",
    "ts_inicio": "2026-10-10T12:00:00.000Z",
    "ts_envio": "2026-10-10T12:01:25.000Z",
    "duracion_seg": 85,
    "paso_alcanzado": 4
  }
  ```
- Al recibir respuesta satisfactoria (`res.ok`):
  - Disparar `fbq('track', 'Lead')`.
  - Redirigir de inmediato a `/gracias` (`window.location.href = "/gracias"`).
- Si falla: Mostrar mensaje de error discreto para reintentar sin borrar datos ingresados.

---

## 6. Página de Agradecimiento (`/gracias`)

Crear la ruta `/gracias/page.tsx` con estas características:
1. Vista limpia, centrada, con el logotipo `/logo_du.png` en `h-24` e ícono de confirmación.
2. Título: *"¡Gracias por tu interés en Sky Home!"*
3. Texto: *"Hemos recibido tu información correctamente. Un especialista se pondrá en contacto contigo muy pronto para evaluar la viabilidad de tu proyecto."*
4. Bloque prioritario de agendamiento directo:
   - Texto: *"¿No quieres esperar? Elige el horario que mejor te funcione y hablemos directamente."*
   - Botón primario: *"Agendar mi llamada ahora"* con enlace a Calendly configurado (`CALENDLY_URL`).
5. **Mecanismo de Redirección Automática:**
   - Temporizador de 60 segundos visible con barra de progreso superior.
   - Mensaje: *"Serás redirigido al inicio en X segundos..."*.
   - Al llegar a 0 segundos, redirigir automáticamente de vuelta al inicio (`/`).

---

## 7. Suite Completa de Analítica y Trackers

En `src/app/layout.tsx`, integrar sin librerías externas pesadas (usando etiquetas directas en el servidor):

```tsx
// Constantes de Seguimiento
const META_PIXEL_ID = "1471404497878933";
const GTM_ID = "GTM-WW4H6GK9";
const CLARITY_ID = "yvegddhxem";
```

1. **Google Tag Manager:**
   - Script oficial en `<head>` con `gtm.start`.
   - `<noscript>` con `<iframe>` inmediatamente después de la apertura de `<body>`.
2. **Microsoft Clarity:**
   - Script oficial en `<head>` configurado con el ID `yvegddhxem`.
3. **Meta Pixel (Facebook):**
   - Script oficial nativo en `<head>` ejecutando `fbq('init', '1471404497878933')` y `fbq('track', 'PageView')`.
   - Etiqueta `<noscript>` con imagen `https://www.facebook.com/tr?id=1471404497878933&ev=PageView&noscript=1`.
4. **Vercel Analytics:**
   - Componente `<Analytics />` de `@vercel/analytics/next` dentro del `<body>`.

---

## 8. Criterios de Aceptación y Validación

Para considerar el encargo terminado con éxito:
1. **Flujo completo funcional:** El usuario puede navegar todas las secciones, interactuar con los 3 CTAs a lo largo de la página, completar los 4 pasos del formulario y ser redirigido exitosamente a `/gracias`.
2. **Cero pérdida de datos de campaña:** Todos los parámetros UTM, clic IDs, referrer y métricas temporales son enviados correctamente en el payload al webhook.
3. **Estilo idéntico y sin inconsistencias:** Colores exactos (`#1414E6`, `#0A0A18`, `#EEF0FF`), tipografía Space Grotesk + Inter y disposición de imágenes/renders idéntica.
4. **Compilación limpia:** `npm run build` pasa sin errores de TypeScript ni avisos de Turbopack.
5. **No almacenamiento local:** Cero uso de `localStorage` o `sessionStorage`.

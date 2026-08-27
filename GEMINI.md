# GEMINI.md

> Contexto persistente del proyecto. Este archivo se lee automáticamente en cada
> sesión. Define **cómo trabajamos**; el archivo `prompt_one_shot.md` define
> **qué construimos**. No mezclar ambos.
>
> Plantilla reutilizable de **AlexIA — Alejandro Rivera**.
> Para un proyecto nuevo: edita solo el bloque `## 1. Proyecto` y
> `## 4. Sistema de diseño`. El resto se mantiene igual.

---

## 1. Proyecto

| Campo | Valor |
|---|---|
| Cliente | Disrupción Urbana |
| Producto | Sky Home |
| Entregable | Landing page de conversión |
| Idioma | Español de México |
| Stack | HTML + CSS + JS vanilla, un solo archivo |
| Estado | v1 en construcción |

**Objetivo comercial de la página:** capturar prospectos calificados y llevarlos
a agendar una llamada. Todo lo demás en la página está subordinado a eso.

---

## 2. Estructura del directorio

```
./
├── GEMINI.md            ← este archivo (contexto de trabajo)
├── prompt_one_shot.md   ← brief del entregable (qué construir)
├── renders/             ← imágenes del cliente. NO renombrar ni mover
└── dist/                ← salida generada. Todo lo nuevo va aquí
```

**Reglas de archivos**

- Los archivos de `renders/` son de solo lectura. Referéncialos con rutas
  relativas (`renders/nombre.jpg`), nunca los copies ni los renombres.
- Todo lo que generes va en `dist/`.
- Antes de crear un archivo nuevo, revisa si ya existe uno equivalente y edítalo.
- No crees archivos README, LICENSE, .gitignore ni documentación auxiliar salvo
  petición explícita.

---

## 3. Flujo de trabajo

1. **Leer antes de escribir.** Al iniciar sesión, lee `prompt_one_shot.md`
   completo antes de generar nada.
2. **Plan primero en cambios grandes.** Si el encargo toca más de tres secciones,
   expón el plan en 5 líneas y espera confirmación.
3. **Cambios quirúrgicos.** Para ajustes puntuales, edita solo el bloque
   afectado. No reescribas el archivo completo ni reordenes código que funciona.
4. **Verificar antes de entregar.** Recorre los criterios de aceptación de la
   sección 7 y reporta cuáles se cumplen y cuáles no.
5. **Reportar en español, breve.** Qué cambió y por qué. Sin resúmenes largos ni
   listas de archivos tocados.

---

## 4. Sistema de diseño

Valores estrictos. No introducir colores, tipografías ni efectos fuera de esta lista.

```css
:root{
  --azul:        #1414E6;   /* primario — CTAs, acentos, énfasis */
  --azul-hover:  #0F0FC2;
  --azul-tinte:  #EEF0FF;   /* fondos suaves de sección */
  --tinta:       #0A0A18;   /* texto principal */
  --gris:        #5A5E72;   /* texto secundario */
  --linea:       #DCDFF2;   /* bordes */
  --blanco:      #FFFFFF;
  --radius:      14px;
}
```

- **Títulos:** Space Grotesk 700
- **Cuerpo:** Inter 400 / 500 / 600
- **Escala tipográfica:** contraste marcado entre título y cuerpo. Sin tamaños
  intermedios ambiguos.
- **Espaciado:** generoso entre secciones. El aire es parte del posicionamiento.
- **Elemento gráfico recurrente:** geometría modular sutil (referencia al sistema
  constructivo). Usar con moderación, nunca como decoración de relleno.

**Prohibido**
- Gradientes multicolor, sombras difusas grandes, bordes redondeados excesivos
- Colores adicionales "para dar vida"
- Estética de plantilla genérica: iconos flotantes, blobs, ilustraciones stock
- Emojis en la interfaz

---

## 5. Reglas de contenido

- **Cero datos inventados.** Precios, plazos, certificaciones, testimonios y
  cifras salen únicamente de `prompt_one_shot.md`. Si falta un dato, escribe
  `[POR CONFIRMAR: descripción]` visible en la página. Nunca lo rellenes.
- **Cero lorem ipsum.** Copy final en cada sección desde la primera versión.
- **Frases cortas.** Cada línea se gana su lugar. Sin relleno corporativo
  ("soluciones integrales", "líderes en el mercado", "innovación de vanguardia").
- **Imágenes.** Usa las de `renders/`. Si falta una, deja un contenedor con
  proporción definida y una nota clara de qué imagen va ahí.

---

## 6. Estándares técnicos

- Mobile-first. Verificar a 360px, 768px y 1440px.
- Semántica HTML correcta: un solo `<h1>`, jerarquía de encabezados sin saltos.
- Accesibilidad: contraste AA mínimo, foco visible, `alt` descriptivo,
  `aria-label` en controles sin texto.
- `prefers-reduced-motion` respetado en toda animación.
- **Prohibido `localStorage` y `sessionStorage`.** Estado en memoria únicamente.
- Sin dependencias externas salvo Google Fonts. Nada de jQuery, Bootstrap ni
  frameworks CSS.
- JavaScript vanilla, sin build step.
- Formularios: validación en vivo, botón de envío deshabilitado hasta que los
  campos requeridos estén completos, estado de confirmación en la misma página.
- Comentarios solo donde el código no sea evidente por sí mismo.

---

## 7. Criterios de aceptación

Una entrega está completa cuando:

1. Todas las secciones del brief existen y tienen copy real, no marcadores vacíos.
2. El diseño se ve intencional y no se confunde con una plantilla.
3. Funciona correctamente en móvil (360px) y escritorio (1440px).
4. Los CTAs son visibles sin buscarlos y se repiten a lo largo del scroll.
5. Cada objeción listada en el brief está resuelta en algún punto de la página.
6. Ningún dato fuera del brief: lo que no estaba aparece como `[POR CONFIRMAR]`.
7. No hay errores en consola.
8. Puedo levantar el proyecto local con el comando `docker-compose up --build`

---

## 8. Fuera de alcance

No hacer sin petición explícita:

- Instalar dependencias o inicializar gestores de paquetes
- Configurar despliegue, CI/CD o servicios externos
- Ejecutar `git commit`, `git push` o crear ramas
- Modificar archivos de `renders/`
- Añadir analítica, píxeles o scripts de terceros (dejar el espacio marcado)
- Generar contenido para redes sociales u otros entregables del proyecto

---

## 9. Notas de contexto

- El cliente es un perfil analítico: valora precisión, tiempos concretos y datos
  verificables por encima del lenguaje aspiracional.
- La página compite contra la autoconstrucción informal, no contra otras
  constructoras. El argumento central es respaldo profesional y velocidad.
- Hay cifras en revisión (precio por m², tiempo de obra). Mantenerlas como
  `[POR CONFIRMAR]` hasta nueva indicación.
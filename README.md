# Demo A · Estrato Taller de Arquitectura
## Demo de Sitio Web a Medida — Lumux Studio

Este proyecto es una aplicación estática independiente desarrollada con **Astro 4 + TypeScript + CSS Variables**. Sirve como demostración comercial navegable del servicio de **Sitios Web a Medida** de Lumux Studio para el sector de arquitectura, interiorismo y consultoría técnica.

---

## 1. Características Técnicas

- **Framework:** Astro 4 (Static Site Generation / SSG).
- **Tipografía y Tokens:** Sistema editorial con Syne, Manrope y Bodoni Moda. Tokens del rediseño en `tokens.css`, estilos compartidos en `src/styles/redesign.css` y dirección visual en `design.md`.
- **Selector de Paletas Interactivo:** Control de luz en el encabezado con modos claro y oscuro, persistidos en `localStorage`. El componente anterior se conserva en el código.
- **Validación de Contenido con Zod:** Esquemas tipados estrictos en `src/content/config.ts`.
- **Rutas Dinámicas Reales:**
  - `/servicios/[slug]` (Arquitectura Residencial, Interiorismo y Materia).
  - `/proyectos/[slug]` (Casa Pedregal, Pabellón Humedal, Estudio Tamarindos).
- **Accesibilidad y Rendimiento:** Lenis sincronizado con GSAP ScrollTrigger mediante un solo ticker, entradas tipográficas y parallax de fotografías. Movimiento reducido usa scroll nativo. Menú móvil con dialog nativo y navegación con teclado.
- **Formulario Interactivo Ético:** Validación completa de campos en `src/components/ContactForm.astro`, recepción de parámetro URL `?servicio=...` y pantalla de simulación de captura sin almacenar datos personales ni enviar correos externos.

---

## 2. Comandos de Desarrollo y Compilación

Ejecuta estos comandos dentro de la carpeta `demo-servicios/`:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local (http://localhost:4321)
npm run dev

# Compilar proyecto a archivos estáticos (directorio dist/)
npm run build

# Previsualizar el resultado compilado
npm run preview
```

---

## 3. Guía de Mantenimiento y Edición de Contenido (JSON)

Todo el contenido del sitio está desacoplado de la lógica de los componentes `.astro`. Para actualizar datos, edita únicamente los archivos en `src/content/`:

1. **Datos Generales, Navegación y Contacto:**
   - Archivo: `src/data/site.json`
   - Permite cambiar nombre del estudio, correos, dirección, redes y textos del banner comercial.
2. **Servicios Técnicos:**
   - Carpeta: `src/content/services/`
   - Cada archivo `.json` define título, resumen, entregables, etapas del proceso y fotografías.
3. **Catálogo de Obras y Proyectos:**
   - Carpeta: `src/content/projects/`
   - Cada archivo `.json` define el año, ubicación, superficie, decisiones de diseño, créditos y galería.
4. **Paletas Cromáticas:**
   - Archivo: `tokens.css`

> **Nota técnica:** Al modificar cualquier archivo `.json`, es necesario volver a compilar el proyecto (`npm run build`) para publicar los cambios en producción.

## Rediseño 2026

Referencias: [Halcyon](https://www.halcyon.co.nz/) y [TARQ Studio](https://www.tarqstudio.com/es). Portada inmersiva con selector manual de proyectos, catálogo filtrable, fichas editoriales, servicios y proceso desplegable. Se mantienen las 13 rutas, las colecciones JSON y las fotografías de referencia.

- `src/layouts/BaseLayout.astro`: navegación, menú móvil y cierre del sitio.
- `src/scripts/experience.ts`: GSAP, Lenis, selector de obras, filtros y modo oscuro.
- `src/components/EditorialProject.astro`: presentación compartida de proyectos.
- `src/components/StudioProcess.astro`: proceso del taller.
- `src/components/ContactForm.astro`: validación accesible y simulación local; datos insertados mediante textContent.

Verificación: build de las 13 rutas, TypeScript, plantillas a 320/375/414/768 px, selector de portada, filtros, menú, modo oscuro y flujo del formulario.

Ajustes de interacción: encabezado fijo con contraste al scroll, fotos con proporción natural, tres estudios SVG animados y flechas SVG compartidas en `ArrowIcon.astro`. Acordeones exclusivos por grupo con atributo name y fallback JavaScript.

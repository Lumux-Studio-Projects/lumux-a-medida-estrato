# Ficha de Investigación de Referencias (Awwwards)
## Demo A · Estrato Taller de Arquitectura

- **Referencia Analizada:** [Moon Safari — Architecture & Urbanism](https://www.awwwards.com/sites/moon-safari)
- **Fecha de comprobación:** 6 de octubre de 2026.
- **Evidencia disponible en Awwwards:** Sitio multipágina de arquitectura y urbanismo con navegación de proyectos, menú flotante, equipo y transiciones con GSAP.

---

### 1. Tres Decisiones de Diseño Adoptadas para Estrato Arquitectura

1. **Relación Fotografía-Espacio Negativo:**
   - La obra arquitectónica necesita respirar. Implementamos encuadres de proporciones amplias (16:10 y 4:3) con descansos visuales sobre fondos neutros minerales (`#F7F5F0` y `#EDEAE3`), evitando amontonar tarjetas idénticas.
2. **Ficha Técnica Estructurada (Sidebar Sticky):**
   - Inspirada en la presentación de proyectos de Moon Safari, la ficha técnica acompaña la lectura descriptiva con datos cuantitativos clave (año, superficie, cantería, ingeniería) sin competir con la narrativa editorial.
3. **Navegación Continua entre Obras ("Siguiente Obra"):**
   - Al pie de cada caso de proyecto se incluye una tarjeta de enlace directo a la obra siguiente, permitiendo al cliente continuar explorando el portafolio sin necesidad de regresar al índice general.

---

### 2. Adaptación Obligatoria para Móvil

- **Ficha Técnica Compacta:** En pantallas menores a 960px, la ficha técnica lateral pasa a colocarse sobre la memoria descriptiva en un formato compacto con espaciado optimizado.
- **Márgenes Dinámicos:** Se utilizaron márgenes adaptativos mediante `clamp(1.25rem, 4vw, 3rem)` para que en pantallas de 320px a 414px la fotografía ocupe el máximo ancho visual sin generar desbordamiento horizontal.
- **Navegación Táctil Limpia:** Todo elemento clickeable posee un área táctil mínima de 44px de altura.

---

### 3. Decisión Descartada y Justificación Técnica

- **Descarte de navegación WebGL / Canvas invasivos:**
  - Se descartaron menús en canvas 3D y cursores magnéticos personalizados que dificultaban la lectura y la navegación asistida en dispositivos táctiles. Se priorizó el scroll nativo y el rendimiento a 60 fps en cualquier dispositivo.

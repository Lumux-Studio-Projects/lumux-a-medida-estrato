# Estrato — diseño del sitio

Dirección editorial de arquitectura inspirada en la escala tipográfica y fotografía de Halcyon y la navegación por obras de TARQ. Usar los datos propios y las fotografías existentes, sin copiar activos de las referencias.

## Sistema compartido
- Arena cálida, carbón y acento terracota. Valores en `tokens.css`.
- Syne 500: títulos geométricos con carácter. Manrope 400: cuerpo legible. Bodoni Moda normal: declaración fotográfica.
- Portada: composición fotográfica inmersiva con dos líneas desplazadas, selector manual de tres obras, sin avance automático.
- Índices: composiciones abiertas, imágenes grandes, pies de foto sin cajas, catálogo con filtros.
- Fichas: fotografía dominante, metadatos y texto separados, secuencia fotográfica y siguiente proyecto.
- Navegación fija: marca a la izquierda, enlaces a la derecha y fondo sólido al desplazar; menú móvil en dialog nativo. Modo claro/oscuro persistente.
- Footer: invitación con flecha circular, directorio de contacto, navegación y sedes; firma Estrato de gran formato al final con máscara de degradado y desenfoque suave. Conservar identificación de la plantilla y del sitio como demo.
- GSAP ScrollTrigger para entradas tipográficas, movimiento de marcos sin recortar las fotos y trazos SVG arquitectónicos; Lenis en el mismo ticker. Respetar movimiento reducido y cambio de preferencia.
- Formularios con etiquetas, errores asociados, validación local y resumen de demostración.
- Rutas y colecciones de contenido existentes se conservan.

## Exports
La exportación CSS canónica es `tokens.css`; importada por `src/styles/redesign.css`. Proyecto Astro sin Tailwind ni shadcn.

- Fotos de tarjetas, servicios, proceso y galerías en marcos 3:2; panoramas en 16:9, con altura limitada. Fotografías que llenan el marco con object-fit cover, sin márgenes internos ni deformación; brillo suave y entrada del marco con GSAP. Filas alineadas sin desplazamiento alternado; galerías en dos columnas y última imagen impar a ancho completo.
- Flechas SVG compartidas: salida y entrada diagonal al hover y foco.
- Acordeones agrupados: como máximo uno abierto en cada sección.

# CLAUDE.md — DakyLabs / paginaBlog

## Proyecto

Sitio web personal y blog técnico de **Santino Suntaxi (DakyLabs)**.
Stack: **Astro 6 · TypeScript · CSS puro · GitHub Pages**.
Dominio: `dakylabs.com` · Output: estático (`output: 'static'`).

## Comandos esenciales

```bash
npm run dev      # servidor local — http://localhost:4321
npm run build    # genera /dist
npm run preview  # sirve /dist localmente
```

> Siempre verificar el sitio con `npm run dev` antes de reportar una tarea visual como completada.

## Estructura del proyecto

```
src/
  components/     # BlogCard, Footer, Header, Hero, ServiceCard, TableOfContents
  content/
    blog/         # artículos .md — un archivo por post
      _plantilla.md   # plantilla canónica — usar como referencia
  layouts/        # BaseLayout.astro, BlogPostLayout.astro
  pages/          # index, blog/index, blog/[slug], servicios, eventos
  styles/
    global.css    # única fuente de verdad para variables CSS y estilos globales
  content.config.ts  # schema Zod del blog
public/
  images/         # imágenes estáticas
astro.config.mjs  # site: dakylabs.com, output: static
```

## Schema de artículos del blog

Definido en [`src/content.config.ts`](src/content.config.ts):

```ts
title: z.string();
description: z.string(); // frase única — aparece en cards y SEO
pubDate: z.coerce.date(); // formato: YYYY-MM-DD
category: z.enum(["GCP", "Workspace", "IA", "ciberseguridad"]);
author: z.string().default("DakyLabs");
draft: z.boolean().default(false);
```

Nuevo artículo: copiar [`src/content/blog/_plantilla.md`](src/content/blog/_plantilla.md), nombre en **kebab-case**, `draft: false` para publicar.

## Variables CSS globales

Definidas en `src/styles/global.css`. Usar las variables existentes — no crear valores hardcoded:

```css
--accent          /* rojo DakyLabs: rgb(192, 20, 42) */
--accent-subtle
--text-primary
--text-secondary
--text-muted
--border-subtle
--font-mono
```

## Convenciones de código

- **Sin frameworks de componentes** (no React, no Vue). Solo `.astro` y CSS puro.
- **Sin librerías CSS externas** (no Tailwind, no Bootstrap). Variables CSS propias.
- Los estilos de página van en `<style>` al final del archivo `.astro`, con alcance local.
- Los estilos globales y reutilizables van en `global.css`.
- Preferir editar archivos existentes antes de crear nuevos.
- No añadir comentarios en código autoexplicativo.
- No añadir manejo de errores para casos imposibles.

## Responsive

Breakpoints usados en el proyecto:

```css
@media (max-width: 1024px) {
  /* tablet */
}
@media (max-width: 768px) {
  /* mobile */
}
```

## Deploy

El sitio se despliega en GitHub Pages desde `/dist`. El archivo `dist/CNAME` contiene `dakylabs.com` — no eliminarlo ni sobrescribirlo manualmente.

## Tono del contenido

El blog habla en **español** con voz directa y técnica. El autor tiene background en seguridad informática, DevOps y ahora Cloud/ML en GCP. El contenido está dirigido a la comunidad técnica latinoamericana.

## Lo que NO hacer

- No instalar dependencias sin consultar primero.
- No modificar `dist/` directamente — ese directorio lo genera `astro build`.
- No crear archivos de documentación `.md` adicionales a menos que se pidan explícitamente.
- No añadir animaciones, transiciones ni estilos decorativos no solicitados.
- No cambiar categorías del blog sin actualizar el enum en `content.config.ts`.

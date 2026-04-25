// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['GCP', 'Workspace', 'IA', 'Ciberseguridad', 'Open Source']),
    author: z.string().default('DakyLabs'),
    draft: z.boolean().default(false),
    image: z.string().optional(),      // ruta a /public/images/posts/foto.jpg
    featured: z.boolean().default(false), // marca el artículo como destacado
  }),
});

export const collections = { blog };

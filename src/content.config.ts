import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('photo'),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('gallery'),
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        }),
      )
      .min(2),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('text'),
    body: z.string(),
  }),
  z.object({
    type: z.literal('embed'),
    url: z.string(),
    aspect: z.string().default('16/9'),
    caption: z.string().optional(),
  }),
]);

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    frameNo: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    settings: z.string().optional(),
    cover: z.enum(['a', 'b', 'c', 'd', 'e', 'f']).default('a'),
    coverImage: z.string().optional(),
    blocks: z.array(blockSchema).default([]),
    draft: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

const cvEntrySchema = z.object({
  year: z.string(),
  title: z.string(),
  venue: z.string().optional(),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string().optional(),
    exhibitions: z.array(cvEntrySchema).default([]),
    experience: z.array(cvEntrySchema).default([]),
  }),
});

export const collections = { work, journal, about };

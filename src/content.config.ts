import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),

  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    order: z.number().default(99),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    links: z.object({
      demo: z.string().url().or(z.string().startsWith("/")).optional(),
      source: z.string().url().optional(),
      article: z.string().url().or(z.string().startsWith("/")).optional(),
    }).default({}),
  }),
});


export const collections = {
  blog,
  projects
};

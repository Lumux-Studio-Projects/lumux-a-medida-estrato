import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    lead: z.string(),
    category: z.string(),
    deliverables: z.array(z.string()),
    phases: z.array(z.object({
      step: z.string(),
      title: z.string(),
      description: z.string()
    })),
    requiredMaterials: z.array(z.string()),
    coverImage: z.string(),
    featuredProjectsSlugs: z.array(z.string()),
    ctaLabel: z.string()
  })
});

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.string(),
    year: z.number(),
    location: z.string(),
    area: z.string(),
    serviceSlug: z.string(),
    featured: z.boolean().default(false),
    lead: z.string(),
    designDecisions: z.string(),
    materials: z.array(z.string()),
    heroImage: z.string(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional()
    })),
    credits: z.object({
      leadArchitect: z.string(),
      structuralEngineering: z.string(),
      photography: z.string()
    })
  })
});

export const collections = {
  services: servicesCollection,
  projects: projectsCollection
};

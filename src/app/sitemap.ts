import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/galleries`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/artists`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/history`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  // Posts
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 500,
    depth: 0,
  })
  const postRoutes: MetadataRoute.Sitemap = posts.docs.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}

import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { env } from '@/lib/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.BETTER_AUTH_URL

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/conferences`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/mon-programme`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/compte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/connexion`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/inscription`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const conferences = await db.query.conference.findMany({
    columns: {
      id: true,
      updatedAt: true,
      createdAt: true,
    },
  })

  const conferenceRoutes: MetadataRoute.Sitemap = conferences.map((conf) => ({
    url: `${baseUrl}/conferences/${conf.id}`,
    lastModified: conf.updatedAt || conf.createdAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...conferenceRoutes]
}

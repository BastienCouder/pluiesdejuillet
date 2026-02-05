import { MetadataRoute } from 'next'
import { env } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/compte', '/mon-programme', '/api/*'],
    },
    sitemap: `${env.BETTER_AUTH_URL}/sitemap.xml`,
  }
}

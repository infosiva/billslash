import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://billslash.app', lastModified: new Date(), priority: 1.0 },
    { url: 'https://billslash.app/negotiate', lastModified: new Date(), priority: 0.9 },
    { url: 'https://billslash.app/savings', lastModified: new Date(), priority: 0.7 },
  ]
}

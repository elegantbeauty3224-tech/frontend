import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.elegant-beauty.xyz/',
      lastModified: new Date('2026-11-01'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}

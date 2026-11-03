import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.elegant-beauty.xyz';
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://backend-nine-kohl-67.vercel.app/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${BACKEND_URL}/products?limit=100`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const productRoutes: MetadataRoute.Sitemap = json.data.map((prod: any) => ({
          url: `${SITE_URL}/product/${encodeURIComponent(prod._id || prod.id)}`,
          lastModified: prod.updatedAt ? new Date(prod.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
        return [...staticRoutes, ...productRoutes];
      }
    }
  } catch {
    // Fallback safely to static routes if backend fetch fails
  }

  return staticRoutes;
}

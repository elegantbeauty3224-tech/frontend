import { Metadata } from 'next';
import { fallbackProducts } from '@/data/fallbackProducts';

const SITE_URL = 'https://www.elegant-beauty.xyz';
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://backend-nine-kohl-67.vercel.app/api';

export function toAbsoluteImageUrl(img?: string): string {
  if (!img) return `${SITE_URL}/banner.jpeg`;
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img;
  }
  const clean = img.startsWith('/') ? img : `/${img}`;
  return `${SITE_URL}${clean}`;
}

export interface FetchedProductData {
  id: string;
  title: string;
  englishTitle?: string;
  category?: string;
  salePrice: number;
  regularPrice?: number;
  discountPercent?: number;
  description?: string;
  image: string;
}

export async function fetchServerProduct(identifier: string): Promise<FetchedProductData | null> {
  const cleanId = decodeURIComponent(identifier).trim();
  if (!cleanId) return null;

  // 1. Prioritize live backend API product data
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${BACKEND_URL}/products/${encodeURIComponent(cleanId)}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        const coverImg =
          d.images?.[0] ||
          (d.variants && d.variants[0]?.image) ||
          (d.variants && d.variants[0]?.images?.[0]) ||
          '/banner.jpeg';

        return {
          id: d._id || d.id || cleanId,
          title: d.title || 'পণ্য',
          englishTitle: d.englishTitle || '',
          category: d.category || 'Lifestyle',
          salePrice: Number(d.salePrice) || 0,
          regularPrice: Number(d.regularPrice) || 0,
          discountPercent:
            Number(d.discountPercent) ||
            (d.regularPrice ? Math.round(((d.regularPrice - d.salePrice) / d.regularPrice) * 100) : 0),
          description: d.description || d.shortDescription || '',
          image: toAbsoluteImageUrl(coverImg),
        };
      }
    }
  } catch {
    // If backend fetch times out or fails
  }

  // 2. Fallback only if database is offline or product matches
  const localMatch = fallbackProducts.find(
    (p) =>
      p.id.toLowerCase() === cleanId.toLowerCase() ||
      p.title.toLowerCase() === cleanId.toLowerCase() ||
      (p.englishTitle && p.englishTitle.toLowerCase().includes(cleanId.toLowerCase()))
  );

  if (localMatch) {
    return {
      id: localMatch.id,
      title: localMatch.title,
      englishTitle: localMatch.englishTitle,
      category: localMatch.category,
      salePrice: localMatch.salePrice,
      regularPrice: localMatch.regularPrice,
      discountPercent: localMatch.discountPercent,
      description: localMatch.description,
      image: toAbsoluteImageUrl(localMatch.image),
    };
  }

  return null;
}

export async function getProductMetadata(identifier: string): Promise<Metadata> {
  const product = await fetchServerProduct(identifier);

  if (!product) {
    return {
      title: 'Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন',
      description: 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি ও দ্রুত হোম ডেলিভারি।',
    };
  }

  const title = `${product.title} - Elegant Beauty`;
  const cleanDesc = (product.description || '').replace(/[\r\n]+/g, ' ').slice(0, 150);
  const description = `মূল্য: ৳${Number(product.salePrice).toLocaleString()} ${
    product.discountPercent ? `(${product.discountPercent}% ছাড়)` : ''
  } | ${cleanDesc}... সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।`;
  const canonicalUrl = `${SITE_URL}/?product=${encodeURIComponent(product.id)}`;
  const absoluteImage = toAbsoluteImageUrl(product.image);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Elegant Beauty',
      type: 'website',
      locale: 'bn_BD',
      alternateLocale: ['en_US'],
      images: [
        {
          url: absoluteImage,
          secureUrl: absoluteImage,
          width: 1200,
          height: 630,
          alt: product.title,
          type: absoluteImage.endsWith('.png') ? 'image/png' : 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
      creator: '@ElegantBeauty',
    },
    other: {
      'product:price:amount': String(product.salePrice),
      'product:price:currency': 'BDT',
      'og:price:amount': String(product.salePrice),
      'og:price:currency': 'BDT',
    },
  };
}


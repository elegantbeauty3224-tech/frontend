import { NextResponse } from 'next/server';

const CLOUD_BACKEND_URL = 'https://backend-nine-kohl-67.vercel.app/api';

function cleanBackendUrl(url?: string): string {
  if (!url) return CLOUD_BACKEND_URL;
  let clean = url.trim().replace(/\/+$/, '');
  if (!clean.endsWith('/api')) {
    clean = `${clean}/api`;
  }
  return clean;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const identifier = encodeURIComponent(resolvedParams.id || '');
    if (!identifier) {
      return NextResponse.json(
        { success: false, message: 'Product ID required' },
        { status: 400 }
      );
    }

    const primaryUrl = cleanBackendUrl(
      process.env.BACKEND_API_URL ||
        (process.env.NODE_ENV === 'production' ? CLOUD_BACKEND_URL : 'http://localhost:5000/api')
    );

    // 1. Try Primary Backend
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${primaryUrl}/products/${identifier}`, {
        cache: 'no-store',
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch (err: any) {
      console.warn(`Primary backend product fetch failed: ${err.message}`);
    }

    // 2. Failover to Cloud Backend
    if (primaryUrl !== CLOUD_BACKEND_URL) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${CLOUD_BACKEND_URL}/products/${identifier}`, {
          cache: 'no-store',
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        clearTimeout(timeout);

        if (res.ok) {
          const data = await res.json();
          return NextResponse.json(data);
        }
      } catch (err: any) {
        console.warn(`Cloud fallback product fetch failed: ${err.message}`);
      }
    }

    return NextResponse.json(
      { success: false, message: 'পণ্যটি খুঁজে পাওয়া যায়নি (Product not found)' },
      { status: 404 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}

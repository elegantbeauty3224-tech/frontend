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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '100';
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const primaryUrl = cleanBackendUrl(
    process.env.BACKEND_API_URL ||
      (process.env.NODE_ENV === 'production' ? CLOUD_BACKEND_URL : 'http://localhost:5000/api')
  );

  const queryString = `page=${page}&limit=${limit}&category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`;

  // 1. Attempt Primary Backend Fetch
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${primaryUrl}/products?${queryString}`, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Accept: 'application/json',
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });
    }
  } catch (err: any) {
    console.warn(`Primary backend (${primaryUrl}) unavailable:`, err.message);
  }

  // 2. Failover to Live Cloud Backend if primary is different and failed
  if (primaryUrl !== CLOUD_BACKEND_URL) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const fallbackRes = await fetch(`${CLOUD_BACKEND_URL}/products?${queryString}`, {
        cache: 'no-store',
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Accept: 'application/json',
        },
      });
      clearTimeout(timeout);

      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        return NextResponse.json(data, {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });
      }
    } catch (err: any) {
      console.warn('Fallback cloud backend also unavailable:', err.message);
    }
  }

  // 3. Graceful Empty Catalog Response (Status 200 to prevent console 404/503 errors)
  return NextResponse.json(
    {
      success: true,
      count: 0,
      totalCount: 0,
      totalPages: 1,
      currentPage: Number(page) || 1,
      data: [],
      warning: 'Backend currently unreachable, safely returned empty catalog.',
    },
    { status: 200 }
  );
}

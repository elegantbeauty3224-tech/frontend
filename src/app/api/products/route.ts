import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '100';
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

  try {
    // Always fetch fresh real-time products with zero caching to reflect admin additions immediately on refresh
    const res = await fetch(
      `${backendUrl}/products?page=${page}&limit=${limit}&category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`,
      {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache'
        }
      }
    );

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });
    } else {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, message: err.message || 'Failed to fetch from backend', data: [] },
        { status: res.status }
      );
    }
  } catch (err: any) {
    console.error('Backend connection error in /api/products:', err.message);
    return NextResponse.json(
      { success: false, message: 'Backend server is not reachable: ' + err.message, data: [] },
      { status: 503 }
    );
  }
}



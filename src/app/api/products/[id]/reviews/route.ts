import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${backendUrl}/products/${id}/reviews`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error('Error in GET /api/products/[id]/reviews:', err.message);
    return NextResponse.json(
      { success: false, message: 'Server error fetching reviews: ' + err.message, data: [] },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

  try {
    const body = await req.json();

    const res = await fetch(`${backendUrl}/products/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error('Error in POST /api/products/[id]/reviews:', err.message);
    return NextResponse.json(
      { success: false, message: 'Server error posting review: ' + err.message },
      { status: 500 }
    );
  }
}


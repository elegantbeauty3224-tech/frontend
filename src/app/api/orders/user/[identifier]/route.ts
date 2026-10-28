import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    const resolvedParams = await params;
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';
    const identifier = encodeURIComponent(resolvedParams.identifier || '');

    const res = await fetch(`${backendUrl}/orders/user/${identifier}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'ইউজার অর্ডার লোড করা সম্ভব হয়নি।' },
      { status: 500 }
    );
  }
}


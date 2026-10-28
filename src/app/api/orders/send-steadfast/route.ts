import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

  try {
    const body = await request.json();

    const res = await fetch(`${backendUrl}/orders/send-steadfast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error('Error forwarding to /api/orders/send-steadfast:', err.message);
    return NextResponse.json(
      { success: false, message: 'Backend service unreachable: ' + err.message },
      { status: 503 }
    );
  }
}


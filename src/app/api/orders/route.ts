import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

    // Capture user metadata from Next.js request headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    let deviceType = 'Desktop';
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
      deviceType = 'Mobile';
    } else if (/ipad|tablet/i.test(userAgent)) {
      deviceType = 'Tablet';
    }

    const payload = {
      ...body,
      ipAddress: body.ipAddress || ipAddress,
      userAgent: body.userAgent || userAgent,
      deviceType: body.deviceType || deviceType,
      referrer: body.referrer || referrer,
    };

    const res = await fetch(`${backendUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ipAddress,
        'user-agent': userAgent,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'অর্ডার প্রসেস করতে ব্যর্থ হয়েছে।' },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Order API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'সার্ভারের সাথে যোগাযোগ করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

    const res = await fetch(`${backendUrl}/orders?${searchParams.toString()}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message, data: [] }, { status: 500 });
  }
}

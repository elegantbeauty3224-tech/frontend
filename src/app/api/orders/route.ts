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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const primaryUrl = cleanBackendUrl(process.env.BACKEND_API_URL || 'http://localhost:5000/api');

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
      userId: body.userId || (body.phoneNumber ? `guest_${String(body.phoneNumber).replace(/\D/g, '')}` : `guest_${Date.now()}`),
      ipAddress: body.ipAddress || ipAddress,
      userAgent: body.userAgent || userAgent,
      deviceType: body.deviceType || deviceType,
      referrer: body.referrer || referrer,
    };

    // 1. Try Primary Backend
    let res: Response | null = null;
    try {
      res = await fetch(`${primaryUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': ipAddress,
          'user-agent': userAgent,
        },
        body: JSON.stringify(payload),
      });
    } catch (err: any) {
      console.warn(`Primary backend orders post failed: ${err.message}`);
    }

    // 2. Failover to Cloud Backend if primary failed
    if ((!res || !res.ok) && primaryUrl !== CLOUD_BACKEND_URL) {
      try {
        res = await fetch(`${CLOUD_BACKEND_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': ipAddress,
            'user-agent': userAgent,
          },
          body: JSON.stringify(payload),
        });
      } catch (err: any) {
        console.warn(`Cloud fallback orders post failed: ${err.message}`);
      }
    }

    if (res) {
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        return NextResponse.json(data, { status: 201 });
      }
      return NextResponse.json(
        { success: false, message: data.message || 'অর্ডার প্রসেস করতে ব্যর্থ হয়েছে।' },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { success: false, message: 'সার্ভার সাময়িকভাবে ডাউন আছে। দয়া করে কিছুক্ষণ পর চেষ্টা করুন।' },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('Order creation proxy error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'সার্ভার ত্রুটি' },
      { status: 500 }
    );
  }
}

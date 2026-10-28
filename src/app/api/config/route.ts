import { NextResponse } from 'next/server';

const defaultConfig = {
  announcement: {
    enabled: true,
    badgeText: 'LIMITED OFFER',
    messageText: 'সীমিত সময়ের জন্য FLAT 50% DISCOUNT!',
    phoneText: 'Call Us 01648-439277',
    phoneNumber: '01648439277',
    whatsappNumber: '8801648439277',
    themeColor: '#12372A',
    textColor: '#FFFFFF',
    badgeBgColor: '#FBFADA',
    badgeTextColor: '#12372A',
    showPhone: true,
    showWhatsapp: true,
  },
};

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${backendUrl}/config`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.warn('Backend /config unreachable, using default:', err);
  }

  return NextResponse.json({ success: true, data: defaultConfig });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

    const res = await fetch(`${backendUrl}/config`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


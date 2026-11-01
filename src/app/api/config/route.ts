import { NextResponse } from 'next/server';

const defaultConfig = {
  announcement: {
    enabled: true,
    badgeText: 'হট ডিল 🔥',
    messageText: 'স্টক সীমিত! আপনার পছন্দের কালার বুকিং করুন এখনই!',
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
  categories: [
    { id: 'clothing', name: 'Clothing', isActive: true },
    { id: 'bags', name: 'Bags', isActive: true },
    { id: 'luggage', name: 'Luggage', isActive: true },
    { id: 'kids-baby', name: 'Kids & Baby', isActive: true },
    { id: 'beauty', name: 'Beauty Products', isActive: true },
    { id: 'general', name: 'General', isActive: true },
  ],
  deliveryLocations: [
    { id: 'inside_dhaka', name: 'ঢাকার ভিতরে', fee: 70, time: '২৪ থেকে ৪৮ ঘণ্টা', isDefault: true, isActive: true },
    { id: 'outside_dhaka', name: 'ঢাকার বাইরে', fee: 130, time: '২ থেকে ৩ দিন', isDefault: false, isActive: true },
  ],
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


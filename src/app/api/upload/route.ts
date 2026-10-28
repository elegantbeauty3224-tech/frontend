import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, name, apiKey: customKey } = body;

    if (!image) {
      return NextResponse.json({ success: false, message: 'Image base64 is required' }, { status: 400 });
    }

    const apiKey =
      customKey ||
      process.env.IMGBB_API_KEY ||
      '754d8fcb05936232d06f927a4a3a665d';

    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, '');

    const formData = new FormData();
    formData.append('image', cleanBase64);
    if (name) formData.append('name', name);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        data: {
          url: data.data.url,
          display_url: data.data.display_url,
          delete_url: data.data.delete_url,
        },
      });
    }

    return NextResponse.json({ success: false, message: data.error?.message || 'Upload failed' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


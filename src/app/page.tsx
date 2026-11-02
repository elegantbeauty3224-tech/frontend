import type { Metadata } from 'next';
import { LandingPageContent } from '@/components/LandingPageContent';
import { getProductMetadata } from '@/lib/serverProducts';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const productQuery =
    typeof params?.product === 'string'
      ? params.product
      : typeof params?.productId === 'string'
      ? params.productId
      : undefined;

  if (productQuery) {
    return await getProductMetadata(productQuery);
  }

  return {
    title: 'Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন - ক্যাশ অন ডেলিভারি বাংলাদেশ',
    description:
      'Elegant Beauty - ১৮-ইঞ্চি কেবিন লাগেজ (18-Inch Cabin Luggage), লাক্সারি লেডিস হ্যান্ডব্যাগ, প্রিমিয়াম জর্জেট পার্টি থ্রি-পিস ও বিউটি কেয়ার। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।',
    openGraph: {
      title: 'Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন - ক্যাশ অন ডেলিভারি বাংলাদেশ',
      description:
        '১৮-ইঞ্চি কেবিন লাগেজ, লাক্সারি লেডিস হ্যান্ডব্যাগ, প্রিমিয়াম থ্রি-পিস ও বিউটি কেয়ার। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি ও দ্রুত হোম ডেলিভারি।',
      url: 'https://www.elegant-beauty.xyz/',
      siteName: 'Elegant Beauty',
      type: 'website',
      locale: 'bn_BD',
      alternateLocale: ['en_US'],
      images: [
        {
          url: 'https://www.elegant-beauty.xyz/banner.jpeg',
          width: 1200,
          height: 800,
          alt: 'Elegant Beauty Marketing Banner',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন',
      description: '১৮-ইঞ্চি কেবিন লাগেজ, লেডিস হ্যান্ডব্যাগ ও থ্রি-পিস। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।',
      images: ['https://www.elegant-beauty.xyz/banner.jpeg'],
    },
  };
}

export default function Page() {
  return <LandingPageContent />;
}

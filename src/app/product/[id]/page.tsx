import type { Metadata } from 'next';
import { LandingPageContent } from '@/components/LandingPageContent';
import { getProductMetadata } from '@/lib/serverProducts';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  return await getProductMetadata(id);
}

export default function ProductPage() {
  return <LandingPageContent />;
}


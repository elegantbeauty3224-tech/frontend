export interface CartItem {
  cartItemId: string;
  productId: string;
  productTitle: string;
  image: string;
  variantName: string;
  colorCode: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface ProductVariant {
  name: string;
  colorCode: string;
  stock: number;
  image?: string;
  extraPrice?: number;
}

export interface ProductItem {
  id: string;
  title: string;
  englishTitle: string;
  category: 'Clothing' | 'Bags' | 'Luggage' | 'Kids & Baby' | 'Beauty Products' | string;
  regularPrice: number;
  salePrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: { key: string; value: string }[];
  sizes: string[];
  badge: string;
  stockQuantity?: number;
  variants: ProductVariant[];
}

export interface AnnouncementConfig {
  enabled: boolean;
  badgeText: string;
  messageText: string;
  phoneText: string;
  phoneNumber: string;
  whatsappNumber: string;
  themeColor: string;
  textColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
  showPhone: boolean;
  showWhatsapp: boolean;
}


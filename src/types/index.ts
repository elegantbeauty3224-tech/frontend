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

export interface ProductReview {
  id?: string;
  _id?: string;
  userName: string;
  userEmail?: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  isVerifiedBuyer?: boolean;
  createdAt?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  englishTitle: string;
  category: string;
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
  reviews?: ProductReview[];
}

export interface CategoryConfig {
  id: string;
  name: string;
  isActive?: boolean;
}

export interface DeliveryLocationConfig {
  id: string;
  name: string;
  fee: number;
  time?: string;
  isDefault?: boolean;
  isActive?: boolean;
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


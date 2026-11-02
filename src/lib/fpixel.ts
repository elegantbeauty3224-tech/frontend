export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '3835745096581127';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

/**
 * Standard PageView event
 * Triggered on website visit and route changes
 */
export const pageview = () => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

/**
 * Generic standard event tracking helper
 */
export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, options);
  }
};

/**
 * Generic custom event tracking helper
 */
export const customEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, options);
  }
};

/**
 * Triggered when a customer visits / views a product
 * Standard Meta event: ViewContent
 */
export const trackViewContent = (product: {
  id: string;
  title: string;
  englishTitle?: string;
  category?: string;
  salePrice: number;
  image?: string;
}) => {
  if (!product) return;
  event('ViewContent', {
    content_name: product.englishTitle || product.title,
    content_category: product.category || 'Ecommerce',
    content_ids: [String(product.id)],
    content_type: 'product',
    value: Number(product.salePrice) || 0,
    currency: 'BDT',
  });
};

/**
 * Triggered when a customer adds a product to the shopping cart
 * Standard Meta event: AddToCart
 */
export const trackAddToCart = (
  product: {
    id: string;
    title: string;
    category?: string;
    salePrice: number;
  },
  quantity = 1,
  variantName?: string
) => {
  if (!product) return;
  const qty = Number(quantity) || 1;
  const unitPrice = Number(product.salePrice) || 0;

  event('AddToCart', {
    content_name: product.title,
    content_category: product.category || 'Ecommerce',
    content_ids: [String(product.id)],
    content_type: 'product',
    value: unitPrice * qty,
    currency: 'BDT',
    contents: [
      {
        id: String(product.id),
        quantity: qty,
        item_price: unitPrice,
        variant: variantName || 'Default',
      },
    ],
  });
};

/**
 * Triggered when a customer clicks order / proceeds to checkout
 * Standard Meta event: InitiateCheckout & custom ClickOrder
 */
export const trackInitiateCheckout = (
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
    variantName?: string;
  }>,
  totalValue: number
) => {
  if (!items || items.length === 0) return;
  const contentIds = items.map((it) => String(it.id));
  const numItems = items.reduce((sum, it) => sum + (Number(it.quantity) || 1), 0);

  event('InitiateCheckout', {
    content_name: items.length === 1 ? items[0].title : 'Order Checkout',
    content_ids: contentIds,
    content_type: 'product',
    value: Number(totalValue) || 0,
    currency: 'BDT',
    num_items: numItems,
    contents: items.map((it) => ({
      id: String(it.id),
      quantity: Number(it.quantity) || 1,
      item_price: Number(it.price) || 0,
    })),
  });

  // Explicit ClickOrder tracking for ads optimization
  customEvent('ClickOrder', {
    content_ids: contentIds,
    value: Number(totalValue) || 0,
    currency: 'BDT',
    num_items: numItems,
  });
};

/**
 * Triggered when a customer successfully completes a purchase
 * Standard Meta event: Purchase
 */
export const trackPurchase = (
  orderNumber: string,
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
  }>,
  totalAmount: number
) => {
  if (!items || items.length === 0) return;
  const contentIds = items.map((it) => String(it.id));
  const numItems = items.reduce((sum, it) => sum + (Number(it.quantity) || 1), 0);

  event('Purchase', {
    content_name: items.length === 1 ? items[0].title : 'Order Purchase',
    content_ids: contentIds,
    content_type: 'product',
    value: Number(totalAmount) || 0,
    currency: 'BDT',
    num_items: numItems,
    order_id: orderNumber,
    contents: items.map((it) => ({
      id: String(it.id),
      quantity: Number(it.quantity) || 1,
      item_price: Number(it.price) || 0,
    })),
  });
};


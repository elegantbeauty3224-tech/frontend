'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';

// Modular Components
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { BannerSection } from '@/components/BannerSection';
import { HeroIntro } from '@/components/HeroIntro';
import { CoreFeatures } from '@/components/CoreFeatures';
import { LifestyleGrid } from '@/components/LifestyleGrid';
import { MissionVision } from '@/components/MissionVision';
import { ProductCatalog } from '@/components/ProductCatalog';
import { CustomerReviews } from '@/components/CustomerReviews';
import { FaqSection } from '@/components/FaqSection';
import { OrderCtaBanner } from '@/components/OrderCtaBanner';
import { Footer } from '@/components/Footer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProductDetailsModal } from '@/components/ProductDetailsModal';
import { BannerLightbox } from '@/components/BannerLightbox';
import { CartDrawer } from '@/components/CartDrawer';
import { FloatingWidgets } from '@/components/FloatingWidgets';
import { SuccessReceiptModal } from '@/components/SuccessReceiptModal';
import { UserProfileModal } from '@/components/UserProfileModal';
import { useAuth } from '@/context/AuthContext';
import {
  trackViewContent,
  trackAddToCart,
  trackInitiateCheckout,
  trackPurchase,
} from '@/lib/fpixel';

// Types & Data
import { CartItem, ProductItem, ProductVariant, AnnouncementConfig, DeliveryLocationConfig, CategoryConfig, ProductReview } from '@/types';
import { fallbackProducts, productCategories } from '@/data/fallbackProducts';

export default function LandingPage() {
  // Live products catalog from database (initializes with fallbackProducts)
  const [productsList, setProductsList] = useState<ProductItem[]>(fallbackProducts);

  // Active selected product for hero / direct order
  const [currentProduct, setCurrentProduct] = useState<ProductItem>(fallbackProducts[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(fallbackProducts[0].variants[0]);
  const [selectedSize, setSelectedSize] = useState<string>(fallbackProducts[0].sizes[0] || 'Free Size');
  const [singleProductQty, setSingleProductQty] = useState<number>(1);

  // Per-card selected variant state for Product Catalog
  const [cardSelectedVariants, setCardSelectedVariants] = useState<Record<string, ProductVariant>>({});

  // Auth Context (Firebase Google Auth)
  const { user, isVerified } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modals & Drawers state
  const [inspectingProduct, setInspectingProduct] = useState<ProductItem | null>(null);
  const [isBannerZoomed, setIsBannerZoomed] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Site Origin for share links
  const [siteOrigin, setSiteOrigin] = useState('https://www.elegant-beauty.xyz');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSiteOrigin(window.location.origin);
    }
  }, []);

  // Shopping Cart State & LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('market_shop_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load cart from storage', e);
    }
  }, []);

  const saveCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('market_shop_cart', JSON.stringify(newCart));
    } catch (e) {
      console.warn('Failed to save cart to storage', e);
    }
  }, []);

  const triggerCartBump = useCallback(() => {
    setCartBump(true);
    setTimeout(() => setCartBump(false), 500);
  }, []);

  // Copy URL & Toast Feedback
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyProductUrl = useCallback((prod: ProductItem) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.elegant-beauty.xyz';
    const url = `${origin}/?product=${prod.id}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedId(prod.id);
    setCopyToast(`✅ "${prod.title.slice(0, 26)}..." এর বিস্তারিত লিংক কপি করা হয়েছে!`);
    setTimeout(() => {
      setCopyToast(null);
      setCopiedId(null);
    }, 4000);
  }, []);

  // Cart operations
  const addToCart = useCallback(
    (
      prod: ProductItem,
      variant?: ProductVariant | null,
      size?: string,
      qty = 1,
      openDrawer = true
    ) => {
      const chosenVariant = variant || prod.variants?.[0] || {
        name: 'ডিফল্ট',
        colorCode: '#12372A',
        stock: 20,
      };
      const chosenSize = size || prod.sizes?.[0] || 'Free Size';
      const cartItemId = `${prod.id}-${chosenVariant.name || 'Default'}-${chosenSize}`;

      // Meta Pixel: Track AddToCart event
      trackAddToCart(prod, qty, chosenVariant.name);

      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((it) => it.cartItemId === cartItemId);
        let updatedCart: CartItem[];

        if (existingIndex > -1) {
          updatedCart = [...prevCart];
          updatedCart[existingIndex].quantity += qty;
        } else {
          updatedCart = [
            ...prevCart,
            {
              cartItemId,
              productId: prod.id,
              productTitle: prod.title,
              image: chosenVariant.image || prod.image || '/banner.jpeg',
              variantName: chosenVariant.name,
              colorCode: chosenVariant.colorCode,
              size: chosenSize,
              quantity: qty,
              unitPrice: prod.salePrice,
            },
          ];
        }
        try {
          localStorage.setItem('market_shop_cart', JSON.stringify(updatedCart));
        } catch (e) {
          console.warn('Failed to save cart to storage', e);
        }
        return updatedCart;
      });

      triggerCartBump();
      setCopyToast(`🛍️ "${prod.title.slice(0, 22)}..." কার্টে যোগ হয়েছে!`);
      setTimeout(() => setCopyToast(null), 3000);

      if (openDrawer) {
        setIsCartOpen(true);
      }
    },
    [triggerCartBump]
  );

  const updateCartQuantity = useCallback(
    (cartItemId: string, delta: number) => {
      setCart((prevCart) => {
        const updated = prevCart
          .map((it) => {
            if (it.cartItemId === cartItemId) {
              const newQty = it.quantity + delta;
              return newQty > 0 ? { ...it, quantity: newQty } : null;
            }
            return it;
          })
          .filter(Boolean) as CartItem[];
        try {
          localStorage.setItem('market_shop_cart', JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to save cart', e);
        }
        return updated;
      });
      triggerCartBump();
    },
    [triggerCartBump]
  );

  const removeFromCart = useCallback(
    (cartItemId: string) => {
      setCart((prevCart) => {
        const updated = prevCart.filter((it) => it.cartItemId !== cartItemId);
        try {
          localStorage.setItem('market_shop_cart', JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to save cart', e);
        }
        return updated;
      });
      triggerCartBump();
    },
    [triggerCartBump]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const cartTotalItems = useMemo(() => {
    return cart.reduce((sum, it) => sum + it.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  }, [cart]);

  // Product Catalog Filtering & Pagination
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [liveCategories, setLiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    if (liveCategories.length > 0) {
      liveCategories.forEach((c) => cats.add(c));
    } else {
      productCategories.forEach((c) => {
        if (c !== 'All') cats.add(c);
      });
    }
    productsList.forEach((p) => {
      if (p.category && p.category.trim()) cats.add(p.category.trim());
    });
    return ['All', ...Array.from(cats)];
  }, [liveCategories, productsList]);

  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [productsList, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<string>('inside_dhaka');
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationConfig[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Dynamic Announcement Configuration
  const [announcement, setAnnouncement] = useState<AnnouncementConfig>({
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
  });

  // Fetch site announcements, categories, delivery locations, and live database products
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.announcement) {
            setAnnouncement(data.data.announcement);
          }
          if (Array.isArray(data.data.deliveryLocations) && data.data.deliveryLocations.length > 0) {
            setDeliveryLocations(data.data.deliveryLocations);
            const defaultLoc =
              data.data.deliveryLocations.find((l: any) => l.isDefault && l.isActive !== false) ||
              data.data.deliveryLocations.find((l: any) => l.isActive !== false) ||
              data.data.deliveryLocations[0];
            if (defaultLoc) {
              setDeliveryArea(defaultLoc.id);
            }
          }
          if (Array.isArray(data.data.categories) && data.data.categories.length > 0) {
            setLiveCategories(
              data.data.categories
                .filter((c: any) => c.isActive !== false)
                .map((c: any) => c.name)
            );
          }
        }
      })
      .catch(() => {});

    fetch('/api/products?limit=100', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: ProductItem[] = json.data.map((p: any) => {
            const variantImages = (p.variants || []).map((v: any) => v.image).filter(Boolean);
            const allProductImages = Array.from(new Set([...(p.images || []), ...variantImages])).filter(Boolean);
            const coverImage = p.images?.[0] || allProductImages[0] || '/banner.jpeg';

            return {
              id: p._id || p.id,
              title: p.title,
              englishTitle: p.englishTitle || '',
              category: p.category || 'Clothing',
              regularPrice: p.regularPrice || 0,
              salePrice: p.salePrice || 0,
              discountPercent:
                p.discountPercent ||
                (p.regularPrice ? Math.round(((p.regularPrice - p.salePrice) / p.regularPrice) * 100) : 0),
              rating: typeof p.rating === 'number' ? p.rating : 0,
              reviewsCount:
                typeof p.reviewCount === 'number'
                  ? p.reviewCount
                  : typeof p.reviewsCount === 'number'
                  ? p.reviewsCount
                  : Array.isArray(p.reviews)
                  ? p.reviews.length
                  : 0,
              image: coverImage,
              gallery: allProductImages.length > 0 ? allProductImages : ['/banner.jpeg'],
              description: p.description || '',
              features: p.features || [],
              specs:
                p.specifications && p.specifications.length > 0
                  ? p.specifications.map((s: any) => ({ key: s.key, value: s.value }))
                  : [
                      { key: 'ক্যাটাগরি', value: p.category || 'জনপ্রিয় পণ্য' },
                      { key: 'ডেলিভারি', value: 'সারা দেশে ক্যাশ অন ডেলিভারি' },
                    ],
              sizes: p.sizes && p.sizes.length > 0 ? p.sizes : ['Free Size'],
              badge: p.badges?.[0] || (p.isFeatured ? 'হট ডিল' : 'নতুন কালেকশন'),
              variants:
                p.variants && p.variants.length > 0
                  ? p.variants.map((v: any) => ({
                      name: v.name,
                      colorCode: v.colorCode || '#12372A',
                      stock: v.stock !== undefined ? v.stock : 20,
                      image: v.image || (v.images && v.images[0]) || '',
                      images: v.images && v.images.length > 0 ? v.images : (v.image ? [v.image] : []),
                      extraPrice: v.extraPrice || 0,
                    }))
                  : [{ name: 'ডিফল্ট', colorCode: '#12372A', stock: 20, image: '' }],
              reviews: Array.isArray(p.reviews) ? p.reviews : [],
            };
          });
          setProductsList(mapped);

          setCurrentProduct((prev) => {
            if (prev) {
              const refreshed = mapped.find((m) => m.id === prev.id);
              return refreshed || mapped[0];
            }
            return mapped[0];
          });

          setSelectedVariant((prev) => {
            if (prev) return prev;
            return mapped[0]?.variants[0] || { name: 'ডিফল্ট', colorCode: '#12372A', stock: 20 };
          });

          setSelectedSize((prev) => {
            if (prev) return prev;
            return mapped[0]?.sizes[0] || 'Free Size';
          });
        }
      })
      .catch((err) => console.warn('Could not fetch live products:', err));
  }, []);

  // Deep-linking: auto-open product modal if URL contains ?product=...
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product') || params.get('productId');
    if (productParam) {
      const matched =
        productsList.find(
          (p) =>
            p.id === productParam ||
            p.title === productParam ||
            (p.englishTitle && p.englishTitle.toLowerCase().includes(productParam.toLowerCase()))
        ) ||
        fallbackProducts.find(
          (p) =>
            p.id === productParam ||
            p.title === productParam ||
            (p.englishTitle && p.englishTitle.toLowerCase().includes(productParam.toLowerCase()))
        );
      if (matched) {
        setInspectingProduct(matched);
      }
    }
  }, [productsList]);

  // Meta Pixel: Track ViewContent when a customer visits / inspects a product
  useEffect(() => {
    if (inspectingProduct) {
      trackViewContent(inspectingProduct);
    }
  }, [inspectingProduct?.id]);

  // Checkout mode: 'cart' | 'single_product'
  const [checkoutMode, setCheckoutMode] = useState<'cart' | 'single_product'>('single_product');

  // Pricing calculations
  const isCartCheckout = checkoutMode === 'cart' && cart.length > 0;
  const activeQuantity = isCartCheckout ? cartTotalItems : singleProductQty;
  const subtotal = isCartCheckout
    ? cartSubtotal
    : currentProduct
    ? currentProduct.salePrice * singleProductQty
    : 0;
  const activeDeliveryLoc = deliveryLocations.find(
    (l) => l.id === deliveryArea && l.isActive !== false
  );
  const deliveryFee = activeDeliveryLoc
    ? activeDeliveryLoc.fee
    : deliveryArea === 'inside_dhaka'
    ? 70
    : 130;
  const totalAmount = subtotal + deliveryFee;

  // Navigation and Modal Helpers
  const scrollToGrid = useCallback(() => {
    setIsCheckoutModalOpen(false);
    const target = document.getElementById('products-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const openCheckout = useCallback(
    (mode: 'cart' | 'single_product' = 'single_product') => {
      setIsCartOpen(false);
      setInspectingProduct(null);
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', window.location.pathname);
      }
      setCheckoutMode(mode);
      setIsCheckoutModalOpen(true);

      // Meta Pixel: Track InitiateCheckout & ClickOrder event
      if (mode === 'cart' && cart.length > 0) {
        trackInitiateCheckout(
          cart.map((it) => ({
            id: it.productId,
            title: it.productTitle,
            price: it.unitPrice,
            quantity: it.quantity,
            variantName: it.variantName,
          })),
          cartSubtotal
        );
      } else if (currentProduct) {
        trackInitiateCheckout(
          [
            {
              id: currentProduct.id,
              title: currentProduct.title,
              price: currentProduct.salePrice,
              quantity: singleProductQty,
              variantName: selectedVariant?.name,
            },
          ],
          currentProduct.salePrice * singleProductQty
        );
      }
    },
    [cart, cartSubtotal, currentProduct, selectedVariant?.name, singleProductQty]
  );

  const openProductDetails = useCallback(
    (prod: ProductItem, preselectedVariant?: ProductVariant) => {
      setInspectingProduct(prod);
      trackViewContent(prod);
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `/?product=${prod.id}`);
      }
    },
    []
  );

  const closeProductDetails = useCallback(() => {
    setInspectingProduct(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleReviewSubmitted = useCallback(
    (productId: string, newReview: ProductReview, newRating?: number, newCount?: number) => {
      setProductsList((prev) =>
        prev.map((p) => {
          if (p.id === productId) {
            const updatedReviews = [newReview, ...(p.reviews || [])];
            return {
              ...p,
              reviews: updatedReviews,
              rating: newRating !== undefined ? newRating : p.rating,
              reviewsCount: newCount !== undefined ? newCount : p.reviewsCount + 1,
            };
          }
          return p;
        })
      );
      setInspectingProduct((prev) => {
        if (prev && prev.id === productId) {
          const updatedReviews = [newReview, ...(prev.reviews || [])];
          return {
            ...prev,
            reviews: updatedReviews,
            rating: newRating !== undefined ? newRating : prev.rating,
            reviewsCount: newCount !== undefined ? newCount : prev.reviewsCount + 1,
          };
        }
        return prev;
      });
    },
    []
  );

  const selectAndOrderProduct = useCallback(
    (
      prod: ProductItem,
      variant?: ProductVariant | null,
      size?: string,
      qty: number = 1
    ) => {
      const chosenVariant =
        variant ||
        cardSelectedVariants[prod.id] ||
        prod.variants?.[0] || {
          name: 'ডিফল্ট',
          colorCode: '#12372A',
          stock: prod.stockQuantity || 10,
        };
      const chosenSize = size || prod.sizes?.[0] || 'Free Size';
      const orderQty = qty > 0 ? qty : 1;

      setCurrentProduct(prod);
      setSelectedVariant(chosenVariant);
      setSelectedSize(chosenSize);
      setSingleProductQty(orderQty);
      setCheckoutMode('single_product');

      // Meta Pixel: Track InitiateCheckout & ClickOrder event
      trackInitiateCheckout(
        [
          {
            id: prod.id,
            title: prod.title,
            price: prod.salePrice,
            quantity: orderQty,
            variantName: chosenVariant.name,
          },
        ],
        prod.salePrice * orderQty
      );

      // Do NOT add to cart! User requirement:
      // "when user opens order modal, product will not add to add to cart okay"

      closeProductDetails();
      setIsCartOpen(false);
      setIsCheckoutModalOpen(true);
    },
    [cardSelectedVariants, closeProductDetails]
  );

  const handleSelectCardVariant = useCallback((productId: string, variant: ProductVariant) => {
    setCardSelectedVariants((prev) => ({
      ...prev,
      [productId]: variant,
    }));
  }, []);

  // Form submission handler
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Enforce login requirement: User must be logged in to order
    if (!user) {
      setErrorMsg('অর্ডার করতে অনুগ্রহ করে প্রথমে আপনার Google অ্যাকাউন্ট দিয়ে লগইন করুন।');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম প্রদান করুন।');
      return;
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন (যেমন: 01712345678)।');
      return;
    }

    if (customerEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerEmail.trim())) {
        setErrorMsg('অনুগ্রহ করে একটি সঠিক ইমেইল অ্যাড্রেস প্রদান করুন (যেমন: name@example.com)।');
        return;
      }
    }

    const cleanAddress = deliveryAddress.trim();
    const addressWords = cleanAddress.split(/[\s,]+/).filter(Boolean).length;
    if (cleanAddress.length < 15 || addressWords < 3) {
      setErrorMsg('অনুগ্রহ করে সম্পূর্ণ বিস্তারিত ঠিকানা প্রদান করুন (যেমন: বাসা নং, রোড নং, এলাকা/গ্রাম, থানা ও জেলা)। শুধুমাত্র শহর বা থানার নাম লিখলে কুরিয়ার ডেলিভারি সম্ভব নয়।');
      return;
    }

    setIsSubmitting(true);

    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    let deviceType = 'Desktop';
    if (/mobile/i.test(userAgent)) {
      deviceType = 'Mobile';
    } else if (/ipad|tablet/i.test(userAgent)) {
      deviceType = 'Tablet';
    }

    const orderItems = isCartCheckout
      ? cart.map((it) => ({
          product: it.productId,
          productTitle: it.productTitle,
          variantName: `${it.variantName} (সাইজ: ${it.size})`,
          colorCode: it.colorCode,
          size: it.size,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          totalPrice: it.unitPrice * it.quantity,
          image: it.image,
        }))
      : currentProduct
      ? [
          {
            product: currentProduct.id,
            productTitle: currentProduct.title,
            variantName: `${selectedVariant?.name || 'ডিফল্ট'} (সাইজ: ${selectedSize || 'Free Size'})`,
            colorCode: selectedVariant?.colorCode || '#12372A',
            size: selectedSize || 'Free Size',
            quantity: singleProductQty,
            unitPrice: currentProduct.salePrice,
            totalPrice: subtotal,
            image: selectedVariant?.image || currentProduct.image || '/banner.jpeg',
          },
        ]
      : [];

    const effectiveEmail = (user?.email || customerEmail).trim();

    const orderPayload = {
      customerName: customerName.trim(),
      customerEmail: effectiveEmail,
      email: effectiveEmail,
      phoneNumber: cleanPhone,
      deliveryAddress: cleanAddress,
      deliveryArea,
      deliveryFee,
      notes: notes.trim(),
      items: orderItems,
      subtotal,
      totalAmount,
      paymentMethod: 'Cash on Delivery (COD)',
      source: 'Elegant Beauty Facebook Landing Page',
      deviceType,
      referrer: typeof document !== 'undefined' && document.referrer ? document.referrer : 'Facebook Ads Direct',
      // Authenticated User fields (Firebase Google Login)
      userId: user?.uid || null,
      userEmail: effectiveEmail,
      isVerifiedUser: Boolean(user && (user.emailVerified || user.providerData?.some(p => p.providerId === 'google.com'))),
      customerPhoto: user?.photoURL || '',
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setIsCheckoutModalOpen(false);
        setCompletedOrder(data.data);
        if (isCartCheckout) {
          clearCart();
        }
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

        // Meta Pixel: Track Purchase event
        trackPurchase(
          data.data.orderNumber || 'EB-ORDER',
          orderItems.map((it) => ({
            id: String(it.product),
            title: it.productTitle,
            price: it.unitPrice,
            quantity: it.quantity,
          })),
          totalAmount
        );
      } else {
        setErrorMsg(data.message || 'অর্ডারে সমস্যা হয়েছে, পুনরায় চেষ্টা করুন।');
      }
    } catch (err: any) {
      console.error('Order submit error:', err);
      setErrorMsg(err.message || 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] font-sans antialiased selection:bg-amber-100 selection:text-amber-900 pb-20 md:pb-12">
      {/* Product JSON-LD Structured Data for Rich Snippets */}
      {currentProduct && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": currentProduct.title,
              "image": currentProduct.image?.startsWith('http')
                ? currentProduct.image
                : `https://www.elegant-beauty.xyz${currentProduct.image || '/banner.jpeg'}`,
              "description": currentProduct.description || "Elegant Beauty Premium Exclusive Collection",
              "brand": {
                "@type": "Brand",
                "name": "Elegant Beauty"
              },
              "offers": {
                "@type": "Offer",
                "url": `https://www.elegant-beauty.xyz/?product=${currentProduct.id}`,
                "priceCurrency": "BDT",
                "price": currentProduct.salePrice,
                "priceValidUntil": "2027-12-31",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Elegant Beauty"
                }
              },
              ...(currentProduct.reviewsCount > 0
                ? {
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: currentProduct.rating,
                      reviewCount: currentProduct.reviewsCount,
                    },
                  }
                : {})
            })
          }}
        />
      )}

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar announcement={announcement} />

      {/* 2. STICKY NAVBAR */}
      <Navbar
        cartTotalItems={cartTotalItems}
        cartBump={cartBump}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCheckout={() => openCheckout(cart.length > 0 ? 'cart' : 'single_product')}
        onScrollToGrid={scrollToGrid}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <main className="space-y-4 sm:space-y-6 pb-20 md:pb-8 overflow-x-hidden">
        {/* 3. HERO MARKETING BANNER */}
        <BannerSection
          onOpenLightbox={() => setIsBannerZoomed(true)}
          onOrderNow={() => openCheckout(cart.length > 0 ? 'cart' : 'single_product')}
          onScrollToGrid={scrollToGrid}
        />

        {/* 4. HERO INTRO & VALUE PROP */}
        <HeroIntro
          currentProduct={currentProduct}
          selectedVariant={selectedVariant}
          selectedSize={selectedSize}
          onSelectVariant={setSelectedVariant}
          onOrderNow={() => selectAndOrderProduct(currentProduct, selectedVariant, selectedSize)}
          onAddToCart={() => addToCart(currentProduct, selectedVariant, selectedSize, 1, true)}
          onScrollToGrid={scrollToGrid}
        />

        {/* 5. CORE FEATURES GRID */}
        <CoreFeatures />

        {/* 6. LIFESTYLE SUITABILITY */}
        <LifestyleGrid />

        {/* 7. MISSION & VISION */}
        <MissionVision />

        {/* 8. PRODUCTS CATALOG */}
        <ProductCatalog
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          paginatedProducts={paginatedProducts}
          totalFilteredCount={filteredProducts.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          currentProductId={currentProduct?.id}
          cardSelectedVariants={cardSelectedVariants}
          onSelectCardVariant={handleSelectCardVariant}
          onAddToCart={(prod, v, size) => addToCart(prod, v, size, 1, true)}
          onOrderNow={(prod, v, size) => selectAndOrderProduct(prod, v, size)}
          onOpenDetails={openProductDetails}
          onCopyLink={copyProductUrl}
          copiedId={copiedId}
        />

        {/* 9. CUSTOMER REVIEWS */}
        <CustomerReviews />

        {/* 10. FREQUENTLY ASKED QUESTIONS (SEO FAQ & HIGH CONVERSION) */}
        <FaqSection />

        {/* 11. CASH ON DELIVERY CTA BANNER */}
        <OrderCtaBanner
          onOpenCheckout={() => openCheckout(cart.length > 0 ? 'cart' : 'single_product')}
          onScrollToGrid={scrollToGrid}
        />
      </main>

      {/* 11. FOOTER */}
      <Footer />

      {/* 12. CHECKOUT MODAL (CASH ON DELIVERY) */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        customerName={customerName}
        setCustomerName={setCustomerName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        customerEmail={customerEmail}
        setCustomerEmail={setCustomerEmail}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        deliveryArea={deliveryArea}
        setDeliveryArea={setDeliveryArea}
        deliveryLocations={deliveryLocations}
        notes={notes}
        setNotes={setNotes}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        isSubmitting={isSubmitting}
        errorMsg={errorMsg}
        onSubmit={handleOrderSubmit}
        hasCartItems={isCartCheckout}
        cart={cart}
        onUpdateCartQuantity={updateCartQuantity}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        currentProduct={currentProduct}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        singleProductQty={singleProductQty}
        setSingleProductQty={setSingleProductQty}
        activeQuantity={activeQuantity}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        totalAmount={totalAmount}
        onAddMoreProducts={scrollToGrid}
      />

      {/* 13. PRODUCT DETAILS MODAL */}
      <ProductDetailsModal
        key={inspectingProduct?.id || 'none'}
        product={inspectingProduct}
        onClose={closeProductDetails}
        onAddToCart={addToCart}
        onOrderNow={selectAndOrderProduct}
        siteOrigin={siteOrigin}
        copiedId={copiedId}
        onCopyUrl={copyProductUrl}
        user={user}
        onReviewSubmitted={handleReviewSubmitted}
      />

      {/* 14. BANNER LIGHTBOX */}
      <BannerLightbox
        isOpen={isBannerZoomed}
        onClose={() => setIsBannerZoomed(false)}
      />

      {/* 15. SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotalItems={cartTotalItems}
        cartSubtotal={cartSubtotal}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => openCheckout('cart')}
        onExploreCollection={() => {
          setIsCartOpen(false);
          scrollToGrid();
        }}
      />

      {/* 16. FLOATING ACTIONS & PERSISTENT BARS */}
      <FloatingWidgets
        cartBump={cartBump}
        cartTotalItems={cartTotalItems}
        hasCartItems={cart.length > 0}
        cartSubtotal={cartSubtotal}
        subtotal={subtotal}
        totalAmount={totalAmount}
        copyToast={copyToast}
        onOpenCart={() => setIsCartOpen(true)}
        onOrderClick={() => openCheckout(cart.length > 0 ? 'cart' : 'single_product')}
      />

      {/* 17. SUCCESS RECEIPT MODAL */}
      <SuccessReceiptModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* 18. USER PROFILE & LIVE ORDER TRACKER MODAL */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onStartShopping={scrollToGrid}
      />
    </div>
  );
}

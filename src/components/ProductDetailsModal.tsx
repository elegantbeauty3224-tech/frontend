'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Share2,
  Check,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Send,
  UserCheck,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { ProductItem, ProductVariant, ProductReview } from '@/types';

interface ProductDetailsModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (
    product: ProductItem,
    variant: ProductVariant | null,
    size: string,
    quantity: number,
    openDrawer: boolean
  ) => void;
  onOrderNow: (
    product: ProductItem,
    variant: ProductVariant | null,
    size: string,
    quantity?: number
  ) => void;
  siteOrigin: string;
  copiedId: string | null;
  onCopyUrl: (product: ProductItem) => void;
  user?: any;
  onReviewSubmitted?: (productId: string, newReview: ProductReview, newRating?: number, newCount?: number) => void;
}

export const ProductDetailsModal = React.memo(function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  onOrderNow,
  siteOrigin,
  copiedId,
  onCopyUrl,
  user,
  onReviewSubmitted,
}: ProductDetailsModalProps) {
  const [activeImg, setActiveImg] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('Free Size');
  const [quantity, setQuantity] = useState<number>(1);

  // Review Form States
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewComment, setReviewComment] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string>('');
  const [reviewErrorMsg, setReviewErrorMsg] = useState<string>('');
  const [localReviews, setLocalReviews] = useState<ProductReview[]>([]);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  useEffect(() => {
    if (product) {
      const initialVariant = product.variants?.[0] || null;
      setSelectedVariant(initialVariant);
      const initialImg = initialVariant?.image || product.gallery?.[0] || product.image || '/banner.jpeg';
      setActiveImg(initialImg);
      setSelectedSize(product.sizes?.[0] || 'Free Size');
      setQuantity(1);
      setLocalReviews(product.reviews || []);
      setReviewRating(5);
      setReviewComment('');
      setReviewSuccessMsg('');
      setReviewErrorMsg('');
      if (user) {
        setReviewName(user.displayName || user.email?.split('@')[0] || '');
      }
    }
  }, [product, user]);

  if (!product) return null;

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.image) {
      setActiveImg(variant.image);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, selectedSize, quantity, true);
    onClose();
  };

  const handleOrderNow = () => {
    onOrderNow(product, selectedVariant, selectedSize, quantity);
  };

  const galleryImages = React.useMemo(() => {
    if (!product) return ['/banner.jpeg'];
    const imgs: string[] = [];
    if (product.gallery && product.gallery.length > 0) {
      imgs.push(...product.gallery);
    } else if (product.image) {
      imgs.push(product.image);
    }
    // Add variant images if they are not already in gallery
    if (product.variants) {
      product.variants.forEach((v) => {
        if (v.image && !imgs.includes(v.image)) {
          imgs.push(v.image);
        }
        if (v.images && Array.isArray(v.images)) {
          v.images.forEach((img) => {
            if (img && !imgs.includes(img)) imgs.push(img);
          });
        }
      });
    }
    return imgs.filter(Boolean).length > 0 ? Array.from(new Set(imgs)) : ['/banner.jpeg'];
  }, [product]);

  // Submit Review Handler
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewErrorMsg('');
    setReviewSuccessMsg('');

    const trimmedComment = reviewComment.trim();
    if (!trimmedComment) {
      setReviewErrorMsg('অনুগ্রহ করে আপনার মূল্যবান মতামত বা অভিজ্ঞতা লিখুন।');
      return;
    }

    const effectiveName = (reviewName.trim() || user?.displayName || user?.email?.split('@')[0] || 'সম্মানিত ক্রেতা').trim();

    setIsSubmittingReview(true);

    try {
      const res = await fetch(`/api/products/${product.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userName: effectiveName,
          userEmail: user?.email || '',
          userPhoto: user?.photoURL || '',
          rating: reviewRating,
          comment: trimmedComment,
          isVerifiedBuyer: Boolean(user),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const newReview: ProductReview = data.data || {
          userName: effectiveName,
          rating: reviewRating,
          comment: trimmedComment,
          isVerifiedBuyer: Boolean(user),
          createdAt: new Date().toISOString(),
        };

        setLocalReviews((prev) => [newReview, ...prev]);
        setReviewSuccessMsg('🎉 আপনার রিভিউ সফলভাবে প্রকাশিত হয়েছে! ধন্যবাদ।');
        setReviewComment('');

        if (onReviewSubmitted) {
          onReviewSubmitted(product.id, newReview, data.rating, data.reviewCount);
        }
      } else {
        setReviewErrorMsg(data.message || 'রিভিউ সাবমিট করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err: any) {
      setReviewErrorMsg('সার্ভারে সমস্যা হয়েছে: ' + (err.message || 'Error'));
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const ratingDescriptions: Record<number, string> = {
    1: '১ স্টার - ভালো লাগেনি',
    2: '২ স্টার - মোটামুটি',
    3: '৩ স্টার - ভালো',
    4: '৪ স্টার - চমৎকার',
    5: '৫ স্টার - অসাধারণ ও নিখুঁত!',
  };

  const displayReviewsCount = localReviews.length > 0 ? localReviews.length : (product.reviewsCount || 0);

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box w-[96%] sm:w-[92%] max-w-4xl bg-white text-slate-800 p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl relative max-h-[92vh] overflow-y-auto custom-scrollbar animate-fade-in">
        {/* Modal Header Actions (Copy Link + Close) */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1.5 sm:gap-2 z-10">
          <button
            type="button"
            onClick={() => onCopyUrl(product)}
            className={`btn btn-xs rounded-full gap-1.5 shadow-xs transition-all ${
              copiedId === product.id
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 border-0'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
            title="প্রোডাক্ট বিস্তারিত লিংক কপি করুন"
          >
            {copiedId === product.id ? (
              <>
                <Check size={13} />
                <span className="font-bold">লিংক কপিড!</span>
              </>
            ) : (
              <>
                <Share2 size={13} />
                <span className="font-bold">লিংক কপি করুন</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-slate-500 hover:text-slate-900"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Top Product Showcase (Gallery & Purchase Actions) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-2">
          {/* Left: Product Gallery */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
              <Image
                src={activeImg || product.image || '/banner.jpeg'}
                alt={product.title || 'Product'}
                fill
                unoptimized
                className="object-cover"
              />
              <span className="absolute top-2 left-2 badge bg-red-600 text-white font-bold text-xs border-0 shadow-sm">
                {product.discountPercent}% ছাড়
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(img)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all shrink-0 ${
                    activeImg === img
                      ? 'border-[#12372A] scale-95 shadow-md ring-2 ring-[#12372A]/30'
                      : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Gallery ${i}`} fill unoptimized className="object-cover" />
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <Award size={16} className="text-amber-600 shrink-0" />
                <span>১০০% অথেনটিক কোয়ালিটি</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details, Pricing & Variant Selection */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                {product.category}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1 leading-snug">
                {product.title}
              </h2>
              {product.englishTitle && (
                <p className="text-xs text-slate-500 font-medium">{product.englishTitle}</p>
              )}

              {/* Rating & Reviews Jump Link */}
              <div
                onClick={() => setActiveTab('reviews')}
                className="flex items-center gap-2 mt-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        product.rating > 0 && i < Math.round(product.rating)
                          ? 'fill-amber-400'
                          : 'text-slate-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 underline decoration-slate-300">
                  {displayReviewsCount > 0
                    ? `${product.rating} (${displayReviewsCount}টি কাস্টমার রিভিউ)`
                    : '০টি রিভিউ (প্রথম রিভিউ দিন)'}
                </span>
                <span className="badge badge-xs badge-success text-white font-bold">রিভিউ দিন</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="text-2xl font-black text-[#12372A]">৳{product.salePrice}</span>
              {product.regularPrice > product.salePrice && (
                <span className="text-sm text-slate-600 line-through font-medium">৳{product.regularPrice}</span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                সাশ্রয় ৳{product.regularPrice - product.salePrice}
              </span>
            </div>

            {/* Color Variant Selection */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5 flex items-center justify-between">
                <span>
                  কালার নির্বাচন করুন:{' '}
                  <span className="text-emerald-800 font-extrabold">{selectedVariant?.name || 'ডিফল্ট'}</span>
                </span>
                <span className="text-[10px] text-slate-400">ছবি দেখতে কালারে ক্লিক করুন</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => {
                  const isSelected = selectedVariant?.name === v.name;
                  const cleanName = v.name ? v.name.split(' (')[0] : 'ডিফল্ট';
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectVariant(v)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#12372A] bg-emerald-50 ring-2 ring-[#12372A]/20 font-bold shadow-xs text-[#12372A]'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {v.image ? (
                        <div className="relative w-5 h-5 rounded-md overflow-hidden border border-slate-300 shrink-0 shadow-2xs">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-2xs"
                          style={{ backgroundColor: v.colorCode }}
                        ></span>
                      )}
                      <span className="text-xs font-bold">{cleanName}</span>
                      {isSelected && <Check size={13} className="text-emerald-700 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">সাইজ নির্বাচন:</label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`btn btn-xs rounded-lg ${
                        selectedSize === s
                          ? 'btn-neutral bg-slate-900 text-white font-bold'
                          : 'btn-outline border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">পরিমাণ (Quantity):</span>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="btn btn-xs btn-square btn-ghost"
                  aria-label="পরিমাণ কমান"
                >
                  <Minus size={13} />
                </button>
                <span className="font-mono font-bold text-sm w-7 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="btn btn-xs btn-square btn-ghost"
                  aria-label="পরিমাণ বাড়ান"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-md bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl border-0 shadow-md gap-2 flex-1 w-full sm:w-auto"
              >
                <ShoppingCart size={18} />
                কার্টে যোগ করুন
              </button>

              <button
                type="button"
                onClick={handleOrderNow}
                className="btn btn-md bg-[#12372A] hover:bg-[#1a4a39] text-white font-black rounded-xl border-0 shadow-md gap-2 flex-1 w-full sm:w-auto"
              >
                <ShoppingBag size={18} />
                এখনই অর্ডার করুন (COD)
              </button>

              <a
                href={`https://wa.me/8801648439277?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম, আমি Elegant Beauty থেকে এই পণ্যটির বিস্তারিত জানতে চাই:\n${product.title}\nলিংক: ${siteOrigin}/?product=${product.id}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-md bg-[#25D366] hover:bg-[#20ba59] text-white border-0 rounded-xl w-full sm:w-auto flex items-center justify-center gap-2"
                title="হোয়াটসঅ্যাপে যোগাযোগ"
              >
                <MessageCircle size={18} />
                <span className="sm:hidden font-bold text-xs">WhatsApp এ মেসেজ দিন</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Details & Specs vs Customer Reviews */}
        <div className="border-t border-slate-200 mt-8 pt-4">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`flex-1 sm:flex-none py-2 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center ${
                activeTab === 'details'
                  ? 'bg-[#12372A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Sparkles size={15} />
              <span>বিস্তারিত ও স্পেসিফিকেশন</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 sm:flex-none py-2 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center ${
                activeTab === 'reviews'
                  ? 'bg-[#12372A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <MessageSquare size={15} />
              <span>কাস্টমার রিভিউ ({displayReviewsCount})</span>
            </button>
          </div>

          {/* TAB CONTENT 1: DETAILS, KEY FEATURES & WHY CHOOSE US */}
          {activeTab === 'details' && (
            <div className="space-y-6 pt-5 animate-fade-in">
              {/* Detailed Description */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#12372A] rounded-full inline-block"></span>
                  বিস্তারিত বিবরণ
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                  {product.description}
                </p>
              </div>

              {/* Key Features / Specifications Grid */}
              {product.specs && product.specs.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-500" />
                    Key Features (মূল স্পেসিফিকেশন)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                    {product.specs.map((sp, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors"
                      >
                        <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider block">
                          {sp.key}
                        </span>
                        <span className="font-bold text-xs text-slate-900 mt-1 block">
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose This / Features List */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-700" />
                    Why Choose This (প্রধান সুবিধাসমূহ)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100/70 text-xs text-slate-800"
                      >
                        <Check size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT 2: INDIVIDUAL PRODUCT REVIEWS & RATING FORM */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 pt-5 animate-fade-in">
              {/* Review Overview Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-amber-400">
                      {product.rating > 0 ? product.rating : '০.০'}
                    </div>
                    <div className="flex text-amber-400 justify-center sm:justify-start mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className={
                            product.rating > 0 && i < Math.round(product.rating)
                              ? 'fill-amber-400'
                              : 'text-emerald-700/60'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-emerald-200 mt-1 block">
                      {displayReviewsCount > 0
                        ? `সর্বমোট ${displayReviewsCount}টি ভেরিফাইড রিভিউ`
                        : 'এখনো কোনো রিভিউ দেওয়া হয়নি (প্রথম রিভিউ দিন)'}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-emerald-100 max-w-sm text-center sm:text-right">
                  পণ্যটি ব্যবহার করে আপনার মূল্যবান মতামত ও অভিজ্ঞতা আমাদের অন্যান্য গ্রাহকদের সাথে শেয়ার করুন।
                </div>
              </div>

              {/* Write a Review Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <MessageSquare size={16} className="text-emerald-700" />
                    আপনার রিভিউ ও রেটিং দিন
                  </h4>
                  {user && (
                    <span className="badge badge-sm badge-success text-white font-bold gap-1 text-[10px]">
                      <UserCheck size={12} /> লগইন ইউজার
                    </span>
                  )}
                </div>

                {reviewSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 animate-fade-in">
                    {reviewSuccessMsg}
                  </div>
                )}

                {reviewErrorMsg && (
                  <div className="p-3 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300 animate-fade-in">
                    {reviewErrorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-3">
                  {/* Rating Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      রেটিং নির্বাচন করুন:
                    </label>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((num) => {
                        const isFilled = (hoverRating || reviewRating) >= num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onMouseEnter={() => setHoverRating(num)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setReviewRating(num)}
                            className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-hidden"
                            title={`${num} Star`}
                          >
                            <Star
                              size={24}
                              className={isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-bold text-emerald-800 ml-2">
                        {ratingDescriptions[hoverRating || reviewRating]}
                      </span>
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        আপনার নাম *
                      </label>
                      <input
                        type="text"
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                        className="input input-sm input-bordered w-full rounded-xl bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        ইমেইল (ঐচ্ছিক)
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={user?.email || ''}
                        readOnly={Boolean(user?.email)}
                        className={`input input-sm input-bordered w-full rounded-xl text-xs ${
                          user?.email ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      আপনার মূল্যবান মতামত / রিভিউ *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="পণ্যটির কোয়ালিটি, ফেব্রিক বা ডেলিভারি কেমন লেগেছে তা বিস্তারিত লিখুন..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      className="textarea textarea-bordered w-full rounded-xl bg-white text-xs leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={isSubmittingReview || !reviewComment.trim()}
                      className="btn btn-sm bg-[#12372A] hover:bg-[#1a4a39] text-white font-bold rounded-xl gap-2 px-5 shadow-xs"
                    >
                      <Send size={14} />
                      {isSubmittingReview ? 'রিভিউ পোস্ট হচ্ছে...' : 'রিভিউ সাবমিট করুন'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-3 pt-2">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  ক্রেতাদের অভিজ্ঞতা ও রিভিউসমূহ ({localReviews.length})
                </h4>

                {localReviews.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 space-y-1">
                    <MessageSquare size={24} className="mx-auto text-slate-400 mb-1" />
                    <p className="font-bold text-slate-700">এখনো কোনো রিভিউ যোগ করা হয়নি।</p>
                    <p>এই পণ্যটিতে প্রথম রিভিউ দিয়ে আপনার অভিজ্ঞতা জানান!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {localReviews.map((rev, idx) => (
                      <div
                        key={rev.id || rev._id || idx}
                        className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                              {rev.userName ? rev.userName.charAt(0) : 'U'}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-bold text-xs text-slate-900">
                                  {rev.userName}
                                </span>
                                {rev.isVerifiedBuyer && (
                                  <span className="badge badge-xs bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-[9px]">
                                    Verified Buyer
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-600 font-medium">
                                {rev.createdAt
                                  ? new Date(rev.createdAt).toLocaleDateString('bn-BD', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })
                                  : 'সম্প্রতি রিভিউ দেওয়া হয়েছে'}
                              </span>
                            </div>
                          </div>

                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={13}
                                className={i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed pl-10">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-xs" onClick={onClose}></div>
    </div>
  );
});

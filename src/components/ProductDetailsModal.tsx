'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Share2,
  Check,
  Star,
  Link as LinkIcon,
  Copy,
  Minus,
  Plus,
  ShoppingCart,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react';
import { ProductItem, ProductVariant } from '@/types';

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
}

export const ProductDetailsModal = React.memo(function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  onOrderNow,
  siteOrigin,
  copiedId,
  onCopyUrl,
}: ProductDetailsModalProps) {
  const [activeImg, setActiveImg] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('Free Size');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setActiveImg(product.gallery?.[0] || product.image || '/banner.jpeg');
      setSelectedVariant(product.variants?.[0] || null);
      setSelectedSize(product.sizes?.[0] || 'Free Size');
      setQuantity(1);
    }
  }, [product]);

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

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image || '/banner.jpeg'];

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box max-w-3xl bg-white text-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
        {/* Modal Header Actions (Copy Link + Close) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-2">
          {/* Product Gallery */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
              <Image
                src={activeImg || product.image || '/banner.jpeg'}
                alt={product.title || 'Product'}
                fill
                unoptimized
                className="object-cover"
              />
              <span className="absolute top-2 left-2 badge bg-red-600 text-white font-bold text-xs border-0">
                {product.discountPercent}% ছাড়
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(img)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    activeImg === img
                      ? 'border-[#12372A] ring-2 ring-emerald-200'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img || '/banner.jpeg'} alt="Thumbnail" fill unoptimized className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info & Specifications */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="badge badge-sm badge-outline text-emerald-800 font-bold mb-1">
                {product.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {product.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{product.englishTitle}</p>
            </div>

            {/* Rating & In-stock badge */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                <Star size={13} className="fill-amber-400 mr-1" />
                <span>{product.rating} ({product.reviewsCount} রিভিউ)</span>
              </div>
              <span className="badge badge-success text-white text-[11px] font-semibold">
                স্টকে আছে (রেডি ডেলিভারি)
              </span>
            </div>

            {/* Pricing Box */}
            <div className="flex items-baseline gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-2xl font-black text-emerald-800">৳{product.salePrice}</span>
              <span className="text-sm line-through text-slate-400">৳{product.regularPrice}</span>
              <span className="badge bg-red-100 text-red-700 font-bold text-xs ml-auto">
                সাশ্রয় ৳{product.regularPrice - product.salePrice}
              </span>
            </div>

            {/* Direct Shareable Product Link Box */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <LinkIcon size={14} className="text-emerald-700 shrink-0" />
                <span className="text-slate-500 font-medium shrink-0">শেয়ার লিংক:</span>
                <code className="text-emerald-900 font-mono text-[11px] truncate bg-white px-2 py-0.5 rounded border border-emerald-200/60 flex-1">
                  {`${siteOrigin}/?product=${product.id}`}
                </code>
              </div>
              <button
                type="button"
                onClick={() => onCopyUrl(product)}
                className="btn btn-xs bg-emerald-700 hover:bg-emerald-800 text-white border-0 rounded-lg gap-1 shrink-0 font-bold"
              >
                {copiedId === product.id ? <Check size={12} /> : <Copy size={12} />}
                {copiedId === product.id ? 'কপি হয়েছে' : 'কপি করুন'}
              </button>
            </div>

            {/* VISUAL COLOR VARIANT SELECTION */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800">পছন্দের কালার বাছাই করুন:</label>
                <span className="text-emerald-800 font-bold text-xs">{selectedVariant?.name || 'ডিফল্ট'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.variants || []).map((v, i) => {
                  const isSelected = selectedVariant?.name === v.name;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectVariant(v)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-[#12372A] bg-emerald-50 ring-2 ring-[#12372A]/20 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: v.colorCode }}
                      ></span>
                      <span className="text-xs text-slate-900">{v.name ? v.name.split(' (')[0] : 'ডিফল্ট'}</span>
                      {isSelected && <Check size={12} className="text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">সাইজ নির্বাচন:</label>
              <div className="flex flex-wrap gap-1.5">
                {(product.sizes || []).map((s, i) => (
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

            {/* Quantity Stepper in Modal */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">পরিমাণ (Quantity):</span>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="btn btn-xs btn-square btn-ghost"
                >
                  <Minus size={13} />
                </button>
                <span className="font-mono font-bold text-sm w-7 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="btn btn-xs btn-square btn-ghost"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* Description & Features */}
            <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              <p className="mb-2">{product.description}</p>
              <div className="space-y-1">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-800">
                    <Check size={13} className="text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-md bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl border-0 shadow-md gap-2 flex-1"
              >
                <ShoppingCart size={18} />
                কার্টে যোগ করুন
              </button>

              <button
                type="button"
                onClick={handleOrderNow}
                className="flex-1 btn btn-md bg-[#12372A] hover:bg-[#1a4a39] text-white font-black rounded-xl border-0 shadow-md gap-2"
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
                className="btn btn-md bg-[#25D366] hover:bg-[#20ba59] text-white border-0 rounded-xl"
                title="হোয়াটসঅ্যাপে যোগাযোগ"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-xs" onClick={onClose}></div>
    </div>
  );
});


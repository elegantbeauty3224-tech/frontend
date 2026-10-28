import React from 'react';
import Image from 'next/image';
import { Star, Eye, ShoppingCart, Check, Copy } from 'lucide-react';
import { ProductItem, ProductVariant } from '../types';

interface ProductCardProps {
  product: ProductItem;
  isActive: boolean;
  selectedCardVariant: ProductVariant;
  onSelectVariant: (productId: string, variant: ProductVariant) => void;
  onAddToCart: (prod: ProductItem, variant: ProductVariant, size: string) => void;
  onOrderNow: (prod: ProductItem, variant: ProductVariant, size: string) => void;
  onOpenDetails: (prod: ProductItem, variant: ProductVariant) => void;
  onCopyLink: (prod: ProductItem) => void;
  isCopied: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  isActive,
  selectedCardVariant,
  onSelectVariant,
  onAddToCart,
  onOrderNow,
  onOpenDetails,
  onCopyLink,
  isCopied,
}) => {
  const defaultSize = product.sizes?.[0] || 'Free Size';
  const variantDisplayName = selectedCardVariant?.name
    ? selectedCardVariant.name.split(' (')[0]
    : 'ডিফল্ট';

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
        isActive ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-[#EADBC8]'
      }`}
    >
      {/* Product Image Clickable to view details */}
      <div
        onClick={() => onOpenDetails(product, selectedCardVariant)}
        className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
      >
        <Image
          src={product.image || '/banner.jpeg'}
          alt={product.title || 'Product'}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 badge bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 border-0">
          {product.discountPercent}% ছাড়
        </span>
        <span className="absolute top-2 right-2 badge bg-[#12372A] text-amber-300 font-bold text-[10px] px-2 py-0.5 border-0">
          {product.badge}
        </span>

        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="btn btn-xs bg-white text-slate-900 border-0 font-bold gap-1 shadow-sm">
            <Eye size={13} /> বিস্তারিত দেখুন
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-1">
            <Star size={12} className="fill-amber-400" />
            <span className="font-bold">{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>

          <h3
            onClick={() => onOpenDetails(product, selectedCardVariant)}
            className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 cursor-pointer hover:text-emerald-800 transition-colors"
          >
            {product.title}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Interactive Color Swatches on Card */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-[11px] mb-1.5">
            <span className="font-semibold text-slate-500">কালার নির্বাচন:</span>
            <span className="font-bold text-emerald-800 text-[10px] truncate max-w-[130px]">
              {variantDisplayName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(product.variants || []).map((v, i) => {
              const isSelected = selectedCardVariant?.name === v.name;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVariant(product.id, v);
                  }}
                  className={`relative w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'ring-2 ring-emerald-700 ring-offset-1 scale-110 shadow-xs'
                      : 'border-slate-300 opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: v.colorCode }}
                  title={`${v.name} (স্টক: ${v.stock})`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price and Action Buttons */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-xs text-slate-400 line-through">৳{product.regularPrice}</div>
              <div className="text-base font-black text-emerald-800">৳{product.salePrice}</div>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              সেভ ৳{product.regularPrice - product.salePrice}
            </span>
          </div>

          {/* Primary actions: Add to Cart + Direct Order */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onAddToCart(product, selectedCardVariant, defaultSize)}
              className="btn btn-xs bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg border-0 shadow-xs gap-1"
              title="কার্টে যোগ করুন"
            >
              <ShoppingCart size={12} /> কার্ট
            </button>
            <button
              type="button"
              onClick={() => onOrderNow(product, selectedCardVariant, defaultSize)}
              className="btn btn-xs bg-[#12372A] hover:bg-[#1a4a39] text-white font-bold rounded-lg border-0 shadow-xs"
            >
              অর্ডার করুন
            </button>
          </div>

          {/* Secondary actions: View Details + Copy Link */}
          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => onOpenDetails(product, selectedCardVariant)}
              className="col-span-3 btn btn-xs btn-outline border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-lg gap-1"
            >
              <Eye size={12} /> বিস্তারিত দেখুন
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCopyLink(product);
              }}
              className={`col-span-1 btn btn-xs rounded-lg border transition-all flex items-center justify-center ${
                isCopied
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                  : 'btn-ghost border-slate-200 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
              title="প্রোডাক্ট লিংক কপি করুন"
            >
              {isCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';


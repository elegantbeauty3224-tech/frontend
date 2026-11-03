import React from 'react';
import { Star, Check, ShoppingBag, ShoppingCart } from 'lucide-react';
import { ProductItem, ProductVariant } from '../types';
import { formatColorLabel, formatShortColorName, isVariantSelected, getColorDotStyles } from '../lib/colorUtils';

interface HeroIntroProps {
  currentProduct: ProductItem | null;
  selectedVariant: ProductVariant | null;
  selectedSize: string;
  onSelectVariant: (v: ProductVariant) => void;
  onOrderNow: () => void;
  onAddToCart: () => void;
  onScrollToGrid: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  currentProduct,
  selectedVariant,
  onSelectVariant,
  onOrderNow,
  onAddToCart,
  onScrollToGrid,
}) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-center space-y-4">
      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3.5 py-1 rounded-full border border-amber-200 text-xs font-bold">
        <div className="flex text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span>৪.৯/৫ রেটিং (১৬৮+ কাস্টমার রিভিউ)</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-black text-[#12372A] tracking-tight leading-snug">
        সৌন্দর্য ও আভিজাত্যের নিখুঁত স্পর্শে সাজিয়ে নিন আপনার প্রতিদিন
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
        যারা কোয়ালিটি, আধুনিকতা এবং আভিজাত্য পছন্দ করেন তাদের জন্য এটি একটি পারফেক্ট সিলেকশন। এর প্রিমিয়াম লুক ও নিখুঁত ফিনিশিং আপনাকে সারাদিন রাখবে আত্মবিশ্বাসী ও অনন্য।
      </p>

      {/* Quick Color Picker in Hero */}
      {currentProduct && selectedVariant && (
        <div className="pt-2 flex flex-col items-center gap-2 min-h-[82px] justify-center">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span>পছন্দের কালার বাছাই করুন:</span>
            <span className="text-emerald-800 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
              {formatColorLabel(selectedVariant.name, selectedVariant.colorCode)}
            </span>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 min-h-[40px]">
            {(currentProduct.variants || []).map((v, i) => {
              const isSelected = isVariantSelected(selectedVariant, v);
              const dotStyle = getColorDotStyles(v.colorCode);
              return (
                <button
                  key={v.name || i}
                  type="button"
                  aria-label={`কালার নির্বাচন করুন: ${formatColorLabel(v.name, v.colorCode)}`}
                  onClick={() => onSelectVariant(v)}
                  className={`group relative px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#12372A] bg-emerald-50 ring-2 ring-[#12372A]/30 shadow-xs scale-105 font-bold text-[#12372A]'
                      : 'border-slate-300 bg-white hover:border-slate-400 text-slate-800 hover:bg-slate-50 font-medium'
                  }`}
                >
                  {/* High contrast color dot */}
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                    style={{
                      backgroundColor: dotStyle.backgroundColor,
                      border: `1.5px solid ${dotStyle.borderColor}`,
                    }}
                  ></span>
                  <span className="text-xs font-bold text-slate-800">{formatShortColorName(v.name, v.colorCode)}</span>
                  {isSelected && <Check size={12} className="text-emerald-800 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-4 w-full max-w-sm sm:max-w-none mx-auto">
        {/* Prominent Order Now Button with Glowing Pulse */}
        <button
          type="button"
          onClick={onOrderNow}
          className="btn btn-lg bg-[#12372A] hover:bg-[#1a4a39] text-white font-black text-base sm:text-lg px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl border-0 gap-2.5 transition-all transform hover:-translate-y-0.5 animate-pulse-glow flex items-center justify-center w-full sm:w-auto"
        >
          <ShoppingBag size={22} className="text-amber-300 shrink-0" />
          <span>এখনই অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
        </button>

        <button
          type="button"
          onClick={onAddToCart}
          className="btn btn-md sm:btn-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 rounded-2xl shadow-md border-0 gap-2 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
        >
          <ShoppingCart size={18} />
          কার্টে যোগ করুন
        </button>

        <button
          type="button"
          onClick={onScrollToGrid}
          className="btn btn-md sm:btn-lg btn-outline border-emerald-800 text-emerald-900 hover:bg-emerald-900 hover:text-white font-bold px-6 rounded-2xl w-full sm:w-auto"
        >
          পণ্যসমূহ দেখুন
        </button>
      </div>
    </section>
  );
};


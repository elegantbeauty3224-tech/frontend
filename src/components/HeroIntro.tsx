import React from 'react';
import { Star, Check, ShoppingBag, ShoppingCart } from 'lucide-react';
import { ProductItem, ProductVariant } from '../types';

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
        <div className="pt-2 flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span>পছন্দের কালার বাছাই করুন:</span>
            <span className="text-emerald-800 font-extrabold">{selectedVariant.name}</span>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(currentProduct.variants || []).map((v, i) => {
              const isSelected = selectedVariant.name === v.name;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectVariant(v)}
                  className={`group relative px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#12372A] bg-emerald-50/80 ring-2 ring-[#12372A]/20 shadow-xs scale-105'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-2xs"
                    style={{ backgroundColor: v.colorCode }}
                  ></span>
                  <span className="text-xs font-medium text-slate-800">{v.name.split(' (')[0]}</span>
                  {isSelected && <Check size={12} className="text-emerald-700" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        <button
          type="button"
          onClick={onOrderNow}
          className="btn btn-md sm:btn-lg bg-[#12372A] hover:bg-[#1c4e3c] text-white font-extrabold px-6 rounded-xl shadow-lg hover:shadow-xl border-0 gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <ShoppingBag size={18} className="text-amber-300" />
          এখনই অর্ডার করুন
        </button>

        <button
          type="button"
          onClick={onAddToCart}
          className="btn btn-md sm:btn-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 rounded-xl shadow-md border-0 gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <ShoppingCart size={18} />
          কার্টে যোগ করুন
        </button>

        <button
          type="button"
          onClick={onScrollToGrid}
          className="btn btn-md sm:btn-lg btn-outline border-[#12372A] text-[#12372A] hover:bg-[#12372A] hover:text-white font-bold px-6 rounded-xl"
        >
          কালেকশন দেখুন (Grid)
        </button>
      </div>
    </section>
  );
};


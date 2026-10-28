import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

interface OrderCtaBannerProps {
  onOpenCheckout: () => void;
  onScrollToGrid: () => void;
}

export const OrderCtaBanner: React.FC<OrderCtaBannerProps> = React.memo(({
  onOpenCheckout,
  onScrollToGrid,
}) => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#12372A] via-[#1a4d3a] to-[#12372A] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden border border-emerald-900/30">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 font-extrabold text-xs tracking-wider uppercase border border-emerald-700/60">
            <Sparkles size={14} className="text-amber-400" />
            ১০০% ক্যাশ অন ডেলিভারি
          </span>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
            পছন্দের পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করুন
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-lg mx-auto">
            কোনো অগ্রিম পেমেন্ট ছাড়া সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি। পণ্য দেখে নিশ্চিত হয়ে ডেলিভারি ম্যানকে মূল্য পরিশোধ করুন।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenCheckout}
              className="btn btn-md sm:btn-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-8 rounded-2xl border-0 shadow-lg hover:shadow-2xl gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag size={18} />
              এখনই অর্ডার করুন (ক্যাশ অন ডেলিভারি)
            </button>
            <button
              type="button"
              onClick={onScrollToGrid}
              className="btn btn-md sm:btn-lg btn-outline border-white/30 text-white hover:bg-white hover:text-slate-950 font-bold rounded-2xl"
            >
              অন্যান্য পণ্য দেখুন
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-[11px] text-emerald-200">
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-amber-400" /> ১০০% অরিজিনাল পণ্য</span>
            <span className="flex items-center gap-1"><Truck size={14} className="text-amber-400" /> দ্রুত হোম ডেলিভারি</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-400" /> পার্সেল চেক করে মূল্য পরিশোধ</span>
          </div>
        </div>
      </div>
    </section>
  );
});

OrderCtaBanner.displayName = 'OrderCtaBanner';


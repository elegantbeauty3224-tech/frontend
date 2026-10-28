import React from 'react';
import { Star } from 'lucide-react';

export const CustomerReviews: React.FC = React.memo(() => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 bg-[#F4EFE6] rounded-3xl my-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">বিশ্বাসযোগ্যতা</span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#12372A] mt-1">
          ক্রেতারা কী বলছেন?
        </h2>
        <div className="w-16 h-1 bg-amber-400 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] shadow-xs space-y-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed italic">
            "খুবই রিফ্রেশিং ও চমৎকার কালেকশন! কাপড়ের কোয়ালিটি অত্যন্ত উন্নত এবং ছবির সাথে হুবহু মিল পেয়েছি। ডেলিভারি মাত্র ২৪ ঘণ্টায় পেয়েছি।"
          </p>
          <div className="border-t border-slate-100 pt-2">
            <h4 className="font-bold text-slate-900 text-sm">আসিফ ইকবাল</h4>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">DHAKA</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] shadow-xs space-y-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed italic">
            "ক্যাশ অন ডেলিভারিতে প্রোডাক্ট হাতে পেয়ে চেক করে পেমেন্ট করেছি। কোনো সমস্যা ছাড়াই পারফেক্ট জিনিস পেয়েছি। ফুল স্যাটিসফাইড।"
          </p>
          <div className="border-t border-slate-100 pt-2">
            <h4 className="font-bold text-slate-900 text-sm">তানজিম</h4>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">SYLHET</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] shadow-xs space-y-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed italic">
            "আমি কড়া কাজ একদমই পছন্দ করি না। এর ডিজাইনটা ঠিক যেমন চাচ্ছিলাম—একদম মার্জিত আর আভিজাত্য মেশানো। ৫/৫ রেটিং।"
          </p>
          <div className="border-t border-slate-100 pt-2">
            <h4 className="font-bold text-slate-900 text-sm">রাবেয়া বসরী</h4>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">CHATTOGRAM</p>
          </div>
        </div>
      </div>
    </section>
  );
});

CustomerReviews.displayName = 'CustomerReviews';


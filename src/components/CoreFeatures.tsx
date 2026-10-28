import React from 'react';
import { Sparkles, ShieldCheck, Award, Truck } from 'lucide-react';

export const CoreFeatures: React.FC = React.memo(() => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-[#EADBC8] shadow-xs text-center space-y-2 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 mx-auto flex items-center justify-center font-bold">
            <Sparkles size={24} />
          </div>
          <h3 className="font-black text-slate-900 text-base">Fresh & Premium</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            উন্নত মানের মেটেরিয়ালে তৈরি যা আপনার আভিজাত্য ও রুচিশীলতাকে ফুটিয়ে তুলবে সুন্দরভাবে।
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#EADBC8] shadow-xs text-center space-y-2 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 mx-auto flex items-center justify-center font-bold">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-black text-slate-900 text-base">Long Lasting</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            অত্যন্ত টেকসই ও নিখুঁত ফেব্রিক ফিনিশিং। সহজে নষ্ট হবে না এবং দীর্ঘ সময় সৌন্দর্য ধরে রাখবে।
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#EADBC8] shadow-xs text-center space-y-2 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 mx-auto flex items-center justify-center font-bold">
            <Award size={24} />
          </div>
          <h3 className="font-black text-slate-900 text-base">100% Quality Assured</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            পণ্য হাতে পেয়ে চেক করে নেওয়ার সম্পূর্ণ সুবিধা। কোনো নকল বা নিম্নমানের কাপড়ের সুযোগ নেই।
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#EADBC8] shadow-xs text-center space-y-2 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 mx-auto flex items-center justify-center font-bold">
            <Truck size={24} />
          </div>
          <h3 className="font-black text-slate-900 text-base">Nationwide Delivery</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            ঢাকা ও সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি সুবিধা। কোনো অগ্রিম পেমেন্ট নেই।
          </p>
        </div>
      </div>
    </section>
  );
});

CoreFeatures.displayName = 'CoreFeatures';


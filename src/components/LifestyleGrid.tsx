import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const LifestyleGrid: React.FC = React.memo(() => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">ব্যবহারের উপযোগিতা</span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#12372A] mt-1">
          যেকোনো পরিবেশের জন্য পারফেক্ট
        </h2>
        <div className="w-16 h-1 bg-amber-400 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] space-y-1.5 hover:border-emerald-600 transition-colors">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-700" /> Perfect for Office
          </h4>
          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
            মার্জিত ও রুচিশীল ডিজাইনের কারণে অফিস কিংবা যেকোনো প্রফেশনাল মিটিংয়ে ব্যবহারের জন্য দারুণ।
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] space-y-1.5 hover:border-emerald-600 transition-colors">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-700" /> Ideal for Party & Weddings
          </h4>
          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
            আকর্ষণীয় গ্লসি স্টোন ও জরি কাজের ছোঁয়ায় যেকোনো বিয়ের উৎসব কিংবা পার্টিতে সবার নজর কাড়বে।
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] space-y-1.5 hover:border-emerald-600 transition-colors">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-700" /> Comfortable for All Seasons
          </h4>
          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
            সফট বাটার সিল্ক ইনার ও আরামদায়ক ফেব্রিক যা গরম কিংবা শীতের আবহাওয়ায় অত্যন্ত আরামদায়ক।
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] space-y-1.5 hover:border-emerald-600 transition-colors">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-700" /> Stain-Free & Washable
          </h4>
          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
            উন্নত রঙের টেক্সচার হওয়ায় ওয়াশ করার পরও কোনো রঙ উঠবে না কিংবা বিবর্ণ হবে না।
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] space-y-1.5 hover:border-emerald-600 transition-colors">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-700" /> Premium Presentation
          </h4>
          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
            প্রতিটি পণ্য পরিপাটি লাক্সারি ব্র্যান্ড প্যাকেজিংয়ে সুরক্ষিত অবস্থায় পাঠানো হয়।
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EADBC8] space-y-1.5 hover:border-emerald-600 transition-colors">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-700" /> Best for Gifting
          </h4>
          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
            প্রিয় মানুষকে যেকোনো বিশেষ দিনে উপহার দেওয়ার জন্য এটি একটি সেরা ও রুচিশীল উপহার।
          </p>
        </div>
      </div>
    </section>
  );
});

LifestyleGrid.displayName = 'LifestyleGrid';


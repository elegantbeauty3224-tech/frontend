import React from 'react';
import { Sparkles, Target, Eye, Check, ShieldCheck, Award, HeartHandshake, Truck, CheckCircle2 } from 'lucide-react';

export const MissionVision: React.FC = React.memo(() => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 font-extrabold text-xs tracking-wider uppercase border border-emerald-200">
          <Sparkles size={13} className="text-emerald-700" />
          আমাদের লক্ষ্য ও রূপকল্প
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#12372A] tracking-tight">
          আমাদের মিশন ও ভিশন
        </h2>
        <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full"></div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
          কোয়ালিটি প্রোডাক্ট, নির্ভরযোগ্য সেবা এবং গ্রাহকের শতভাগ আস্থাই Elegant Beauty-এর প্রতিটি পদক্ষেপের মূল প্রেরণা।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-3xl p-7 sm:p-9 border-2 border-emerald-800/15 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#12372A] text-amber-300 flex items-center justify-center shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
                <Target size={28} />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800">OUR MISSION</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">আমাদের মিশন</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
              আমাদের মিশন হলো গ্রাহকদের কাছে সেরা মানের প্রিমিয়াম লাইফস্টাইল ও ফ্যাশন প্রোডাক্ট পৌঁছে দেওয়া। কোনো ধরনের নিম্নমানের পণ্যের সাথে আপস না করে, স্বচ্ছতা এবং নির্ভরযোগ্য ক্যাশ অন ডেলিভারি সেবার মাধ্যমে প্রতিটি মানুষের কেনাকাটার অভিজ্ঞতাকে নির্বিঘ্ন, সাশ্রয়ী ও আনন্দময় করা।
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">১০০% অথেনটিক ও প্রিমিয়াম মেটেরিয়াল গ্যারান্টি</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">সারা বাংলাদেশে দ্রুত ও সুরক্ষিত হোম ডেলিভারি</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধের নিশ্চয়তা</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">যেকোনো তথ্যে আন্তরিক ও সার্বক্ষণিক গ্রাহক সেবা</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-100/60 flex items-center justify-between text-xs font-bold text-emerald-900">
            <span>অঙ্গীকার: শতভাগ গ্রাহক সন্তুষ্টি</span>
            <ShieldCheck size={18} className="text-emerald-700" />
          </div>
        </div>

        {/* Vision Card */}
        <div className="relative bg-gradient-to-br from-white via-amber-50/20 to-white rounded-3xl p-7 sm:p-9 border-2 border-[#EADBC8] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-100/40 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Eye size={28} />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-700">OUR VISION</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">আমাদের ভিশন</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
              আমাদের ভিশন হলো সততা, নান্দনিক ডিজাইন এবং আধুনিক সেবার সমন্বয়ে বাংলাদেশের শীর্ষস্থানীয় ও সবচেয়ে বিশ্বস্ত লাইফস্টাইল ই-কমার্স ব্র্যান্ডে পরিণত হওয়া। প্রতিটি পরিবারের প্রতিদিনের ফ্যাশন ও জীবনযাত্রায় মার্জিত আভিজাত্যের স্পর্শ যুক্ত করাই আমাদের দীর্ঘমেয়াদী স্বপ্ন।
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">বাংলাদেশের প্রতিটি প্রান্তে নির্ভরযোগ্য ব্র্যান্ড পরিচয় তৈরি</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">আধুনিক ফ্যাশন ট্রেন্ড ও ট্রেন্ডি কালেকশনের ধারাবাহিক সংযোজন</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">সৎ বাণিজ্য ও গ্রাহকদের সাথে দীর্ঘস্থায়ী সম্পর্কের বন্ধন</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-xs text-slate-700 font-semibold">সহজ, নিরাপদ ও স্বচ্ছ ডিজিটাল শপিং অভিজ্ঞতা</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-100/60 flex items-center justify-between text-xs font-bold text-amber-900">
            <span>স্বপ্ন: দেশের সেরা লাইফস্টাইল ব্র্যান্ড</span>
            <Award size={18} className="text-amber-600" />
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Strip */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm">শতভাগ সততা</h5>
            <p className="text-[10px] text-slate-500">আপসহীন কোয়ালিটি</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 font-bold">
            <HeartHandshake size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm">গ্রাহকবান্ধব সেবা</h5>
            <p className="text-[10px] text-slate-500">সর্বোচ্চ সম্মান ও সহায়তা</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 font-bold">
            <Truck size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm">দ্রুত ডেলিভারি</h5>
            <p className="text-[10px] text-slate-500">সারা দেশে ক্যাশ অন ডেলিভারি</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 font-bold">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm">নিশ্চিন্ত কেনাকাটা</h5>
            <p className="text-[10px] text-slate-500">দেখে মূল্য পরিশোধের সুযোগ</p>
          </div>
        </div>
      </div>
    </section>
  );
});

MissionVision.displayName = 'MissionVision';


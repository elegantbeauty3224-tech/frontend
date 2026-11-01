'use client';

import React from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Truck, RotateCcw, Clock, PhoneCall } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FaqSection: React.FC = React.memo(() => {
  const faqs: FaqItem[] = [
    {
      question: 'Elegant Beauty-তে কি ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা আছে?',
      answer:
        'হ্যাঁ, সারা বাংলাদেশে কোনো ধরনের অগ্রিম পেমেন্ট বা বিকাশ চার্জ ছাড়াই শতভাগ ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন। পণ্যটি ডেলিভারি ম্যানের সামনে খুলে চেক করে তারপর মূল্য পরিশোধ করার পূর্ণ নিশ্চয়তা রয়েছে।',
      icon: <ShieldCheck size={18} className="text-emerald-700 shrink-0" />,
    },
    {
      question: '১৮-ইঞ্চি কেবিন লাগেজ (18-Inch Cabin Luggage) কি বিমানে হ্যান্ড লাগেজ হিসেবে নেওয়া যাবে?',
      answer:
        'হ্যাঁ, আমাদের ১৮-ইঞ্চি কেবিন লাগেজটি আন্তর্জাতিক ও অভ্যন্তরীণ সব এয়ারলাইন্সের অনুমোদিত কেবিন সাইজ ডাইমেনশন মেনে তৈরি। এটি প্রায় ২ কেজি হালকা ওজনের এবং ৭ কেজি পর্যন্ত মালামাল বহনে সক্ষম। সাথে রয়েছে স্মুথ ৩৬০° স্পিনার হুইল এবং ইন-বিল্ট নাম্বার লক সিস্টেম।',
      icon: <Truck size={18} className="text-amber-600 shrink-0" />,
    },
    {
      question: 'ঢাকা ও সারা বাংলাদেশে হোম ডেলিভারি পেতে কত সময় লাগে?',
      answer:
        'ঢাকার ভেতরে সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে আমাদের অফিসিয়াল পার্টনার স্টেডফাস্ট কুরিয়ারের মাধ্যমে সরাসরি আপনার দেওয়া ঠিকানায় হোম ডেলিভারি পৌঁছে দেওয়া হয়।',
      icon: <Clock size={18} className="text-blue-600 shrink-0" />,
    },
    {
      question: 'পণ্য হাতে পেয়ে চেক করার পর কোনো ত্রুটি পেলে রিটার্ন বা পরিবর্তনের নিয়ম কী?',
      answer:
        'আমরা প্রতিটি পণ্য প্রেরণের পূর্বে কোয়ালিটি নিশ্চিত করি। তবুও ডেলিভারির সময় কোনো অমিল বা সমস্যা পেলে ডেলিভারি ম্যানকে সরাসরি জানিয়ে তাৎক্ষণিক রিটার্ন করতে পারবেন অথবা আমাদের অফিসিয়াল সাপোর্ট নম্বরে যোগাযোগ করে সহজে এক্সচেঞ্জ নিতে পারবেন।',
      icon: <RotateCcw size={18} className="text-purple-600 shrink-0" />,
    },
    {
      question: 'অর্ডারের লাইভ স্ট্যাটাস বা পার্সেল ট্র্যাকিং কীভাবে করব?',
      answer:
        'ওয়েবসাইটের উপরে থাকা "অর্ডার ট্র্যাক" বাটনে ক্লিক করে আপনার ১১ ডিজিটের মোবাইল নম্বর অথবা অর্ডার নম্বর লিখে সার্চ করলেই রিয়েল-টাইম কুরিয়ার ও ডিসপ্যাচ আপডেট দেখতে পাবেন। এছাড়াও গুগল দিয়ে লগইন থাকলে সব অর্ডার প্রোফাইলে সংরক্ষিত থাকে।',
      icon: <PhoneCall size={18} className="text-emerald-800 shrink-0" />,
    },
  ];

  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200/60">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 font-extrabold text-xs tracking-wider uppercase border border-emerald-200">
          <HelpCircle size={14} className="text-emerald-700" />
          সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#12372A] tracking-tight">
          আপনার যেকোনো প্রশ্নের সহজ সমাধান
        </h2>
        <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full"></div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
          ক্যাশ অন ডেলিভারি, কেবিন লাগেজ, হোম ডেলিভারি ও রিটার্ন সংক্রান্ত গুরুত্বপূর্ণ তথ্যাবলী
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-white border border-slate-200 rounded-2xl shadow-2xs hover:border-emerald-300 transition-all"
          >
            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
            <div className="collapse-title text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2.5 pr-10 py-4">
              {faq.icon}
              <span className="leading-snug">{faq.question}</span>
            </div>
            <div className="collapse-content text-xs sm:text-sm text-slate-600 leading-relaxed pl-10 pr-6 pb-4 border-t border-slate-100 pt-3">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Support Footer Strip */}
      <div className="max-w-3xl mx-auto mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#12372A] text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <h4 className="font-extrabold text-sm text-amber-300">আরো কিছু জানার আছে?</h4>
          <p className="text-xs text-emerald-100 mt-0.5">
            আমাদের কাস্টমার কেয়ার টিম আপনাকে সহযোগিতা করার জন্য সার্বক্ষণিক প্রস্তুত।
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:01648439277"
            className="btn btn-xs sm:btn-sm bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold border-0 rounded-xl gap-1 shadow-xs"
          >
            <PhoneCall size={13} />
            <span>01648-439277</span>
          </a>
          <a
            href="https://wa.me/8801648439277?text=আসসালামু%20আলাইকুম,%20আমি%20Elegant%20Beauty%20পণ্য%20সম্পর্কে%20জানতে%20চাই"
            target="_blank"
            rel="noreferrer"
            className="btn btn-xs sm:btn-sm bg-[#25D366] hover:bg-[#20ba59] text-white font-bold border-0 rounded-xl"
            title="হোয়াটসঅ্যাপে চ্যাট করুন"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
});

FaqSection.displayName = 'FaqSection';


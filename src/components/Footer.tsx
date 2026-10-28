'use client';

import React from 'react';
import Image from 'next/image';

export const Footer = React.memo(function Footer() {
  return (
    <footer className="border-t border-[#EADBC8] bg-white mt-12 pt-8 pb-10 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Information */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-light.jpeg" alt="Logo" width={34} height={34} className="rounded-full object-cover" />
            <div>
              <p className="font-bold text-slate-900 text-sm">Elegant Beauty</p>
              <p className="text-[11px] text-slate-500">Quality Products ❤️ Trusted Service</p>
            </div>
          </div>

          <div className="text-slate-600">
            হটলাইন: <a href="tel:01648439277" className="font-bold text-emerald-800 hover:underline">01648-439277</a>
            <span className="mx-2 text-slate-300">|</span>
            ইমেইল: <a href="mailto:elegantbeauty3224@gmail.com" className="hover:underline font-medium">elegantbeauty3224@gmail.com</a>
          </div>

          <div className="text-slate-500 font-medium">
            © 2026 Elegant Beauty. All rights reserved.
          </div>
        </div>

        {/* Developer Credit & Branding */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-slate-400">
            বাংলাদেশের বিশ্বস্ত এবং প্রিমিয়াম কোয়ালিটি ই-কমার্স শপ
          </p>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-700">Designed & Developed by</span>
            <a
              href="https://www.facebook.com/HeroStack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-[#12372A] border border-slate-800 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 group"
              title="HeroStack Facebook Page"
            >
              <Image
                src="/herostack-logo.png"
                alt="HeroStack"
                width={105}
                height={35}
                className="h-6 w-auto object-contain transition-transform group-hover:scale-105"
                priority={false}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});



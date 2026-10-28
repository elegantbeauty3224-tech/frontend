'use client';

import React from 'react';
import Image from 'next/image';

export const Footer = React.memo(function Footer() {
  return (
    <footer className="border-t border-[#EADBC8] bg-white mt-12 py-8 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <Image src="/logo-light.jpeg" alt="Logo" width={32} height={32} className="rounded-full" />
          <div>
            <p className="font-bold text-slate-900">Elegant Beauty</p>
            <p className="text-[11px]">Quality Products ❤️ Trusted Service</p>
          </div>
        </div>

        <div>
          হটলাইন: <a href="tel:01648439277" className="font-bold text-emerald-800 hover:underline">01648-439277</a> |
          ইমেইল: <a href="mailto:elegantbeauty3224@gmail.com" className="hover:underline">elegantbeauty3224@gmail.com</a>
        </div>

        <div>
          © 2026 Elegant Beauty. All rights reserved.
        </div>
      </div>
    </footer>
  );
});


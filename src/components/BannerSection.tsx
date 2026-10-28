import React from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';

interface BannerSectionProps {
  onOpenLightbox: () => void;
  onOrderNow: () => void;
  onScrollToGrid: () => void;
}

export const BannerSection: React.FC<BannerSectionProps> = ({
  onOpenLightbox,
  onOrderNow,
  onScrollToGrid,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6">
      <div className="bg-[#12372A] rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-xl border-2 border-[#EADBC8]">
        {/* Banner Container with exact 1536x1024 native ratio */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group bg-black/40">
          <Image
            src="/banner.jpeg"
            alt="Elegant Beauty Official Marketing Banner"
            width={1536}
            height={1024}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            priority
            onClick={onOpenLightbox}
          />
          {/* Zoom hint overlay badge */}
          <button
            type="button"
            onClick={onOpenLightbox}
            className="absolute bottom-3 right-3 bg-black/75 hover:bg-black/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <ZoomIn size={14} className="text-amber-300" />
            <span className="hidden sm:inline">ব্যানার বড় করে দেখুন</span>
          </button>
        </div>

        {/* Quick bar under banner with direct triggers */}
        <div className="py-2.5 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-emerald-100">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-300">
              <Image src="/logo-light.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-bold tracking-wide text-amber-200">Elegant Beauty</span>
            <span className="hidden sm:inline text-slate-300">| Quality Products ❤️ Trusted Service</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOrderNow}
              className="btn btn-xs sm:btn-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black border-0 shadow-sm"
            >
              অর্ডার করুন
            </button>
            <button
              type="button"
              onClick={onScrollToGrid}
              className="btn btn-xs sm:btn-sm btn-outline border-amber-300 text-amber-200 hover:bg-amber-300 hover:text-slate-900"
            >
              সকল পণ্য দেখুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


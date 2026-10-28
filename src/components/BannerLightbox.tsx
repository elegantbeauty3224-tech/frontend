'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface BannerLightboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BannerLightbox = React.memo(function BannerLightbox({
  isOpen,
  onClose,
}: BannerLightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box max-w-5xl bg-black/95 p-3 sm:p-5 rounded-2xl relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3 text-white hover:bg-white/20"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden mt-6">
          <Image
            src="/banner.jpeg"
            alt="Full Banner"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center text-xs text-slate-300 mt-3 flex justify-between items-center px-2">
          <span>Elegant Beauty Official Banner</span>
          <button
            onClick={onClose}
            className="btn btn-xs btn-outline text-white border-white/40"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/80" onClick={onClose}></div>
    </div>
  );
});


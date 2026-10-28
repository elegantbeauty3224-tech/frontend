'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Package, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartTotalItems: number;
  cartBump: boolean;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
  onScrollToGrid: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartTotalItems,
  cartBump,
  onOpenCart,
  onOpenCheckout,
  onScrollToGrid,
  onOpenProfile,
}) => {
  const { user, isVerified, signInWithGoogle, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-4 py-2 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 sm:gap-2.5 cursor-pointer" onClick={onScrollToGrid}>
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-emerald-800/30 shadow-xs shrink-0">
            <Image src="/logo-light.jpeg" alt="Logo" fill className="object-cover" />
          </div>
          <div>
            <span className="font-black text-slate-900 text-sm sm:text-base tracking-tight block leading-none">
              Elegant Beauty
            </span>
            <span className="text-[9px] sm:text-[10px] text-emerald-800 font-semibold tracking-wide">
              অফিসিয়াল স্টোর
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={onScrollToGrid}
            className="hidden md:inline-flex btn btn-xs btn-ghost text-slate-700 hover:text-emerald-800 font-bold"
          >
            সকল পণ্য
          </button>

          {/* Track Order Shortcut Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="btn btn-xs sm:btn-sm btn-ghost text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold gap-1 px-2 sm:px-3"
            title="আপনার অর্ডার ট্র্যাক করুন"
          >
            <Package size={14} className="text-emerald-700" />
            <span className="hidden sm:inline">অর্ডার ট্র্যাক</span>
          </button>

          {/* User Profile / Google Sign-In Button */}
          {user ? (
            <button
              type="button"
              onClick={onOpenProfile}
              className="btn btn-xs sm:btn-sm bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 border border-emerald-300 rounded-xl font-bold gap-1.5 p-1 sm:px-2.5 shadow-2xs"
              title={`${user.displayName || 'User'} - প্রোফাইল ও অর্ডার ট্র্যাক`}
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-emerald-700 text-white shrink-0">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'Profile'}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span className="text-[10px] font-bold flex items-center justify-center w-full h-full">
                    {(user.displayName || 'U')[0]}
                  </span>
                )}
                {isVerified && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                )}
              </div>
              <span className="text-xs max-w-[80px] sm:max-w-[110px] truncate hidden sm:inline">
                {user.displayName?.split(' ')[0] || 'প্রোফাইল'}
              </span>
              <ShieldCheck size={13} className="text-emerald-600 hidden md:inline" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenProfile}
              className="btn btn-xs sm:btn-sm bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold gap-1.5 shadow-2xs"
              title="Google দিয়ে লগইন করুন"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs">লগইন</span>
            </button>
          )}

          {/* Checkout Button */}
          <button
            type="button"
            onClick={onOpenCheckout}
            className="btn btn-xs sm:btn-sm bg-[#12372A] hover:bg-[#1a4a39] text-white rounded-xl font-bold border-0 shadow-xs"
          >
            অর্ডার করুন
          </button>

          {/* Cart Bag Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className={`btn btn-xs sm:btn-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-xl font-black gap-1 sm:gap-1.5 transition-transform ${
              cartBump ? 'scale-110 ring-2 ring-emerald-500' : ''
            }`}
            title="শপিং ব্যাগ দেখুন"
          >
            <ShoppingCart size={14} className="text-emerald-700" />
            <span className="hidden sm:inline">ব্যাগ</span>
            <span className="badge badge-xs bg-emerald-800 text-white font-mono font-bold px-1.5 py-0.5">
              {cartTotalItems}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

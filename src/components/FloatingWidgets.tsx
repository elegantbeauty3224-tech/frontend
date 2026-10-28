'use client';

import React from 'react';
import { ShoppingCart, ShoppingBag, MessageCircle, Phone, Check } from 'lucide-react';

interface FloatingWidgetsProps {
  cartBump: boolean;
  cartTotalItems: number;
  hasCartItems: boolean;
  cartSubtotal: number;
  subtotal: number;
  totalAmount: number;
  copyToast: string | null;
  onOpenCart: () => void;
  onOrderClick: () => void;
}

export const FloatingWidgets = React.memo(function FloatingWidgets({
  cartBump,
  cartTotalItems,
  hasCartItems,
  cartSubtotal,
  subtotal,
  totalAmount,
  copyToast,
  onOpenCart,
  onOrderClick,
}: FloatingWidgetsProps) {
  return (
    <>
      {/* FLOATING CART BUTTON (DESKTOP & TABLET ONLY - NO MOBILE OVERLAP) */}
      <button
        onClick={onOpenCart}
        className={`hidden md:flex fixed bottom-40 right-6 z-40 btn bg-[#12372A] hover:bg-[#1c4e3c] text-white rounded-2xl shadow-2xl border-2 border-emerald-400/30 items-center gap-2.5 px-4 py-3 group transition-transform duration-200 ${
          cartBump ? 'animate-cart-bump' : 'hover:scale-105'
        }`}
        title="শপিং ব্যাগ দেখুন"
        aria-label="Open Cart"
      >
        <div className="relative">
          <ShoppingCart size={22} className="text-amber-300" />
          {cartTotalItems > 0 && (
            <span className="absolute -top-2.5 -right-2.5 badge badge-xs bg-amber-400 text-slate-950 font-black text-[11px] px-1.5 py-2 border-2 border-[#12372A] shadow-sm">
              {cartTotalItems}
            </span>
          )}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] text-emerald-200 font-semibold uppercase tracking-wider">
            শপিং ব্যাগ
          </span>
          <span className="font-mono font-black text-xs text-amber-300">
            ৳{hasCartItems ? cartSubtotal : subtotal}
          </span>
        </div>
      </button>

      {/* MOBILE PERSISTENT BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl md:hidden flex items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onOpenCart}
          className="relative btn btn-sm bg-emerald-50 text-emerald-950 border border-emerald-300 rounded-xl px-3 font-bold"
          aria-label="Open Mobile Cart"
        >
          <ShoppingCart size={16} className="text-emerald-800" />
          {cartTotalItems > 0 && (
            <span className="badge badge-xs bg-emerald-800 text-white font-mono font-bold">
              {cartTotalItems}
            </span>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="text-[10px] text-slate-400">সর্বমোট (COD):</div>
          <div className="text-base font-black text-[#12372A] font-mono leading-none truncate">
            ৳{totalAmount}
          </div>
        </div>

        <button
          onClick={onOrderClick}
          className="btn btn-sm bg-[#12372A] hover:bg-[#1a4a39] text-white font-black border-0 px-5 rounded-xl shadow-md gap-1"
        >
          <ShoppingBag size={14} className="text-amber-300" />
          <span>অর্ডার করুন</span>
        </button>
      </div>

      {/* FLOATING WHATSAPP & HOTLINE BUTTONS (POSITIONED SAFELY ABOVE MOBILE BAR) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 flex flex-col gap-2.5">
        <a
          href="https://wa.me/8801648439277?text=আসসালামু%20আলাইকুম,%20আমি%20Elegant%20Beauty%20অফার%20থেকে%20অর্ডার%20করতে%20চাই"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp Support"
          aria-label="WhatsApp Support"
        >
          <MessageCircle size={24} />
        </a>

        <a
          href="tel:01648439277"
          className="w-12 h-12 bg-[#12372A] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Call Hotline"
          aria-label="Call Hotline"
        >
          <Phone size={20} />
        </a>
      </div>

      {/* FLOATING COPY TOAST NOTIFICATION (TOP RIGHT, DOES NOT BLOCK BUTTONS) */}
      {copyToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-fade-in pointer-events-none">
          <div className="alert bg-[#12372A] text-white shadow-2xl rounded-2xl border border-emerald-400/40 px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <Check size={18} className="text-emerald-400 shrink-0" />
            <span>{copyToast}</span>
          </div>
        </div>
      )}
    </>
  );
});


'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Minus, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotalItems: number;
  cartSubtotal: number;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer = React.memo(function CartDrawer({
  isOpen,
  onClose,
  cart,
  cartTotalItems,
  cartSubtotal,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExploreCollection,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-in-right">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-emerald-950 to-[#12372A] text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <ShoppingCart size={18} className="text-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-base tracking-tight">আপনার শপিং ব্যাগ</h3>
                <p className="text-xs text-emerald-200">{cartTotalItems} টি পণ্য যোগ করা হয়েছে</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto custom-scrollbar space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingCart size={32} />
                </div>
                <h4 className="font-bold text-slate-700 text-base">আপনার শপিং ব্যাগটি খালি</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  পছন্দের পণ্যটি সিলেক্ট করে "কার্টে যোগ করুন" বাটনে চাপুন।
                </p>
                <button
                  type="button"
                  onClick={onExploreCollection}
                  className="btn btn-sm bg-[#12372A] text-white rounded-xl font-bold mt-2"
                >
                  কালেকশন ঘুরে দেখুন
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl border border-slate-200/80 flex items-center gap-3 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                    <Image
                      src={item.image || '/banner.jpeg'}
                      alt={item.productTitle || 'Product'}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {item.productTitle}
                    </h5>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: item.colorCode }}
                      ></span>
                      <span className="font-medium text-slate-700">{item.variantName}</span>
                      {item.size && (
                        <span className="badge badge-xs bg-white text-slate-600 border-slate-300">
                          {item.size}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="btn btn-xs btn-square btn-ghost h-6 w-6 text-slate-600 hover:bg-slate-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono font-bold text-xs w-6 text-center text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="btn btn-xs btn-square btn-ghost h-6 w-6 text-slate-600 hover:bg-slate-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-black text-emerald-800 text-sm font-mono">
                          ৳{item.unitPrice * item.quantity}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-slate-400">
                            ৳{item.unitPrice} × {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.cartItemId)}
                    className="btn btn-xs btn-ghost btn-circle text-slate-400 hover:text-red-600 hover:bg-red-50 self-start"
                    title="পণ্যটি মুছে ফেলুন"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>সাবটোটাল</span>
                  <span className="font-mono font-bold text-slate-800">৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ডেলিভারি ফি (ঢাকার ভেতরে)</span>
                  <span className="font-mono font-semibold text-emerald-800">৳৭০</span>
                </div>
                <div className="flex justify-between font-black text-base text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয় বিল</span>
                  <span className="font-mono text-emerald-800 text-lg">
                    ৳{cartSubtotal + 70}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onCheckout}
                className="w-full btn btn-md sm:btn-lg bg-[#12372A] hover:bg-[#1a4a39] text-white font-black rounded-xl border-0 shadow-lg hover:shadow-xl gap-2 text-sm sm:text-base animate-pulse-slow"
              >
                <CheckCircle2 size={18} className="text-amber-300" />
                অর্ডার সম্পন্ন করতে এগিয়ে যান (COD)
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full btn btn-sm btn-ghost text-slate-600 hover:text-slate-900 font-semibold"
              >
                আরও কেনাকাটা করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});


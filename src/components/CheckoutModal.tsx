import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  ShoppingBag, ShieldCheck, Truck, CheckCircle2, User, Phone,
  Mail, MapPin, AlertCircle, FileText, ShoppingCart, Plus, Minus,
  Trash2, Check, Lock, X
} from 'lucide-react';
import { CartItem, ProductItem, ProductVariant } from '../types';
import { useAuth } from '../context/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Form fields
  customerName: string;
  setCustomerName: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  customerEmail: string;
  setCustomerEmail: (val: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (val: string) => void;
  deliveryArea: 'inside_dhaka' | 'outside_dhaka';
  setDeliveryArea: (val: 'inside_dhaka' | 'outside_dhaka') => void;
  notes: string;
  setNotes: (val: string) => void;
  paymentMethod: 'cod' | 'bkash';
  setPaymentMethod: (val: 'cod' | 'bkash') => void;
  isSubmitting: boolean;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
  // Order items & summary
  hasCartItems: boolean;
  cart: CartItem[];
  onUpdateCartQuantity: (cartItemId: string, delta: number) => void;
  onRemoveFromCart: (cartItemId: string) => void;
  onClearCart: () => void;
  currentProduct: ProductItem | null;
  selectedVariant: ProductVariant | null;
  onSelectVariant: (v: ProductVariant) => void;
  selectedSize: string;
  onSelectSize: (s: string) => void;
  singleProductQty: number;
  setSingleProductQty: React.Dispatch<React.SetStateAction<number>>;
  activeQuantity: number;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  onAddMoreProducts: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  customerName,
  setCustomerName,
  phoneNumber,
  setPhoneNumber,
  customerEmail,
  setCustomerEmail,
  deliveryAddress,
  setDeliveryAddress,
  deliveryArea,
  setDeliveryArea,
  notes,
  setNotes,
  paymentMethod,
  setPaymentMethod,
  isSubmitting,
  errorMsg,
  onSubmit,
  hasCartItems,
  cart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
  currentProduct,
  selectedVariant,
  onSelectVariant,
  selectedSize,
  onSelectSize,
  singleProductQty,
  setSingleProductQty,
  activeQuantity,
  subtotal,
  deliveryFee,
  totalAmount,
  onAddMoreProducts,
}) => {
  const { user, isVerified, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (isOpen && user) {
      if (!customerName && user.displayName) {
        setCustomerName(user.displayName);
      }
      if (user.email) {
        setCustomerEmail(user.email);
      }
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open backdrop-blur-sm z-50 animate-fade-in p-2 sm:p-4">
      <div className="modal-box max-w-4xl max-h-[92vh] overflow-y-auto custom-scrollbar bg-white text-slate-800 p-5 sm:p-8 rounded-3xl shadow-2xl relative border border-slate-100">
        {/* Modal Header & Close Button */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShoppingBag size={18} />
              </div>
              <h3 className="font-black text-lg sm:text-xl text-[#12372A]">
                ক্যাশ অন ডেলিভারি চেকআউট
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              নিচের ফর্মে সঠিক তথ্য দিন। কোনো অগ্রিম টাকা লাগবে না, পণ্য হাতে পেয়ে মূল্য পরিশোধ করবেন।
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="badge badge-xs bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold gap-1">
                <ShieldCheck size={11} className="text-emerald-700" /> ১০০% অরিজিনাল পণ্য
              </span>
              <span className="badge badge-xs bg-amber-50 text-amber-900 border-amber-200 font-semibold gap-1">
                <Truck size={11} className="text-amber-700" /> হোম ডেলিভারি
              </span>
              <span className="badge badge-xs bg-blue-50 text-blue-900 border-blue-200 font-semibold gap-1">
                <CheckCircle2 size={11} className="text-blue-700" /> পণ্য দেখে পরিশোধ
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-800"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Billing Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <User size={16} className="text-[#12372A]" />
                গ্রাহকের প্রয়োজনীয় তথ্য (Billing Details)
              </h4>
              <span className="text-[11px] text-red-500 font-bold">* চিহ্নিত ঘর আবশ্যক</span>
            </div>

            {errorMsg && (
              <div className="alert alert-error text-xs text-white rounded-xl flex items-center gap-2 shadow-sm animate-fade-in">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Google Verified Account Status / Guest Ordering Notice */}
            {user ? (
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    ✓
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-black text-emerald-950">
                        {user.displayName || 'Google ভেরিফাইড ক্রেতা'}
                      </span>
                      {isVerified && (
                        <span className="badge badge-xs bg-emerald-600 text-white font-bold gap-0.5">
                          <ShieldCheck size={10} />
                          ভেরিফাইড
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-emerald-800 font-mono truncate">{user.email}</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 bg-white/80 border border-emerald-200 px-2 py-1 rounded-lg shrink-0 font-bold hidden sm:inline">
                  অর্ডারটি প্রোফাইলে লিঙ্ক হবে
                </span>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-400 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#12372A] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Lock size={18} className="text-amber-300" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">
                      অর্ডার করতে লগইন আবশ্যক
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      অর্ডার সম্পন্ন ও ট্র্যাক করতে ১-ক্লিকে Google দিয়ে লগইন করুন
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="btn btn-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-emerald-600 rounded-xl font-bold gap-2 shadow-xs shrink-0"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  <span>Google লগইন করুন</span>
                </button>
              </div>
            )}

            {/* Customer Name */}
            <div>
              <label htmlFor="modalCustomerName" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                আপনার পূর্ণ নাম <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="modalCustomerName"
                  name="customerName"
                  autoComplete="name"
                  required
                  placeholder="যেমন: আব্দুল্লাহ আল মামুন"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input input-bordered w-full rounded-xl bg-slate-50 text-sm focus:border-[#12372A] focus:bg-white pl-10"
                />
                <User size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="modalPhoneNumber" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1">
                মোবাইল নম্বর <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="modalPhoneNumber"
                  name="phoneNumber"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="01XXXXXXXXX (যেমন: 01712345678)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input input-bordered w-full rounded-xl bg-slate-50 text-sm focus:border-[#12372A] focus:bg-white pl-10"
                />
                <Phone size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">অর্ডার নিশ্চিত করার জন্য এই নম্বরে কল দেওয়া হবে।</p>
            </div>

            {/* Customer Email (Read-Only Verified Field) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="modalCustomerEmail" className="block text-xs sm:text-sm font-bold text-slate-900">
                  ইমেইল অ্যাড্রেস
                </label>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  Google ভেরিফাইড (Read-Only)
                </span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="modalCustomerEmail"
                  name="customerEmail"
                  autoComplete="email"
                  readOnly
                  placeholder={user?.email || "Google লগইন থেকে স্বয়ংক্রিয়ভাবে যুক্ত হবে"}
                  value={customerEmail || user?.email || ''}
                  className="input input-bordered w-full rounded-xl bg-slate-100 text-slate-700 font-mono text-sm cursor-not-allowed pl-10 border-slate-300 focus:outline-hidden select-none"
                  title="এই ইমেইলটি আপনার Google অ্যাকাউন্ট থেকে নির্ধারিত এবং পরিবর্তনযোগ্য নয়।"
                />
                <Mail size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                🔒 আপনার লগইনকৃত Google অ্যাকাউন্টের ভেরিফাইড ইমেইলে অর্ডারের ইনভয়েস ও ট্র্যাকিং আপডেট পাঠানো হবে।
              </p>
            </div>

            {/* Delivery Address */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="modalDeliveryAddress" className="block text-xs sm:text-sm font-bold text-slate-900">
                  পূর্ণ বিস্তারিত ডেলিভারি ঠিকানা <span className="text-red-600">*</span>
                </label>
                <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  বাসা/রোড, এলাকা, থানা ও জেলা আবশ্যক
                </span>
              </div>
              <div className="relative">
                <textarea
                  id="modalDeliveryAddress"
                  name="deliveryAddress"
                  autoComplete="street-address"
                  required
                  rows={3}
                  placeholder="যেমন: বাসা নং ১২, রোড নং ৫, ব্লক-সি, ধানমন্ডি, ঢাকা (অথবা গ্রাম, ডাকঘর, থানা ও জেলা)... শুধুমাত্র শহর বা থানার নাম লিখলে ডেলিভারি বিলম্বিত হতে পারে।"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="textarea textarea-bordered w-full rounded-xl bg-slate-50 text-sm focus:border-[#12372A] focus:bg-white pl-10 leading-relaxed"
                ></textarea>
                <MapPin size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
              <p className="text-[11px] text-amber-800 bg-amber-50/80 border border-amber-200/60 rounded-lg p-2 mt-1.5 flex items-start gap-1.5">
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-amber-600" />
                <span>কুরিয়ার হোম ডেলিভারির জন্য কেবল জেলা বা থানার নাম যথেষ্ট নয়। অনুগ্রহ করে পূর্ণ বাসা/রোড বা গ্রাম ও বিস্তারিত এলাকা উল্লেখ করুন।</span>
              </p>
            </div>

            {/* Shipping Area Selector */}
            <div className="pt-1">
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2">
                ডেলিভারি এরিয়া নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`cursor-pointer p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all duration-200 ${
                    deliveryArea === 'inside_dhaka'
                      ? 'border-[#12372A] bg-emerald-50/80 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="modalDeliveryArea"
                      checked={deliveryArea === 'inside_dhaka'}
                      onChange={() => setDeliveryArea('inside_dhaka')}
                      className="radio radio-sm radio-success"
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">ঢাকার ভেতরে</div>
                      <div className="text-[11px] text-slate-500">হোম ডেলিভারি চার্জ ৳৭০</div>
                    </div>
                  </div>
                  <span className="text-sm font-black font-mono text-emerald-800">৳৭০</span>
                </label>

                <label
                  className={`cursor-pointer p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all duration-200 ${
                    deliveryArea === 'outside_dhaka'
                      ? 'border-[#12372A] bg-emerald-50/80 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="modalDeliveryArea"
                      checked={deliveryArea === 'outside_dhaka'}
                      onChange={() => setDeliveryArea('outside_dhaka')}
                      className="radio radio-sm radio-success"
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">ঢাকার বাইরে</div>
                      <div className="text-[11px] text-slate-500">কুরিয়ার হোম ডেলিভারি ৳১৩০</div>
                    </div>
                  </div>
                  <span className="text-sm font-black font-mono text-emerald-800">৳১৩০</span>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <label htmlFor="modalNotes" className="block text-xs font-semibold text-slate-600 mb-1">
                অর্ডার সংক্রান্ত বিশেষ নোট (ঐচ্ছিক):
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="modalNotes"
                  name="notes"
                  placeholder="যেমন: কোনো নির্দিষ্ট সময় ডেলিভারি চাইলে লিখুন..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input input-sm input-bordered w-full rounded-xl bg-slate-50 text-xs pl-9"
                />
                <FileText size={15} className="absolute left-3 top-2.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Right Column: Your Order & Payment */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#FAF7F2] to-white p-5 sm:p-6 rounded-3xl border border-[#EADBC8] shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <ShoppingCart size={17} className="text-[#12372A]" />
                আপনার অর্ডার সামারি
              </h4>
              {hasCartItems && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] text-red-500 hover:underline font-semibold"
                >
                  ব্যাগ খালি করুন
                </button>
              )}
            </div>

            {/* SCENARIO A: CART HAS ITEMS */}
            {hasCartItems ? (
              <div className="space-y-3">
                <div className="space-y-2.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-2.5 bg-white rounded-xl border border-slate-200/90 flex items-center gap-2.5 text-xs shadow-2xs"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                        <Image src={item.image || '/banner.jpeg'} alt={item.productTitle || 'Product'} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-slate-900 truncate">{item.productTitle}</h5>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px]">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: item.colorCode }}
                          ></span>
                          <span className="text-slate-600 truncate">{item.variantName}</span>
                          <span className="text-slate-400">• {item.size}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-1">
                            <button
                              type="button"
                              onClick={() => onUpdateCartQuantity(item.cartItemId, -1)}
                              className="text-slate-500 hover:text-black font-bold px-1"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-slate-900 px-1">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateCartQuantity(item.cartItemId, 1)}
                              className="text-slate-500 hover:text-black font-bold px-1"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono font-bold text-emerald-800">
                            ৳{item.unitPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.cartItemId)}
                        className="btn btn-xs btn-ghost btn-circle text-slate-400 hover:text-red-500"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onAddMoreProducts}
                  className="w-full btn btn-xs btn-outline border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white rounded-lg font-bold gap-1"
                >
                  <Plus size={13} /> আরও পণ্য যোগ করুন
                </button>
              </div>
            ) : currentProduct && selectedVariant ? (
              /* SCENARIO B: SINGLE PRODUCT CHECKOUT WITH RICH COLOR PICKER */
              <div className="space-y-3">
                <div className="flex justify-between items-start text-xs border-b border-slate-200 pb-3">
                  <div className="flex gap-2.5 items-center">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-300 shrink-0">
                      <Image src={(currentProduct?.image) || '/banner.jpeg'} alt="Thumbnail" fill unoptimized className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{currentProduct.title}</h5>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: selectedVariant?.colorCode || '#12372A' }}
                        ></span>
                        <span className="text-emerald-900 font-bold text-[11px]">{selectedVariant?.name || 'ডিফল্ট'}</span>
                        <span className="text-slate-400">• সাইজ: {selectedSize}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-slate-500 text-[10px] font-semibold">পরিমাণ:</span>
                        <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setSingleProductQty((q) => Math.max(1, q - 1))}
                            className="btn btn-xs btn-square btn-ghost h-5 w-5 text-slate-600 hover:bg-slate-100"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-mono font-bold text-xs w-6 text-center text-slate-900">
                            {singleProductQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSingleProductQty((q) => q + 1)}
                            className="btn btn-xs btn-square btn-ghost h-5 w-5 text-slate-600 hover:bg-slate-100"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-black text-emerald-800 text-sm shrink-0">৳{subtotal}</div>
                </div>

                {/* VISUAL COLOR SWATCH SELECTOR IN MODAL */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1 flex items-center justify-between">
                    <span>কালার বাছাই করুন:</span>
                    <span className="text-emerald-800 font-extrabold text-[11px]">{selectedVariant?.name || 'ডিফল্ট'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(currentProduct.variants || []).map((v, i) => {
                      const isSelected = selectedVariant?.name === v.name;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => onSelectVariant(v)}
                          className={`p-1.5 rounded-xl border flex items-center gap-1.5 text-left transition-all ${
                            isSelected
                              ? 'border-[#12372A] bg-emerald-50 ring-2 ring-[#12372A]/20 font-bold shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                            style={{ backgroundColor: v.colorCode }}
                          ></span>
                          <span className="text-xs text-slate-900 truncate flex-1">{v.name ? v.name.split(' (')[0] : 'ডিফল্ট'}</span>
                          {isSelected && <Check size={12} className="text-emerald-700 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector in Modal */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">সাইজ নির্বাচন:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentProduct.sizes || []).map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onSelectSize(s)}
                        className={`btn btn-xs rounded-lg ${
                          selectedSize === s
                            ? 'btn-neutral bg-slate-900 text-white'
                            : 'btn-outline border-slate-300 bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                পণ্য নির্বাচন করুন বা লোড হওয়া পর্যন্ত অপেক্ষা করুন...
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs border-t border-slate-200 pt-3">
              <div className="flex justify-between text-slate-600">
                <span>পণ্য সাবটোটাল ({activeQuantity} টি):</span>
                <span className="font-mono font-bold text-slate-800">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>হোম ডেলিভারি ফি:</span>
                <span className="font-mono font-bold text-emerald-800">৳{deliveryFee}</span>
              </div>
              <div className="flex justify-between items-baseline font-black text-slate-900 border-t border-slate-300 pt-2 text-sm sm:text-base">
                <div>
                  <div>সর্বমোট প্রদেয় বিল:</div>
                  <div className="text-[10px] text-emerald-700 font-semibold font-sans">
                    (ক্যাশ অন ডেলিভারিতে চেক করে পরিশোধ)
                  </div>
                </div>
                <span className="font-mono text-xl sm:text-2xl text-[#12372A]">৳{totalAmount}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border-t border-slate-200 pt-2.5 space-y-2">
              <h5 className="font-bold text-xs uppercase text-slate-500">পেমেন্ট মেথড</h5>

              {/* Cash on Delivery */}
              <div
                className={`p-2.5 rounded-2xl border-2 transition-all ${
                  paymentMethod === 'cod' ? 'border-[#12372A] bg-emerald-50/70 shadow-xs' : 'border-slate-200 bg-white'
                }`}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="modalPaymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="radio radio-xs radio-success"
                  />
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                      ক্যাশ অন ডেলিভারি (COD)
                    </span>
                    <span className="badge badge-xs bg-emerald-700 text-white font-bold">প্রস্তাবিত</span>
                  </div>
                </label>
                {paymentMethod === 'cod' && (
                  <p className="text-[11px] text-slate-600 mt-1.5 bg-white/80 p-2 rounded-xl leading-relaxed border border-emerald-100">
                    পণ্য হাতে পেয়ে চেক করে ডেলিভারি ম্যানের কাছে মূল্য পরিশোধ করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।
                  </p>
                )}
              </div>

              {/* bKash / Nagad - Disabled */}
              <div className="p-2.5 rounded-2xl border border-slate-200 bg-slate-50/80 opacity-70 cursor-not-allowed select-none">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-not-allowed">
                    <input
                      type="radio"
                      name="modalPaymentMethod"
                      disabled
                      checked={false}
                      className="radio radio-xs radio-neutral cursor-not-allowed opacity-50"
                    />
                    <span className="font-bold text-xs text-slate-500">বিকাশ / নগদ পেমেন্ট</span>
                  </label>
                  <span className="badge badge-xs bg-amber-100 text-amber-900 border-amber-300 font-bold">
                    বর্তমানে বন্ধ
                  </span>
                </div>
              </div>
            </div>

            {/* Submit CTA Button */}
            {user ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-md sm:btn-lg bg-[#12372A] hover:bg-[#1a4a39] text-white font-black text-sm sm:text-base rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 gap-2"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Lock size={17} className="text-amber-300" />
                    <span>অর্ডার কনফার্ম করুন (COD) - ৳{totalAmount}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full btn btn-md sm:btn-lg bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm sm:text-base rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 gap-2.5"
              >
                <svg className="w-5 h-5 bg-white rounded-full p-0.5 shrink-0" viewBox="0 0 24 24">
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
                <span>Google দিয়ে লগইন করে অর্ডার করুন - ৳{totalAmount}</span>
              </button>
            )}

            <div className="text-center text-[11px] text-slate-500">
              <p>🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত থাকবে।</p>
            </div>
          </div>
        </form>
      </div>
      {/* Modal Backdrop click to close */}
      <div
        className="modal-backdrop bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      ></div>
    </div>
  );
};


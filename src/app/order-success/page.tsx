'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Copy,
  Check,
  Clock,
  MapPin,
  User,
  ArrowRight,
  PackageCheck,
  AlertCircle,
} from 'lucide-react';
import { formatColorLabel, getColorDotStyles } from '@/lib/colorUtils';

interface OrderItem {
  product?: string;
  productTitle: string;
  variantName?: string;
  colorCode?: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  image?: string;
}

interface OrderData {
  orderNumber: string;
  _id?: string;
  customerName: string;
  phoneNumber: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryArea?: string;
  deliveryFee: number;
  subtotal?: number;
  totalAmount: number;
  paymentMethod?: string;
  items: OrderItem[];
  createdAt?: string;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId') || '';

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    // 1. Fire celebratory confetti on page mount
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // Ignore if confetti not supported
    }

    // 2. Try loading order from sessionStorage first for instantaneous zero-latency render
    let cachedOrder: OrderData | null = null;
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('last_completed_order');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (
            !orderIdParam ||
            parsed.orderNumber === orderIdParam ||
            parsed._id === orderIdParam ||
            orderIdParam === 'latest'
          ) {
            cachedOrder = parsed;
            setOrder(parsed);
            setLoading(false);
          }
        }
      } catch (e) {
        console.warn('Could not read cached order:', e);
      }
    }

    // 3. If no cached order or refreshing direct link with orderIdParam, fetch from API
    if (!cachedOrder && orderIdParam) {
      setLoading(true);
      fetch(`/api/orders/track/${encodeURIComponent(orderIdParam)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setOrder(data.data);
          }
        })
        .catch((err) => {
          console.warn('Could not fetch order from track API:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!cachedOrder && !orderIdParam) {
      setLoading(false);
    }
  }, [orderIdParam]);

  const handleCopyOrderId = (idToCopy: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(idToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const displayOrderId = order?.orderNumber || orderIdParam || 'EB-ORDER';
  const displayTotal = order?.totalAmount || 0;

  // Pre-filled WhatsApp message format as strictly specified:
  // "আসসালামু আলাইকুম, আমি Elegant Beauty থেকে অর্ডার করেছি। অর্ডার আইডি: [ORDER_ID], মোট মূল্য: [TOTAL] টাকা। দয়া করে আমার অর্ডারটি কনফার্ম করুন।"
  const whatsappMessage = `আসসালামু আলাইকুম, আমি Elegant Beauty থেকে অর্ডার করেছি। অর্ডার আইডি: ${displayOrderId}, মোট মূল্য: ${displayTotal} টাকা। দয়া করে আমার অর্ডারটি কনফার্ম করুন।`;
  const whatsappUrl = `https://wa.me/8801648439277?text=${encodeURIComponent(whatsappMessage)}`;
  const hotlineTelUrl = 'tel:+8801648439277';

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="loading loading-spinner text-[#12372A] loading-lg mb-4"></div>
        <p className="text-slate-600 font-semibold text-sm">আপনার অর্ডারের বিবরণ লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      {/* Top Success Badge & Celebration Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100 text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100/90 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
          <CheckCircle2 size={46} className="text-emerald-700 stroke-[2.2]" />
        </div>

        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            <PackageCheck size={14} /> অর্ডার সফলভাবে গ্রহণ করা হয়েছে
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ধন্যবাদ {order?.customerName ? `${order.customerName}!` : 'সম্মানিত ক্রেতা!'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            আপনার ক্যাশ অন ডেলিভারি অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমাদের প্রতিনিধি দ্রুততম সময়ের মধ্যে আপনার ঠিকানায় পার্সেল পৌঁছে দেবেন।
          </p>
        </div>

        {/* Order Identifier Pill */}
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">অর্ডার আইডি:</span>
          <span className="font-mono font-black text-sm text-[#12372A] tracking-wider">{displayOrderId}</span>
          <button
            type="button"
            onClick={() => handleCopyOrderId(displayOrderId)}
            className="btn btn-ghost btn-xs text-slate-500 hover:text-emerald-800 p-1"
            title="অর্ডার আইডি কপি করুন"
            aria-label="কপি করুন"
          >
            {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Verified Cash on Delivery Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-emerald-900">
          <ShieldCheck size={18} className="text-emerald-700 shrink-0" />
          <span>ক্যাশ অন ডেলিভারি (COD) - কোনো অগ্রিম চার্জ নেই, পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করুন।</span>
        </div>
      </div>

      {/* Primary Action Buttons (Task 6 WhatsApp & Call Support) */}
      <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            অর্ডারটি দ্রুত কনফার্ম বা ডেলিভারি আপডেট চান?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            নিচের বোতামে ক্লিক করে সরাসরি WhatsApp-এ মেসেজ দিয়ে অর্ডারটি নিশ্চিত করুন:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1">
          {/* WhatsApp Direct Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm sm:text-base border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 gap-2.5 flex items-center justify-center flex-1"
          >
            <MessageCircle size={22} className="shrink-0" />
            <span>অর্ডার নিশ্চিত করতে WhatsApp-এ মেসেজ দিন</span>
          </a>

          {/* Hotline Call Fallback Link */}
          <a
            href={hotlineTelUrl}
            className="btn btn-lg bg-[#12372A] hover:bg-[#1a4a39] text-white font-black text-sm sm:text-base border-0 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 gap-2 flex items-center justify-center"
            title="সরাসরি ফোন করুন"
          >
            <Phone size={18} className="text-amber-300 shrink-0" />
            <span>কল করুন: 01648-439277</span>
          </a>
        </div>
      </div>

      {/* Invoice & Order Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#12372A]" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">ইনভয়েস বিবরণ (Order Summary)</h3>
          </div>
          <span className="badge bg-emerald-100 text-emerald-900 font-bold text-xs py-1 px-3">
            পেন্ডিং ভেরিফিকেশন
          </span>
        </div>

        {/* Customer Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="space-y-1">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <User size={13} className="text-slate-400" /> গ্রাহকের নাম:
            </span>
            <p className="font-bold text-slate-900 text-sm">{order?.customerName || 'সম্মানিত গ্রাহক'}</p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Phone size={13} className="text-slate-400" /> মোবাইল নম্বর:
            </span>
            <a
              href={`tel:${order?.phoneNumber || '01648439277'}`}
              className="font-mono font-bold text-slate-900 text-sm hover:text-emerald-800"
            >
              {order?.phoneNumber || 'প্রদান করা হয়েছে'}
            </a>
          </div>

          <div className="sm:col-span-2 space-y-1 border-t border-slate-200/60 pt-2">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <MapPin size={13} className="text-slate-400" /> ডেলিভারি ঠিকানা:
            </span>
            <p className="font-semibold text-slate-800 text-xs sm:text-sm">
              {order?.deliveryAddress || 'ঠিকানা সংরক্ষিত'}
            </p>
          </div>

          <div className="sm:col-span-2 flex items-center gap-2 text-slate-600 border-t border-slate-200/60 pt-2">
            <Truck size={14} className="text-emerald-700 shrink-0" />
            <span>
              ডেলিভারি এরিয়া: <strong className="text-slate-900">{order?.deliveryArea || 'সারা দেশে হোম ডেলিভারি'}</strong> (২৪ থেকে ৭২ ঘণ্টার মধ্যে)
            </span>
          </div>
        </div>

        {/* Ordered Items Table / List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            অর্ডারকৃত পণ্যসমূহ ({order?.items?.length || 1} টি):
          </h4>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {order?.items && order.items.length > 0 ? (
              order.items.map((item, idx) => {
                const dotStyle = getColorDotStyles(item.colorCode);
                const itemTotal = item.totalPrice || item.unitPrice * item.quantity;
                return (
                  <div key={idx} className="p-3.5 sm:p-4 flex items-center gap-3 bg-white hover:bg-slate-50/60 transition-colors">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <Image
                        src={item.image || '/banner.jpeg'}
                        alt={item.productTitle || 'Product'}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                        {item.productTitle}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        {item.variantName && (
                          <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-800">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                              style={{
                                backgroundColor: dotStyle.backgroundColor,
                                border: `1px solid ${dotStyle.borderColor}`,
                              }}
                            />
                            {formatColorLabel(item.variantName, item.colorCode)}
                          </span>
                        )}
                        {item.size && (
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-800">
                            সাইজ: {item.size}
                          </span>
                        )}
                        <span>পরিমাণ: <strong>{item.quantity}</strong></span>
                      </div>
                    </div>

                    <div className="font-mono font-black text-slate-900 text-xs sm:text-sm shrink-0">
                      ৳{itemTotal}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                পণ্য বিবরণ সংরক্ষিত হয়েছে।
              </div>
            )}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
          {order?.subtotal !== undefined && (
            <div className="flex justify-between text-slate-600">
              <span>পণ্যগুলোর মোট মূল্য (Subtotal):</span>
              <span className="font-mono font-bold text-slate-800">৳{order.subtotal}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>ডেলিভারি চার্জ (হোম ডেলিভারি):</span>
            <span className="font-mono font-bold text-slate-800">৳{order?.deliveryFee || 0}</span>
          </div>

          <div className="flex justify-between items-baseline border-t border-slate-300 pt-3 text-sm sm:text-base font-black text-[#12372A]">
            <span>সর্বমোট প্রদেয় মূল্য (Cash on Delivery):</span>
            <span className="font-mono text-xl sm:text-2xl text-emerald-900">৳{displayTotal}</span>
          </div>
        </div>
      </div>

      {/* Return Home / Keep Shopping Action Button */}
      <div className="text-center pt-2 pb-8">
        <Link
          href="/#products"
          className="btn btn-md bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-2xl font-bold px-6 shadow-sm gap-2"
        >
          <span>আরও পণ্যসমূহ দেখুন</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] antialiased">
      {/* Header bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-800/30">
              <Image src="/logo-light.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-black text-slate-900 text-sm sm:text-base leading-none block">
                Elegant Beauty
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold">অফিসিয়াল স্টোর</span>
            </div>
          </Link>

          <Link
            href="/#products"
            className="btn btn-xs sm:btn-sm btn-ghost text-emerald-900 font-bold hover:bg-emerald-50 rounded-xl"
          >
            হোম পেজ
          </Link>
        </div>
      </header>

      <main>
        <Suspense
          fallback={
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
              <div className="loading loading-spinner text-[#12372A] loading-lg mb-4"></div>
              <p className="text-slate-600 font-semibold text-sm">অর্ডার প্রস্তুত হচ্ছে...</p>
            </div>
          }
        >
          <OrderSuccessContent />
        </Suspense>
      </main>
    </div>
  );
}


'use client';

import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export interface CompletedOrderSummary {
  orderNumber: string;
  customerName: string;
  items?: Array<{
    productTitle: string;
    variantName?: string;
    quantity: number;
    totalPrice: number;
  }>;
  deliveryFee: number;
  totalAmount: number;
}

interface SuccessReceiptModalProps {
  order: CompletedOrderSummary | null;
  onClose: () => void;
}

export const SuccessReceiptModal = React.memo(function SuccessReceiptModal({
  order,
  onClose,
}: SuccessReceiptModalProps) {
  if (!order) return null;

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box max-w-lg bg-white text-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 size={36} />
        </div>

        <div className="text-center mb-6">
          <span className="badge bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            অর্ডার সফল হয়েছে!
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            ধন্যবাদ {order.customerName}!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            আপনার ক্যাশ অন ডেলিভারি অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2.5 mb-6">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">অর্ডার নম্বর:</span>
            <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
          </div>

          {/* Multi-item listing */}
          <div className="space-y-1.5 border-b border-slate-200 pb-2">
            <span className="text-slate-500 block font-semibold">অর্ডারকৃত পণ্যসমূহ:</span>
            {order.items?.map((it, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-800">
                <span className="truncate max-w-[220px]">
                  {it.productTitle}{' '}
                  <span className="text-slate-500 text-[10px]">
                    ({it.variantName} × {it.quantity})
                  </span>
                </span>
                <span className="font-mono font-bold">৳{it.totalPrice}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-slate-600">
            <span>ডেলিভারি চার্জ:</span>
            <span>৳{order.deliveryFee}</span>
          </div>

          <div className="flex justify-between border-t border-slate-200 pt-2 font-black text-base text-[#12372A]">
            <span>সর্বমোট পরিশোধযোগ্য (COD):</span>
            <span>৳{order.totalAmount}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <a
            href={`https://wa.me/8801648439277?text=${encodeURIComponent(
              `আসসালামু আলাইকুম, আমার অর্ডার নম্বর ${order.orderNumber} এর আপডেট জানতে চাই`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm sm:btn-md bg-[#25D366] hover:bg-[#20ba59] text-white border-0 flex-1 gap-1.5"
          >
            <MessageCircle size={16} /> হোয়াটসঅ্যাপে যোগাযোগ
          </a>
          <button
            onClick={onClose}
            className="btn btn-sm sm:btn-md btn-neutral"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-xs" onClick={onClose}></div>
    </div>
  );
});


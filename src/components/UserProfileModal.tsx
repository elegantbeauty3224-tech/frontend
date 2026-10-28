'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X, User as UserIcon, LogOut, Package, Clock, CheckCircle2,
  Truck, AlertCircle, Search, ExternalLink, ShieldCheck,
  Phone, MapPin, ChevronRight, RefreshCw, ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartShopping?: () => void;
}

interface OrderItem {
  productTitle: string;
  variantName: string;
  colorCode?: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
}

interface OrderData {
  _id: string;
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryArea: string;
  deliveryFee: number;
  totalAmount: number;
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  items: OrderItem[];
  courier?: {
    trackingCode?: string;
    consignmentId?: string;
    status?: string;
  };
  statusHistory?: Array<{
    status: string;
    note: string;
    timestamp: string;
  }>;
}

const statusSteps = [
  { key: 'Pending', label: 'অর্ডার গৃহীত', desc: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে' },
  { key: 'Confirmed', label: 'কনফার্মড', desc: 'অর্ডার যাচাই ও নিশ্চিত হয়েছে' },
  { key: 'Processing', label: 'প্রসেসিং', desc: 'প্যাকেজিং ও ডিসপ্যাচ প্রস্তুত' },
  { key: 'Shipped', label: 'ডেলিভারিতে', desc: 'কুরিয়ারে ডেলিভারির জন্য পাঠানো হয়েছে' },
  { key: 'Delivered', label: 'ডেলিভার্ড', desc: 'গ্রাহকের নিকট সফলভাবে পৌঁছেছে' },
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onStartShopping,
}) => {
  const { user, isVerified, signInWithGoogle, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'my_orders' | 'track_search'>('my_orders');
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [trackedOrders, setTrackedOrders] = useState<OrderData[] | null>(null);
  const [searchError, setSearchError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Fetch logged-in user orders
  const fetchUserOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const identifier = user.uid || user.email || '';
      const res = await fetch(`/api/orders/user/${encodeURIComponent(identifier)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setUserOrders(data.data);
      } else {
        setUserOrders([]);
      }
    } catch (err) {
      console.error('Fetch user orders error:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      fetchUserOrders();
    }
  }, [isOpen, user]);

  // Handle Google Login from inside modal
  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      await signInWithGoogle();
      setActiveTab('my_orders');
    } catch (err: any) {
      setAuthError(err.message || 'Google দিয়ে লগইন করতে ব্যর্থ হয়েছে।');
    } finally {
      setAuthLoading(false);
    }
  };

  // Search/Track order by Phone or Order ID
  const handleTrackSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchError('');
    setTrackedOrders(null);

    try {
      const res = await fetch(`/api/orders/track/${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setTrackedOrders(data.data);
      } else {
        setSearchError(data.message || 'কোনো অর্ডার খুঁজে পাওয়া যায়নি। দয়া করে সঠিক তথ্য দিন।');
      }
    } catch (err: any) {
      setSearchError('ট্র্যাকিং তথ্য লোড করা সম্ভব হয়নি। পুনরায় চেষ্টা করুন।');
    } finally {
      setSearching(false);
    }
  };

  if (!isOpen) return null;

  // Helper to get status badge UI
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge bg-emerald-600 text-white font-bold text-xs gap-1 py-2.5 px-3">✓ ডেলিভার্ড</span>;
      case 'Shipped':
        return <span className="badge bg-indigo-600 text-white font-bold text-xs gap-1 py-2.5 px-3">🚚 ডেলিভারিতে আছে</span>;
      case 'Processing':
        return <span className="badge bg-amber-600 text-white font-bold text-xs gap-1 py-2.5 px-3">📦 প্রসেসিং চলছে</span>;
      case 'Confirmed':
        return <span className="badge bg-blue-600 text-white font-bold text-xs gap-1 py-2.5 px-3">👍 কনফার্মড</span>;
      case 'Cancelled':
        return <span className="badge bg-rose-600 text-white font-bold text-xs gap-1 py-2.5 px-3">✕ বাতিল</span>;
      case 'Pending':
      default:
        return <span className="badge bg-amber-500 text-white font-bold text-xs gap-1 py-2.5 px-3">⏳ পেন্ডিং</span>;
    }
  };

  // Helper to get step index
  const getStepIndex = (status: string) => {
    const map: Record<string, number> = {
      Pending: 0,
      Confirmed: 1,
      Processing: 2,
      Shipped: 3,
      Delivered: 4,
    };
    return map[status] ?? 0;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-gradient-to-r from-emerald-950 to-[#12372A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <UserIcon size={20} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg tracking-tight">
                {user ? 'আপনার প্রোফাইল ও অর্ডার' : 'অর্ডার ট্র্যাকিং ও প্রোফাইল'}
              </h3>
              <p className="text-xs text-emerald-200">
                {user ? 'রিয়েল-টাইম লাইভ অর্ডার স্ট্যাটাস' : 'Google ভেরিফাইড অ্যাকাউন্ট বা ফোন নম্বর দিয়ে ট্র্যাক করুন'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Profile Card (If logged in) or Login Banner (If guest) */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
          {user ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-700 text-white flex items-center justify-center font-bold text-lg">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  {isVerified && (
                    <span
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"
                      title="Google ভেরিফাইড অ্যাকাউন্ট"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {user.displayName || 'সম্মানিত গ্রাহক'}
                    </h4>
                    {isVerified && (
                      <span className="badge badge-xs bg-emerald-100 text-emerald-800 border-emerald-300 font-bold gap-0.5">
                        <ShieldCheck size={11} className="text-emerald-700" />
                        ভেরিফাইড
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={logOut}
                className="btn btn-xs sm:btn-sm btn-ghost text-rose-600 hover:bg-rose-50 rounded-xl gap-1.5"
                title="লগআউট করুন"
              >
                <LogOut size={14} />
                <span>লগআউট</span>
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Google দিয়ে লগইন করুন</h4>
                  <p className="text-xs text-slate-500">
                    লগইন করলে আপনার সকল অর্ডার স্বয়ংক্রিয়ভাবে প্রোফাইলে সংরক্ষিত থাকবে
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={authLoading}
                className="btn btn-sm bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl shadow-xs gap-2 shrink-0 font-bold"
              >
                {authLoading ? (
                  <RefreshCw size={14} className="animate-spin text-emerald-700" />
                ) : (
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
                )}
                <span>Google Sign In</span>
              </button>
            </div>
          )}

          {authError && (
            <div className="mt-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex items-center gap-1.5">
              <AlertCircle size={14} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-4 sm:px-6 bg-white gap-2">
          {user && (
            <button
              type="button"
              onClick={() => setActiveTab('my_orders')}
              className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'my_orders'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Package size={15} />
              <span>আমার অর্ডারসমূহ ({userOrders.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('track_search')}
            className={`py-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'track_search' || !user
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search size={15} />
            <span>সরাসরি অর্ডার ট্র্যাকিং</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {/* TAB 1: USER'S ORDERS */}
          {user && activeTab === 'my_orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  আপনার Google অ্যাকাউন্টের সাথে লিঙ্ক করা সর্বমোট {userOrders.length} টি অর্ডার পাওয়া গেছে।
                </p>
                <button
                  type="button"
                  onClick={fetchUserOrders}
                  disabled={loadingOrders}
                  className="btn btn-xs btn-ghost text-emerald-800 gap-1 font-bold"
                  title="রিফ্রেশ করুন"
                >
                  <RefreshCw size={12} className={loadingOrders ? 'animate-spin' : ''} />
                  <span>রিফ্রেশ</span>
                </button>
              </div>

              {loadingOrders ? (
                <div className="py-12 text-center space-y-2">
                  <span className="loading loading-spinner loading-md text-emerald-700"></span>
                  <p className="text-xs text-slate-500">আপনার অর্ডার তথ্য লোড হচ্ছে...</p>
                </div>
              ) : userOrders.length === 0 ? (
                <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                    <ShoppingBag size={22} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">কোনো অর্ডার পাওয়া যায়নি</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    আপনি এখনও এই অ্যাকাউন্ট থেকে কোনো অর্ডার করেননি। এখনই পছন্দসই পণ্যটি অর্ডার করুন।
                  </p>
                  {onStartShopping && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onStartShopping();
                      }}
                      className="btn btn-sm bg-[#12372A] text-white rounded-xl font-bold mt-2"
                    >
                      কালেকশন ঘুরে দেখুন
                    </button>
                  )}
                </div>
              ) : (
                userOrders.map((order) => (
                  <OrderCard key={order._id} order={order} getStatusBadge={getStatusBadge} getStepIndex={getStepIndex} />
                ))
              )}
            </div>
          )}

          {/* TAB 2: INSTANT ORDER TRACKING SEARCH */}
          {(activeTab === 'track_search' || !user) && (
            <div className="space-y-4">
              <form onSubmit={handleTrackSearch} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  অর্ডার নম্বর বা মোবাইল নম্বর দিন:
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      required
                      placeholder="যেমন: EB-261028-12345ABC অথবা 01712345678"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input input-bordered w-full rounded-xl bg-slate-50 text-sm focus:border-[#12372A] focus:bg-white pl-10"
                    />
                    <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={searching || !searchQuery.trim()}
                    className="btn bg-[#12372A] hover:bg-[#1a4a39] text-white rounded-xl font-bold px-5"
                  >
                    {searching ? <RefreshCw size={16} className="animate-spin" /> : 'ট্র্যাক'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  ক্যাশ অন ডেলিভারি অর্ডারে প্রদত্ত ১১ ডিজিটের মোবাইল নম্বর অথবা অর্ডার কোডটি লিখুন।
                </p>
              </form>

              {searchError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}

              {trackedOrders && trackedOrders.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>খুঁজে পাওয়া অর্ডারসমূহ ({trackedOrders.length})</span>
                  </h4>
                  {trackedOrders.map((order) => (
                    <OrderCard key={order._id} order={order} getStatusBadge={getStatusBadge} getStepIndex={getStepIndex} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck size={14} className="text-emerald-700" />
            Elegant Beauty নিরাপদ কাস্টমার পোর্টাল
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-xs btn-outline rounded-lg text-slate-600 font-bold"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Order Card with Realtime Step Timeline
const OrderCard: React.FC<{
  order: OrderData;
  getStatusBadge: (status: string) => React.ReactNode;
  getStepIndex: (status: string) => number;
}> = ({ order, getStatusBadge, getStepIndex }) => {
  const [expanded, setExpanded] = useState(false);
  const currentStep = getStepIndex(order.orderStatus);
  const isCancelled = order.orderStatus === 'Cancelled';

  return (
    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-4">
      {/* Order Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
              #{order.orderNumber}
            </span>
            {getStatusBadge(order.orderStatus)}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Clock size={12} />
            <span>
              {new Date(order.createdAt).toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">মোট মূল্য (COD)</div>
          <div className="font-black text-emerald-800 text-base sm:text-lg">
            ৳{order.totalAmount}
          </div>
        </div>
      </div>

      {/* Visual Step Progress Tracker (If not cancelled) */}
      {!isCancelled ? (
        <div className="py-2">
          <div className="grid grid-cols-5 gap-1 relative">
            {/* Background Line */}
            <div className="absolute top-3 left-4 right-4 h-1 bg-slate-200 z-0">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            {statusSteps.map((step, idx) => {
              const isPassed = idx <= currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div key={step.key} className="flex flex-col items-center text-center relative z-10">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110 shadow-xs'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {isPassed ? '✓' : idx + 1}
                  </div>
                  <span
                    className={`text-[10px] mt-1.5 font-bold leading-tight line-clamp-1 ${
                      isCurrent ? 'text-emerald-900 font-extrabold' : isPassed ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0 text-rose-600" />
          <span>এই অর্ডারটি বাতিল করা হয়েছে। বিস্তারিত জানতে আমাদের কাস্টমার সার্ভিসে যোগাযোগ করুন।</span>
        </div>
      )}

      {/* Courier Tracking Pill (Steadfast) */}
      {order.courier?.trackingCode && (
        <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Truck size={15} className="text-indigo-700" />
            <span className="text-indigo-950 font-bold">
              Steadfast Tracking: <span className="font-mono">{order.courier.trackingCode}</span>
            </span>
          </div>
          <a
            href={`https://steadfast.com.bd/t/${order.courier.trackingCode}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-xs bg-indigo-700 hover:bg-indigo-800 text-white border-0 rounded-lg gap-1 font-bold"
          >
            <span>লাইভ ট্র্যাক</span>
            <ExternalLink size={11} />
          </a>
        </div>
      )}

      {/* Toggle View Details */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-emerald-800 hover:underline font-bold flex items-center gap-1"
        >
          <span>{expanded ? 'পণ্য বিবরণ লুকান' : 'পণ্য ও ডেলিভারি বিবরণ দেখুন'}</span>
          <ChevronRight size={13} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-fade-in text-xs">
            {/* Delivery Details */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <UserIcon size={13} className="text-slate-500" />
                <span>{order.customerName}</span>
                <span className="text-slate-400">|</span>
                <Phone size={13} className="text-slate-500" />
                <span className="font-mono">{order.phoneNumber}</span>
              </div>
              <div className="flex items-start gap-1.5 text-slate-600">
                <MapPin size={13} className="text-slate-500 shrink-0 mt-0.5" />
                <span>{order.deliveryAddress}</span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <div className="font-bold text-slate-700">অর্ডারকৃত পণ্যসমূহ:</div>
              {order.items?.map((it, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                      <Image
                        src={it.image || '/banner.jpeg'}
                        alt={it.productTitle}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h6 className="font-bold text-slate-900 text-xs line-clamp-1">{it.productTitle}</h6>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>কালার: {it.variantName}</span>
                        {it.size && <span>সাইজ: {it.size}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-slate-900">৳{it.totalPrice}</div>
                    <div className="text-[10px] text-slate-400">
                      ৳{it.unitPrice} × {it.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1 text-slate-700 font-medium">
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span>৳{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 border-t border-emerald-200/60 pt-1 text-sm">
                <span>সর্বমোট:</span>
                <span className="text-emerald-800">৳{order.totalAmount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


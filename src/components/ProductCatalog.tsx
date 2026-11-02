import React from 'react';
import { Layers, Search, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { ProductItem, ProductVariant } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  paginatedProducts: ProductItem[];
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  currentProductId?: string;
  cardSelectedVariants: Record<string, ProductVariant>;
  onSelectCardVariant: (productId: string, variant: ProductVariant) => void;
  onAddToCart: (prod: ProductItem, variant: ProductVariant, size: string) => void;
  onOrderNow: (prod: ProductItem, variant: ProductVariant, size: string) => void;
  onOpenDetails: (prod: ProductItem, variant: ProductVariant) => void;
  onCopyLink: (prod: ProductItem) => void;
  copiedId: string | null;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  paginatedProducts,
  totalFilteredCount,
  currentPage,
  totalPages,
  onPageChange,
  currentProductId,
  cardSelectedVariants,
  onSelectCardVariant,
  onAddToCart,
  onOrderNow,
  onOpenDetails,
  onCopyLink,
  copiedId,
}) => {
  return (
    <section id="products-grid" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200/60">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-emerald-800" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">আমাদের ক্যাটালগ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#12372A] mt-1">
            এক্সক্লুসিভ কালেকশনসমূহ (All Products)
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            পণ্যের বিস্তারিত দেখতে "বিস্তারিত দেখুন" ক্লিক করুন অথবা সরাসরি অর্ডার করুন
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
            aria-label="পণ্য খুঁজুন"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input input-sm input-bordered w-full pl-9 rounded-xl bg-white border-slate-300 text-xs text-slate-800"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`btn btn-sm rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#12372A] text-white border-0 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat === 'All' ? 'সকল পণ্য' : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200 p-8 shadow-xs">
          <Package className="w-12 h-12 mx-auto mb-3 text-slate-300 stroke-[1.5]" />
          <p className="text-base font-bold text-slate-700">বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            অ্যাডমিন প্যানেল থেকে নতুন পণ্য যুক্ত করা হলে তা এখানে স্বয়ংক্রিয়ভাবে সরাসরি প্রদর্শিত হবে।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((prod) => {
            const activeCardVariant = cardSelectedVariants[prod.id] || prod.variants?.[0] || {
              name: 'ডিফল্ট',
              colorCode: '#12372A',
              stock: prod.stockQuantity || 10,
            };

            return (
              <ProductCard
                key={prod.id}
                product={prod}
                isActive={currentProductId === prod.id}
                selectedCardVariant={activeCardVariant}
                onSelectVariant={onSelectCardVariant}
                onAddToCart={onAddToCart}
                onOrderNow={onOrderNow}
                onOpenDetails={onOpenDetails}
                onCopyLink={onCopyLink}
                isCopied={copiedId === prod.id}
              />
            );
          })}
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 mt-8 pt-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            পৃষ্ঠা <strong className="text-slate-900">{currentPage}</strong> / {totalPages} (মোট {totalFilteredCount} টি পণ্য)
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              type="button"
              aria-label="আগের পাতা"
              onClick={() => onPageChange((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-xs sm:btn-sm btn-outline border-slate-300 text-xs gap-1 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">আগের পাতা</span>
              <span className="sm:hidden">আগে</span>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`পৃষ্ঠা ${i + 1}`}
                onClick={() => onPageChange(i + 1)}
                className={`btn btn-xs sm:btn-sm text-xs font-bold ${
                  currentPage === i + 1 ? 'btn-neutral bg-[#12372A] text-white' : 'btn-ghost'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              aria-label="পরবর্তী পাতা"
              onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-xs sm:btn-sm btn-outline border-slate-300 text-xs gap-1 disabled:opacity-40"
            >
              <span className="hidden sm:inline">পরবর্তী পাতা</span>
              <span className="sm:hidden">পরে</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};


import React from 'react';
import { Layers, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
          <p className="text-xs text-slate-500 mt-1">
            পণ্যের বিস্তারিত দেখতে "বিস্তারিত দেখুন" ক্লিক করুন অথবা সরাসরি অর্ডার করুন
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
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

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 mt-8 pt-4">
          <div className="text-xs text-slate-500">
            পৃষ্ঠা <strong className="text-slate-900">{currentPage}</strong> / {totalPages} (মোট {totalFilteredCount} টি পণ্য)
          </div>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onPageChange((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline border-slate-300 text-xs gap-1 disabled:opacity-40"
            >
              <ChevronLeft size={14} /> আগের পাতা
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onPageChange(i + 1)}
                className={`btn btn-sm text-xs font-bold ${
                  currentPage === i + 1 ? 'btn-neutral bg-[#12372A] text-white' : 'btn-ghost'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline border-slate-300 text-xs gap-1 disabled:opacity-40"
            >
              পরবর্তী পাতা <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};


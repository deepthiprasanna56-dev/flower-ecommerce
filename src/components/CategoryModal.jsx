import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export default function CategoryModal({ activeCategoryId, onClose, onSelectProduct }) {
  if (!activeCategoryId || activeCategoryId === 'all') return null;

  const currentCategory = categories.find(c => c.id === activeCategoryId);
  const categoryProducts = products.filter(p => p.category === activeCategoryId);

  if (!currentCategory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121A13]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-sm shadow-2xl border border-[#D9CEBF] overflow-hidden z-10 animate-fade-in my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#E8E1D5] bg-white/80 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8D6B3E] font-semibold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C49B5C]" />
              <span>Maison Botanical Collection</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E261D] font-normal">
              {currentCategory.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#6C7365] mt-1 font-light">
              {currentCategory.subtitle} — Displaying all {categoryProducts.length} handcrafted curations in this collection.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F4EFE6] text-[#222] hover:bg-[#1E261D] hover:text-white flex items-center justify-center transition-colors shadow-sm ml-4 shrink-0"
            aria-label="Close collection modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Grid Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#F5F1EA]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#737A6D]">
          <span>Hand-tied within 3 hours of dispatch · 7-Day Bloom Guarantee</span>
          <button
            onClick={() => {
              onClose();
              document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#8D6B3E] hover:text-[#1E261D] font-semibold flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
          >
            <span>View In Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}

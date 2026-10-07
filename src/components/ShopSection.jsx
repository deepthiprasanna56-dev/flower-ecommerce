import { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export default function ShopSection({ selectedCategory, onSelectCategory }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'price-asc' | 'price-desc' | 'rating'
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'under-140' | '140-180' | 'above-180'

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter (name, composition, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesComp = product.flowerComposition.some(c => c.toLowerCase().includes(query));
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesComp && !matchesDesc) {
          return false;
        }
      }
      // Price range filter
      if (priceFilter === 'under-140' && product.price >= 140) return false;
      if (priceFilter === '140-180' && (product.price < 140 || product.price > 180)) return false;
      if (priceFilter === 'above-180' && product.price <= 180) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Recommended defaults: best sellers first, then rating
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.rating - a.rating;
    });
  }, [selectedCategory, searchQuery, sortBy, priceFilter]);

  const clearAllFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setSortBy('recommended');
    setPriceFilter('all');
  };

  return (
    <section id="shop" className="py-16 md:py-24 bg-[#F4F0E8] border-b border-[#E3DBD0]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8B7355] block mb-2">
            Haute Boutique Catalog
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1C241D] font-light mb-4">
            Fresh Curations for <span className="italic">Discerning Souls</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6C7167] font-light leading-relaxed">
            Each composition is individually hand-tied within 3 hours of dispatch to ensure unmatched petal vitality.
          </p>
        </div>

        {/* Search, Filter Bar & Controls */}
        <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-sm border border-[#E5DFD4] shadow-sm mb-10 space-y-5">
          
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-[#8C887E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by flower type (e.g. Peony, Rose, Lavender, Orchid)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F4F1EA] border border-[#DDD7CC] text-[#222920] placeholder-[#8E8B81] pl-10 pr-10 py-2.5 text-xs rounded focus:outline-none focus:border-[#9C794B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C887E] hover:text-[#222]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Price Filter dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#817C71]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F4F1EA] border border-[#DDD7CC] text-[#2A3127] text-xs py-2 px-3 rounded focus:outline-none focus:border-[#9C794B] cursor-pointer"
                >
                  <option value="recommended">Curator's Choice</option>
                  <option value="price-asc">Price: Modest to Opulent</option>
                  <option value="price-desc">Price: Opulent to Modest</option>
                  <option value="rating">Highest Patron Rating</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#817C71]" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="bg-[#F4F1EA] border border-[#DDD7CC] text-[#2A3127] text-xs py-2 px-3 rounded focus:outline-none focus:border-[#9C794B] cursor-pointer"
                >
                  <option value="all">All Tiers</option>
                  <option value="under-140">Under $140</option>
                  <option value="140-180">$140 – $180</option>
                  <option value="above-180">Luxury Above $180</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#1D261E] text-[#EDE7DD] shadow-sm'
                      : 'bg-[#ECE7DF] hover:bg-[#DFD9CE] text-[#555C50]'
                  }`}
                >
                  {cat.name} {cat.id !== 'all' && `(${cat.count})`}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Info & Active Filter Badges */}
        <div className="flex items-center justify-between text-xs text-[#73786E] mb-6">
          <p>
            Displaying <strong className="text-[#20271E]">{filteredProducts.length}</strong> botanical creations
          </p>
          {(selectedCategory !== 'all' || searchQuery || priceFilter !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="text-[#967345] hover:underline flex items-center gap-1 font-medium text-[11px] uppercase tracking-wider"
            >
              <X className="w-3 h-3" />
              Reset All Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FAF8F5] rounded border border-[#E3DBD0] p-8">
            <p className="font-serif-luxury text-2xl text-[#2B342A] mb-2">No matching botanical arrangements found</p>
            <p className="text-xs text-[#7B8074] max-w-sm mx-auto mb-6">
              Please adjust your search terms or filters to discover other bespoke seasonal curations.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-[#1C251D] text-white text-xs uppercase tracking-widest px-6 py-2.5 rounded hover:bg-[#8D6B3E] transition-colors"
            >
              View Full Collection
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

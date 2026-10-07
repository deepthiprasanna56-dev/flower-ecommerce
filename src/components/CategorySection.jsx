import { categories, products } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

export default function CategorySection({ onSelectCategory, onOpenCategoryModal, activeCategory }) {
  // Map representative image for each category
  const getCategoryImage = (cat) => {
    if (cat.image) return cat.image;
    const matched = products.find(p => p.category === cat.id);
    return matched ? matched.images[0] : products[0].images[0];
  };

  const handleCategoryClick = (catId) => {
    onSelectCategory(catId);
    if (onOpenCategoryModal) {
      onOpenCategoryModal(catId);
    }
  };

  return (
    <section id="collections" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#ECE4D8]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8B7355] block mb-2">
              Curated Flora Editions
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1C241D] font-light">
              Explore Our <span className="italic">Botanical Maisons</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#736E64] max-w-md font-light leading-relaxed">
            From regal Ecuadorian long-stem roses to immortal preserved domes, click any collection card below to view its curated catalog.
          </p>
        </div>

        {/* Categories Grid (Fluid 1, 2, 3, or 4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {categories.filter(c => c.id !== 'all').map((cat, idx) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group cursor-pointer relative overflow-hidden rounded-sm bg-[#EDE8E0] transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 ${
                  isSelected ? 'ring-2 ring-[#B38F5A]' : ''
                }`}
                title={`Click to open ${cat.name} collection`}
              >
                {/* Image Container with Luxury Zoom */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={getCategoryImage(cat)}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151D16]/85 via-[#151D16]/25 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-300" />
                  
                  {/* Category index badge */}
                  <span className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded">
                    0{idx + 1}
                  </span>

                  {/* Corner Arrow Indicator */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#C49B5C] group-hover:text-[#151D16] transition-all duration-300 shadow">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#E0CEB5] font-medium mb-1">
                      {cat.subtitle}
                    </p>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal tracking-wide mb-2 text-[#FAF8F5]">
                      {cat.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-white/70 pt-2 border-t border-white/20">
                      <span>{cat.count} Curated Stems</span>
                      <span className="text-[11px] underline underline-offset-4 tracking-wider uppercase group-hover:text-[#E2C799] transition-colors flex items-center gap-1 font-medium">
                        Open Collection ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

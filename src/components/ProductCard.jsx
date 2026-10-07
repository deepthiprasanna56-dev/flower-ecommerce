import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct } = useShop();
  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col bg-[#FAF8F5] border border-[#ECE6DC] hover:border-[#D6C7B2] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] bg-[#EBE7DF] overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
        />

        {/* Badges: Best Seller / Limited / Discount */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-[#1C251D] text-[#EDE7DD] text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#94524A] text-white text-[9px] uppercase tracking-[0.15em] font-medium px-2 py-0.5 rounded shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#2A332B] hover:bg-white flex items-center justify-center transition-all duration-200 shadow-sm z-10 hover:scale-110"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#BA5D54] text-[#BA5D54]' : 'text-[#3E473F]'
            }`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-white/90 backdrop-blur-md hover:bg-white text-[#1E251F] text-[10px] uppercase tracking-[0.18em] font-semibold py-2.5 px-3 rounded text-center flex items-center justify-center gap-1.5 transition-colors shadow"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Botanical Details</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, 1);
            }}
            className="bg-[#1C241D] hover:bg-[#A37D49] text-white p-2.5 rounded flex items-center justify-center transition-colors shadow"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white/40">
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-[#C49B5C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#C49B5C] stroke-none" />
              ))}
            </div>
            <span className="text-[10px] font-medium text-[#6B7267]">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-serif-luxury text-lg text-[#1C241D] hover:text-[#9A7545] transition-colors cursor-pointer line-clamp-1 mb-1 font-medium"
          >
            {product.name}
          </h3>

          {/* Key Botanicals Composition preview */}
          <p className="text-[11px] text-[#787D74] line-clamp-1 font-light italic mb-3">
            {product.flowerComposition.join(' · ')}
          </p>
        </div>

        {/* Pricing & Quick Add Action */}
        <div className="pt-3 border-t border-[#ECE5DB] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-serif-luxury font-medium text-[#1E2720]">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#9B998E] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product.id, 1)}
            className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#8B6B3D] hover:text-[#1F2720] flex items-center gap-1 transition-colors"
          >
            <span>Add</span>
            <span className="text-sm font-light">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

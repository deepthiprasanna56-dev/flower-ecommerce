import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, Star, Sparkles, ShieldCheck, Check, Truck } from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useShop();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [vaseChoice, setVaseChoice] = useState('Classic Fluted Ceramic (+$25)');
  const [giftNote, setGiftNote] = useState('');

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const vaseAdditional = vaseChoice.includes('+$25') ? 25 : 0;
  const totalPrice = (selectedProduct.price + vaseAdditional) * quantity;

  const handleAddToCart = () => {
    addToCart(selectedProduct.id, quantity, vaseChoice, giftNote);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121A13]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-sm shadow-2xl border border-[#D9CEBF] overflow-hidden z-10 animate-fade-in my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#222] hover:bg-white flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Gallery Column */}
          <div className="p-6 bg-[#F1EDE5] flex flex-col justify-between">
            <div className="relative aspect-square rounded overflow-hidden shadow-inner mb-4">
              <img
                src={selectedProduct.images[selectedImage] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 bg-[#1B231C] text-[#EDE7DE] text-[9px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === idx ? 'border-[#A37E4C] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guaranteed fresh badge */}
            <div className="mt-4 pt-3 border-t border-[#DFD8CC] flex items-center gap-2 text-[11px] text-[#697063]">
              <Truck className="w-4 h-4 text-[#A37E4C]" />
              <span>Flown directly into our studio; 100% hydration preserved in transit.</span>
            </div>
          </div>

          {/* Details & Customization Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7A4D] font-semibold">
                  Maison Collection
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#6A7165]">
                  <div className="flex text-[#C49B5C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C49B5C] stroke-none" />
                    ))}
                  </div>
                  <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C251D] mb-3 font-normal">
                {selectedProduct.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-serif-luxury text-2xl text-[#1E2720] font-medium">
                  ${selectedProduct.price}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-[#9C998F] line-through">
                    ${selectedProduct.originalPrice}
                  </span>
                )}
                <span className="text-[11px] text-[#4F7757] font-medium bg-[#E6EFE6] px-2 py-0.5 rounded">
                  In Stock · Hand-tied Today
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5C6356] leading-relaxed mb-6 font-light">
                {selectedProduct.description}
              </p>

              {/* Composition Breakdown */}
              <div className="mb-6 bg-[#F4EFE6] p-3.5 rounded border border-[#E3DBD0]">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8B6B3D] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Botanical Composition
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.flowerComposition.map((f, i) => (
                    <span key={i} className="bg-white/90 text-[#30372D] text-[11px] px-2 py-0.5 rounded border border-[#DFD6C8]">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-[#737A6D]">
                  Arrangement Dimensions: <strong>{selectedProduct.dimensions}</strong>
                </div>
              </div>

              {/* Presentation / Vase Selection */}
              <div className="mb-5">
                <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#30372D] mb-2">
                  Presentation & Vessel
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Classic Fluted Ceramic (+$25)', desc: 'Matte ivory artisanal pedestal' },
                    { label: 'Standard Archival Ribbon Wrap (Complimentary)', desc: 'Japanese washi paper and velvet ribbon' }
                  ].map((opt) => (
                    <label
                      key={opt.label}
                      className={`flex items-start gap-3 p-2.5 rounded border cursor-pointer text-xs transition-all ${
                        vaseChoice === opt.label
                          ? 'border-[#A37E4C] bg-[#F7F2E9]'
                          : 'border-[#E3DBD0] bg-white hover:border-[#C9BFAF]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="vesselOption"
                        checked={vaseChoice === opt.label}
                        onChange={() => setVaseChoice(opt.label)}
                        className="mt-0.5 accent-[#8B6B3D]"
                      />
                      <div>
                        <span className="font-medium text-[#20271E] block">{opt.label}</span>
                        <span className="text-[10px] text-[#767C70]">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hand-Written Note */}
              <div className="mb-6">
                <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-[#30372D] mb-1.5">
                  Wax-Sealed Gift Card Note (Optional)
                </label>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Inscribe a personalized message to be penned in calligraphy on heavy cotton cardstock..."
                  rows={2}
                  maxLength={180}
                  className="w-full bg-white border border-[#DDD5C7] rounded p-2.5 text-xs text-[#2A3127] placeholder-[#9E9B93] focus:outline-none focus:border-[#A37E4C]"
                />
              </div>
            </div>

            {/* Bottom Actions: Quantity, Price Total, Add to Bag & Wishlist */}
            <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-[#DDD5C7] rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-xs hover:bg-[#F2ECE1] transition-colors"
                  >
                    −
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#222]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-xs hover:bg-[#F2ECE1] transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#797F73] block">Total Curated Price</span>
                  <span className="font-serif-luxury text-xl font-medium text-[#1E261D]">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1C241D] hover:bg-[#8D6B3E] text-white py-3.5 px-4 rounded text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>Add To Boutique Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3.5 rounded border border-[#DDD5C7] transition-colors ${
                    isWishlisted ? 'bg-[#C75D54] text-white border-[#C75D54]' : 'bg-white hover:bg-[#F5EFE4] text-[#333]'
                  }`}
                  title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#7B8175] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8D6B3E]" /> 7-Day Guarantee
                </span>
                <span>·</span>
                <span>Artisan Hand-tied</span>
                <span>·</span>
                <span>White-Glove Courier</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const { wishlist, toggleWishlist, addToCart, isWishlistOpen, setIsWishlistOpen } = useShop();

  if (!isWishlistOpen) return null;

  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141C15]/65 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#DFD6C8] flex flex-col justify-between animate-fade-in">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E1D5] flex items-center justify-between bg-white/70">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8D7048] font-semibold block">
                Personal Flora Gallery
              </span>
              <h2 className="font-serif-luxury text-2xl text-[#1E2720] font-normal flex items-center gap-2">
                <span>Saved Petals</span>
                <Heart className="w-4 h-4 fill-[#B5675F] text-[#B5675F]" />
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#798073] hover:text-[#222] rounded-full hover:bg-[#F2EFE8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {wishedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0ECE4] flex items-center justify-center text-[#B5675F]">
                  <Heart className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#2B3329] mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-[#7A8073] max-w-xs mx-auto mb-6">
                  Click the heart icon on any stem or bouquet to preserve it for future celebrations.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-[#1C251D] text-white text-xs uppercase tracking-widest px-6 py-2.5 rounded hover:bg-[#8D6B3E] transition-colors"
                >
                  Explore Stems
                </button>
              </div>
            ) : (
              wishedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded border border-[#EBE4D9] shadow-sm relative group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded bg-[#F0ECE3] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-luxury text-base text-[#1E261D] font-medium leading-snug line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#81877A] mt-0.5 line-clamp-1 italic">
                        {product.flowerComposition.join(' · ')}
                      </p>
                      <span className="font-serif-luxury text-base text-[#1E251E] font-medium mt-1 block">
                        ${product.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#F2ECE1]">
                      <button
                        onClick={() => {
                          addToCart(product.id, 1);
                        }}
                        className="flex-1 bg-[#1C251D] hover:bg-[#8D6B3E] text-white text-[10px] uppercase tracking-wider py-1.5 px-3 rounded flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move To Bag</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-1.5 text-[#9E978B] hover:text-[#B5675F] rounded hover:bg-[#F7F2EA] transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishedProducts.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E1D5]">
              <button
                onClick={() => {
                  wishedProducts.forEach(p => addToCart(p.id, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-[#8D6B3E] hover:bg-[#795B33] text-white py-3 rounded text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow"
              >
                <span>Move All To Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

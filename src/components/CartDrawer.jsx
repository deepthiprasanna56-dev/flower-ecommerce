import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';

export default function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen, setIsCheckoutOpen } = useShop();
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoStatus, setPromoStatus] = useState('');

  if (!isCartOpen) return null;

  // Calculate items with product metadata
  const cartDetailed = cart.map(item => {
    const prod = products.find(p => p.id === item.id) || products[0];
    const vaseExtra = item.vase && item.vase.includes('+$25') ? 25 : 0;
    const unitPrice = prod.price + vaseExtra;
    return {
      ...item,
      product: prod,
      unitPrice,
      totalLinePrice: unitPrice * item.quantity
    };
  });

  const subtotal = cartDetailed.reduce((sum, item) => sum + item.totalLinePrice, 0);
  const shippingThreshold = 150;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HAUTEBLOOM') {
      const discount = Math.round(subtotal * 0.15); // 15% off
      setDiscountAmount(discount);
      setPromoStatus('15% Haute Privilege applied!');
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      const discount = 20;
      setDiscountAmount(discount);
      setPromoStatus('$20 Boutique Credit applied!');
    } else {
      setPromoStatus('Invalid privilege token. Try HAUTEBLOOM');
    }
  };

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141C15]/65 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#DFD6C8] flex flex-col justify-between animate-fade-in">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E1D5] flex items-center justify-between bg-white/70">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8D7048] font-semibold block">
                Boutique Reservation
              </span>
              <h2 className="font-serif-luxury text-2xl text-[#1E2720] font-normal">
                Your Floral Bag
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#798073] hover:text-[#222] rounded-full hover:bg-[#F2EFE8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F3EFE7] border-b border-[#E8E1D5] text-xs">
            {isFreeShipping ? (
              <p className="text-[#3A6B43] flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C49B5C]" />
                You have qualified for complimentary White-Glove Courier Delivery!
              </p>
            ) : (
              <div>
                <p className="text-[#646A5E] mb-1.5">
                  Add <strong className="text-[#1E251E]">${shippingThreshold - subtotal}</strong> more for complimentary delivery
                </p>
                <div className="w-full bg-[#E0D7C9] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#A68352] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-5">
            {cartDetailed.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F0ECE4] flex items-center justify-center text-[#8D7048]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#2B3329] mb-1">Your bag awaits flowers</h3>
                <p className="text-xs text-[#7A8073] max-w-xs mx-auto mb-6">
                  Every arrangement begins with an intention. Explore our handcrafted botanical pieces.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#1C251D] text-white text-xs uppercase tracking-widest px-6 py-2.5 rounded hover:bg-[#8D6B3E] transition-colors"
                >
                  Return to Collections
                </button>
              </div>
            ) : (
              cartDetailed.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex gap-4 p-3.5 bg-white rounded border border-[#E9E3D8] shadow-sm relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-[#F0ECE3] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-5">
                        <h4 className="font-serif-luxury text-base text-[#1E261D] font-medium leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-[#81877A] mt-0.5 line-clamp-1">
                        {item.vase || 'Standard Ribbon Wrap'}
                      </p>
                      {item.note && (
                        <p className="text-[10px] italic text-[#63695C] mt-1 bg-[#FAF7F2] p-1 rounded border border-[#EDE7DC] line-clamp-1">
                          “{item.note}”
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2ECE1]">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#DDD6C9] rounded bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="px-2 py-0.5 text-xs text-[#555] hover:text-black"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#1C241D]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="px-2 py-0.5 text-xs text-[#555] hover:text-black"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="font-serif-luxury font-medium text-sm text-[#1E251E]">
                        ${item.totalLinePrice}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="absolute top-2.5 right-2.5 text-[#A39D91] hover:text-[#B84E44] p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & checkout */}
          {cartDetailed.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E1D5] space-y-4 shadow-lg">
              {/* Promo Code Input */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#918C82] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Privilege code (try HAUTEBLOOM)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#DDD6C8] pl-9 pr-3 py-1.5 text-xs text-[#20261D] rounded placeholder-[#9C988F] uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#2B352A] hover:bg-[#8D6B3E] text-white text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoStatus && (
                <p className="text-[11px] text-[#8D7048] font-medium -mt-2">{promoStatus}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6A7063]">
                <div className="flex justify-between">
                  <span>Arrangements Subtotal</span>
                  <span className="text-[#1F271F] font-medium">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8E5349]">
                    <span>Haute Privilege Savings</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Temperature Courier</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-[#ECE5DA] flex justify-between items-baseline">
                  <span className="font-serif-luxury text-base text-[#1E251E] font-medium">Boutique Total</span>
                  <span className="font-serif-luxury text-xl text-[#1E251E] font-semibold">
                    ${grandTotal}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={proceedToCheckout}
                className="w-full bg-[#1C251D] hover:bg-[#8D6B3E] text-[#FAF8F5] py-3.5 rounded text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow hover:shadow-md"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] text-[#93998C] uppercase tracking-wider">
                Encrypted 256-Bit SSL Checkout · Hand-Penned Luxury Note
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

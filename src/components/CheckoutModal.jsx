import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { X, CheckCircle, ShieldCheck, Sparkles, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const { cart, clearCart, isCheckoutOpen, setIsCheckoutOpen, showToast, user } = useShop();
  
  const [step, setStep] = useState(1); // 1: Delivery details & Card, 2: Confirmed
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    fullName: user ? user.name : 'Lady Genevieve Vance',
    email: user ? user.email : 'genevieve.vance@residence.com',
    phone: '+1 (212) 555-0198',
    address: '740 Park Avenue, Penthouse B',
    city: 'New York',
    zipCode: '10021',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deliverySlot: 'Morning Concierge (9:00 AM - 12:00 PM)',
    specialInstructions: 'Ring private buzzer. Hand directly to butler or reception in chilled wrap.',
    paymentMethod: 'card',
    cardNumber: '4532 •••• •••• 8892',
    cardExpiry: '09/28',
    cardCvc: '•••'
  });

  if (!isCheckoutOpen) return null;

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => {
    const prod = products.find(p => p.id === item.id) || products[0];
    const vaseExtra = item.vase && item.vase.includes('+$25') ? 25 : 0;
    return sum + (prod.price + vaseExtra) * item.quantity;
  }, 0);

  const shipping = subtotal >= 150 ? 0 : 25;
  const tax = Math.round(subtotal * 0.08); // 8% luxury sales tax
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep(2);
    
    // Trigger celebratory gold confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF8F5', '#8A642F', '#4A5B4C']
      });
    } catch {
      // ignore if confetti fails
    }

    clearCart();
    showToast('Your reservation has been confirmed and scheduled with our master florist.');
  };

  const closeAndReset = () => {
    setIsCheckoutOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121913]/75 backdrop-blur-sm transition-opacity"
        onClick={closeAndReset}
      />

      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-sm shadow-2xl border border-[#D9CEBF] overflow-hidden z-10 animate-fade-in my-6">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E1D5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-xl tracking-wider text-[#1C251D]">
              MAISON FLEUR
            </span>
            <span className="text-[#DDD6C9]">|</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8D7048] font-medium">
              Bespoke Dispatch & Checkout
            </span>
          </div>

          <button
            onClick={closeAndReset}
            className="text-[#7A8073] hover:text-[#222] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
            
            {/* Form Inputs (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Delivery Recipient Details */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8D6B3E] mb-3 flex items-center gap-2">
                  <span>01</span>
                  <span>Recipient & Delivery Residence</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Email for Status Updates
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Courier Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Street Address & Suite / Penthouse
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Timing & Scheduling */}
              <div className="pt-4 border-t border-[#E8E1D5]">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8D6B3E] mb-3 flex items-center gap-2">
                  <span>02</span>
                  <span>Hand Delivery Scheduling</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Requested Delivery Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Dedicated Time Window
                    </label>
                    <select
                      value={formData.deliverySlot}
                      onChange={(e) => setFormData({ ...formData, deliverySlot: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    >
                      <option>Morning Concierge (9:00 AM - 12:00 PM)</option>
                      <option>Afternoon Salon (1:00 PM - 5:00 PM)</option>
                      <option>Evening Twilight Gala (6:00 PM - 8:30 PM)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#4A5144] uppercase tracking-wider mb-1">
                      Courier Handling Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] rounded px-3 py-2 text-xs text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-4 border-t border-[#E8E1D5]">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8D6B3E] mb-3 flex items-center gap-2">
                  <span>03</span>
                  <span>Haute Payment Authentication</span>
                </h3>

                <div className="p-4 bg-white rounded border border-[#E3DBD0] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE4]">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#20261E]">
                      <CreditCard className="w-4 h-4 text-[#8D6B3E]" />
                      <span>Encrypted Card Settlement</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#697063]">
                      <Lock className="w-3 h-3 text-[#3B6640]" />
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#6B7265] uppercase tracking-wider mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-1.5 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-[#6B7265] uppercase tracking-wider mb-1">Expiration</label>
                      <input
                        type="text"
                        required
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-1.5 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#6B7265] uppercase tracking-wider mb-1">Security Code</label>
                      <input
                        type="text"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-1.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Order Summary Column (5 Cols) */}
            <div className="lg:col-span-5 bg-[#F2EDE5] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E3DBD0]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8D6B3E] font-semibold block mb-1">
                  Reservation Review
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#1E261D] mb-4">
                  Curated Summary
                </h3>

                {/* Items in Checkout */}
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1 mb-6">
                  {cart.map((item, idx) => {
                    const prod = products.find(p => p.id === item.id) || products[0];
                    const vasePrice = item.vase && item.vase.includes('+$25') ? 25 : 0;
                    const itemTotal = (prod.price + vasePrice) * item.quantity;
                    return (
                      <div key={idx} className="flex gap-3 text-xs bg-white/70 p-2.5 rounded border border-[#E8E1D5]">
                        <img src={prod.images[0]} alt={prod.name} className="w-12 h-14 object-cover rounded bg-[#E8E3DA]" />
                        <div className="flex-1">
                          <p className="font-serif-luxury text-sm font-medium text-[#1E261D] line-clamp-1">{prod.name}</p>
                          <p className="text-[10px] text-[#787E71]">Qty: {item.quantity}</p>
                          <p className="text-[10px] text-[#787E71] line-clamp-1">{item.vase}</p>
                        </div>
                        <span className="font-serif-luxury font-medium text-sm text-[#1F271F]">${itemTotal}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Calculation */}
                <div className="space-y-2 text-xs text-[#63695C] border-t border-[#DFD6C8] pt-4">
                  <div className="flex justify-between">
                    <span>Arrangements Subtotal</span>
                    <span className="text-[#1E261D] font-medium">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>White-Glove Courier</span>
                    <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Botanical Taxes</span>
                    <span>${tax}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif-luxury text-[#1E261D] font-medium pt-3 border-t border-[#DFD6C8]">
                    <span>Total Investment</span>
                    <span className="text-xl font-bold">${total}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#1C251D] hover:bg-[#8D6B3E] text-white py-4 rounded text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                  <span>Authorize & Place Order</span>
                </button>
                <p className="text-center text-[10px] text-[#868C80] mt-3">
                  A concierge confirmation with live floral tracking will be transmitted via SMS & email.
                </p>
              </div>

            </div>

          </form>
        ) : (
          // Order Confirmation Success View
          <div className="p-8 sm:p-14 text-center max-w-xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E8EFE8] flex items-center justify-center text-[#3D7747]">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8D6B3E] font-semibold block mb-2">
              Order Confirmed & Sealed
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E261D] mb-3">
              Merci, {formData.fullName.split(' ')[0]}
            </h2>
            <p className="text-xs sm:text-sm text-[#6C7365] leading-relaxed mb-6 font-light">
              Your floral commission has been received by our head artisan florists. We are selecting and hand-tying your stems right now.
            </p>

            {/* Order Receipt Box */}
            <div className="bg-white p-5 rounded border border-[#DFD7CA] text-left text-xs mb-8 space-y-2.5 shadow-sm">
              <div className="flex justify-between border-b border-[#F0ECE4] pb-2">
                <span className="text-[#787F72]">Order Dossier:</span>
                <span className="font-mono font-bold text-[#1E251E]">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-[#F0ECE4] pb-2">
                <span className="text-[#787F72]">Scheduled Delivery:</span>
                <span className="font-medium text-[#1E251E]">{formData.deliveryDate} ({formData.deliverySlot.split(' ')[0]})</span>
              </div>
              <div className="flex justify-between border-b border-[#F0ECE4] pb-2">
                <span className="text-[#787F72]">Delivery Address:</span>
                <span className="font-medium text-[#1E251E] text-right">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#787F72]">Total Settled:</span>
                <span className="font-serif-luxury text-base font-bold text-[#8D6B3E]">${total}</span>
              </div>
            </div>

            <button
              onClick={closeAndReset}
              className="bg-[#1C251D] hover:bg-[#8D6B3E] text-white py-3.5 px-8 rounded text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow"
            >
              Return To The Maison
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Send, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('You are welcomed into our Private Botanical Circle. A welcome token was sent.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#141C15] text-[#FAF8F5] pt-16 pb-12 border-t border-[#232F24]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Newsletter / Invitation Box */}
        <div className="border border-[#2C3B2E] bg-[#1A241C] p-8 sm:p-12 rounded-sm mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C49B5C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                The Botanical Gazette
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#FAF8F5] font-light">
                Receive Early Floral <span className="italic">Allocations</span>
              </h3>
              <p className="text-xs text-[#A8AFA3] max-w-md font-light leading-relaxed">
                Be the first to secure limited peony harvests, rare Ecuadorian imports, and private invitations to floral design masterclasses.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your esteemed email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#121A13] border border-[#2E3E31] px-4 py-3.5 rounded text-xs text-[#FAF8F5] placeholder-[#798375] focus:outline-none focus:border-[#C49B5C]"
                />
                <button
                  type="submit"
                  className="bg-[#C49B5C] hover:bg-[#B38747] text-[#141C15] font-semibold px-6 py-3.5 rounded text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  <span>Join Gazette</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-[10px] text-[#6E786B] mt-2">
                We revere your discretion. Strictly editorial updates; no unrefined solicitations.
              </p>
            </div>

          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#253227]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#A6977F] block">Haute Floristry Atelier</span>
            <h2 className="font-serif-luxury text-3xl tracking-widest text-[#FAF8F5]">
              MAISON FLEUR
            </h2>
            <p className="text-xs text-[#9FA89A] max-w-sm leading-relaxed font-light">
              Purveyors of rare, sculptural, and ethically foraged botanical wonders. Flown fresh and presented in couture archival wraps for celebrated moments.
            </p>
            <div className="pt-2 text-[11px] text-[#A37E4C] flex items-center gap-2">
              <span>Paris ✦ New York ✦ London ✦ Tokyo</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C49B5C] font-semibold">
              The Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#B2B9AE]">
              <li><a href="#shop" className="hover:text-white transition-colors">Imperial Roses</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Silk Peony Harvest</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Cascading Orchids</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Wild Meadow Flora</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Seasonal Solstices</a></li>
            </ul>
          </div>

          {/* Concierge */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C49B5C] font-semibold">
              Concierge Care
            </h4>
            <ul className="space-y-2 text-xs text-[#B2B9AE]">
              <li><a href="#shop" className="hover:text-white transition-colors">Private Commissions</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Wedding Botanicals</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Vessel Monogramming</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Stem Longevity Guide</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Corporate Installations</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C49B5C] font-semibold">
              Salons & Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#B2B9AE]">
              <p>740 Madison Ave, New York</p>
              <p>28 Rue du Faubourg, Paris</p>
              <p className="pt-1 text-[#C49B5C] font-mono">concierge@maisonfleur.com</p>
              <p className="font-mono text-[11px]">+1 (800) 459-FLEUR</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#788274] gap-4">
          <p>© 2026 Maison Fleur Haute Floristry Inc. All botanical rights preserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Protocol</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Haute Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Floral Ethical Charter</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

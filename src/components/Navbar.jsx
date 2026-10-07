import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, User, Search, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, setIsAuthOpen, setAuthMode, user } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-sm border-b border-[#E8E1D5] py-3.5'
            : 'bg-[#FAF8F5] border-b border-[#EFE9DF] py-5'
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-[#252C22] p-1.5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-[0.18em] font-medium text-[#484E44]">
            <a href="#collections" className="hover:text-[#9E7A4A] transition-colors duration-200">
              Collections
            </a>
            <a href="#shop" className="hover:text-[#9E7A4A] transition-colors duration-200">
              Boutique
            </a>
            <a href="#story" className="hover:text-[#9E7A4A] transition-colors duration-200">
              Our Maison
            </a>
            <a href="#testimonials" className="hover:text-[#9E7A4A] transition-colors duration-200">
              Patron Voices
            </a>
          </nav>

          {/* Maison Fleur Brand Logo */}
          <a href="#" className="flex flex-col items-center group text-center select-none">
            <span className="font-serif-luxury text-[25px] sm:text-[32px] lg:text-[36px] tracking-[0.14em] font-normal text-[#1A231B] group-hover:text-[#876537] transition-colors duration-300">
              MAISON FLEUR
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#A69C8E] -mt-1 font-light">Haute Floristry</span>
          </a>

          {/* Actions: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a 
              href="#shop" 
              className="text-[#424A3E] hover:text-[#9E7A4A] transition-colors p-1 hidden sm:block" 
              title="Search Flowers"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </a>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-[#424A3E] hover:text-[#9E7A4A] transition-colors p-1"
              title="View Wishlist"
            >
              <Heart className={`w-5 h-5 stroke-[1.5] ${wishlist.length > 0 ? 'fill-[#C47D76] text-[#C47D76]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B5675F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Concierge Button */}
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthOpen(true);
              }}
              className="relative text-[#424A3E] hover:text-[#9E7A4A] transition-colors p-1 flex items-center gap-1.5"
              title={user ? `Signed in as ${user.name}` : "Member Concierge"}
            >
              <User className="w-5 h-5 stroke-[1.5]" />
              {user && (
                <span className="hidden lg:inline-block text-[11px] font-medium tracking-wide text-[#65523A]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group flex items-center gap-2.5 bg-[#1F2720] hover:bg-[#8D6B3E] text-[#F7F4EE] px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-300 shadow-sm hover:shadow"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.7]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#FAF8F5] text-[#1F2720] rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E1D5] bg-[#FAF8F5] px-6 py-6 space-y-4 animate-fade-in text-center">
            <a 
              href="#collections" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[13px] uppercase tracking-[0.2em] font-medium text-[#383E34] py-2 border-b border-[#ECE5DA]"
            >
              Collections
            </a>
            <a 
              href="#shop" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[13px] uppercase tracking-[0.2em] font-medium text-[#383E34] py-2 border-b border-[#ECE5DA]"
            >
              Boutique Catalog
            </a>
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[13px] uppercase tracking-[0.2em] font-medium text-[#383E34] py-2 border-b border-[#ECE5DA]"
            >
              Our Maison Story
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[13px] uppercase tracking-[0.2em] font-medium text-[#383E34] py-2 border-b border-[#ECE5DA]"
            >
              Patron Reviews
            </a>
          </div>
        )}
      </header>
    </>
  );
}

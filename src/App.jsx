import { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import CategoryModal from './components/CategoryModal';
import ShopSection from './components/ShopSection';
import StoryAndTestimonials from './components/StoryAndTestimonials';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCategoryModal, setActiveCategoryModal] = useState(null);

  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#242A22]">
        {/* Navigation (Announcement bar removed as requested in Image 1) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Featured Collections / Categories (Opens collection view on click as requested in Image 2) */}
          <CategorySection
            onSelectCategory={setSelectedCategory}
            onOpenCategoryModal={(catId) => setActiveCategoryModal(catId)}
            activeCategory={selectedCategory}
          />

          {/* Boutique Shop with Search, Filters, Price Ranges, and Cards */}
          <ShopSection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Maison Story, Floral Philosophy & Patron Testimonials */}
          <StoryAndTestimonials />
        </main>

        {/* Haute Footer & Newsletter */}
        <Footer />

        {/* Global Drawers & Modals */}
        <CategoryModal
          activeCategoryId={activeCategoryModal}
          onClose={() => setActiveCategoryModal(null)}
        />
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <AuthModal />
        <CheckoutModal />
        <Toast />
      </div>
    </ShopProvider>
  );
}
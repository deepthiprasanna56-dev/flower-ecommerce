import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart state: array of { id, quantity, customizedNote, vaseOption }
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_fleur_cart');
      return saved ? JSON.parse(saved) : [
        { id: 'f-01', quantity: 1, vase: 'Fluted Ceramic (+$25)', note: 'With eternal love & gratitude.' }
      ];
    } catch {
      return [{ id: 'f-01', quantity: 1, vase: 'Fluted Ceramic (+$25)', note: 'With eternal love & gratitude.' }];
    }
  });

  // Wishlist state: array of product IDs
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_fleur_wishlist');
      return saved ? JSON.parse(saved) : ['f-02', 'f-04'];
    } catch {
      return ['f-02', 'f-04'];
    }
  });

  // User auth state: simulated luxury member session
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_fleur_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active modals / drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // for quick-view product detail modal
  
  // Notification toast state
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('maison_fleur_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('maison_fleur_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('maison_fleur_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('maison_fleur_user');
    }
  }, [user]);

  const showToast = (message, type = 'gold') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (productId, quantity = 1, vase = 'Standard Ribbon Wrap (Complimentary)', note = '') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId && item.vase === vase);
      if (existing) {
        return prev.map(item =>
          item === existing
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity, vase, note }];
    });
    showToast('Curated arrangement added to your boutique bag ✿');
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item gently removed from bag', 'neutral');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your private wishlist', 'neutral');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your private floral collection ♡');
        return [...prev, productId];
      }
    });
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    showToast(`Welcome back, ${userData.name || 'esteemed member'} ✨`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of Maison Fleur concierge');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        wishlist,
        toggleWishlist,
        user,
        login,
        logout,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}

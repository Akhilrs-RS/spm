import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { addToCart, setIsCartOpen, showToast } = useCart();

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;

    if (isInWishlist(product.id)) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed ${product.name} from wishlist`);
    } else {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        discount: product.discount || 0,
        unit: product.unit || 'pack',
        weightOptions: product.weightOptions || ['Standard Pack'],
        image: product.image,
        category: product.category,
        badge: product.badge || '',
        isOrganic: product.isOrganic || false,
        rating: product.rating || 4.8
      };
      setWishlistItems((prev) => [itemToAdd, ...prev]);
      showToast(`Saved ${product.name} to wishlist`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from wishlist');
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    showToast('Wishlist cleared');
  };

  const moveAllToCart = () => {
    if (wishlistItems.length === 0) return;

    wishlistItems.forEach((item) => {
      addToCart(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          weightOptions: item.weightOptions,
          image: item.image,
          category: item.category
        },
        item.weightOptions[0],
        1
      );
    });

    setIsWishlistOpen(false);
    setIsCartOpen(true);
    showToast(`Moved ${wishlistItems.length} saved items to your basket!`);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        moveAllToCart
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}


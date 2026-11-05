import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const FREE_DELIVERY_THRESHOLD = 499.00; // Free delivery above ₹499
const STANDARD_DELIVERY_FEE = 49.00;    // Standard delivery ₹49
const ESTIMATED_TAX_RATE = 0.05;        // 5% GST on select groceries

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const getCartKey = (productId, weightOption) => `${productId}-${weightOption || 'default'}`;

  const addToCart = (product, selectedWeight = null, multiplier = 1) => {
    const weight = selectedWeight || product.weightOptions[0];
    const key = getCartKey(product.id, weight);
    const itemPrice = Math.round(product.price * multiplier);
    const origPrice = Math.round(product.originalPrice * multiplier);

    setCartItems(prev => {
      const existing = prev.find(item => item.cartKey === key);
      if (existing) {
        return prev.map(item =>
          item.cartKey === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartKey: key,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          weightOption: weight,
          price: itemPrice,
          originalPrice: origPrice,
          unit: product.unit,
          quantity: 1
        }
      ];
    });

    showToast(`Added ${product.name} to cart`);
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartKey === keyOrItemKey(item, cartKey)
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const keyOrItemKey = (item, key) => item.cartKey || key;

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => (item.cartKey || item.id) !== cartKey));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
  };

  const getItemQuantity = (productId, selectedWeight) => {
    const key = getCartKey(productId, selectedWeight);
    const item = cartItems.find(i => i.cartKey === key);
    return item ? item.quantity : 0;
  };

  const applyPromo = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'FRESH20') {
      setDiscountPercent(20);
      setFlatDiscount(0);
      setPromoCode('FRESH20');
      setPromoError('');
      showToast('20% discount applied!');
      return true;
    } else if (cleanCode === 'BAKERY15') {
      setDiscountPercent(15);
      setFlatDiscount(0);
      setPromoCode('BAKERY15');
      setPromoError('');
      showToast('15% discount applied!');
      return true;
    } else if (cleanCode === 'SUPER100') {
      setDiscountPercent(0);
      setFlatDiscount(100);
      setPromoCode('SUPER100');
      setPromoError('');
      showToast('Flat ₹100 discount applied!');
      return true;
    } else {
      setPromoError('Invalid coupon code. Try FRESH20 or SUPER100');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setFlatDiscount(0);
    setPromoError('');
  };

  // Calculations
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = Math.round(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const totalSavings = Math.round(
    cartItems.reduce(
      (acc, item) => acc + ((item.originalPrice || item.price) - item.price) * item.quantity,
      0
    )
  );

  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const amountUntilFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  let promoDiscountAmount = 0;
  if (discountPercent > 0) {
    promoDiscountAmount = Math.round((subtotal * discountPercent) / 100);
  } else if (flatDiscount > 0) {
    promoDiscountAmount = Math.min(flatDiscount, subtotal);
  }

  const estimatedTax = Math.round((subtotal - promoDiscountAmount) * ESTIMATED_TAX_RATE);
  const grandTotal = Math.max(0, subtotal - promoDiscountAmount + deliveryFee + estimatedTax);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        totalSavings,
        deliveryFee,
        isFreeDelivery,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountUntilFreeDelivery,
        freeDeliveryProgress,
        promoCode,
        discountPercent,
        flatDiscount,
        promoDiscountAmount,
        estimatedTax,
        grandTotal,
        promoError,
        isCartOpen,
        toastMessage,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        applyPromo,
        removePromo,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

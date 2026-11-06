import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const DEFAULT_PROFILE = {
  name: 'Akhil R S',
  email: 'akhilrajanshiners@gmail.com',
  phone: '9876543210',
  avatarColor: 'bg-emerald-600',
  dietaryPreference: 'all', // 'all', 'vegetarian', 'vegan', 'organic'
  deliveryInstruction: 'Call upon arrival and leave at door',
  notifications: {
    whatsapp: true,
    emailReceipts: true,
    promotions: false
  }
};

const INITIAL_ORDERS = [
  {
    orderId: 'FC-IN-842910',
    date: 'Nov 04, 2026',
    status: 'Delivered',
    slot: { label: '⚡ Express Delivery', time: '15–25 mins' },
    total: 375,
    paymentMethod: 'upi',
    address: { label: 'Home', address: 'Flat 402, Green Glen Layout, Bellandur', city: 'Bengaluru' },
    items: [
      {
        productId: 'prod-7',
        name: 'Farm Fresh A2 Desi Cow Milk',
        price: 78,
        weightOption: '1 Liter Bottle',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80'
      },
      {
        productId: 'prod-11',
        name: 'Artisan Sourdough Country Loaf',
        price: 120,
        weightOption: '400g Whole Loaf',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=500&q=80'
      },
      {
        productId: 'prod-8',
        name: 'Free-Range Brown Country Eggs',
        price: 99,
        weightOption: '6 Eggs Pack',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=500&q=80'
      }
    ]
  }
];

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_order_history');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_user_profile', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_order_history', JSON.stringify(orderHistory));
    } catch (e) {
      console.error('Failed to save order history', e);
    }
  }, [orderHistory]);

  const updateProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  const addOrderToHistory = (orderData) => {
    const formatted = {
      orderId: orderData.orderId || `FC-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Out for Delivery',
      slot: orderData.slot || { label: '⚡ Express Delivery', time: '15–25 mins' },
      total: orderData.total || 0,
      paymentMethod: orderData.paymentMethod || 'upi',
      address: orderData.address || { label: 'Home', address: 'Delivery Address', city: 'Bengaluru' },
      items: orderData.cartItems || []
    };

    setOrderHistory((prev) => [formatted, ...prev]);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        orderHistory,
        isProfileOpen,
        setIsProfileOpen,
        updateProfile,
        addOrderToHistory
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}


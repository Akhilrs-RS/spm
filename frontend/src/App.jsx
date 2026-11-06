import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import { UserProvider } from './context/UserContext';
import { WishlistProvider } from './context/WishlistContext';
import TopPromoBar from './components/layout/TopPromoBar';
import Navbar from './components/layout/Navbar';
import CategoryPills from './components/layout/CategoryPills';
import Footer from './components/layout/Footer';
import HeroSlider from './components/home/HeroSlider';
import FlashDeals from './components/home/FlashDeals';
import CategoryGrid from './components/home/CategoryGrid';
import AllCategoriesView from './components/home/AllCategoriesView';
import ProductSection from './components/product/ProductSection';
import ProductQuickViewModal from './components/product/ProductQuickViewModal';
import CartDrawer from './components/cart/CartDrawer';
import WishlistDrawer from './components/wishlist/WishlistDrawer';
import CheckoutModal from './components/checkout/CheckoutModal';
import OrderSuccessModal from './components/checkout/OrderSuccessModal';
import LocationModal from './components/common/LocationModal';
import AllCategoriesDrawer from './components/common/AllCategoriesDrawer';
import ProfileModal from './components/profile/ProfileModal';
import Toast from './components/common/Toast';

function SupermarketApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    
    // Smooth scroll down to products section if specific category or all categories
    setTimeout(() => {
      const targetId = catId === 'all' ? 'all-categories-section' : 'products';
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOrderPlaced = (details) => {
    setIsCheckoutOpen(false);
    setOrderDetails(details);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Banner & Navigation */}
      <TopPromoBar />
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectCategory}
        onOpenCategoriesDrawer={() => setIsCategoriesDrawerOpen(true)}
      />
      <CategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenCategoriesDrawer={() => setIsCategoriesDrawerOpen(true)}
      />

      {/* Main Supermarket Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Only show Hero & Category Grid when not actively searching */}
        {!searchQuery && (
          <>
            <HeroSlider onSelectCategory={handleSelectCategory} />
            <FlashDeals />
            <CategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </>
        )}

        {/* 
          If user is searching or has picked an individual category (e.g. fruits-vegetables),
          show the deep-dive ProductSection with subcategory chips and filters.
          If selectedCategory is 'all' and not searching, show the dedicated AllCategoriesView (Category Shelves)!
        */}
        {selectedCategory === 'all' && !searchQuery ? (
          <AllCategoriesView
            onSelectCategory={handleSelectCategory}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        ) : (
          <ProductSection
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-Overs */}
      <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />

      <WishlistDrawer onQuickView={(prod) => setQuickViewProduct(prod)} />

      <AllCategoriesDrawer
        isOpen={isCategoriesDrawerOpen}
        onClose={() => setIsCategoriesDrawerOpen(false)}
        onSelectCategory={handleSelectCategory}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      <ProfileModal />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderSuccessModal
        orderDetails={orderDetails}
        onClose={() => setOrderDetails(null)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <LocationModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <LocationProvider>
        <CartProvider>
          <WishlistProvider>
            <SupermarketApp />
          </WishlistProvider>
        </CartProvider>
      </LocationProvider>
    </UserProvider>
  );
}

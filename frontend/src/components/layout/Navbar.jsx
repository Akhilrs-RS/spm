import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  MapPin,
  ChevronDown,
  Sparkles,
  Heart,
  User,
  X,
  LayoutGrid
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { useUser } from '../../context/UserContext';
import { formatINR } from '../../utils/formatCurrency';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenCategoriesDrawer
}) {
  const { totalItemCount, subtotal, setIsCartOpen } = useCart();
  const { selectedAddress, setIsLocationModalOpen } = useLocation();
  const { profile, setIsProfileOpen } = useUser();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Categories Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition">
                <ShoppingBag size={22} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition flex items-center gap-1">
                  Fresh<span className="text-brand-600">Cart</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                  Supermarket & Groceries
                </span>
              </div>
            </a>

            {/* All Categories Trigger Button */}
            <button
              onClick={onOpenCategoriesDrawer}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-brand-800 font-bold text-xs border border-emerald-200/70 transition shadow-2xs group"
              title="Explore all supermarket categories"
            >
              <LayoutGrid size={16} className="text-brand-600 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden md:inline">Categories</span>
            </button>

            {/* Location Selector Pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-left group"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-brand-600 flex items-center justify-center shrink-0">
                <MapPin size={13} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900">
                  <span className="truncate max-w-[120px]">{selectedAddress?.label || 'Deliver to'}</span>
                  <span className="text-brand-600 font-semibold">• {selectedAddress?.estimatedMinutes || '20'}m</span>
                  <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-700 transition" />
                </div>
                <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                  {selectedAddress?.address || 'Choose delivery location'}
                </span>
              </div>
            </button>
          </div>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div
              className={`flex items-center bg-slate-100 hover:bg-slate-100/80 rounded-2xl border px-3.5 py-2.5 transition-all ${
                isSearchFocused
                  ? 'border-brand-500 bg-white shadow-md ring-2 ring-brand-100'
                  : 'border-transparent'
              }`}
            >
              <Search size={18} className="text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search fresh palak, A2 cow milk, basmati rice, desi butter, curd..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition mr-1"
                >
                  <X size={14} />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-medium bg-white text-slate-400 px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs">
                <span>Ctrl</span>
                <span>K</span>
              </div>
            </div>
          </div>

          {/* Actions & Dynamic Cart Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Wishlist Icon */}
            <button
              title="Saved Groceries"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-slate-100 transition relative"
            >
              <Heart size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white"></span>
            </button>

            {/* Profile / Account Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              title="My Account & Orders"
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-700 hover:text-brand-700 hover:bg-slate-100 border border-slate-200/80 transition group"
            >
              <div className={`w-8 h-8 rounded-lg ${profile.avatarColor || 'bg-brand-600'} text-white flex items-center justify-center text-xs font-black shadow-xs`}>
                {getInitials(profile.name)}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight pr-1">
                <span className="text-[10px] text-slate-400 font-medium">Hello,</span>
                <span className="text-xs font-bold text-slate-800 truncate max-w-[90px]">
                  {profile.name ? profile.name.split(' ')[0] : 'Profile'}
                </span>
              </div>
            </button>

            {/* Dynamic Cart Pill */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-3 pl-3.5 pr-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/25 hover:shadow-brand-500/35 transition active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag size={20} className="group-hover:scale-110 transition" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-600 shadow-sm animate-pulse-subtle">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] font-medium text-emerald-100 uppercase tracking-wider">
                  My Cart
                </span>
                <span className="text-xs font-bold font-mono">
                  {totalItemCount > 0 ? formatINR(subtotal) : 'Empty'}
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

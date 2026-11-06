import React, { useState } from 'react';
import { Plus, Minus, Heart, Eye, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatCurrency';
import RatingStars from '../common/RatingStars';
import Badge from '../common/Badge';

export default function ProductCard({ product, onQuickView }) {
  const {
    addToCart,
    updateQuantity,
    getItemQuantity,
    cartItems
  } = useCart();

  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isLiked = isInWishlist(product.id);

  const selectedWeight = product.weightOptions[selectedWeightIdx] || product.weightOptions[0];
  const multiplier = product.weightMultipliers ? product.weightMultipliers[selectedWeightIdx] : 1;

  const currentPrice = Math.round(product.price * multiplier);
  const currentOriginalPrice = Math.round(product.originalPrice * multiplier);
  const savings = Math.max(0, currentOriginalPrice - currentPrice);

  // Check how many of this specific weight are in the cart
  const currentQty = getItemQuantity(product.id, selectedWeight);
  const cartKey = `${product.id}-${selectedWeight}`;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, multiplier);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(cartKey, currentQty + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(cartKey, currentQty - 1);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover hover:border-brand-300 group relative"
    >
      {/* Top Media & Badges */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-orange-500 text-white text-[11px] font-black shadow-xs tracking-tight">
              -{product.discount}%
            </span>
          )}
          {product.isOrganic && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
              Organic
            </span>
          )}
        </div>

        {/* Top Right Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition backdrop-blur-xs ${
              isLiked
                ? 'bg-rose-50 text-rose-500 shadow-xs'
                : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
            }`}
            title={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart size={15} className={isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 text-slate-600 hover:text-brand-600 hover:bg-white shadow-xs flex items-center justify-center transition backdrop-blur-xs opacity-0 group-hover:opacity-100"
            title="Quick view"
          >
            <Eye size={15} />
          </button>
        </div>

        {/* Specialty Badge */}
        {product.badge && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] text-white font-medium">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Middle Content */}
      <div className="space-y-1.5 flex-1">
        <RatingStars rating={product.rating} reviews={product.reviews} size="sm" />

        <h3
          onClick={() => onQuickView(product)}
          className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 hover:text-brand-600 transition cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Weight / Pack Variant Selector */}
        {product.weightOptions && product.weightOptions.length > 1 ? (
          <div className="pt-1">
            <select
              value={selectedWeightIdx}
              onChange={(e) => setSelectedWeightIdx(Number(e.target.value))}
              className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 py-1.5 px-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500 transition cursor-pointer"
            >
              {product.weightOptions.map((opt, idx) => (
                <option key={opt} value={idx}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-medium">{selectedWeight}</p>
        )}
      </div>

      {/* Price & Action Button Footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-mono">
              {formatINR(currentPrice)}
            </span>
            {currentOriginalPrice > currentPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                {formatINR(currentOriginalPrice)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <span className="text-[10px] font-bold text-emerald-600 block">
              Save {formatINR(savings)}
            </span>
          )}
        </div>

        {/* Dynamic Quantity Controller or + Add Button */}
        <div>
          {currentQty === 0 ? (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-brand-600 text-brand-700 hover:text-white border border-emerald-300 hover:border-brand-600 font-bold text-xs transition duration-200 shadow-2xs group/btn active:scale-95"
            >
              <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center bg-brand-600 text-white rounded-xl shadow-xs overflow-hidden">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center hover:bg-brand-700 transition active:scale-90"
                title="Decrease quantity"
              >
                <Minus size={13} strokeWidth={3} />
              </button>
              <span className="w-6 text-center text-xs font-black select-none">
                {currentQty}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center hover:bg-brand-700 transition active:scale-90"
                title="Increase quantity"
              >
                <Plus size={13} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

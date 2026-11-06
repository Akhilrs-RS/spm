import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RefreshCw, Plus, Minus, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatCurrency';
import RatingStars from '../common/RatingStars';
import Badge from '../common/Badge';

export default function ProductQuickViewModal({ product, onClose }) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);
  const selectedWeight = product.weightOptions[selectedWeightIdx] || product.weightOptions[0];
  const multiplier = product.weightMultipliers ? product.weightMultipliers[selectedWeightIdx] : 1;
  const currentPrice = Math.round(product.price * multiplier);
  const currentOriginalPrice = Math.round(product.originalPrice * multiplier);
  const currentQty = getItemQuantity(product.id, selectedWeight);
  const cartKey = `${product.id}-${selectedWeight}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative bg-slate-100 p-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-72 w-full object-cover rounded-2xl shadow-sm"
            />
            {product.discount > 0 && (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-lg bg-orange-500 text-white font-black text-xs shadow-md">
                {product.discount}% OFF
              </span>
            )}
            
            {/* Wishlist toggle button on image */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition shadow-md backdrop-blur-xs ${
                isLiked
                  ? 'bg-rose-50 text-rose-500'
                  : 'bg-white text-slate-400 hover:text-rose-500'
              }`}
              title={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart size={18} className={isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''} />
            </button>
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  {product.category.replace('-', ' ')}
                </span>
                {product.isOrganic && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    100% Organic
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 leading-tight mb-2">
                {product.name}
              </h2>

              <div className="mb-4">
                <RatingStars rating={product.rating} reviews={product.reviews} size="md" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Pack Selector */}
              <div className="mb-4">
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Choose Size / Pack:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedWeightIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        selectedWeightIdx === idx
                          ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Supermarket Guarantees */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 mb-6">
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-brand-600" />
                  <span>Delivered in 20 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-brand-600" />
                  <span>Quality checked</span>
                </div>
              </div>
            </div>

            {/* Price and Cart Row */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {formatINR(currentPrice)}
                  </span>
                  {currentOriginalPrice > currentPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {formatINR(currentOriginalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Taxes calculated at cart</span>
              </div>

              <div className="flex items-center gap-2">
                {currentQty === 0 ? (
                  <button
                    onClick={() => addToCart(product, selectedWeight, multiplier)}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-500/30 transition active:scale-95"
                  >
                    <Plus size={16} />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <div className="flex items-center bg-brand-600 text-white rounded-xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => updateQuantity(cartKey, currentQty - 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-brand-700 transition"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                    <span className="w-8 text-center text-sm font-black select-none">
                      {currentQty}
                    </span>
                    <button
                      onClick={() => updateQuantity(cartKey, currentQty + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-brand-700 transition"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

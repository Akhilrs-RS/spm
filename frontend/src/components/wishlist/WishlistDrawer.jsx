import React from 'react';
import {
  X,
  Heart,
  Trash2,
  Plus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatCurrency';

export default function WishlistDrawer({ onQuickView }) {
  const {
    wishlistItems,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    clearWishlist,
    moveAllToCart
  } = useWishlist();

  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const totalValue = wishlistItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slide-left">
          
          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs">
                <Heart size={20} className="fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Saved Groceries</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} in your wishlist
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 mb-4 border border-rose-100/60">
                  <Heart size={38} className="text-rose-400" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">Your wishlist is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
                  Save your favorite fresh fruits, dairy, and pantry essentials to quickly reorder them anytime.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Start Exploring Groceries
                </button>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex items-start gap-3.5 group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100 cursor-pointer"
                    onClick={() => {
                      if (onQuickView) {
                        onQuickView(item);
                        setIsWishlistOpen(false);
                      }
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        if (onQuickView) {
                          onQuickView(item);
                          setIsWishlistOpen(false);
                        }
                      }}
                      className="font-bold text-slate-800 text-xs sm:text-sm truncate hover:text-brand-600 transition cursor-pointer"
                    >
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {item.weightOptions ? item.weightOptions[0] : item.unit}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-slate-900 text-xs sm:text-sm font-mono">
                          {formatINR(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-[10px] text-slate-400 line-through font-mono">
                            {formatINR(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={() =>
                          addToCart(
                            item,
                            item.weightOptions ? item.weightOptions[0] : 'Standard',
                            1
                          )
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-50 hover:bg-brand-600 text-brand-700 hover:text-white border border-emerald-300 hover:border-brand-600 rounded-lg text-xs font-bold transition shadow-2xs active:scale-95"
                      >
                        <Plus size={13} strokeWidth={2.5} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 rounded transition opacity-80 group-hover:opacity-100"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {wishlistItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Total Saved Items Value:</span>
                <span className="text-sm font-black text-slate-900 font-mono">
                  {formatINR(totalValue)}
                </span>
              </div>

              {/* Move All to Cart Action */}
              <button
                onClick={moveAllToCart}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition active:scale-98 group"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  <span>Move All to Basket</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-emerald-100">{formatINR(totalValue)}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Clear button */}
              <div className="text-center pt-1">
                <button
                  onClick={clearWishlist}
                  className="text-xs text-slate-400 hover:text-rose-500 font-semibold transition"
                >
                  Clear Wishlist
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}


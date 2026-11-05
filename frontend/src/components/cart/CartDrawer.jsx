import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { IMPULSE_ITEMS } from '../../data/mockProducts';

export default function CartDrawer({ onProceedCheckout }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalItemCount,
    subtotal,
    totalSavings,
    deliveryFee,
    isFreeDelivery,
    freeDeliveryThreshold,
    amountUntilFreeDelivery,
    freeDeliveryProgress,
    promoCode,
    promoDiscountAmount,
    discountPercent,
    estimatedTax,
    grandTotal,
    promoError,
    updateQuantity,
    removeFromCart,
    applyPromo,
    removePromo,
    addToCart
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slide-left">
          
          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Your Grocery Basket</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in cart
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Gamified Progress Bar */}
          <div className="px-5 py-3.5 bg-brand-50/60 border-b border-brand-100/60">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-brand-800">
                <Truck size={15} className="text-brand-600" />
                {isFreeDelivery ? (
                  <span className="text-emerald-700 font-black">🎉 You unlocked FREE Express Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-emerald-700">${amountUntilFreeDelivery.toFixed(2)}</strong> more for FREE Delivery
                  </span>
                )}
              </span>
              <span className="text-[10px] text-brand-600 font-extrabold">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-emerald-200/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-4">
                  <ShoppingBag size={38} />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">Your basket is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Fill it with fresh fruits, farm dairy, oven-baked bread, and delicious groceries.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartKey} className="pt-4 first:pt-0 flex items-start gap-3.5 group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">{item.weightOption}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-slate-900 text-xs sm:text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-slate-400">
                            (${item.price.toFixed(2)} each)
                          </span>
                        )}
                      </div>

                      {/* Item Quantity Controller */}
                      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded transition active:scale-90"
                        >
                          <Minus size={12} strokeWidth={2.5} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded transition active:scale-90"
                        >
                          <Plus size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-slate-300 hover:text-rose-500 p-1 rounded transition opacity-0 group-hover:opacity-100"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}

            {/* Impulse Add-Ons ("Don't forget essentials") */}
            {cartItems.length > 0 && (
              <div className="pt-6">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Frequently Added Essentials</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {IMPULSE_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center justify-between"
                    >
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg mb-1" />
                      <span className="text-[10px] font-bold text-slate-800 line-clamp-1">{item.name}</span>
                      <span className="text-[10px] font-black text-brand-600 my-0.5">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() =>
                          addToCart({
                            ...item,
                            weightOptions: [item.unit],
                            originalPrice: item.price
                          })
                        }
                        className="w-full py-1 bg-white hover:bg-brand-600 hover:text-white text-slate-700 border border-slate-200 text-[10px] font-bold rounded-lg transition"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-3.5 shadow-lg">
              
              {/* Promo Code Input */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag size={15} className="text-brand-600" />
                    <div>
                      <span className="font-bold text-emerald-900">{promoCode} Applied</span>
                      <span className="text-emerald-700 font-semibold block text-[10px]">
                        Saved ${promoDiscountAmount.toFixed(2)} ({discountPercent}% OFF)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs text-rose-500 hover:text-rose-700 font-bold px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApply} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. FRESH20)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
                    >
                      Apply
                    </button>
                  </form>
                  {promoError && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {promoError}
                    </p>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Store Discounts</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                {promoDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon ({discountPercent}%)</span>
                    <span>-${promoDiscountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600">FREE</span>
                  ) : (
                    <span className="font-semibold text-slate-800">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-slate-800">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedCheckout();
                }}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition active:scale-98 group"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-emerald-100">${grandTotal.toFixed(2)}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}


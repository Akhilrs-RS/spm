import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Banknote,
  Sparkles,
  QrCode,
  Building
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { useUser } from '../../context/UserContext';
import { formatINR } from '../../utils/formatCurrency';

const SLOTS = [
  { id: 'slot-1', label: '⚡ Express Delivery', time: 'Arriving in 15–25 mins', isExpress: true },
  { id: 'slot-2', label: 'Today Afternoon', time: '2:00 PM – 4:00 PM', isExpress: false },
  { id: 'slot-3', label: 'Today Evening', time: '6:00 PM – 8:00 PM', isExpress: false },
  { id: 'slot-4', label: 'Tomorrow Morning', time: '7:00 AM – 9:00 AM', isExpress: false },
];

export default function CheckoutModal({ isOpen, onClose, onOrderPlaced }) {
  const { cartItems, totalItemCount, grandTotal, clearCart } = useCart();
  const { selectedAddress, setIsLocationModalOpen } = useLocation();
  const { profile, addOrderToHistory } = useUser();

  const [selectedSlot, setSelectedSlot] = useState(SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const orderPayload = {
        orderId: `FC-IN-${Math.floor(100000 + Math.random() * 900000)}`,
        address: selectedAddress,
        slot: selectedSlot,
        itemsCount: totalItemCount,
        total: grandTotal,
        paymentMethod,
        cartItems: [...cartItems]
      };

      // Add to persistent user order history
      addOrderToHistory(orderPayload);

      clearCart();
      onOrderPlaced(orderPayload);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-black text-slate-900">Checkout & Delivery</h3>
            <p className="text-xs text-slate-500 font-medium">Review your address, time slot, and payment</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Delivery Address & Contact Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Delivery Address & Contact</span>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                Change Address
              </button>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {selectedAddress?.label}
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">
                    ⚡ {selectedAddress?.estimatedMinutes} mins
                  </span>
                  {profile.name && (
                    <span className="text-xs text-slate-500 font-medium truncate">
                      • {profile.name} (+91 {profile.phone})
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-1 truncate">{selectedAddress?.address}</p>
                <p className="text-xs text-slate-400">{selectedAddress?.city} • PIN: {selectedAddress?.zip}</p>
              </div>
            </div>
          </div>

          {/* Step 2: Choose Delivery Time Slot */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              2. Choose Delivery Slot
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SLOTS.map((slot) => {
                const isSelected = selectedSlot.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{slot.label}</span>
                      {slot.isExpress && (
                        <span className="px-1.5 py-0.5 rounded bg-orange-500 text-white text-[9px] font-black uppercase">
                          Fastest
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 mt-1 font-medium">{slot.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Payment Method (Indian Options) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              3. Payment Method
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition ${
                  paymentMethod === 'upi'
                    ? 'border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <QrCode size={20} className={paymentMethod === 'upi' ? 'text-brand-600' : 'text-slate-500'} />
                <span className="text-xs font-bold text-slate-800">UPI Instant</span>
                <span className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition ${
                  paymentMethod === 'card'
                    ? 'border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CreditCard size={20} className={paymentMethod === 'card' ? 'text-brand-600' : 'text-slate-500'} />
                <span className="text-xs font-bold text-slate-800">Cards</span>
                <span className="text-[10px] text-slate-400">RuPay, Visa, Master</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition ${
                  paymentMethod === 'netbanking'
                    ? 'border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Building size={20} className={paymentMethod === 'netbanking' ? 'text-brand-600' : 'text-slate-500'} />
                <span className="text-xs font-bold text-slate-800">Net Banking</span>
                <span className="text-[10px] text-slate-400">All Major Banks</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition ${
                  paymentMethod === 'cod'
                    ? 'border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Banknote size={20} className={paymentMethod === 'cod' ? 'text-brand-600' : 'text-slate-500'} />
                <span className="text-xs font-bold text-slate-800">Cash / UPI at Door</span>
                <span className="text-[10px] text-slate-400">Pay on Delivery</span>
              </button>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-xs text-brand-900 font-medium">
            <ShieldCheck size={18} className="text-brand-600 shrink-0" />
            <span>100% secure payment. 10-minute return/refund guarantee if produce freshness isn't top notch.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block">Total Amount to Pay</span>
            <span className="text-2xl font-black text-slate-900 font-mono">{formatINR(grandTotal)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/30 transition active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Order...</span>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>Place Order ({formatINR(grandTotal)})</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

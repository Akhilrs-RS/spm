import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Bike,
  Home,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function OrderSuccessModal({ orderDetails, onClose }) {
  useEffect(() => {
    if (orderDetails) {
      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#f97316', '#a855f7']
      });
    }
  }, [orderDetails]);

  if (!orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden text-center p-6 sm:p-8">
        
        {/* Animated Success Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 size={36} strokeWidth={2.5} />
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
          Order Placed Successfully!
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Order ID: <span className="font-mono font-bold text-slate-700">{orderDetails.orderId}</span>
        </p>

        {/* Live Tracking Progress Bar */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-4">
            <span className="flex items-center gap-1.5 text-brand-600">
              <Clock size={15} />
              Estimated Arrival:
            </span>
            <span className="text-brand-700 font-extrabold">{orderDetails.slot?.time || '15–25 mins'}</span>
          </div>

          {/* Stepper */}
          <div className="relative flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 z-0">
              <div className="h-full bg-brand-500 w-1/3 transition-all" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1 bg-slate-50 px-1">
              <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shadow-xs">
                <CheckCircle2 size={14} />
              </div>
              <span className="text-slate-800 font-bold">Placed</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1 bg-slate-50 px-1">
              <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs animate-pulse">
                <Package size={14} />
              </div>
              <span className="text-brand-700 font-bold">Packing</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1 bg-slate-50 px-1">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs">
                <Bike size={14} />
              </div>
              <span>On Way</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1 bg-slate-50 px-1">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs">
                <Home size={14} />
              </div>
              <span>Arrived</span>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="text-left text-xs text-slate-600 space-y-2 mb-6 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
          <div className="flex items-start gap-2">
            <MapPin size={15} className="text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Delivering to {orderDetails.address?.label}:</span>
              <p className="text-slate-600">{orderDetails.address?.address}, {orderDetails.address?.city}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60 font-medium">
            <span>Payment Method:</span>
            <span className="font-bold uppercase text-slate-800">{orderDetails.paymentMethod}</span>
          </div>
        </div>

        {/* Continue Action */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition active:scale-98"
        >
          Shop More Groceries
        </button>

      </div>
    </div>
  );
}


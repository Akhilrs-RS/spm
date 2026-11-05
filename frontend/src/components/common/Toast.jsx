import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-2.5 bg-slate-900/95 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-sm border border-slate-700/50 text-sm font-medium">
        <CheckCircle2 size={18} className="text-brand-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}


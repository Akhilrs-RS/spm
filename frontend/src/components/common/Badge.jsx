import React from 'react';

export default function Badge({ text, variant = 'default', className = '' }) {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    organic: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-medium',
    deal: 'bg-amber-100 text-amber-900 border-amber-200 font-bold',
    discount: 'bg-orange-500 text-white font-bold shadow-sm',
    bestseller: 'bg-purple-100 text-purple-800 border-purple-200 font-medium',
    fresh: 'bg-teal-50 text-teal-700 border-teal-200 font-medium'
  };

  const selected = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border ${selected} ${className}`}
    >
      {text}
    </span>
  );
}


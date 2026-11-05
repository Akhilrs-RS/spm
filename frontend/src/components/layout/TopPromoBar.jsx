import React from 'react';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function TopPromoBar() {
  return (
    <aside aria-label="Store Announcements" className="bg-gradient-to-r from-emerald-800 via-brand-700 to-teal-800 text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
            <Zap size={11} className="fill-amber-950" />
            Flash Deal
          </span>
          <span className="font-medium">
            Get 20% OFF on fresh organic groceries with code <strong className="underline decoration-amber-300 font-bold tracking-wide">FRESH20</strong>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-emerald-100 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-300" /> Free delivery on orders over $35
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-300" /> 100% Quality & Freshness Guarantee
          </span>
        </div>
      </div>
    </aside>
  );
}


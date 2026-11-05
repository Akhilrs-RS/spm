import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag, Clock } from 'lucide-react';
import { PROMO_BANNERS } from '../../data/mockCategories';
import { useCart } from '../../context/CartContext';

export default function HeroSlider({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { applyPromo } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = PROMO_BANNERS[currentSlide];

  return (
    <div className="relative overflow-hidden rounded-3xl mt-6 shadow-xl shadow-brand-950/5">
      <div
        className={`relative min-h-[380px] sm:min-h-[420px] bg-gradient-to-r ${slide.bgGradient} flex items-center transition-all duration-700`}
      >
        {/* Background Image Overlay with Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center mix-blend-overlay opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full flex flex-col items-start justify-center text-white">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20">
              <Sparkles size={13} className="text-amber-300" />
              Limited Time Special
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider shadow-sm">
              <Tag size={12} />
              {slide.discount}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-xl text-white mb-3">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-lg mb-6 leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectCategory(slide.categoryId)}
              className="flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-900/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{slide.cta}</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => applyPromo(slide.code)}
              className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-xs rounded-2xl border border-white/30 transition"
              title="Click to apply promo code"
            >
              <span>Use Code:</span>
              <span className="font-mono font-bold bg-white text-slate-900 px-2 py-0.5 rounded-lg shadow-xs">
                {slide.code}
              </span>
            </button>
          </div>

          {/* Quick Promise */}
          <div className="flex items-center gap-4 mt-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-emerald-400" /> Doorstep drop in 15–25 mins
            </span>
            <span>•</span>
            <span>Zero contact delivery available</span>
          </div>

        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition border border-white/10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {PROMO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-brand-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}


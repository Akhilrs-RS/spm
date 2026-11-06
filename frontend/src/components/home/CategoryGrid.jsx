import React from 'react';
import { CATEGORIES } from '../../data/mockCategories';
import { PRODUCTS } from '../../data/mockProducts';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryGrid({ onSelectCategory, selectedCategory }) {
  const categoriesWithoutAll = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <div className="my-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore dedicated grocery aisles with farm fresh quality and quick 15–25m delivery
          </p>
        </div>
        <button
          onClick={() => onSelectCategory('all')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
        >
          <span>View All Categories</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {categoriesWithoutAll.map((cat) => {
          const count = PRODUCTS.filter((p) => p.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group cursor-pointer rounded-2xl p-3 border transition-all duration-300 text-center flex flex-col items-center justify-between ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/80 shadow-md ring-2 ring-brand-400'
                  : 'border-slate-200/80 bg-white hover:border-brand-300 hover:shadow-card-hover'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-2.5 bg-slate-100 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 className="font-bold text-xs text-slate-800 line-clamp-1 group-hover:text-brand-600 transition">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">{count} items</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

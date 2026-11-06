import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles, Store, Apple, Milk, Croissant, Wheat, Coffee, Fish, LayoutGrid } from 'lucide-react';
import ProductCard from '../product/ProductCard';

const iconMap = {
  Store,
  Apple,
  Milk,
  Croissant,
  Wheat,
  Coffee,
  Fish,
  LayoutGrid
};

export default function CategoryShelf({
  category,
  products,
  onSelectCategory,
  onQuickView
}) {
  const [activeSubcategory, setActiveSubcategory] = useState('All');

  const Icon = iconMap[category.icon] || Store;

  const filteredItems = useMemo(() => {
    let list = products.filter((p) => p.category === category.id);
    if (activeSubcategory && activeSubcategory !== 'All') {
      list = list.filter((p) => p.subcategory === activeSubcategory);
    }
    return list;
  }, [category.id, products, activeSubcategory]);

  const totalCategoryCount = products.filter((p) => p.category === category.id).length;

  return (
    <section className="my-10 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs hover:border-brand-200 transition-colors">
      {/* Category Shelf Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-600 flex items-center justify-center shrink-0 border border-emerald-100/80 shadow-2xs">
            <Icon size={24} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {category.name}
              </h3>
              {category.badge && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-brand-800 text-[10px] font-black uppercase tracking-wider">
                  {category.badge}
                </span>
              )}
              <span className="text-xs text-slate-400 font-semibold">
                ({totalCategoryCount} items)
              </span>
            </div>
            {category.description && (
              <p className="text-xs text-slate-500 mt-0.5">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* View All Button */}
        <button
          onClick={() => onSelectCategory(category.id)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-bold text-xs border border-slate-200 hover:border-brand-300 transition duration-200 self-start md:self-auto group"
        >
          <span>Explore All {category.name}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Subcategory Filter Pills */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-3.5 no-scrollbar">
          {category.subcategories.map((sub) => {
            const isActive = activeSubcategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      )}

      {/* Product Cards Row / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mt-2">
        {filteredItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
}


import React, { useState } from 'react';
import {
  X,
  LayoutGrid,
  ChevronRight,
  Store,
  Apple,
  Milk,
  Croissant,
  Wheat,
  Coffee,
  Fish,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockCategories';
import { PRODUCTS } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatCurrency';

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

export default function AllCategoriesDrawer({
  isOpen,
  onClose,
  onSelectCategory,
  onQuickView
}) {
  const visibleCategories = CATEGORIES.filter((c) => c.id !== 'all');
  const [activeCategoryId, setActiveCategoryId] = useState(visibleCategories[0]?.id || 'fruits-vegetables');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId) || visibleCategories[0];
  const activeProducts = PRODUCTS.filter((p) => p.category === activeCategory.id);

  const handleCategoryClick = (catId) => {
    onSelectCategory(catId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between border-r border-slate-200 animate-slide-right">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
                <LayoutGrid size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">All Supermarket Categories</h3>
                <p className="text-xs text-slate-500 font-medium">Explore aisles, departments, and subcategories</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* 2-Column Category Explorer */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Rail: Category List */}
            <div className="w-2/5 border-r border-slate-100 overflow-y-auto p-3 space-y-1 bg-slate-50/50">
              {/* Option to view All */}
              <button
                onClick={() => handleCategoryClick('all')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-left transition font-bold text-xs bg-emerald-50 text-brand-800 border border-emerald-200/60 mb-2"
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid size={16} />
                  <span>View All Categories</span>
                </div>
                <ArrowRight size={14} />
              </button>

              {visibleCategories.map((cat) => {
                const Icon = iconMap[cat.icon] || Store;
                const isSelected = activeCategoryId === cat.id;
                const count = PRODUCTS.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                        : 'text-slate-600 hover:bg-white/80 hover:text-slate-900 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-brand-50 text-brand-600' : 'bg-slate-200/60 text-slate-500'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="text-xs truncate">{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Right Panel: Selected Category Preview & Subcategories */}
            <div className="w-3/5 overflow-y-auto p-5 space-y-5">
              {/* Category Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-28 flex items-end p-4 text-white">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-500 text-white">
                    {activeCategory.badge}
                  </span>
                  <h4 className="text-base font-black text-white mt-1 leading-tight">
                    {activeCategory.name}
                  </h4>
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Sub-categories
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeCategory.subcategories?.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleCategoryClick(activeCategory.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-xs font-semibold border border-slate-200 transition"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured items in this category */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Featured in {activeCategory.name}
                  </h5>
                  <button
                    onClick={() => handleCategoryClick(activeCategory.id)}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    See all ({activeProducts.length}) →
                  </button>
                </div>

                <div className="space-y-2">
                  {activeProducts.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-2 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{prod.name}</p>
                          <p className="text-[10px] text-slate-500">{prod.weightOptions[0]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-black text-slate-900 font-mono">
                          {formatINR(prod.price)}
                        </span>
                        <button
                          onClick={() => addToCart(prod, prod.weightOptions[0], 1)}
                          className="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-bold rounded-lg shadow-2xs"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Explore Button */}
              <button
                onClick={() => handleCategoryClick(activeCategory.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Browse Entire {activeCategory.name}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


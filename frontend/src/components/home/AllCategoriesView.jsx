import React from 'react';
import { CATEGORIES } from '../../data/mockCategories';
import { PRODUCTS } from '../../data/mockProducts';
import CategoryShelf from './CategoryShelf';
import { LayoutGrid, Sparkles } from 'lucide-react';

export default function AllCategoriesView({ onSelectCategory, onQuickView }) {
  const visibleCategories = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <div className="space-y-6 my-8" id="all-categories-section">
      {/* Section Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
              <LayoutGrid size={18} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              All Categories & Aisles
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse through our dedicated supermarket categories with 15–25m express doorstep delivery
          </p>
        </div>

        {/* Total stats pill */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 self-start md:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
            {visibleCategories.length} Categories
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            {PRODUCTS.length} Total Items
          </span>
        </div>
      </div>

      {/* Render Each Category Shelf */}
      <div className="space-y-8">
        {visibleCategories.map((cat) => (
          <div key={cat.id} id={`shelf-${cat.id}`}>
            <CategoryShelf
              category={cat}
              products={PRODUCTS}
              onSelectCategory={onSelectCategory}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


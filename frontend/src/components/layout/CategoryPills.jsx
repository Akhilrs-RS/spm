import React from 'react';
import {
  Store,
  Apple,
  Milk,
  Croissant,
  Wheat,
  Coffee,
  Fish
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockCategories';

const iconMap = {
  Store,
  Apple,
  Milk,
  Croissant,
  Wheat,
  Coffee,
  Fish
};

export default function CategoryPills({ selectedCategory, onSelectCategory }) {
  return (
    <div className="bg-white border-b border-slate-200/80 sticky top-20 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Store;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Icon size={15} className={isSelected ? 'text-white' : 'text-slate-500'} />
                <span>{cat.name}</span>
                {cat.badge && (
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-brand-800'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


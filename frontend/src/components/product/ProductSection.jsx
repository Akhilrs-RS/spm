import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Check, Leaf } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../../data/mockProducts';
import { CATEGORIES } from '../../data/mockCategories';

export default function ProductSection({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onQuickView
}) {
  const [filterType, setFilterType] = useState('all'); // 'all', 'organic', 'deals', 'under5'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Secondary Quick Filters
    if (filterType === 'organic') {
      list = list.filter((p) => p.isOrganic);
    } else if (filterType === 'deals') {
      list = list.filter((p) => p.isDeal || p.discount > 0);
    } else if (filterType === 'under5') {
      list = list.filter((p) => p.price < 5.0);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, filterType, sortBy]);

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section className="my-10" id="products">
      {/* Category Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {searchQuery ? `Search results for "${searchQuery}"` : currentCategoryObj?.name || 'All Groceries'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              {filteredProducts.length} items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Always fresh, hand-inspected, and delivered within 15–30 minutes
          </p>
        </div>

        {/* Filter Pills and Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Dietary Filters */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('organic')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterType === 'organic'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <Leaf size={12} />
              Organic
            </button>
            <button
              onClick={() => setFilterType('deals')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterType === 'deals'
                  ? 'bg-orange-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              Deals
            </button>
            <button
              onClick={() => setFilterType('under5')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filterType === 'under5'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Under $5
            </button>
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-brand-500 cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
            <ArrowUpDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Sparkles size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No groceries found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            We couldn't find items matching your search or filters. Try adjusting your query or switching departments.
          </p>
          <button
            onClick={() => {
              setFilterType('all');
              onSelectCategory('all');
            }}
            className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </section>
  );
}


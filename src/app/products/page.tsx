'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, CategorySlug } from '@/lib/types';
import {
  ALL_PRODUCTS, getProductsByCategory, formatPrice
} from '@/lib/products-data';
import {
  SlidersHorizontal, Grid3X3, List,
  ChevronDown, X, ArrowUpDown
} from 'lucide-react';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial state from URL params
  const initialCategory = (searchParams.get('category') as CategorySlug) || null;
  const initialSort = (searchParams.get('sort') as SortOption) || 'newest';
  const initialSearch = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState<CategorySlug | null>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let products = [...ALL_PRODUCTS];

    // Filter by category
    if (activeCategory) {
      products = products.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'newest':
      default:
        products.sort((a, b) => ((b.isNew ? 1 : 0)) - ((a.isNew ? 1 : 0)));
        break;
    }

    return products;
  }, [activeCategory, sortBy, searchQuery]);

  // Pagination
  const ITEMS_PER_PAGE = viewMode === 'grid' ? 12 : 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const categoryIcons: Record<string, string> = { male: '♂', female: '♀', lingerie: '✦' };

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      {/* Page Header */}
      <div className="page-header">
        <div className="section-container">
          <h1>
            {activeCategory
              ? CATEGORIES.find(c => c.slug === activeCategory)?.name || 'Products'
              : 'All Products'
            }
          </h1>
          <p>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>

          {/* Search Bar */}
          <form className="mt-6 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="input-field rounded-full pl-12 pr-4 py-3 text-center sm:text-left"
            />
            <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hidden sm:block" />
            {searchQuery && (
              <button type="button"
                onClick={() => { setSearchQuery(''); setPage(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="section-container pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`hidden lg:block w-64 flex-shrink-0`}>
            <div className="sticky top-28 space-y-6">
              {/* Categories */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => { setActiveCategory(null); setPage(1); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                        !activeCategory ? 'bg-zeneio-accent/10 text-zeneio-accent border border-zeneio-accent/20' : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Grid3X3 size={16} /> All Products
                      {!activeCategory && <span className="ml-auto text-xs bg-zeneio-accent/20 px-2 py-0.5 rounded-full">{ALL_PRODUCTS.length}</span>}
                    </button>
                  </li>
                  {CATEGORIES.map((cat) => {
                    const count = getProductsByCategory(cat.slug).length;
                    return (
                      <li key={cat.slug}>
                        <button
                          onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                            activeCategory === cat.slug ? 'bg-white/5 text-white border border-white/10' : 'text-white/60 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span style={{ color: activeCategory === cat.slug ? cat.color : '#888' }}>{categoryIcons[cat.slug]}</span>
                          {cat.name}
                          <span className="ml-auto text-xs text-white/25">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Quick Filters */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Quick Filters</h3>
                <div className="space-y-2">
                  {['On Sale', 'In Stock', 'New Arrivals', 'Top Rated'].map(filter => (
                    <label key={filter} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 cursor-pointer hover:bg-white/5 transition-colors">
                      <input type="checkbox" className="rounded accent-zeneio-accent" />
                      {filter}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="number" placeholder="$ Min" className="input-field text-sm rounded-lg py-2" />
                    <span className="text-white/30 self-center">—</span>
                    <input type="number" placeholder="$ Max" className="input-field text-sm rounded-lg py-2" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sticky top-16 lg:top-[72px] z-30 bg-zeneio-black/95 backdrop-blur-md py-3 -mx-4 px-4 lg:-mx-0 lg:px-0">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-ghost text-sm"
              >
                <SlidersHorizontal size={16} /> Filters
                {(activeCategory || searchQuery) && <span className="w-2 h-2 bg-zeneio-accent rounded-full ml-1" />}
              </button>

              {/* Active filters display */}
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                {activeCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/80">
                    {categoryIcons[activeCategory]} {CATEGORIES.find(c => c.slug === activeCategory)?.name}
                    <button onClick={() => setActiveCategory(null)} className="hover:text-red-400"><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/80">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => { setSearchQuery(''); }} className="hover:text-red-400"><X size={12} /></button>
                  </span>
                )}
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-3 ml-auto">
                {/* View toggle */}
                <div className="hidden sm:flex items-center glass rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40'}`}
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="btn-ghost text-sm"
                  >
                    <ArrowUpDown size={14} />
                    <span className="hidden sm:inline ml-1">
                      {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                    </span>
                    <ChevronDown size={14} className={`${showSortMenu ? 'rotate-180' : ''} transition-transform`} />
                  </button>

                  {showSortMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                      <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl py-2 z-50 animate-fade-in shadow-card-hover">
                        {SORT_OPTIONS.map(option => (
                          <button
                            key={option.value}
                            onClick={() => { setSortBy(option.value); setShowSortMenu(false); setPage(1); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              sortBy === option.value ? 'text-zeneio-accent bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Filter Panel */}
            {showFilters && (
              <div className="lg:hidden glass rounded-2xl p-5 mb-6 animate-fade-in space-y-4">
                <h3 className="font-bold text-sm">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      !activeCategory ? 'bg-zeneio-accent text-black' : 'glass text-white/60'
                    }`}
                  >All</button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat.slug ? 'bg-white/15 text-white' : 'glass text-white/60'
                      }`}
                    >{categoryIcons[cat.slug]} {cat.nameZh || cat.name}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Grid / List */}
            {paginatedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6'
                  : 'space-y-4'
              }>
                {paginatedProducts.map(product =>
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    /* List View Item */
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="flex gap-5 glass rounded-2xl p-4 group hover:border-zeneio-accent/20 transition-all"
                    >
                      <img src={product.images[0]} alt={product.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30">{product.category}</p>
                        <h3 className="font-bold text-base mt-1 group-hover:text-zeneio-accent transition-colors">{product.name}</h3>
                        <p className="text-sm text-white/40 mt-1 line-clamp-2">{product.shortDescription}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="font-bold text-zeneio-accent">{formatPrice(product.price)}</span>
                          {product.comparePrice && <span className="text-sm text-white/30 line-through">{formatPrice(product.comparePrice)}</span>}
                          {product.rating && (
                            <span className="flex items-center gap-1 text-xs text-yellow-400 ml-auto">
                              ★ {product.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-20 glass rounded-2xl">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="font-bold text-lg mb-2">No products found</h3>
                <p className="text-sm text-white/40">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setActiveCategory(null); setSearchQuery(''); setPage(1); }}
                  className="btn-outline mt-4 mx-auto"
                >Clear All Filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 rounded-xl text-sm font-medium glass text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Prev
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      page === i + 1
                        ? 'bg-zeneio-accent text-black'
                        : 'glass text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 rounded-xl text-sm font-medium glass text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Search, Leaf } from 'lucide-react';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
};

const categories = [
  { key: 'all',       label: 'All'       },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch',     label: 'Lunch'     },
  { key: 'tiffin',   label: 'Tiffin'    },
  { key: 'specials',  label: 'Specials'  },
  { key: 'desserts',  label: 'Desserts'  },
];

export default function MenuClient({ items }: { items: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Banner */}
      <section className="relative py-20 md:py-28 bg-brand-green text-brand-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="veg-dot w-4 h-4" />
            <span className="text-brand-cream/70 text-xs tracking-[0.3em] font-display uppercase">
              Pure Vegetarian
            </span>
            <span className="veg-dot w-4 h-4" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wider">
            Our Menu
          </h1>
          <p className="font-display text-lg text-brand-ochre italic mt-3">
            Crafted with tradition, served with love
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-cream-dark py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-green/40" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-brand-cream-dark bg-white
                           text-sm font-body focus:outline-none focus:ring-2
                           focus:ring-brand-ochre/50 focus:border-brand-ochre"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full font-display text-xs tracking-wide transition-all duration-300 ${
                    activeCategory === cat.key
                      ? 'bg-brand-green text-brand-cream shadow-sm'
                      : 'bg-white text-brand-green border border-brand-cream-dark hover:border-brand-ochre'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-xl text-brand-green/60">
                No dishes found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`card-menu ${!item.available ? 'opacity-70' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-base font-semibold text-brand-green">
                          {item.name}
                        </h3>
                        {item.available ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-green-50
                                           text-green-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Available Today
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-red-50
                                           text-red-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                            Unavailable
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-brand-green/60 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-display text-xl font-bold text-brand-ochre shrink-0">
                      &#8377;{Number(item.price).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-brand-cream-dark">
                    <Leaf size={12} className="text-brand-green/40" />
                    <span className="text-[10px] text-brand-green/40 tracking-wider uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
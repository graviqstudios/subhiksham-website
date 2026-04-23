'use client';

import { useState } from 'react';
import { Search, Leaf } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
};

const menuItems: MenuItem[] = [
  { id: '1', name: 'Masala Dosa', description: 'Crispy rice-lentil crepe filled with spiced potato masala, served with sambar and coconut chutney', price: 80, category: 'breakfast', available: true },
  { id: '2', name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup and assorted chutneys', price: 60, category: 'breakfast', available: true },
  { id: '3', name: 'Vada with Chutney', description: 'Crispy lentil fritters served with coconut chutney', price: 50, category: 'breakfast', available: true },
  { id: '4', name: 'Pongal', description: 'Creamy rice and moong dal cooked with pepper, cumin, and ghee', price: 70, category: 'breakfast', available: false },
  { id: '5', name: 'Upma', description: 'Semolina cooked with mustard seeds, curry leaves, and vegetables', price: 55, category: 'breakfast', available: true },
  { id: '6', name: 'Poori Masala', description: 'Deep-fried wheat bread with potato masala', price: 75, category: 'breakfast', available: true },
  { id: '7', name: 'Set Dosa', description: 'Soft, spongy dosas served in a set of three with chutneys', price: 70, category: 'breakfast', available: true },
  { id: '8', name: 'Rava Idli', description: 'Semolina-based steamed cakes with cashews and coriander', price: 65, category: 'breakfast', available: true },
  { id: '9', name: 'Meals (Sadya)', description: 'Traditional Kerala feast with rice, sambar, rasam, avial, thoran, payasam and more', price: 150, category: 'lunch', available: true },
  { id: '10', name: 'Sambar Rice', description: 'Rice mixed with lentil and vegetable stew', price: 100, category: 'lunch', available: true },
  { id: '11', name: 'Curd Rice', description: 'Cooling yogurt rice tempered with mustard seeds and curry leaves', price: 80, category: 'lunch', available: true },
  { id: '12', name: 'Lemon Rice', description: 'Tangy rice with lemon juice, peanuts, and turmeric', price: 90, category: 'lunch', available: true },
  { id: '13', name: 'Bisi Bele Bath', description: 'Karnataka-style spiced rice and lentil dish with vegetables', price: 110, category: 'lunch', available: false },
  { id: '14', name: 'Thali Special', description: 'Complete meal with roti, rice, dal, sabzi, raita, and dessert', price: 180, category: 'lunch', available: true },
  { id: '15', name: 'Rasam Rice', description: 'Pepper-tamarind broth served with steamed rice', price: 85, category: 'lunch', available: true },
  { id: '16', name: 'Avial Rice', description: 'Mixed vegetable curry in coconut yogurt with rice', price: 120, category: 'lunch', available: true },
  { id: '17', name: 'Rava Dosa', description: 'Crispy semolina crepe with onion and green chili', price: 90, category: 'tiffin', available: true },
  { id: '18', name: 'Uthappam', description: 'Thick rice pancake topped with onions, tomatoes, and chilies', price: 85, category: 'tiffin', available: true },
  { id: '19', name: 'Paniyaram', description: 'Puffed rice and lentil balls, crispy outside and soft inside', price: 70, category: 'tiffin', available: true },
  { id: '20', name: 'Bonda', description: 'Deep-fried potato dumplings in gram flour batter', price: 50, category: 'tiffin', available: true },
  { id: '21', name: 'Bajji', description: 'Assorted vegetables dipped in spiced gram flour and fried', price: 60, category: 'tiffin', available: false },
  { id: '22', name: 'Medu Vada', description: 'Crispy lentil donuts served with sambar and chutney', price: 65, category: 'tiffin', available: true },
  { id: '23', name: 'Onion Dosa', description: 'Crispy dosa topped with finely chopped onions', price: 85, category: 'tiffin', available: true },
  { id: '24', name: 'Ghee Roast Dosa', description: 'Extra crispy dosa roasted in pure ghee', price: 100, category: 'tiffin', available: true },
  { id: '25', name: 'Palakkad Special Meal', description: 'Chef\'s curated meal featuring Palakkad\'s signature dishes and seasonal specialties', price: 250, category: 'specials', available: true },
  { id: '26', name: 'Filter Coffee', description: 'Traditional South Indian filter coffee with frothed milk', price: 40, category: 'specials', available: true },
  { id: '27', name: 'Mango Lassi', description: 'Sweet mango yogurt drink blended with cardamom', price: 60, category: 'specials', available: true },
  { id: '28', name: 'Payasam', description: 'Traditional vermicelli dessert in sweetened milk with nuts', price: 50, category: 'specials', available: true },
  { id: '29', name: 'Jalebi', description: 'Crispy sweet spirals soaked in saffron sugar syrup', price: 45, category: 'specials', available: false },
  { id: '30', name: 'Rasgulla', description: 'Soft cottage cheese balls in light sugar syrup', price: 55, category: 'specials', available: true },
  { id: '31', name: 'Gulab Jamun', description: 'Deep-fried milk dumplings in rose-cardamom syrup', price: 50, category: 'desserts', available: true },
  { id: '32', name: 'Kheer', description: 'Creamy rice pudding with almonds, cashews, and saffron', price: 55, category: 'desserts', available: true },
  { id: '33', name: 'Halwa', description: 'Traditional wheat halwa with ghee and nuts', price: 45, category: 'desserts', available: true },
  { id: '34', name: 'Kesari', description: 'Semolina saffron sweet with cashews and raisins', price: 40, category: 'desserts', available: true },
  { id: '35', name: 'Mysore Pak', description: 'Rich gram flour and ghee fudge from Mysore', price: 50, category: 'desserts', available: false },
  { id: '36', name: 'Laddu', description: 'Traditional besan laddu with ghee and cardamom', price: 40, category: 'desserts', available: true },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'tiffin', label: 'Tiffin' },
  { key: 'specials', label: 'Specials' },
  { key: 'desserts', label: 'Desserts' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Banner */}
      <section className="relative py-20 md:py-28 bg-brand-green text-brand-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
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
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-green/40"
              />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-brand-cream-dark bg-white text-sm font-body focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
              />
            </div>

            {/* Category Tabs */}
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
                          <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Available Today
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                            Unavailable
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-brand-green/60 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-display text-xl font-bold text-brand-ochre shrink-0">
                      &#8377;{item.price}
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

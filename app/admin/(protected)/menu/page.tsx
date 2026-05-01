'use client';
// app/admin/menu/page.tsx

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Search } from 'lucide-react';
import type { MenuItem, Category } from '@/types';

const CATEGORIES: Category[] = ['breakfast', 'lunch', 'tiffin', 'specials', 'desserts'];
const CAT_COLORS: Record<Category, string> = {
  breakfast: 'bg-amber-100 text-amber-700',
  lunch:     'bg-green-100 text-green-700',
  tiffin:    'bg-blue-100 text-blue-700',
  specials:  'bg-purple-100 text-purple-700',
  desserts:  'bg-pink-100 text-pink-700',
};

export default function MenuPage() {
  const [items, setItems]           = useState<MenuItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [filterCat, setFilterCat]   = useState<Category | 'all'>('all');
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchItems = useCallback(async () => {
    const res  = await fetch('/api/menu');
    const data = await res.json();
    if (data.ok) setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const filtered = items.filter(item => {
    const matchCat  = filterCat === 'all' || item.category === filterCat;
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchName;
  });

  async function toggleAvailable(item: MenuItem) {
    setTogglingId(item.id);
    await fetch(`/api/menu/${item.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ available: !item.available }),
    });
    setItems(prev =>
      prev.map(i => i.id === item.id ? { ...i, available: !i.available } : i)
    );
    setTogglingId(null);
  }

  async function deleteItem(id: number) {
    if (!confirm('Delete this menu item? This cannot be undone.')) return;
    setDeletingId(id);
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(i => i.id !== id));
    setDeletingId(null);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800">Menu Items</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} total items</p>
        </div>
        <Link
          href="/admin/menu/new"
          className="flex items-center gap-2 bg-[#2D4A3E] text-white px-5 py-2.5
                     rounded-lg font-display text-sm tracking-wide hover:bg-[#1F3529] transition-colors"
        >
          <Plus size={16} /> Add Item
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search items…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none
                       focus:ring-2 focus:ring-[#2D4A3E]/20 focus:border-[#2D4A3E] bg-white w-56"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(['all', ...CATEGORIES] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display capitalize transition-colors
                ${filterCat === cat
                  ? 'bg-[#2D4A3E] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-display font-semibold text-gray-600 text-xs uppercase tracking-wide">Item</th>
                <th className="text-left px-5 py-3 font-display font-semibold text-gray-600 text-xs uppercase tracking-wide">Category</th>
                <th className="text-right px-5 py-3 font-display font-semibold text-gray-600 text-xs uppercase tracking-wide">Price</th>
                <th className="text-center px-5 py-3 font-display font-semibold text-gray-600 text-xs uppercase tracking-wide">Available</th>
                <th className="text-right px-5 py-3 font-display font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate max-w-xs">{item.description}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-display capitalize ${CAT_COLORS[item.category]}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-display font-semibold text-[#C17B2F]">
                    ₹{Number(item.price).toFixed(0)}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => toggleAvailable(item)}
                      disabled={togglingId === item.id}
                      className="inline-flex items-center gap-1.5 text-xs font-display disabled:opacity-50"
                    >
                      {item.available ? (
                        <><ToggleRight size={20} className="text-green-500" /> <span className="text-green-600">Yes</span></>
                      ) : (
                        <><ToggleLeft size={20} className="text-gray-300" /> <span className="text-gray-400">No</span></>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/menu/${item.id}/edit`}
                        className="p-1.5 text-gray-400 hover:text-[#2D4A3E] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => deleteItem(item.id)}
                        disabled={deletingId === item.id}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No items match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
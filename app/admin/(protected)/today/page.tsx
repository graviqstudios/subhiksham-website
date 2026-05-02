// app/admin/today/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { MenuItem, Category } from '@/types';

export const dynamic = 'force-dynamic';

const CATEGORIES: Category[] = ['breakfast', 'lunch', 'tiffin', 'specials', 'desserts'];

const CAT_LABELS: Record<Category, string> = {
  breakfast: 'Breakfast',
  lunch:     'Lunch',
  tiffin:    'Tiffin',
  specials:  'Specials',
  desserts:  'Desserts',
};

export default function TodayMenuPage() {
  const [items, setItems]           = useState<MenuItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const fetchItems = useCallback(async () => {
    const res  = await fetch('/api/menu');
    const data = await res.json();
    if (data.ok) setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function toggle(item: MenuItem) {
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

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter(i => i.category === cat);
    return acc;
  }, {} as Record<Category, MenuItem[]>);

  const availableCount   = items.filter(i => i.available).length;
  const unavailableCount = items.filter(i => !i.available).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-800">
          Today&apos;s Menu
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Toggle which items are available right now
        </p>
      </div>

      {/* Summary bar */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-2 bg-green-50 border border-green-100
                        rounded-lg px-4 py-2.5">
          <CheckCircle2 size={16} className="text-green-500" />
          <span className="text-sm font-display text-green-700">
            {availableCount} available
          </span>
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-100
                        rounded-lg px-4 py-2.5">
          <XCircle size={16} className="text-red-400" />
          <span className="text-sm font-display text-red-600">
            {unavailableCount} unavailable
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map(cat => {
            const catItems = grouped[cat];
            if (catItems.length === 0) return null;

            return (
              <div key={cat}>
                <h2 className="font-display font-semibold text-gray-600 text-sm
                               uppercase tracking-wider mb-3">
                  {CAT_LABELS[cat]}
                </h2>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  {catItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between px-5 py-4
                                  ${idx < catItems.length - 1 ? 'border-b border-gray-50' : ''}
                                  ${!item.available ? 'opacity-50' : ''}`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">₹{Number(item.price).toFixed(0)}</p>
                      </div>

                      {/* Toggle switch */}
                      <button
                        onClick={() => toggle(item)}
                        disabled={togglingId === item.id}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full
                                    transition-colors disabled:opacity-40
                                    ${item.available ? 'bg-green-500' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white
                                      shadow transition-transform
                                      ${item.available ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
'use client';
// components/admin/MenuItemForm.tsx
// Used by both /admin/menu/new and /admin/menu/[id]/edit

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { MenuItem, Category } from '@/types';

interface Props {
  initial?: Partial<MenuItem>;
  isEdit?: boolean;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'breakfast', label: 'Breakfast (7–10 AM)' },
  { value: 'lunch',     label: 'Lunch (12–3 PM)'    },
  { value: 'tiffin',   label: 'Tiffin (All Day)'    },
  { value: 'specials',  label: 'Specials'             },
  { value: 'desserts',  label: 'Desserts'             },
];

export default function MenuItemForm({ initial, isEdit }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name:        initial?.name        ?? '',
    description: initial?.description ?? '',
    price:       initial?.price       ?? '',
    category:    initial?.category    ?? 'breakfast' as Category,
    image_url:   initial?.image_url   ?? '',
    available:   initial?.available   ?? true,
    sort_order:  initial?.sort_order  ?? 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading]   = useState(false);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');

  function set(key: string, value: unknown) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return form.image_url || null;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', imageFile);
    fd.append('folder', 'subhiksham/menu');

    const res  = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    setUploading(false);

    if (!data.ok) { setError('Image upload failed: ' + data.error); return null; }
    return data.data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const imageUrl = await uploadImage();
    if (imageFile && !imageUrl) { setSaving(false); return; }

    const payload = { ...form, price: Number(form.price), image_url: imageUrl };

    const url    = isEdit ? `/api/menu/${initial!.id}` : '/api/menu';
    const method = isEdit ? 'PATCH' : 'POST';

    const res  = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);

    if (data.ok) {
      router.push('/admin/menu');
      router.refresh();
    } else {
      setError(data.error ?? 'Save failed');
    }
  }

  const inputCls = `w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/20 focus:border-[#2D4A3E]
                    text-gray-800 placeholder:text-gray-300`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-display font-medium text-gray-700 mb-1.5">
          Dish Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text" required
          value={form.name}
          onChange={e => set('name', e.target.value)}
          className={inputCls}
          placeholder="e.g. Masala Dosa"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-display font-medium text-gray-700 mb-1.5">
          Description
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={e => set('description', e.target.value)}
          className={inputCls + ' resize-none'}
          placeholder="Crispy rice-lentil crepe with spiced potato masala…"
        />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-display font-medium text-gray-700 mb-1.5">
            Price (₹) <span className="text-red-400">*</span>
          </label>
          <input
            type="number" required min="1"
            value={form.price}
            onChange={e => set('price', e.target.value)}
            className={inputCls}
            placeholder="80"
          />
        </div>
        <div>
          <label className="block text-sm font-display font-medium text-gray-700 mb-1.5">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            value={form.category}
            onChange={e => set('category', e.target.value)}
            className={inputCls}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-display font-medium text-gray-700 mb-1.5">
          Image
        </label>
        <input
          type="file" accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0 file:text-sm file:font-display
                     file:bg-[#2D4A3E] file:text-white hover:file:bg-[#1F3529]"
        />
        {(form.image_url || imageFile) && (
          <p className="text-xs text-gray-400 mt-1.5">
            {imageFile ? `New file: ${imageFile.name}` : `Current: ${form.image_url}`}
          </p>
        )}
      </div>

      {/* Sort Order */}
      <div>
        <label className="block text-sm font-display font-medium text-gray-700 mb-1.5">
          Sort Order <span className="text-gray-400 font-normal">(lower = appears first)</span>
        </label>
        <input
          type="number" min="0"
          value={form.sort_order}
          onChange={e => set('sort_order', Number(e.target.value))}
          className={inputCls + ' w-32'}
        />
      </div>

      {/* Available toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => set('available', !form.available)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${form.available ? 'bg-green-500' : 'bg-gray-200'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
              ${form.available ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
        <span className="text-sm font-display text-gray-700">
          {form.available ? 'Available today' : 'Not available today'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="px-8 py-2.5 bg-[#2D4A3E] text-white rounded-lg font-display text-sm
                     tracking-wide hover:bg-[#1F3529] transition-colors disabled:opacity-60"
        >
          {uploading ? 'Uploading image…' : saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Item'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-display text-sm
                     tracking-wide hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
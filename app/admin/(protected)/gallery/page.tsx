// app/admin/gallery/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Trash2, Eye, EyeOff, Upload } from 'lucide-react';
import Image from 'next/image';
import type { GalleryImage, GalleryCategory } from '@/types';

export const dynamic = 'force-dynamic';

const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: 'food',     label: 'Food'     },
  { value: 'kitchen',  label: 'Kitchen'  },
  { value: 'ambience', label: 'Ambience' },
];

export default function GalleryPage() {
  const [images, setImages]         = useState<GalleryImage[]>([]);
  const [loading, setLoading]       = useState(true);
  const [uploading, setUploading]   = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [error, setError]           = useState('');

  // Upload form state
  const [file, setFile]       = useState<File | null>(null);
  const [alt, setAlt]         = useState('');
  const [category, setCategory] = useState<GalleryCategory>('food');

  const fetchImages = useCallback(async () => {
    const res  = await fetch('/api/gallery?all=1');
    const data = await res.json();
    if (data.ok) setImages(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  async function handleUpload() {
    if (!file) { setError('Please select an image first'); return; }
    setError('');
    setUploading(true);

    // 1. Upload file to Cloudinary via /api/upload
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'subhiksham/gallery');

    const uploadRes  = await fetch('/api/upload', { method: 'POST', body: fd });
    const uploadData = await uploadRes.json();

    if (!uploadData.ok) {
      setError('Upload failed: ' + uploadData.error);
      setUploading(false);
      return;
    }

    // 2. Save record to DB via /api/gallery
    const saveRes  = await fetch('/api/gallery', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        url:      uploadData.data.url,
        alt:      alt || file.name,
        category,
        published: true,
      }),
    });
    const saveData = await saveRes.json();
    setUploading(false);

    if (saveData.ok) {
      setImages(prev => [saveData.data, ...prev]);
      setFile(null);
      setAlt('');
    } else {
      setError('Saved upload but DB record failed: ' + saveData.error);
    }
  }

  async function togglePublished(img: GalleryImage) {
    setTogglingId(img.id);
    await fetch(`/api/gallery/${img.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ published: !img.published }),
    });
    setImages(prev =>
      prev.map(i => i.id === img.id ? { ...i, published: !i.published } : i)
    );
    setTogglingId(null);
  }

  async function deleteImage(id: number) {
    if (!confirm('Delete this image? This cannot be undone.')) return;
    setDeletingId(id);
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    setImages(prev => prev.filter(i => i.id !== id));
    setDeletingId(null);
  }

  const inputCls = `w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/20 focus:border-[#2D4A3E]`;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-800">Gallery</h1>
        <p className="text-gray-500 text-sm mt-1">{images.length} images total</p>
      </div>

      {/* Upload Panel */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <h2 className="font-display font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Upload size={16} /> Upload New Image
        </h2>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200
                          text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-display text-gray-600 mb-1.5">
              Image File <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-500
                         file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0
                         file:text-sm file:font-display file:bg-[#2D4A3E] file:text-white
                         hover:file:bg-[#1F3529]"
            />
          </div>
          <div>
            <label className="block text-xs font-display text-gray-600 mb-1.5">
              Alt Text
            </label>
            <input
              type="text"
              value={alt}
              onChange={e => setAlt(e.target.value)}
              placeholder="e.g. Masala dosa close-up"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-display text-gray-600 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as GalleryCategory)}
              className={inputCls}
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="px-6 py-2.5 bg-[#2D4A3E] text-white rounded-lg font-display text-sm
                     tracking-wide hover:bg-[#1F3529] transition-colors disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : 'Upload Image'}
        </button>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading…</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div
              key={img.id}
              className={`bg-white rounded-xl border border-gray-100 overflow-hidden
                          ${!img.published ? 'opacity-60' : ''}`}
            >
              <div className="relative aspect-square">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="px-3 py-2.5">
                <p className="text-xs text-gray-600 truncate mb-0.5 font-display">
                  {img.alt || 'No alt text'}
                </p>
                <p className="text-xs text-gray-400 capitalize mb-2">{img.category}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => togglePublished(img)}
                    disabled={togglingId === img.id}
                    className="text-gray-400 hover:text-[#2D4A3E] transition-colors
                               disabled:opacity-40"
                    title={img.published ? 'Hide from gallery' : 'Show in gallery'}
                  >
                    {img.published
                      ? <Eye size={15} className="text-green-500" />
                      : <EyeOff size={15} />
                    }
                  </button>
                  <button
                    onClick={() => deleteImage(img.id)}
                    disabled={deletingId === img.id}
                    className="text-gray-400 hover:text-red-500 transition-colors
                               disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-4 text-center py-16 text-gray-400">
              No images yet. Upload your first one above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChefHat } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ name: '', email: '', password: '', setupKey: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res  = await fetch('/api/auth/signup', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(data.error ?? 'Setup failed');
    }
  }

  const inputCls = `w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm
                    text-gray-800 placeholder:text-gray-400 outline-none
                    focus:ring-2 focus:ring-[#C17B2F]/30 focus:border-[#C17B2F]
                    transition-all duration-150`;

  return (
    <div className="min-h-screen bg-[#FDF6E3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                          bg-[#2D4A3E] mb-4 shadow-lg">
            <ChefHat size={28} className="text-[#C17B2F]" />
          </div>
          <h1 className="text-3xl font-bold text-[#2D4A3E] tracking-tight">
            Subhiksham
          </h1>
          <p className="text-[#2D4A3E]/50 text-sm mt-1">First-Time Admin Setup</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#2D4A3E]/10 p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Create your admin account
          </h2>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200
                            text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Name
              </label>
              <input
                type="text" required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={inputCls}
                placeholder="Restaurant Owner"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputCls}
                placeholder="admin@subhiksham.in"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password" required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className={inputCls}
                placeholder="Minimum 8 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Setup Key
              </label>
              <input
                type="password" required
                value={form.setupKey}
                onChange={e => setForm(f => ({ ...f, setupKey: e.target.value }))}
                className={inputCls}
                placeholder="From your .env.local file"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D4A3E] text-white py-3 rounded-xl text-sm font-semibold
                         tracking-wide hover:bg-[#1F3529] transition-colors mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Creating account…' : 'Create Admin Account'}
            </button>
          </form>
        </div>

        {/* Hint */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4
                        text-xs text-amber-800">
          <strong>Setup Key</strong> is the value of{' '}
          <code className="bg-amber-100 px-1 py-0.5 rounded">ADMIN_SETUP_KEY</code>{' '}
          in your <code className="bg-amber-100 px-1 py-0.5 rounded">.env.local</code> file.
        </div>
      </div>
    </div>
  );
}
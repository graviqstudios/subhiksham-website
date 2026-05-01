// app/admin/page.tsx  — Server Component

import sql from '@/app/lib/db';
import Link from 'next/link';
import { UtensilsCrossed, Image, CheckCircle2, XCircle } from 'lucide-react';

export const dynamic = 'force-dynamic'; // always fetch fresh data

export default async function AdminDashboard() {
  const [menuStats, galleryStats, availableStats] = await Promise.all([
    sql`SELECT COUNT(*)::int AS total FROM menu_items`,
    sql`SELECT COUNT(*)::int AS total FROM gallery_images WHERE published = true`,
    sql`SELECT
          COUNT(*) FILTER (WHERE available = true)::int  AS available,
          COUNT(*) FILTER (WHERE available = false)::int AS unavailable
        FROM menu_items`,
  ]);

  const stats = [
    {
      label:   'Total Menu Items',
      value:   menuStats[0].total,
      icon:    UtensilsCrossed,
      color:   'bg-emerald-50 text-emerald-600',
      href:    '/admin/menu',
    },
    {
      label:   'Available Today',
      value:   availableStats[0].available,
      icon:    CheckCircle2,
      color:   'bg-green-50 text-green-600',
      href:    '/admin/today',
    },
    {
      label:   'Unavailable Today',
      value:   availableStats[0].unavailable,
      icon:    XCircle,
      color:   'bg-red-50 text-red-500',
      href:    '/admin/today',
    },
    {
      label:   'Gallery Images',
      value:   galleryStats[0].total,
      icon:    Image,
      color:   'bg-blue-50 text-blue-600',
      href:    '/admin/gallery',
    },
  ];

  const quickLinks = [
    { href: '/admin/menu/new',    label: '+ Add Menu Item',  primary: true  },
    { href: '/admin/today',       label: "Update Today's Menu", primary: false },
    { href: '/admin/gallery',     label: '+ Upload Gallery Photo', primary: false },
    { href: '/',                  label: '↗ View Live Site',  primary: false },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md
                       transition-shadow duration-200 group"
          >
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800 font-display">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <h2 className="font-display font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map(({ href, label, primary }) => (
            <Link
              key={href}
              href={href}
              target={href === '/' ? '_blank' : undefined}
              className={`px-5 py-2.5 rounded-lg font-display text-sm tracking-wide transition-colors
                ${primary
                  ? 'bg-[#2D4A3E] text-white hover:bg-[#1F3529]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <CategoryBreakdown />
    </div>
  );
}

async function CategoryBreakdown() {
  const rows = await sql`
    SELECT category,
           COUNT(*)::int                                           AS total,
           COUNT(*) FILTER (WHERE available = true)::int          AS available
    FROM   menu_items
    GROUP  BY category
    ORDER  BY category
  `;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-display font-semibold text-gray-700 mb-4">Menu by Category</h2>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.category} className="flex items-center gap-4">
            <span className="w-24 text-sm font-display capitalize text-gray-600">{row.category}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#2D4A3E] h-full rounded-full transition-all"
                style={{ width: `${(row.available / row.total) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-20 text-right">
              {row.available}/{row.total} available
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
'use client';
// components/admin/AdminSidebar.tsx

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarCheck,
  Image,
  LogOut,
  ChefHat,
} from 'lucide-react';

interface Props {
  user: { name: string; email: string };
}

const NAV = [
  { href: '/admin',         label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/menu',    label: 'Menu Items',    icon: UtensilsCrossed },
  { href: '/admin/today',   label: "Today's Menu",  icon: CalendarCheck   },
  { href: '/admin/gallery', label: 'Gallery',       icon: Image           },
];

export default function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const router   = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#2D4A3E] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <ChefHat size={22} className="text-[#C17B2F]" />
          <div>
            <p className="font-display font-bold text-sm tracking-wide">Subhiksham</p>
            <p className="text-white/50 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-display
                          tracking-wide transition-all duration-150
                          ${active
                            ? 'bg-[#C17B2F] text-white shadow-sm'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#C17B2F]/30 flex items-center justify-center
                          text-[#C17B2F] font-display font-bold text-sm">
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-display font-medium truncate">{user.name}</p>
            <p className="text-xs text-white/50 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
                     text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
// app/admin/menu/new/page.tsx
import MenuItemForm from '@/components/admin/MenuItemForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function NewMenuItemPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/menu"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500
                     hover:text-gray-800 transition-colors mb-4"
        >
          <ChevronLeft size={15} /> Back to Menu
        </Link>
        <h1 className="text-2xl font-display font-bold text-gray-800">Add Menu Item</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details below</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <MenuItemForm />
      </div>
    </div>
  );
}
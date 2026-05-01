// app/admin/menu/[id]/edit/page.tsx
import { notFound } from 'next/navigation';
import sql from '@/app/lib/db';
import MenuItemForm from '@/components/admin/MenuItemForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function EditMenuItemPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const rows = await sql`SELECT * FROM menu_items WHERE id = ${id}`;
  const item = rows[0];
  if (!item) notFound();

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
        <h1 className="text-2xl font-display font-bold text-gray-800">
          Edit: {item.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Update the details below and save
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <MenuItemForm initial={item} isEdit />
      </div>
    </div>
  );
}
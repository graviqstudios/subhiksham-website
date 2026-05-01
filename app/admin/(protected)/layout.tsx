// app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = { title: 'Subhiksham Admin' };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) redirect('/admin/login');

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />
      <main className="flex-1 ml-64 min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
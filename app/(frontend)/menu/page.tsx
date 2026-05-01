// app/(frontend)/menu/page.tsx
import sql from '@/app/lib/db';
import MenuClient from './MenuClient';

export const revalidate = 60;

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
};

export default async function MenuPage() {
  const items = await sql`
    SELECT * FROM menu_items ORDER BY category, sort_order, name
  ` as unknown as MenuItem[];

  return <MenuClient items={items} />;
}
// app/(frontend)/page.tsx
import HomeClient from './HomeClient';
import sql from '@/app/lib/db';

export const revalidate = 60;

export default async function HomePage() {
  const menuItems = await sql`
    SELECT id, name, price, category, available
    FROM   menu_items
    WHERE  category IN ('breakfast', 'lunch', 'tiffin', 'specials')
    ORDER  BY category, sort_order, name
  `;

  // Group by category for the homepage tabs
  const grouped: Record<string, { name: string; price: number; available: boolean }[]> = {
    breakfast: [],
    lunch: [],
    tiffin: [],
    specials: [],
  };
  for (const item of menuItems) {
    if (grouped[item.category]) {
      grouped[item.category].push({
        name:      item.name,
        price:     Number(item.price),
        available: item.available,
      });
    }
  }

  return <HomeClient menuData={grouped} />;
}
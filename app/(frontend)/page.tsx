// app/(frontend)/page.tsx
import HomeClient from './HomeClient';
import sql from '@/app/lib/db';

export const revalidate = 0;

export default async function HomePage() {
  const [menuItems, galleryRows] = await Promise.all([
    sql`
      SELECT id, name, price, category, available
      FROM   menu_items
      WHERE  category IN ('breakfast', 'lunch', 'tiffin', 'specials')
      ORDER  BY category, sort_order, name
    `,
    sql`
      SELECT url, alt FROM gallery_images
      WHERE  published = true
      ORDER  BY RANDOM()
      LIMIT  6
    `,
  ]);

  const grouped: Record<string, { name: string; price: number; available: boolean }[]> = {
    breakfast: [], lunch: [], tiffin: [], specials: [],
  };
  for (const item of menuItems) {
    if (grouped[item.category]) {
      grouped[item.category].push({
        name: item.name, price: Number(item.price), available: item.available,
      });
    }
  }

  const gallery = galleryRows.map(r => ({ src: r.url, alt: r.alt || 'Gallery image' }));

  return <HomeClient menuData={grouped} galleryImages={gallery} />;
}
import sql from '@/app/lib/db';
import GalleryClient from './GalleryClient';

export const revalidate = 60;

type GalleryImage = {
  id: number;
  url: string;
  alt: string;
  category: string;
};

export default async function GalleryPage() {
  const images = await sql`
    SELECT id, url, alt, category
    FROM gallery_images
    WHERE published = true
    ORDER BY sort_order, created_at DESC
  ` as unknown as GalleryImage[];

  return <GalleryClient images={images} />;
}
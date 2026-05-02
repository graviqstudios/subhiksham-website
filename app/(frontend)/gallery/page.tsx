import sql from '@/app/lib/db';
import GalleryClient from './GalleryClient';

export const revalidate = 0;

export const metadata = {
  title: 'Gallery',
  description: 'Photos from our kitchen and dining — authentic South Indian food from Subhiksham, Palakkad.',
  alternates: { canonical: 'https://subhiksham.co.in/gallery' },
};

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
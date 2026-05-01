// types/index.ts

export type Category = 'breakfast' | 'lunch' | 'tiffin' | 'specials' | 'desserts';
export type GalleryCategory = 'food' | 'kitchen' | 'ambience';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image_url: string | null;
  available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  category: GalleryCategory;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

// API response wrappers
export type ApiOk<T> = { ok: true; data: T };
export type ApiErr    = { ok: false; error: string };
export type ApiRes<T> = ApiOk<T> | ApiErr;
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://subhiksham.co.in',         lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
    { url: 'https://subhiksham.co.in/menu',    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: 'https://subhiksham.co.in/gallery', lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: 'https://subhiksham.co.in/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://subhiksham.co.in/story',   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
// app/(frontend)/layout.tsx
// Server component — metadata + schema only

import type { Metadata } from 'next';
import FrontendShell from './FrontendShell';

export const metadata: Metadata = {
  title: {
    default: 'Subhiksham – The Tiffin Club | Pure Veg South Indian Restaurant, Palakkad',
    template: '%s | Subhiksham Palakkad',
  },
  description: 'Pure vegetarian South Indian restaurant in Palakkad, Kerala. Authentic Kerala Sadya, Dosa, Idli, Tiffin and more. Open daily for breakfast and lunch.',
  keywords: ['vegetarian restaurant palakkad', 'south indian food palakkad', 'kerala sadya palakkad', 'tiffin palakkad', 'pure veg palakkad', 'subhiksham', 'veg hotels near me', 'veg hotels in palakkad'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://subhiksham.co.in',
    siteName: 'Subhiksham – The Tiffin Club',
    title: 'Subhiksham – Pure Veg South Indian Restaurant, Palakkad',
    description: 'Authentic Kerala vegetarian cuisine in the heart of Palakkad. Daily fresh menu, Kerala Sadya, Dosa, Idli and more.',
    images: [
      {
        url: 'https://subhiksham.co.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Subhiksham – The Tiffin Club, Palakkad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subhiksham – Pure Veg South Indian Restaurant, Palakkad',
    description: 'Authentic Kerala vegetarian cuisine in Palakkad.',
    images: ['https://subhiksham.co.in/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://subhiksham.co.in',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Subhiksham – The Tiffin Club',
  image: 'https://subhiksham.co.in/og-image.jpg',
  url: 'https://subhiksham.co.in',
  telephone: '+919876543210',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '100 Ft. Road',
    addressLocality: 'Palakkad',
    addressRegion: 'Kerala',
    postalCode: '678001',
    addressCountry: 'IN',
  },
  servesCuisine: ['South Indian', 'Kerala', 'Vegetarian'],
  priceRange: '₹',
  openingHours: ['Mo-Su 07:00-10:00', 'Mo-Su 12:00-15:00', 'Mo-Su 18:00-21:00'],
  hasMenu: 'https://subhiksham.co.in/menu',
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <FrontendShell>{children}</FrontendShell>
    </>
  );
}
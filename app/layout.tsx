import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://subhiksham.in'),
  title: 'Subhiksham - The Tiffin Club | Pure Veg South Indian Restaurant, Palakkad',
  description:
    'Pure vegetarian South Indian cuisine crafted with love and tradition. Breakfast, lunch, tiffin and specials at Palakkad.',
  openGraph: {
    title: 'Subhiksham - The Tiffin Club',
    description: 'Pure vegetarian South Indian restaurant in Palakkad',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Subhiksham – The Tiffin Club',
  description: 'Pure vegetarian South Indian cuisine in Palakkad, Kerala',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-body bg-brand-cream`}>
        {children}
      </body>
    </html>
  );
}
'use client';

import '@/app/globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/story', label: 'Our Story' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md shadow-md'
          : 'backdrop-blur-sm'
      }`}
      style={{ backgroundColor: '#e4caa9' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-brand-green"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left nav (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm tracking-wide transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-brand-ochre border-b-2 border-brand-ochre pb-1'
                    : 'text-brand-green hover:text-brand-ochre'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo — image */}
          <Link href="/" className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.jpg"
              alt="Subhiksham – The Tiffin Club"
              width={140}
              height={60}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right nav (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm tracking-wide transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-brand-ochre border-b-2 border-brand-ochre pb-1'
                    : 'text-brand-green hover:text-brand-ochre'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer to keep layout balanced on mobile */}
          <div className="md:hidden w-10" />
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-cream-dark animate-fade-in">
          <nav className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 px-4 rounded-lg font-display text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? 'bg-brand-ochre/10 text-brand-ochre'
                    : 'text-brand-green hover:bg-brand-cream-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex flex-col items-start leading-tight mb-3">
              <div 
                className="px-3 py-2 rounded-lg"
                style={{ backgroundColor: '#2d4a3e' }}
              >
                <span 
                  className="font-display text-xl font-bold tracking-wider"
                  style={{ color: '#e4caa9' }}
                >
                   Subhiksham
                </span>
              </div>
              <span className="font-display text-xs text-brand-cream/60 tracking-[0.2em] uppercase mt-1">
                The Tiffin Club
              </span>
            </div>
            <p className="mt-2 text-sm text-brand-cream/80 leading-relaxed">
              Pure vegetarian South Indian cuisine, crafted with love and
              tradition in the heart of Palakkad.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="veg-dot" />
              <span className="text-xs text-brand-cream/70 tracking-wider">
                100% PURE VEGETARIAN
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold tracking-wide mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-brand-cream/80 hover:text-brand-ochre transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold tracking-wide mb-4">
              Visit Us
            </h4>
            <div className="space-y-3 text-sm text-brand-cream/80">
              <p>100 Ft. Road, Palakkad</p>
              <p>Kerala, India - 678001</p>
              <a
                href="tel:+919876543210"
                className="block hover:text-brand-ochre transition-colors"
              >
                +91 98765 43210
              </a>
              <div className="pt-2">
                <p className="font-display text-sm font-semibold text-brand-cream mb-2">
                  Opening Hours
                </p>
                <p>Breakfast: 7:00 AM - 10:00 AM</p>
                <p>Lunch: 12:00 PM - 3:00 PM</p>
                <p>Dinner: 6:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-cream/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-cream/60">
            &copy; {new Date().getFullYear()} Subhiksham - The Tiffin Club. All
            rights reserved.
          </p>
          <p className="text-xs text-brand-cream/60 font-display italic">
            &ldquo;Served with love, seasoned with tradition&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20Subhiksham!%20I%27d%20like%20to%20know%20more."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} fill="white" />
    </a>
  );
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-body`}>
        <Header />
        <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

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
    
      href="https://wa.me/919876543210?text=Hi%20Subhiksham!%20I%27d%20like%20to%20know%20more."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="56"
        height="56"
      >
        <circle cx="24" cy="24" r="24" fill="#25D366" />
        <path
          fill="white"
          d="M24 10C16.28 10 10 16.28 10 24c0 2.52.68 4.88 1.86 6.92L10 38l7.3-1.82A13.94 13.94 0 0 0 24 38c7.72 0 14-6.28 14-14S31.72 10 24 10zm0 25.5a11.44 11.44 0 0 1-5.84-1.6l-.42-.25-4.33 1.08 1.1-4.22-.28-.44A11.47 11.47 0 0 1 12.5 24C12.5 17.6 17.6 12.5 24 12.5S35.5 17.6 35.5 24 30.4 35.5 24 35.5zm6.3-8.56c-.34-.17-2.02-.99-2.33-1.1-.31-.12-.54-.17-.77.17-.23.34-.88 1.1-1.08 1.33-.2.22-.4.25-.74.08-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.08-.17-.77-1.85-1.05-2.53-.28-.67-.56-.58-.77-.59h-.65c-.23 0-.6.08-.91.4-.31.31-1.2 1.17-1.2 2.85s1.23 3.31 1.4 3.54c.17.23 2.42 3.7 5.86 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.82 2.31-1.62.28-.8.28-1.48.2-1.62-.09-.15-.32-.23-.66-.4z"
        />
      </svg>
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

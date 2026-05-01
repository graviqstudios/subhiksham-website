'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Camera, Leaf } from 'lucide-react';

const heroSlides = [
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczNJgHWXOtG1lmjQsulnj76GXUwl5RxpwuaQUteHzca1TyXkNWxjHyzpQe7zyY_IYKVXm-W22cjcTkNRPTxskba10xSnnoE_Getj9VooSxBS4tDNaNgWq6mMFtHnYYaF9WOFcsF7aBOKPVY2chGZDA=w1745-h974-s-no-gm?authuser=0',
    alt: 'Kerala Sadya on banana leaf',
    caption: 'Abundance on a Leaf',
    sub: 'The timeless Kerala Sadya',
  },
  {
    src: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Crispy Masala Dosa with chutneys',
    caption: 'Morning Rituals',
    sub: 'Crisp dosas, velvety chutneys',
  },
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczM8didLDG1vYGdhDo27kYZ4Qm7H7MES0xRKH1tlEYW_2ezBp--1eRJ3L9RWyN_49HhU36afW7rbJY7SdgILVdVF4X7W67KuZxNW7xTxdT-XQYp8yY8vkkrgidt-Ct8NpJKJLjDagj7SfPrQtkGVEw=w1745-h974-s-no-gm?authuser=0',
    alt: 'South Indian kitchen cooking',
    caption: 'The Open Kitchen',
    sub: 'Cooked with honesty, served with love',
  },
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczMll5nJA8e4pdYqSLL-31h-gPTQJvpg-U4lzs2dB5Z7icw6Y_iEczkBd3EQvPc4djaeCd_U4SP6GLonxcwd495jIvBfCHCMVVar8oj4qUYukvlwKsN1O0HZS3XU6x3mnEdLL6AXh3PVX1kcgSog6A=w1745-h974-s-no-gm?authuser=0',
    alt: 'Traditional South Indian filter coffee in steel tumbler',
    caption: 'Filter Coffee Culture',
    sub: 'Frothy, strong, and soul-warming',
  },
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczP3LmEbZwak46gLFLdWl9LCfYsQbtEWJKF9COmp1w0abYZk-7lU9-ioPCWQ2YFfAR1op4lwXpGKL98OBm4A3noCwaV-cbltZpJwfkpA_kwF5y50jgzd8iSCfxYFxuMEWm0_9ui1zLzTQX1hp8VlyA=w1745-h974-s-no-gm?authuser=0',
    alt: 'South Indian spices and fresh ingredients',
    caption: 'Palakkad on a Plate',
    sub: 'Where Kerala meets Tamil Nadu',
  },
];

const categoryMeta: Record<string, { label: string; time: string; icon: string }> = {
  breakfast: { label: 'Breakfast', time: '7–10 AM',  icon: '🌅' },
  lunch:     { label: 'Lunch',     time: '12–3 PM',  icon: '🍛' },
  tiffin:    { label: 'Tiffin',    time: 'All Day',   icon: '🫓' },
  specials:  { label: 'Specials',  time: 'Seasonal',  icon: '⭐' },
};

type MenuItem = { name: string; price: number; available: boolean };
type MenuData = Record<string, MenuItem[]>;

function HeroCarousel() {
  const [current, setCurrent]            = useState(0);
  const [isTransitioning, setTransition] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setTransition(true);
    setTimeout(() => { setCurrent(index); setTransition(false); }, 300);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  const slide = heroSlides[current];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url('${slide.src}')` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className={`relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="veg-dot w-4 h-4" />
          <span className="text-brand-cream/80 text-xs tracking-[0.3em] font-display uppercase">Pure Vegetarian</span>
          <span className="veg-dot w-4 h-4" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-brand-cream tracking-wider leading-tight">Subhiksham</h1>
        <p className="font-display text-lg md:text-2xl text-brand-ochre tracking-[0.15em] mt-2 italic">The Tiffin Club</p>
        <div className="mt-6 mb-2">
          <p className="font-display text-2xl md:text-3xl font-semibold text-brand-cream/95">{slide.caption}</p>
          <p className="font-display text-sm text-brand-cream/70 italic mt-1">{slide.sub}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/menu" className="btn-primary">Explore Our Menu</Link>
        </div>
      </div>
      <button onClick={prev} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-brand-cream/20 hover:bg-brand-cream/40 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm">
        <ChevronLeft size={22} />
      </button>
      <button onClick={next} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-brand-cream/20 hover:bg-brand-cream/40 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm">
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-brand-ochre' : 'w-2 h-2 bg-brand-cream/50 hover:bg-brand-cream/80'}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function HomeClient({
  menuData,
  galleryImages,
}: {
  menuData: MenuData;
  galleryImages: { src: string; alt: string }[];
}) {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const currentItems = menuData[activeCategory] ?? [];

  return (
    <div>
      <HeroCarousel />

      {/* Today's Menu */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-subheading">Fresh &amp; Daily</p>
            <h2 className="section-heading mt-2">Today&apos;s Menu</h2>
            <div className="w-20 h-0.5 bg-brand-ochre mx-auto mt-4" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.keys(menuData).map((cat) => {
              const meta = categoryMeta[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm tracking-wide transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-brand-green text-brand-cream shadow-md'
                      : 'bg-white text-brand-green border border-brand-cream-dark hover:border-brand-ochre'
                  }`}
                >
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                  <span className="text-xs opacity-70">({meta.time})</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentItems.map((item, i) => (
              <div key={i} className="card-menu flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-brand-green">{item.name}</h3>
                    {item.available ? (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Available
                      </span>
                    ) : (
                      <span className="text-xs text-brand-terracotta/70 mt-0.5 block">Not available today</span>
                    )}
                  </div>
                </div>
                <span className="font-display text-lg font-bold text-brand-ochre shrink-0">&#8377;{item.price}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/menu" className="inline-flex items-center gap-2 text-brand-ochre font-display text-sm tracking-wide hover:text-brand-ochre-dark transition-colors">
              View Full Menu <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-subheading">A Glimpse</p>
            <h2 className="section-heading mt-2">From Our Kitchen</h2>
            <div className="w-20 h-0.5 bg-brand-ochre mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-brand-ochre font-display text-sm tracking-wide hover:text-brand-ochre-dark transition-colors">
              <Camera size={16} /> View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 md:py-24 bg-brand-green/80 text-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-display text-sm text-brand-ochre tracking-[0.2em] uppercase">Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 leading-tight">Where Tradition Meets Taste</h2>
              <div className="w-16 h-0.5 bg-brand-ochre mt-4" />
              <p className="mt-6 text-brand-cream/80 leading-relaxed">
                Subhiksham is more than a restaurant — it&apos;s a tribute to Palakkad&apos;s timeless vegetarian heritage.
              </p>
              <Link href="/story" className="inline-flex items-center gap-2 mt-8 text-brand-ochre font-display text-sm tracking-wide hover:text-brand-ochre-light transition-colors">
                Read Our Full Story <ChevronRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img src="https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Traditional Kitchen" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-ochre text-white px-5 py-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Leaf size={18} />
                  <span className="font-display text-sm tracking-wide">Since 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
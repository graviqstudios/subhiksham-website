'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Kerala Sadya – traditional banana leaf feast',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'South Indian breakfast spread – dosa, idli, sambar',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Traditional clay pot cooking – open kitchen',
    category: 'kitchen',
  },
  {
    src: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'South Indian filter coffee in steel tumbler',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Spices and coconut – Palakkad kitchen pantry',
    category: 'kitchen',
  },
  {
    src: 'https://images.pexels.com/photos/5560764/pexels-photo-5560764.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'South Indian vegetarian thali',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/6546019/pexels-photo-6546019.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Crispy masala dosa with sambar and chutney',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Homestyle sambar with vegetables',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/8696567/pexels-photo-8696567.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fluffy idlis fresh from steamer',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/4331488/pexels-photo-4331488.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Coconut chutney – freshly ground',
    category: 'kitchen',
  },
  {
    src: 'https://images.pexels.com/photos/5560762/pexels-photo-5560762.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Payasam – traditional Kerala dessert',
    category: 'food',
  },
  {
    src: 'https://images.pexels.com/photos/5764157/pexels-photo-5764157.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Warm and welcoming restaurant ambience',
    category: 'ambience',
  },
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-green text-brand-cream overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-sm text-brand-ochre tracking-[0.3em] uppercase mb-3">
            Visual Journey
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wider">
            Gallery
          </h1>
          <p className="font-display text-lg text-brand-cream/70 italic mt-3">
            A feast for the eyes before the feast on the plate
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="masonry-grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="masonry-item cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-display">{img.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].src.replace('w=800', 'w=1200')}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-center text-white/70 text-sm font-display mt-4">
              {galleryImages[lightboxIndex].alt} &mdash; {lightboxIndex + 1} /{' '}
              {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

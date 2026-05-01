'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryImage = {
  id: number;
  url: string;
  alt: string;
  category: string;
};

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
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

      {/* Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {images.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-xl text-brand-green/50">
                No images yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="masonry-grid">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="masonry-item cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={img.url}
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
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
          >
            <ChevronRight size={36} />
          </button>
          <div className="max-w-4xl max-h-[85vh] px-12" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-center text-white/70 text-sm font-display mt-4">
              {images[lightboxIndex].alt} &mdash; {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
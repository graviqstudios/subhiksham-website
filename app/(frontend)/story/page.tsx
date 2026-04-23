'use client';

import { Leaf, Flame, MapPin } from 'lucide-react';

const sections = [
  {
    icon: Leaf,
    title: 'What Subhiksham Means',
    subtitle: 'The Philosophy',
    content: [
      'Subhiksham (സുഭിക്ഷം) means abundance in Sanskrit — the kind of abundance that flows when food is prepared with devotion and shared with love. It is the fullness of a harvest, the richness of a meal that nourishes not just the body but the spirit.',
      'In Palakkad, where the paddy fields stretch endlessly and the Western Ghats stand guard, this word carries the weight of generations. Every grandmother who stirred a pot of sambar, every grandfather who ground chutney on a stone — they all understood subhiksham. It is not mere sustenance; it is sacred nourishment.',
      'We chose this name because we believe a restaurant should be more than a place to eat. It should be a place where abundance is felt — in the aroma of freshly ground spices, in the warmth of a steel tumbler of filter coffee, in the crackle of a dosa being poured onto a hot tawa.',
    ],
    image: 'https://images.pexels.com/photos/3769045/pexels-photo-3769045.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Traditional spices',
  },
  {
    icon: Flame,
    title: 'The Open Kitchen',
    subtitle: 'Transparency & Craft',
    content: [
      'Our kitchen has no walls — not because we have nothing to hide, but because we have everything to share. When you sit at Subhiksham, you can watch your dosa being poured, your idlis being steamed, your sambar being ladled from a pot that has simmered for hours.',
      'This openness is our promise. It says: we trust our ingredients, we trust our methods, and we trust you to see the care in every step. The tawa is seasoned with years of use. The batter has fermented overnight. The coconut was grated this morning. There are no shortcuts in an open kitchen.',
      'Our chefs are not hidden behind swinging doors. They are artisans, and their craft deserves to be witnessed. The rhythm of the ladle, the hiss of the tawa, the precise flip of a dosa — this is the music of South Indian cooking, and we want you to hear every note.',
    ],
    image: 'https://images.pexels.com/photos/5570818/pexels-photo-5570818.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Open kitchen cooking',
  },
  {
    icon: MapPin,
    title: 'Palakkad on a Plate',
    subtitle: 'Our Terroir',
    content: [
      'Palakkad sits at the gap in the Western Ghats — the Palakkad Gap, a wind-blown pass that has shaped the culture, agriculture, and cuisine of this land for millennia. The rice varieties grown here, the coconut palms that line every road, the banana plants in every backyard — they define a way of eating that is uniquely Palakkadan.',
      'Our menu is rooted in this terroir. We source our rice from local farmers in Chittur and Kollengode. Our coconuts come from the groves of Nemmara. Our vegetables are picked from the shandy markets that have operated here for centuries. When you eat at Subhiksham, you taste Palakkad.',
      'The Palakkadan diet is simple but profound: rice as the foundation, sambar and rasam as the daily companions, and an array of thorans, avials, and pickles that change with the seasons. We honor this tradition not by freezing it in time, but by keeping it alive — fresh, evolving, and always abundant.',
    ],
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Palakkad landscape',
  },
];

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-green text-brand-cream overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-sm text-brand-ochre tracking-[0.3em] uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wider">
            The Soul of Subhiksham
          </h1>
          <p className="font-display text-lg text-brand-cream/70 italic mt-4 max-w-2xl mx-auto">
            &ldquo;Where every meal is a prayer, and every plate is a promise&rdquo;
          </p>
        </div>
      </section>

      {/* Story Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isEven = index % 2 === 0;

        return (
          <section
            key={index}
            className={`py-16 md:py-24 ${isEven ? 'bg-brand-cream' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
                  !isEven ? 'md:[direction:rtl]' : ''
                }`}
              >
                {/* Text */}
                <div className={!isEven ? 'md:[direction:ltr]' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-ochre/10 flex items-center justify-center">
                      <Icon size={20} className="text-brand-ochre" />
                    </div>
                    <span className="font-display text-xs text-brand-ochre tracking-[0.2em] uppercase">
                      {section.subtitle}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-green leading-tight">
                    {section.title}
                  </h2>
                  <div className="w-16 h-0.5 bg-brand-ochre mt-4 mb-6" />
                  {section.content.map((para, i) => (
                    <p
                      key={i}
                      className="text-brand-green/70 leading-relaxed mb-4 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Image */}
                <div className={!isEven ? 'md:[direction:ltr]' : ''}>
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={section.image}
                        alt={section.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Decorative corner */}
                    <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-brand-ochre/30 rounded-tr-xl" />
                    <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-brand-ochre/30 rounded-bl-xl" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing Quote */}
      <section className="py-16 md:py-24 bg-brand-green text-brand-cream text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="w-12 h-0.5 bg-brand-ochre mx-auto mb-8" />
          <blockquote className="font-display text-2xl md:text-3xl italic leading-relaxed">
            &ldquo;Anna datha sukhi bhava&rdquo;
          </blockquote>
          <p className="mt-4 text-brand-cream/60 text-sm tracking-wider">
            May the one who feeds you be blessed with happiness
          </p>
          <div className="w-12 h-0.5 bg-brand-ochre mx-auto mt-8" />
        </div>
      </section>
    </div>
  );
}

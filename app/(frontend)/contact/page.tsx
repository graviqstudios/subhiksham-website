import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export const metadata = {
  title: 'Contact',
  description: 'Visit Subhiksham at 100 Ft Road, Palakkad. Open daily for breakfast and lunch. Call or WhatsApp us.',
  alternates: { canonical: 'https://subhiksham.co.in/contact' },
};

const openingHours = [
  { slot: 'Breakfast', time: '7:00 AM - 10:00 AM' },
  { slot: 'Lunch',     time: '12:00 PM - 3:00 PM'  },
  { slot: 'Dinner',    time: '6:00 PM - 9:00 PM'   },
  { note: 'Open all days of the week' },
];

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fill="white"
        d="M24 10C16.28 10 10 16.28 10 24c0 2.52.68 4.88 1.86 6.92L10 38l7.3-1.82A13.94 13.94 0 0 0 24 38c7.72 0 14-6.28 14-14S31.72 10 24 10zm0 25.5a11.44 11.44 0 0 1-5.84-1.6l-.42-.25-4.33 1.08 1.1-4.22-.28-.44A11.47 11.47 0 0 1 12.5 24C12.5 17.6 17.6 12.5 24 12.5S35.5 17.6 35.5 24 30.4 35.5 24 35.5zm6.3-8.56c-.34-.17-2.02-.99-2.33-1.1-.31-.12-.54-.17-.77.17-.23.34-.88 1.1-1.08 1.33-.2.22-.4.25-.74.08-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.08-.17-.77-1.85-1.05-2.53-.28-.67-.56-.58-.77-.59h-.65c-.23 0-.6.08-.91.4-.31.31-1.2 1.17-1.2 2.85s1.23 3.31 1.4 3.54c.17.23 2.42 3.7 5.86 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.82 2.31-1.62.28-.8.28-1.48.2-1.62-.09-.15-.32-.23-.66-.4z"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-green text-brand-cream overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-sm text-brand-ochre tracking-[0.3em] uppercase mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wider">
            Contact Us
          </h1>
          <p className="font-display text-lg text-brand-cream/70 italic mt-3">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-brand-cream-dark h-[400px] md:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d76.6541!3d10.7647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s100+ft+road+palakkad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Subhiksham Location"
              />
            </div>

            {/* Info Cards */}
            <div className="space-y-6">

              {/* Address */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-ochre/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-brand-ochre" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-green">Visit Us</h3>
                    <p className="text-brand-green/70 mt-1 leading-relaxed">
                      100 Ft. Road, Palakkad<br />Kerala, India - 678001
                    </p>
                    <p className="text-brand-green/50 text-sm mt-2">Near Palakkad Junction Railway Station</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-ochre/10 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-brand-ochre" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-green">Call Us</h3>
                    <a href="tel:+919876543210" className="text-brand-ochre text-lg font-display mt-1 block hover:text-brand-ochre-dark transition-colors">
                      +91 98765 43210
                    </a>
                    <a href="tel:+914912345678" className="text-brand-green/60 text-sm mt-0.5 block hover:text-brand-green transition-colors">
                      +91 491 234 5678 (Landline)
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <WhatsAppIcon size={40} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-green">WhatsApp</h3>
                    <p className="text-brand-green/70 mt-1 text-sm">Quick queries and pre-orders</p>
                    <a
                      href="https://wa.me/919876543210?text=Hi%20Subhiksham!%20I%27d%20like%20to%20know%20more."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-display text-sm tracking-wide hover:bg-[#20BD5A] transition-colors shadow-sm"
                    >
                      <WhatsAppIcon size={18} />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-ochre/10 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-brand-ochre" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-green">Email</h3>
                    <a
                      href="mailto:hello@subhiksham.in"
                      className="text-brand-ochre font-display mt-1 block hover:text-brand-ochre-dark transition-colors"
                    >
                      hello@subhiksham.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-ochre/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-brand-ochre" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-brand-green">Opening Hours</h3>
                    <div className="mt-3 space-y-2">
                      {openingHours.map((h, i) =>
                        'note' in h ? (
                          <p key={i} className="text-brand-ochre text-sm font-display italic">
                            {h.note}
                          </p>
                        ) : (
                          <div key={i} className="flex items-center justify-between gap-4">
                            <span className="text-brand-green/70 text-sm">{h.slot}</span>
                            <span className="text-brand-green font-display text-sm font-medium">{h.time}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
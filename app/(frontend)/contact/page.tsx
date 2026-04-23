'use client';

import { MapPin, Phone, Clock, MessageCircle, Mail } from 'lucide-react';

const openingHours = [
  { slot: 'Breakfast', time: '7:00 AM - 10:00 AM' },
  { slot: 'Lunch', time: '12:00 PM - 3:00 PM' },
  { slot: 'Dinner', time: '6:00 PM - 9:00 PM' },
  { note: 'Open all days of the week' },
];

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
                title="Subhiksham Location - 100 Ft Road, Palakkad"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-ochre/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-brand-ochre" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-green">
                      Visit Us
                    </h3>
                    <p className="text-brand-green/70 mt-1 leading-relaxed">
                      100 Ft. Road, Palakkad<br />
                      Kerala, India - 678001
                    </p>
                    <p className="text-brand-green/50 text-sm mt-2">
                      Near Palakkad Junction Railway Station
                    </p>
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
                    <h3 className="font-display text-lg font-semibold text-brand-green">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919876543210"
                      className="text-brand-ochre text-lg font-display mt-1 block hover:text-brand-ochre-dark transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <a
                      href="tel:+914912345678"
                      className="text-brand-green/60 text-sm mt-0.5 block hover:text-brand-green transition-colors"
                    >
                      +91 491 234 5678 (Landline)
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-green">
                      WhatsApp
                    </h3>
                    <p className="text-brand-green/70 mt-1 text-sm">
                      Quick queries, reservations, and pre-orders
                    </p>
                    <a
                      href="https://wa.me/919876543210?text=Hi%20Subhiksham!%20I%27d%20like%20to%20know%20more."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-display text-sm tracking-wide hover:bg-[#20BD5A] transition-colors shadow-sm"
                    >
                      <MessageCircle size={16} /> Chat on WhatsApp
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
                    <h3 className="font-display text-lg font-semibold text-brand-green">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@subhiksham.in"
                      className="text-brand-ochre font-display mt-1 block hover:text-brand-ochre-dark transition-colors"
                    >
                      hello@subhiksham.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-white rounded-xl border border-brand-cream-dark p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-ochre/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-brand-ochre" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-green">
                      Opening Hours
                    </h3>
                    <div className="mt-3 space-y-2">
                      {openingHours.map((h, i) =>
                        'note' in h ? (
                          <p key={i} className="text-brand-ochre text-sm font-display italic">
                            {h.note}
                          </p>
                        ) : (
                          <div key={i} className="flex items-center justify-between gap-4">
                            <span className="text-brand-green/70 text-sm">
                              {h.slot}
                            </span>
                            <span className="text-brand-green font-display text-sm font-medium">
                              {h.time}
                            </span>
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

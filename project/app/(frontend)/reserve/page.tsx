'use client';

import { useState } from 'react';
import { Utensils, ShoppingBag, Calendar, Clock, Users, Phone, User, FileText } from 'lucide-react';

const timeSlots = [
  { value: '7-10AM', label: '7:00 - 10:00 AM (Breakfast)' },
  { value: '12-3PM', label: '12:00 - 3:00 PM (Lunch)' },
  { value: '6-9PM', label: '6:00 - 9:00 PM (Dinner)' },
];

const pickupTimes = [
  { value: '7AM', label: '7:00 AM' },
  { value: '8AM', label: '8:00 AM' },
  { value: '9AM', label: '9:00 AM' },
  { value: '10AM', label: '10:00 AM' },
  { value: '12PM', label: '12:00 PM' },
  { value: '1PM', label: '1:00 PM' },
  { value: '2PM', label: '2:00 PM' },
  { value: '6PM', label: '6:00 PM' },
  { value: '7PM', label: '7:00 PM' },
  { value: '8PM', label: '8:00 PM' },
];

const menuItems = [
  'Masala Dosa', 'Idli Sambar', 'Vada', 'Pongal', 'Poori Masala',
  'Meals (Sadya)', 'Sambar Rice', 'Curd Rice', 'Rava Dosa',
  'Uthappam', 'Filter Coffee', 'Payasam',
];

type BookingForm = {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  specialRequests: string;
};

type PreOrderForm = {
  name: string;
  phone: string;
  pickupDate: string;
  pickupTime: string;
  items: string[];
  notes: string;
};

export default function ReservePage() {
  const [activeTab, setActiveTab] = useState<'table' | 'tiffin'>('table');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [preorderSubmitted, setPreorderSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    phone: '',
    date: '',
    timeSlot: '',
    guests: 2,
    specialRequests: '',
  });
  const [preorderForm, setPreorderForm] = useState<PreOrderForm>({
    name: '',
    phone: '',
    pickupDate: '',
    pickupTime: '',
    items: [],
    notes: '',
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'table', ...bookingForm }),
      });
      setBookingSubmitted(true);
    } catch {
      setBookingSubmitted(true);
    }
  };

  const handlePreorderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'preorder', ...preorderForm }),
      });
      setPreorderSubmitted(true);
    } catch {
      setPreorderSubmitted(true);
    }
  };

  const toggleItem = (item: string) => {
    setPreorderForm((prev) => ({
      ...prev,
      items: prev.items.includes(item)
        ? prev.items.filter((i) => i !== item)
        : [...prev.items, item],
    }));
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-green text-brand-cream overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-sm text-brand-ochre tracking-[0.3em] uppercase mb-3">
            Reservations
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wider">
            Reserve
          </h1>
          <p className="font-display text-lg text-brand-cream/70 italic mt-3">
            Book a table or pre-order your tiffin
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Tab Switcher */}
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-brand-cream-dark mb-8">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-display text-sm tracking-wide transition-all duration-300 ${
                activeTab === 'table'
                  ? 'bg-brand-green text-brand-cream shadow-sm'
                  : 'text-brand-green hover:bg-brand-cream-dark'
              }`}
            >
              <Utensils size={16} /> Book a Table
            </button>
            <button
              onClick={() => setActiveTab('tiffin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-display text-sm tracking-wide transition-all duration-300 ${
                activeTab === 'tiffin'
                  ? 'bg-brand-ochre text-white shadow-sm'
                  : 'text-brand-green hover:bg-brand-cream-dark'
              }`}
            >
              <ShoppingBag size={16} /> Pre-order Tiffin
            </button>
          </div>

          {/* Book a Table */}
          {activeTab === 'table' && (
            <div>
              {bookingSubmitted ? (
                <div className="text-center py-16 bg-white rounded-xl border border-brand-cream-dark">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">&#10003;</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-green">
                    Booking Confirmed!
                  </h3>
                  <p className="text-brand-green/60 mt-2">
                    We&apos;ll send a confirmation to your phone shortly.
                  </p>
                  <button
                    onClick={() => {
                      setBookingSubmitted(false);
                      setBookingForm({ name: '', phone: '', date: '', timeSlot: '', guests: 2, specialRequests: '' });
                    }}
                    className="btn-primary mt-6"
                  >
                    Make Another Booking
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleBookingSubmit}
                  className="bg-white rounded-xl border border-brand-cream-dark p-6 md:p-8 space-y-5"
                >
                  <h3 className="font-display text-xl font-bold text-brand-green mb-2">
                    Book a Table
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                      <User size={14} /> Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                      <Phone size={14} /> Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                        <Calendar size={14} /> Date
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                        <Clock size={14} /> Time Slot
                      </label>
                      <select
                        required
                        value={bookingForm.timeSlot}
                        onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                      <Users size={14} /> Number of Guests
                    </label>
                    <select
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                      <FileText size={14} /> Special Requests
                    </label>
                    <textarea
                      value={bookingForm.specialRequests}
                      onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre resize-none"
                      placeholder="Any dietary requirements, celebrations, etc."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Confirm Booking
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Pre-order Tiffin */}
          {activeTab === 'tiffin' && (
            <div>
              {preorderSubmitted ? (
                <div className="text-center py-16 bg-white rounded-xl border border-brand-cream-dark">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">&#10003;</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-green">
                    Pre-order Received!
                  </h3>
                  <p className="text-brand-green/60 mt-2">
                    We&apos;ll confirm your order and have it ready for pickup.
                  </p>
                  <button
                    onClick={() => {
                      setPreorderSubmitted(false);
                      setPreorderForm({ name: '', phone: '', pickupDate: '', pickupTime: '', items: [], notes: '' });
                    }}
                    className="btn-primary mt-6"
                  >
                    Place Another Order
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handlePreorderSubmit}
                  className="bg-white rounded-xl border border-brand-cream-dark p-6 md:p-8 space-y-5"
                >
                  <h3 className="font-display text-xl font-bold text-brand-green mb-2">
                    Pre-order Tiffin
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                      <User size={14} /> Name
                    </label>
                    <input
                      type="text"
                      required
                      value={preorderForm.name}
                      onChange={(e) => setPreorderForm({ ...preorderForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                      <Phone size={14} /> Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={preorderForm.phone}
                      onChange={(e) => setPreorderForm({ ...preorderForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Pickup Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                        <Calendar size={14} /> Pickup Date
                      </label>
                      <input
                        type="date"
                        required
                        value={preorderForm.pickupDate}
                        onChange={(e) => setPreorderForm({ ...preorderForm, pickupDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                        <Clock size={14} /> Pickup Time
                      </label>
                      <select
                        required
                        value={preorderForm.pickupTime}
                        onChange={(e) => setPreorderForm({ ...preorderForm, pickupTime: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre"
                      >
                        <option value="">Select time</option>
                        {pickupTimes.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Item Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-3">
                      <ShoppingBag size={14} /> Select Items
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {menuItems.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleItem(item)}
                          className={`px-3 py-2 rounded-lg text-xs font-display tracking-wide transition-all duration-200 text-left ${
                            preorderForm.items.includes(item)
                              ? 'bg-brand-ochre text-white shadow-sm'
                              : 'bg-brand-cream text-brand-green border border-brand-cream-dark hover:border-brand-ochre'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    {preorderForm.items.length > 0 && (
                      <p className="text-xs text-brand-green/60 mt-2">
                        {preorderForm.items.length} item(s) selected
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-display text-brand-green mb-1.5">
                      <FileText size={14} /> Notes
                    </label>
                    <textarea
                      value={preorderForm.notes}
                      onChange={(e) => setPreorderForm({ ...preorderForm, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-brand-cream-dark bg-brand-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-ochre/50 focus:border-brand-ochre resize-none"
                      placeholder="Any special instructions or preferences"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Place Pre-order
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

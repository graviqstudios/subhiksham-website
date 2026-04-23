import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/neon';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      booking_type,
      name,
      phone,
      email,
      date,
      time,
      guests,
      items,
      special_requests,
    } = body;

    // Validate required fields
    if (!booking_type || !name || !phone || !date || !time) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: booking_type, name, phone, date, time' },
        { status: 400 }
      );
    }

    // Insert into Neon bookings table
    const result = await sql`
      INSERT INTO bookings (
        booking_type,
        name,
        phone,
        email,
        date,
        time,
        guests,
        items,
        special_requests
      ) VALUES (
        ${booking_type},
        ${name},
        ${phone},
        ${email ?? null},
        ${date},
        ${time},
        ${guests ?? null},
        ${items ?? null},
        ${special_requests ?? null}
      )
      RETURNING id
    `;

    const bookingId = result[0].id;

    return NextResponse.json(
      { success: true, bookingId },
      { status: 200 }
    );

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save booking' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Placeholder: integrate with database or notification service
    console.log('Booking received:', body);
    return NextResponse.json(
      { success: true, message: 'Booking received' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}

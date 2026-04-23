import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Placeholder: integrate with email service or notification system
    console.log('Contact form received:', body);
    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}

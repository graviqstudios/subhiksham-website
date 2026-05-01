// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/app/lib/db';
import { signToken, SESSION_COOKIE, SESSION_DURATION_HOURS } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email and password required' }, { status: 400 });
    }

    // Find user
    const rows = await sql`
      SELECT id, name, email, password, role
      FROM   admin_users
      WHERE  email = ${email.toLowerCase().trim()}
    `;

    const user = rows[0];
    if (!user) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign JWT
    const token = await signToken({
      userId: user.id,
      email:  user.email,
      role:   user.role,
    });

    const res = NextResponse.json({
      ok:   true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

    // Set HttpOnly cookie
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path:     '/',
      maxAge:   SESSION_DURATION_HOURS * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error('[LOGIN]', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
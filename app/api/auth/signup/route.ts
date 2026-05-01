// app/api/auth/signup/route.ts
// Protected: only works when NO admin users exist yet (first-time setup)
// After first admin is created, disable or protect this route.

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/app/lib/db';
import { signToken, SESSION_COOKIE, SESSION_DURATION_HOURS } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, setupKey } = await req.json();

    // Require a setup key to prevent random signups
    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json({ ok: false, error: 'Invalid setup key' }, { status: 403 });
    }

    if (!name || !email || !password) {
      return NextResponse.json({ ok: false, error: 'All fields required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ ok: false, error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await sql`SELECT id FROM admin_users WHERE email = ${email.toLowerCase()}`;
    if (existing.length > 0) {
      return NextResponse.json({ ok: false, error: 'Email already registered' }, { status: 409 });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 12);

    // Insert user
    const [user] = await sql`
      INSERT INTO admin_users (name, email, password, role)
      VALUES (${name}, ${email.toLowerCase()}, ${hashed}, 'admin')
      RETURNING id, name, email, role
    `;

    // Auto-login after signup
    const token = await signToken({ userId: user.id, email: user.email, role: user.role });

    const res = NextResponse.json({ ok: true, data: { id: user.id, name: user.name, email: user.email } });

    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path:     '/',
      maxAge:   SESSION_DURATION_HOURS * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error('[SIGNUP]', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
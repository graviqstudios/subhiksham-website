// app/lib/auth.ts
// Handles JWT signing/verification and session cookie management

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import sql from './db';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-me-in-production-use-32-chars-min'
);

export const SESSION_COOKIE = 'subhiksham_session';
export const SESSION_DURATION_HOURS = 24;

// ─── Token helpers ────────────────────────────────────────────────────────────

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_HOURS}h`)
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

// ─── Session helpers ──────────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

/** Read the current session from the cookie. Returns null if not logged in. */
export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload || !payload.userId) return null;

  const rows = await sql<AdminUser[]>`
    SELECT id, name, email, role
    FROM   admin_users
    WHERE  id = ${payload.userId as number}
  `;
  return rows[0] ?? null;
}

/** Require a logged-in admin — call from API routes or Server Actions. */
export async function requireAuth(): Promise<AdminUser> {
  const user = await getSession();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

/** Generate a secure random session ID (used as the JWT itself for stateless auth). */
export function generateSessionId(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
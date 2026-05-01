// app/api/menu/route.ts
// GET  /api/menu          — public: list all (or filter by ?category=&available=true)
// POST /api/menu          — admin: create item

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';
import { requireAuth } from '@/app/lib/auth';
import type { Category } from '@/types';

// ─── GET ──────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category  = searchParams.get('category') as Category | null;
  const available = searchParams.get('available'); // 'true' | 'false' | null

  let items;

  if (category && available === 'true') {
    items = await sql`
      SELECT * FROM menu_items
      WHERE  category = ${category} AND available = true
      ORDER  BY sort_order, name
    `;
  } else if (category) {
    items = await sql`
      SELECT * FROM menu_items
      WHERE  category = ${category}
      ORDER  BY sort_order, name
    `;
  } else if (available === 'true') {
    items = await sql`
      SELECT * FROM menu_items
      WHERE  available = true
      ORDER  BY category, sort_order, name
    `;
  } else {
    items = await sql`
      SELECT * FROM menu_items
      ORDER  BY category, sort_order, name
    `;
  }

  return NextResponse.json({ ok: true, data: items });
}

// ─── POST ─────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description = '', price, category, image_url = null, available = true, sort_order = 0 } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ ok: false, error: 'name, price and category are required' }, { status: 400 });
    }

    const validCategories = ['breakfast', 'lunch', 'tiffin', 'specials', 'desserts'];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ ok: false, error: 'Invalid category' }, { status: 400 });
    }

    const [item] = await sql`
      INSERT INTO menu_items (name, description, price, category, image_url, available, sort_order)
      VALUES (${name}, ${description}, ${price}, ${category}, ${image_url}, ${available}, ${sort_order})
      RETURNING *
    `;

    return NextResponse.json({ ok: true, data: item }, { status: 201 });
  } catch (err) {
    console.error('[MENU POST]', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
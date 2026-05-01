// app/api/menu/[id]/route.ts
// GET    /api/menu/[id]  — public: single item
// PATCH  /api/menu/[id]  — admin: update any field(s)
// DELETE /api/menu/[id]  — admin: delete

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';
import { requireAuth } from '@/app/lib/auth';

type Ctx = { params: { id: string } };

// ─── GET ──────────────────────────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Ctx) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 });

  const [item] = await sql`SELECT * FROM menu_items WHERE id = ${id}`;
  if (!item) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  return NextResponse.json({ ok: true, data: item });
}

// ─── PATCH ────────────────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: Ctx) {
  try { await requireAuth(); }
  catch { return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }); }

  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 });

  const body = await req.json();

  // Build dynamic SET clause — only update provided fields
  const allowed = ['name', 'description', 'price', 'category', 'image_url', 'available', 'sort_order'] as const;
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: false, error: 'No fields to update' }, { status: 400 });
  }

  // postgres.js tagged template for dynamic updates
  const [item] = await sql`
    UPDATE menu_items
    SET    ${sql(updates)}, updated_at = NOW()
    WHERE  id = ${id}
    RETURNING *
  `;

  if (!item) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, data: item });
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try { await requireAuth(); }
  catch { return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }); }

  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 });

  await sql`DELETE FROM menu_items WHERE id = ${id}`;
  return NextResponse.json({ ok: true, data: { id } });
}
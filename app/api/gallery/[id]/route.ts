// app/api/gallery/[id]/route.ts
// PATCH /api/gallery/[id]  — toggle published, update alt/category
// DELETE /api/gallery/[id] — remove image record

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';
import { requireAuth } from '@/app/lib/auth';

type Ctx = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  try { await requireAuth(); }
  catch { return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }); }

  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 });

  const body = await req.json();
  const allowed = ['alt', 'category', 'sort_order', 'published'] as const;
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: false, error: 'No fields to update' }, { status: 400 });
  }

  const [image] = await sql`
    UPDATE gallery_images
    SET    ${sql(updates)}, updated_at = NOW()
    WHERE  id = ${id}
    RETURNING *
  `;

  if (!image) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, data: image });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try { await requireAuth(); }
  catch { return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }); }

  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 });

  await sql`DELETE FROM gallery_images WHERE id = ${id}`;
  return NextResponse.json({ ok: true, data: { id } });
}
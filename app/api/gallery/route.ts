// app/api/gallery/route.ts
// GET  /api/gallery      — public: all published images
// POST /api/gallery      — admin: add image record (after upload)

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';
import { requireAuth } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all'); // admin passes ?all=1 to see unpublished too

  let images;
  if (all === '1') {
    try {
      await requireAuth();
      images = await sql`SELECT * FROM gallery_images ORDER BY sort_order, created_at DESC`;
    } catch {
      images = await sql`SELECT * FROM gallery_images WHERE published = true ORDER BY sort_order, created_at DESC`;
    }
  } else {
    images = await sql`
      SELECT * FROM gallery_images
      WHERE  published = true
      ORDER  BY sort_order, created_at DESC
    `;
  }

  return NextResponse.json({ ok: true, data: images });
}

export async function POST(req: NextRequest) {
  try { await requireAuth(); }
  catch { return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }); }

  try {
    const body = await req.json();
    const { url, alt = '', category = 'food', sort_order = 0, published = true } = body;

    if (!url) return NextResponse.json({ ok: false, error: 'url is required' }, { status: 400 });

    const [image] = await sql`
      INSERT INTO gallery_images (url, alt, category, sort_order, published)
      VALUES (${url}, ${alt}, ${category}, ${sort_order}, ${published})
      RETURNING *
    `;

    return NextResponse.json({ ok: true, data: image }, { status: 201 });
  } catch (err) {
    console.error('[GALLERY POST]', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
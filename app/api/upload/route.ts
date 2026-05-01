// app/api/upload/route.ts
// Uploads images to Cloudinary (free tier: 25GB, perfect for a restaurant site)
// Install: npm install cloudinary
// Add to .env.local:
//   CLOUDINARY_CLOUD_NAME=your_cloud_name
//   CLOUDINARY_API_KEY=your_api_key
//   CLOUDINARY_API_SECRET=your_api_secret

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/app/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  // Auth check
  try { await requireAuth(); }
  catch { return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }); }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'subhiksham';

    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'Only image files are allowed' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: 'File must be under 5MB' }, { status: 400 });
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            transformation: [
              { quality: 'auto:good' },   // auto-optimize quality
              { fetch_format: 'auto' },    // serve WebP to modern browsers
            ],
          },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result as typeof result & { width: number; height: number });
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      ok: true,
      data: {
        url:       result.secure_url,
        public_id: result.public_id,
        width:     result.width,
        height:    result.height,
      },
    });
  } catch (err) {
    console.error('[UPLOAD]', err);
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
  }
}

// Required for file uploads — disable Next.js body parser
export const config = {
  api: { bodyParser: false },
};
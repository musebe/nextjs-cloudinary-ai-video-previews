// src/app/api/upload/video/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { previewUrl } from '@/lib/transforms';
import { readVideos, writeVideos, VideoItem } from '@/lib/videoDb';

// Configure Cloudinary SDK
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
    // 📝 Step 1: Parse incoming form data
    const form = await req.formData();
    const file = form.get('file') as File;
    const duration = Number(form.get('duration') || 8);

    if (!file) {
        console.error('⚠️ [API] Missing file in request');
        return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    try {
        // 🚀 Step 2: Upload raw video to Cloudinary
        console.log('⏳ [API] Uploading video to Cloudinary...');
        const buffer = Buffer.from(await file.arrayBuffer());

        const result: UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'video',
                    folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
                },
                (err, uploadResult) => err ? reject(err) : resolve(uploadResult!)
            ).end(buffer);
        });
        console.log('✅ [API] Upload complete:', result.public_id);

        // 🔖 Step 3: Normalize ID (strip folder prefix)
        const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER!;
        const id = result.public_id.startsWith(`${folder}/`)
            ? result.public_id.slice(folder.length + 1)
            : result.public_id;
        console.log('🔑 [API] Normalized video ID:', id);

        // 🌐 Step 4: Build URLs
        const originalUrl = result.secure_url;
        console.log('🌐 [API] Original URL:', originalUrl);

        const preview = previewUrl(id, duration);
        console.log('🔍 [API] Preview URL:', preview);

        // 💾 Step 5: Persist to local JSON DB
        const newVideo: VideoItem = { id, originalUrl, previewUrl: preview };
        const all = await readVideos();
        all.push(newVideo);
        await writeVideos(all);
        console.log('💾 [API] Saved video record:', newVideo);

        // 🎉 Step 6: Return success response
        return NextResponse.json(newVideo);
    } catch (err: any) {
        console.error('❌ [API] Upload route error:', err);
        return NextResponse.json(
            { error: err.message || 'Upload failed' },
            { status: 500 }
        );
    }
}

// src/app/api/upload/video/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const config = {
    api: { bodyParser: { sizeLimit: '200mb' } }, // allow up to 200 MB
};

import { NextRequest, NextResponse } from 'next/server';
import { previewUrl } from '@/lib/transforms';
import { readVideos, writeVideos, VideoItem } from '@/lib/videoDb';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import {
    uploadLargeVideo,
    uploadVideoBuffer,
} from '@/lib/cloudinary';
import { CloudinaryUploadError } from '@/lib/cloudinaryUpload';

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
        console.log('⏳ [API] Preparing to upload video to Cloudinary…');
        const buffer = Buffer.from(await file.arrayBuffer());
        const sizeBytes = buffer.byteLength;
        const THRESHOLD = 100 * 1024 * 1024; // 100 MB
        const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER!;

        let result;
        if (sizeBytes > THRESHOLD) {
            console.log(`⏳ [API] upload_large for ${(sizeBytes / 1e6).toFixed(1)} MB video…`);
            // write buffer to temp file
            const tmpPath = path.join(os.tmpdir(), `${Date.now()}-${file.name}`);
            await fs.writeFile(tmpPath, buffer);
            try {
                result = await uploadLargeVideo(tmpPath, {
                    resource_type: 'video',
                    folder,
                    chunk_size: 7_000_000, // 7 MB chunks
                });
            } finally {
                await fs.unlink(tmpPath);
            }
        } else {
            console.log(`⏳ [API] upload_stream for ${(sizeBytes / 1e6).toFixed(1)} MB video…`);
            result = await uploadVideoBuffer(buffer, {
                resource_type: 'video',
                folder,
            });
        }
        console.log('✅ [API] Upload complete:', result.public_id);

        // 🔖 Step 3: Normalize ID (strip folder prefix)
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
        if (err instanceof CloudinaryUploadError) {
            return NextResponse.json(
                { error: err.message },
                { status: err.httpCode || 500 }
            );
        }
        return NextResponse.json(
            { error: err.message || 'Upload failed' },
            { status: 500 }
        );
    }
}

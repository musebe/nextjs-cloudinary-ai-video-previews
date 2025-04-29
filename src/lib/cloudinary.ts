// src/lib/cloudinary.ts

import { Cloudinary as CloudinaryUrlGen } from '@cloudinary/url-gen';
import type { UploadApiOptions, UploadApiResponse } from 'cloudinary';

/** 📋 Env var validation for URL-Gen SDK */
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
if (!cloudName) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');

/**
 * 5️⃣ URL-Gen SDK (client + server safe)
 */
export const cld = new CloudinaryUrlGen({
    cloud: { cloudName },
    url: { secure: true },
});

/**
 * 3️⃣ uploadLargeVideo:
 *    For files >100 MB, writes a temp file and uses upload_large().
 */
export async function uploadLargeVideo(
    filePath: string,
    options: UploadApiOptions & { chunk_size?: number }
): Promise<UploadApiResponse> {
    if (typeof window !== 'undefined') {
        throw new Error('uploadLargeVideo can only be called on the server');
    }

    // Dynamically require V2 SDK at runtime
    const requireFn = eval('require') as NodeRequire;
    const { v2: v2SDK } = requireFn('cloudinary') as typeof import('cloudinary');

    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiKey || !apiSecret) {
        throw new Error('Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET');
    }
    v2SDK.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    });

    return new Promise((resolve, reject) => {
        // @ts-ignore – upload_large not yet in defs
        v2SDK.uploader.upload_large(
            filePath,
            { resource_type: 'video', ...options },
            (err, result) => {
                if (err) return reject(err);
                resolve(result as UploadApiResponse);
            }
        );
    });
}

/**
 * 4️⃣ uploadVideoBuffer:
 *    For files ≤100 MB, streams the buffer via upload_stream().
 */
export async function uploadVideoBuffer(
    buffer: Buffer,
    options: UploadApiOptions
): Promise<UploadApiResponse> {
    if (typeof window !== 'undefined') {
        throw new Error('uploadVideoBuffer can only be called on the server');
    }

    const requireFn = eval('require') as NodeRequire;
    const { v2: v2SDK } = requireFn('cloudinary') as typeof import('cloudinary');

    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiKey || !apiSecret) {
        throw new Error('Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET');
    }
    v2SDK.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    });

    return new Promise((resolve, reject) => {
        const stream = v2SDK.uploader.upload_stream(
            options,
            (err, result) => {
                if (err) return reject(err);
                resolve(result as UploadApiResponse);
            }
        );
        stream.end(buffer);
    });
}

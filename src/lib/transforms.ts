// src/lib/transforms.ts
import { LRUCache } from 'lru-cache';
import { cld } from './cloudinary';
import { preview } from '@cloudinary/url-gen/actions/videoEdit';
import { scale } from '@cloudinary/url-gen/actions/resize';

const FOLDER = 'video-previews';
const cache = new LRUCache<string, string>({ max: 500 });

export function previewUrl(id: string, duration = 8): string {
    const key = `${id}-${duration}`;
    if (cache.has(key)) return cache.get(key)!;

    const publicId = `${FOLDER}/${id}`;
    const url = cld
        .video(publicId)
        .videoEdit(
            preview()
                .duration(`${duration}`)    // ← pass string "8", not number 8
            // .maxSeg(3)                // optional segment controls
            // .minSegDur(3)
        )
        .format('mp4')                  // ensures .mp4 extension
        .toURL();

    cache.set(key, url);
    return url;
}

export function thumbnailUrl(id: string, width = 400): string {
    const publicId = `${FOLDER}/${id}`;
    return cld
        .video(publicId)
        .resize(scale().width(width))
        .format('jpg')
        .toURL();
}

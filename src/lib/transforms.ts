// src/lib/transforms.ts
import { LRUCache } from 'lru-cache';
import { cld } from './cloudinary';
import { preview } from '@cloudinary/url-gen/actions/videoEdit';
import { scale } from '@cloudinary/url-gen/actions/resize';

const FOLDER = 'video-previews';
const cache = new LRUCache<string, string>({ max: 500 });

/**
 * Generates an 8-second AI preview URL for the given publicId.
 */
export function previewUrl(id: string, duration = 8): string {
    const key = `${id}-${duration}`;
    if (cache.has(key)) return cache.get(key)!;

    const publicId = `${FOLDER}/${id}`;
    const url = cld
        .video(publicId)
        .videoEdit(preview().duration(`${duration}`))
        .format('mp4')
        .toURL();

    cache.set(key, url);
    return url;
}

/**
 * Generates a JPG thumbnail URL for the given publicId.
 * Used as the <video poster="..."> so mobile browsers display a proper thumbnail.
 */
export function thumbnailUrl(id: string, width = 800): string {
    const publicId = `${FOLDER}/${id}`;
    return cld
        .video(publicId)
        .resize(scale().width(width))
        .format('jpg')
        .toURL();
}

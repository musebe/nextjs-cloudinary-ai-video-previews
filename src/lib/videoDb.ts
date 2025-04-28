// src/lib/videoDb.ts

import fs from 'fs/promises';
import path from 'path';

export interface VideoItem {
    id: string;
    originalUrl: string;
    previewUrl: string;
    title?: string;
}

const DB = path.join(process.cwd(), 'data/videos.json');

export async function readVideos(): Promise<VideoItem[]> {
    try {
        const txt = await fs.readFile(DB, 'utf8');
        return JSON.parse(txt);
    } catch {
        return [];
    }
}

export async function writeVideos(videos: VideoItem[]) {
    await fs.mkdir(path.dirname(DB), { recursive: true });
    await fs.writeFile(DB, JSON.stringify(videos, null, 2));
}

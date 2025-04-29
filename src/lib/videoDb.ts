// src/lib/videoDb.ts

import { Redis } from '@upstash/redis'

export interface VideoItem {
    id: string
    originalUrl: string
    previewUrl: string
    title?: string
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const VIDEOS_KEY = 'videos'

export async function readVideos(): Promise<VideoItem[]> {
    try {
        // Fetch whatever is in Redis (could be string or already an object)
        const raw = await redis.get<unknown>(VIDEOS_KEY)
        if (!raw) {
            return []
        }

        // If it’s already an array, just return it
        if (Array.isArray(raw)) {
            return raw as VideoItem[]
        }

        // If it’s a string, try parsing--if that fails, log and return empty
        if (typeof raw === 'string') {
            try {
                return JSON.parse(raw) as VideoItem[]
            } catch {
                console.error(
                    'Corrupt JSON in Redis, resetting to empty array. Raw value:',
                    raw
                )
                // Optionally clear the bad key so next write is clean:
                await redis.del(VIDEOS_KEY)
                return []
            }
        }

        // Any other type, drop it
        return []
    } catch (err) {
        console.error('Failed to read videos from Redis:', err)
        return []
    }
}

export async function writeVideos(videos: VideoItem[]): Promise<void> {
    try {
        // Pass the array directly—Upstash will JSON.stringify it for you
        await redis.set(VIDEOS_KEY, videos)
    } catch (err) {
        console.error('Failed to write videos to Redis:', err)
        throw err
    }
}
